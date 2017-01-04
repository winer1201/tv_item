(function (exports) {//用此类加载：1、可以限制每次加载图片个数，2、可以停止图片加载（为了解决低网络带宽下加载图片消费太多资源造成接口老调用失败的问题）
    //单例
    var instance = null;
    var emptyFn = function () { };

    //初始默认配置
    var config_default = {
        //线程池"线程"数量
        thread: 3,
        //图片加载失败重试次数
        //重试0次，加上原有的一次，总共是1次
        "try": 0
    };

    //工具
    var _helpers = {
        //设置dom属性
        setAttr: (function () {
            var img = new Image();
            //判断浏览器是否支持HTML5 dataset
            if (img.dataset) {
                return function (dom, name, value) {
                    dom.dataset[name] = value;
                    return value;
                };
            } else {
                return function (dom, name, value) {
                    dom.setAttribute("data-" + name, value);
                    return value;
                };
            }
        }()),
        //获取dom属性
        getAttr: (function () {
            var img = new Image();
            //判断浏览器是否支持HTML5 dataset
            if (img.dataset) {
                return function (dom, name) {
                    return dom.dataset[name];
                };
            } else {
                return function (dom, name) {
                    return dom.getAttribute("data-" + name);
                };
            }
        }())
    };

    /**
     * 构造方法
     * @param max 最大连接数。数值。
     */
    function ImagePool(max) {
        //最大并发数量
        this.max = max || config_default.thread;
        this.linkHead = null;
        this.linkNode = null;
        this.cachMap = new Object();//一次运行中图片只需要加载一次，此类存储所有加载成功的图片名用于判断是否加载过。
        //加载池
        //[{img: dom,free: true, node: node}]
        //node
        //{src: "", options: {success: "fn",error: "fn", once: true}, try: 0}
        this.pool = [];
    }

    /**
     * 初始化
     */
    ImagePool.prototype.initPool = function () {
        var i, img, obj, _s;

        _s = this;
        for (i = 0; i < this.max; i++) {
            obj = {};
          
            obj.img = _s.initImage(i);
            obj.free = true;
            this.pool.push(obj);
        }
    };
    ImagePool.prototype.initImage = function (id) {
        var  img,_s;
        _s = this;//this代表着调用者可以通过call或apply传递参数的方式修改this所指向的值。
        img = new Image();
        _helpers.setAttr(img, "id", id);
        img.onload = function () {
            var id, src;
            
            var datasrc = _helpers.getAttr(this, "datasrc");
            var key = window.encodeURIComponent(datasrc);
            _s.cachMap[key] = true;
            //回调
            _s.notice(_s.getNode(this), "success", this.src);//此this代表的是调用onload的对象，系统内设定为image本身，这个this和initImage进来时的this不是一个东东

            //处理任务
            _s.executeLink(this);
        };
        img.onerror = function (e) {
            var node = _s.getNode(this);

            //判断尝试次数
            if (node.try < config_default.try) {
                node.try = node.try + 1;
                //再次追加到任务链表末尾
                _s.appendNode(_s.createNode(node.src, node.options, node.notice, node.group, node.try));

            } else {
                //error回调
                _s.notice(node, "error", this.src);
            }

            //处理任务
            _s.executeLink(this);
        };
        return img;
    },
    /**
     * 回调封装
     * @param node 节点。对象。
     * @param status 状态。字符串。可选值：success(成功)|error(失败)
     * @param src 图片路径。字符串。
     */
    ImagePool.prototype.notice = function (node, status, src) {
        node.notice(status, src);
    };

    /**
     * 处理链表任务
     * @param dom 图像dom对象。对象。
     */
    ImagePool.prototype.executeLink = function (dom) {
        //判断链表是否存在节点
        if (this.linkHead) {
            //加载下一个图片
            this.setSrc(dom, this.linkHead);
            //去除链表头
            this.shiftNode();
        } else {
            //设置自身状态为空闲
            this.status(dom, true);
        }
    };

    /**
     * 获取空闲"线程"
     */
    ImagePool.prototype.getFree = function () {
        var length, i;
        for (i = 0, length = this.pool.length; i < length; i++) {
            if (this.pool[i].free) {
                return this.pool[i];
            }
        }

        return null;
    };

    /**
     * 封装src属性设置
     * 因为改变src属性相当于加载图片，所以把操作封装起来
     * @param dom 图像dom对象。对象。
     * @param node 节点。对象。
     */
    ImagePool.prototype.setSrc = function (dom, node) {
     

        //设置池中的"线程"为非空闲状态
        this.status(dom, false);
        //关联节点
        this.setNode(dom, node);
        var oldsrc = _helpers.getAttr(dom, "datasrc");
        if (oldsrc == node.src)//防止加载的url与img上次加载的url相同而不进行加载的问题(相同的img再次设置相同的src是不会进行重新加载的)
            dom.src = "";
        //加载图片
        dom.src = node.src;

        _helpers.setAttr(dom, "datasrc", node.src);
     

    };

    /**
     * 更新池中的"线程"状态
     * @param dom 图像dom对象。对象。
     * @param status 状态。布尔。可选值：true(空闲)|false(非空闲)
     */
    ImagePool.prototype.status = function (dom, status) {
        var id = _helpers.getAttr(dom, "id");
        this.pool[id].free = status;
        //空闲状态，清除关联的节点
        if (status) {
            this.pool[id].node = null;
        }
    };

    /**
     * 更新池中的"线程"的关联节点
     * @param dom 图像dom对象。对象。
     * @param node 节点。对象。
     */
    ImagePool.prototype.setNode = function (dom, node) {
        var id = _helpers.getAttr(dom, "id");
        this.pool[id].node = node;
        return this.pool[id].node === node;
    };

    /**
     * 获取池中的"线程"的关联节点
     * @param dom 图像dom对象。对象。
     */
    ImagePool.prototype.getNode = function (dom) {
        var id = _helpers.getAttr(dom, "id");
        return this.pool[id].node;
    };

    /**
     * 对外接口，加载图片
     * @param src 可以是src字符串，也可以是src字符串数组。
     * @param options 用户自定义参数。包含：success回调、error回调、once标识。
     */
    ImagePool.prototype.load = function (src, options) {
        var key=window.encodeURIComponent(src);
        var value = this.cachMap[key];
        if (value == true) {// 如果图片被缓存，则直接返回缓存数据
            options.success.call();
            return;
          
        }
        
        var srcs = [],
            free = null,
            length = 0,
            i = 0,
            //只初始化一次回调策略
            notice = (function () {
                if (options.once) {
                    return function (status, src) {
                        var g = this.group,
                            o = this.options;

                        //记录
                        g[status].push(src);
                        //判断改组是否全部处理完成
                        if (g.success.length + g.error.length === g.count) {
                        
                               o.success.call(null, g.success, g.error, g.count);
                          
                        }
                    };
                } else {
                    return function (status, src) {
                        var o = this.options;//此this指的是调用notice方法的node对象由于options在createNode的时候已经存储到node中所以可以使用this访问

                        //直接回调
                
                        if (o) {
                            o[status].call(null, src);
                       
                        }
                
                    };
                }
            }()),
            group = {
                count: 0,
                success: [],
                error: []
            },
            node = null;
        options = options || {};
        options.success = options.success || emptyFn;
        options.error = options.error || emptyFn;
        srcs = srcs.concat(src);

        //设置组元素个数
        group.count = srcs.length;
        //遍历需要加载的图片
        for (i = 0, length = srcs.length; i < length; i++) {
            //创建节点
            node = this.createNode(srcs[i], options, notice, group);
            //判断线程池是否有空闲
            free = this.getFree();
            if (free) {
                //有空闲，则立即加载图片
                this.setSrc(free.img, node);
            } else {
                //没有空闲，将任务添加到链表
                this.appendNode(node);
            }
        }
    };

    /**
     * 获取内部状态信息
     * @returns {{}}
     */
    ImagePool.prototype.info = function () {
        var info = {},
            length = 0,
            i = 0,
            node = null;
        //线程
        info.thread = {};
        //线程总数量
        info.thread.count = this.pool.length;
        //空闲线程数量
        info.thread.free = 0;
        //任务
        info.task = {};
        //待处理任务数量
        info.task.count = 0;

        //获取空闲"线程"数量
        for (i = 0, length = this.pool.length; i < length; i++) {
            if (this.pool[i].free) {
                info.thread.free = info.thread.free + 1;
            }
        }

        //获取任务数量(任务链长度)
        node = this.linkHead;
        if (node) {
            info.task.count = info.task.count + 1;
            while (node.next) {
                info.task.count = info.task.count + 1;
                node = node.next;
            }
        }

        return info;
    };

    /**
     * 创建节点
     * @param src 图片路径。字符串。
     * @param options 用户自定义参数。包含：success回调、error回调、once标识。
     * @param notice 回调策略。 函数。
     * @param group 组信息。对象。{count: 0, success: [], error: []}
     * @param tr 出错重试次数。数值。默认为0。
     * @returns {{}}
     */
    ImagePool.prototype.createNode = function (src, options, notice, group, tr) {
        var node = {};

        node.src = src;
        node.options = options;
        node.notice = notice;
        node.group = group;
        node.try = tr || 0;

        return node;
    };

    /**
     * 向任务链表末尾追加节点
     * @param node 节点。对象。
     */
    ImagePool.prototype.appendNode = function (node) {
        //判断链表是否为空
        if (!this.linkHead) {
            this.linkHead = node;
            this.linkNode = node;
        } else {
            this.linkNode.next = node;
            this.linkNode = node;
        }
    };

    /**
     * 删除链表头
     */
    ImagePool.prototype.shiftNode = function () {
        //判断链表是否存在节点
        if (this.linkHead) {
            //修改链表头
            this.linkHead = this.linkHead.next || null;
        }
    };
    /**
    * 删除链表头
    */
    ImagePool.prototype.stopload = function () {
        logger.info("停止页面图片加载图片");
        //判断链表是否存在节点,然后清空链表
        while (this.linkHead) {
            //修改链表头
            this.linkHead = this.linkHead.next || null;
        }
        this.linkNode = null;
        //清空下载池
        var length, i;
        for (i = 0, length = this.pool.length; i < length; i++) {
            var node = this.pool[i];
            var img = node.img;          
            img.onload = img.onerror = null;
            img.src = "";
        }
        this.pool = [];

        instance.initPool();

    };
    /**
     * 导出对外接口
     * @param max 最大连接数。数值。
     * @returns {{load: Function, info: Function}}
     */
    exports.initImagePool = function (max) {

        if (!instance) {
            instance = new ImagePool(max);
            instance.initPool();
        }

        return {
            /**
             * 加载图片
             */
            load: function () {
                instance.load.apply(instance, arguments);
            },
            /**
             * 内部信息
             * @returns {*|any|void}
             */
            info: function () {
                return instance.info.call(instance);
            },
            stopload: function () {
                instance.stopload.apply(instance);
            }
        };
    };

}(this));


var loadingHelper = {
    loadimg: function () {
        try{   
            var imglist = document.getElementsByTagName("img");
            var img = null;
            var urllist = [];
            var objlist = [];
            for (var i = 0; i < imglist.length; i++) {
                img = imglist[i];
                urllist[urllist.length] = img.getAttribute("data-src");
                objlist[objlist.length] = img;
            }

            var imagepool = initImagePool(2);

            imagepool.load(urllist, {
                success: function (src) {
                    for (var i = 0; i < urllist.length; i++) {
                        if (src.endWith(urllist[i]))
                            objlist[i].setAttribute("src", src);
                    }
                },
                error: function (src) {
                    console.log("error:::::" + src);
                }
            });
        }
        catch (e) {

        }
    },
    loadbg: function (imgurl) {
        try{        
            var img = config.pms_imgurl + "Upload/1280x720/background/BG.png";
            if (imgurl && imgurl != "")
                img = imgurl;
           
            var imagepool = initImagePool(3);

            imagepool.load([img], {
                success: function (src) {
                    var bgimg = document.all('divwp');
                    if (bgimg != null && bgimg != undefined)
                        bgimg.style.backgroundImage = "url(" + src + ")";
                },
                error: function (src) {
                    console.log("error:::::" + src);
                    //document.writeln(src);
                }
            });
        }
        catch (e) {

        }
    }
};