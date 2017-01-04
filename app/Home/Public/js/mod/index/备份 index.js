function page_init() {
    indexInstance.init();
}

//一级页面数据处理
var indexInstance = {
    backUrl: "",
    curNavCode: null,
    curNavInfo: null,
    defaultNavCode: "",
    focusid: "",
    datalist: null,
    fromNavCode: "",
    imglist: [],
    userinfo: null,
    init: function () {
        var that = indexInstance;
        //that.areacode = tp.util.getQueryString("areacode");
        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");
        that.fromNavCode = tp.util.getQueryString("navcode");

        if (!that.focusid || that.focusid == "")
            that.focusid = "td0";

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                IndexEvent.init({
                    curNavCode: that.curNavCode,
                    defaultid: that.focusid,
                    loadData: that.loadData,
                    doEnter: that.enter,
                    afterInit: that.afterInit,
                    afterNavChanged: that.afterInit,
                    esc: that.esc
                });
            }
        });

        //加载背景图片
        loadingHelper.loadbg();

        //3.页面元素获取（首页、或指定页面）,并加载
        var url = config.tps_getpagedata_url;
        url = tp.util.appendParam(url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "websitecode", m_websitecode);

        //先获取用户信息？同步获取？

        tp.ajax({
            url: url,
            success: function (data) {
                //加载用户数据
                that.loadUserInfo();
                //数据格式化
                that.initPageData(data);
                //渲染导航条
                that.loadNavData(that.datalist);
                //加载页面数据
                that.loadTableData(that.curNavInfo);
                //that.changeNav(that.curNavCode, false, true);                
                tp_ui.popup.loading.close();
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        })
    },
    loadUserInfo: function () {
        var that = indexInstance;
        var url = config.cbs_user_getuserinfo + "?usercode=" + m_usercode + "&user_session=" + m_user_session;
        tp.ajax({
            url: url,
            success: function (data) {
                var code = -1;
                if (!data)
                    tp.util.showMsg("error");
                data = eval('(' + data + ')');
                if (data)
                    code = data.retcode;
                if (code != 0) {
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    that.userinfo = data.data;
                }
            },
            async: false,
            error: function (status) {
                console.log(status);
                tp.util.showMsg("error");
            },
            loading: function () {
                console.log('loadUserInfo');
            }
        });

    },
    //数据格式化
    initPageData: function (listStr) {
        var that = indexInstance;

        if (listStr == null || listStr == undefined)
            return;
        var list = JSON.parse(listStr);
        if (list.retcode != 0)
            return;
        if (!list.data)
            return;

        that.datalist = list.data;
        if (that.datalist.length <= 0)
            return;

        that.loadimg();

        var navcode = that.fromNavCode;
        for (var i = 0; i < that.datalist.length; i++) {
            var info = that.datalist[i];

            if ((navcode == "" && info.isdefault == 1) || (navcode != "" && info.navcode == navcode)) {
                that.curNavCode = info.navcode;
                that.curNavInfo = info;
                if (info.isdefault)
                    that.defaultNavCode = info.navcode;
                break;
            }
        }
        if (this.curNavCode == null) {//没找到默认栏目，则设置第一个栏目为默认栏目
            that.curNavCode = that.datalist[0].navcode;
            that.curNavInfo = that.datalist[0];
            that.defaultNavCode = that.datalist[0].navcode;
        }
    },
    loadimg: function () {
        var that = indexInstance;
        var allimg = [];
        var allurl = [];

        if (!that.datalist) return;


        for (var i = 0; i < that.datalist.length; i++) {
            var tmp = that.datalist[i].imglist;
            for (var j = 0; j < tmp.length; j++) {
                allimg[allimg.length] = tmp[j];
                //allurl[allurl.length] = config.tp_pms_url + "application/" + tmp[j].url;
                allurl[allurl.length] = config.pms_imgurl + tmp[j].url;
            }
        }
        var imagepool = initImagePool(5);

        imagepool.load(allurl, {
            success: function (src) {
                for (var i = 0; i < allimg.length; i++) {
                    if (src.endWith(allimg[i].url)) {
                        //添加到缓存中
                        that.imglist[that.imglist.length] = {
                            id: allimg[i].id,
                            imgid: allimg[i].imgid,
                            url: src
                        };
                        //设置页面背景图
                        var imgctr = document.all(allimg[i].imgid);
                        if (imgctr) {
                            imgctr.setAttribute("src", src);
                        }
                    }
                }
            },
            error: function (src) {
                console.log("error:::::" + src);
                //document.writeln(src);
            }
        });

    },
    //加载导航数据
    loadNavData: function (datalist) {
        if (!datalist) return;

        var content = "";
        var data_left = "", data_right = "";
        for (var i = 0; i < datalist.length; i++) {
            var info = datalist[i];

            if (i < datalist.length - 1) {
                data_right = " data-right='nv_" + datalist[i + 1].navcode + "' ";
            }
            content += "<div id=\"nv_" + info.navcode + "\" " + data_left + data_right + " class=\"navbar\"><label>" + info.navname + "</label></div>";

            data_left = " data-left='nv_" + info.navcode + "' ";
            data_right = "";
        }
        document.all("page_navbar").innerHTML = content;
    },
    loadData: function (navCode) {
        if (!navCode || navCode == "") return;
        var that = indexInstance;
        var navInfo = null;
        if (navCode == that.curNavCode) return;
        that.curNavCode = navCode;
        for (var i = 0; i < that.datalist.length; i++) {
            navInfo = that.datalist[i];
            if (navInfo.navcode == navCode) {
                that.loadTableData(navInfo);
                break;
            }
        }
    },
    //加载表格数据
    loadTableData: function (navInfo) {
        if (!navInfo) return;
        var that = indexInstance;
        that.curNavInfo = navInfo;
        document.all("page_content").innerHTML = navInfo.tilesinfo;

        var imglist = document.getElementsByTagName("img");
        var img = null;
        var imgurl = "", imgid = "", dataurl = "";
        var urllist = [];
        var objlist = [];
        for (var i = 0; i < imglist.length; i++) {
            img = imglist[i];
            dataurl = img.getAttribute("data-src");
            imgurl = img.getAttribute("src");
            imgid = img.getAttribute("id");
            //设置默认图片
            if (imgurl.startWith("default")) {
                imgurl = config.portal_public_url + "img/default/" + imgurl;
                img.setAttribute("src", imgurl);
            }
            //imgurl = config.pms_imgurl + imgurl;
            //img.setAttribute("data-src", imgurl);
            for (var j = 0; j < that.imglist.length; j++) {
                if (imgid == that.imglist[j].imgid) {
                    img.setAttribute("src", that.imglist[j].url);
                    break;
                }
            }
        }
        //异步加载图片
        //loadingHelper.loadimg();
    },
    enter: function (ctr, key) {
        var that = indexInstance;
        if (!ctr) return;

        var backUrl = "", targetUrl = "", callback = "", id = "";

        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;

        id = ctr.getAttribute("id");
        backUrl = encodeURIComponent(that.backUrl);

        callback = config.portal_home_url;
        //callback = tp.util.appendParam(callback, "areacode", that.areacode);
        callback = tp.util.appendParam(callback, "usercode", m_usercode);
        callback = tp.util.appendParam(callback, "user_session", m_user_session);
        callback = tp.util.appendParam(callback, "websitecode", m_websitecode);
        callback = tp.util.appendParam(callback, "navcode", IndexEvent.curNavCode);
        callback = tp.util.appendParam(callback, "focusid", id);

        var newreach_token = tp.util.getQueryString("newreach_token");
        if (newreach_token && newreach_token != "") {
            callback = tp.util.appendParam(callback, "newreach_token", newreach_token);
            targetUrl = tp.util.appendParam(targetUrl, "newreach_token", newreach_token);
        }
            

        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);

        //targetUrl = tp.util.appendParam(targetUrl, "areacode", that.areacode);
        targetUrl = tp.util.appendParam(targetUrl, "usercode", m_usercode);
        targetUrl = tp.util.appendParam(targetUrl, "user_session", m_user_session);
        targetUrl = tp.util.appendParam(targetUrl, "websitecode", m_websitecode);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);

        //记录用户行为
        var detail = that.getActionDetail();
        that.actionlog("点击", detail);
    },
    esc: function (key, ctrType) {
        var that = indexInstance;
        var doback = true;
        //记录用户行为数据
        var detail = that.getActionDetail();
        that.actionlog("外设返回", detail);

        if (ctrType == tp_enum_ctrType.table) {
            if (IndexEvent.getCurTdID() != "td0") {
                IndexEvent.selTableID("td0");
                doback = false;
            }
        }
        if (doback) {
            var backUrl = tp.util.getQueryString("backUrl");
            if (!backUrl) return;
            tp.util.redirectUrl(backUrl);
        }

    },
    afterInit: function () {
        var that = indexInstance;
        //用户行为数据上报
        var detail = that.getActionDetail();
        that.actionlog("进入", detail);
    },
    getActionDetail: function () {
        var that = indexInstance;
        var curNav = null, navName = "", navCode = "";
        var curtd = null, curtdid = "", jumpType = "", jumpName = "", pageName = "";
        var targetcode = "", targeturl = "", detail = "";

        curtd = IndexEvent.getCurTD();
        curNav = IndexEvent.getCurNav();
        if (curtd != null) {
            curtdid = IndexEvent.getCurTdID();
            jumpType = curtd.getAttribute("jumptype");
            targetcode = common.getTargetcode(curtd);
            targeturl = common.getTdTargetUrl(curtd);
            jumpName = common.getJumpName(jumpType);

            if (jumpType == "4") {
                pageName = common.getPageName(targetcode);
                jumpName += "_" + pageName;
            }

            detail = "tilsid[" + curtdid + "]_jumptype[" + jumpType + "_" + jumpName + "]_code[" + targetcode + "]_url[" + targeturl + "]";
        }
        else if (curNav != null) {
            if (that.curNavInfo) {
                navCode = that.curNavInfo.navcode
                navName = that.curNavInfo.navname;
            }
            else if (that.curNavCode) {
                navCode = that.curNavCode;
                navName = that.curNavCode;
            }
            detail = "nav_name[" + navName + "]_code[" + navCode + "]";
        }

        return detail;
    },
    actionlog: function (action, detail) {
        var that = this;
        //上传用户行为数据
        var navName = "";
        var navCode = "";

        if (that.curNavInfo) {
            navCode = that.curNavInfo.navcode
            navName = that.curNavInfo.navname;
        }
        else if (that.curNavCode) {
            navCode = that.curNavCode;
            navName = that.curNavCode;
        }

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "首页_" + navName + "[" + navCode + "]",
            detail: detail
        });
    },
}

var IndexEvent = {
    navCtr: null,
    tabCtr:null,
    tmpTdID: "",
    defaultid: "td0",
    curNavCode: "",
    //moveNav:null,
    loadData: null,
    doEnter: null,
    afterInit: null,
    afterNavChanged: null,
    esc: null,
    init: function (options) {
        var that = IndexEvent;
        var tdid = "", nvid = "";
        if (options) {
            if (options.curNavCode) 
                that.curNavCode = options.curNavCode;
            if (options.defaultid)
                that.defaultid = options.defaultid;
            //if (options.moveNav)
            //    that.moveNav = options.moveNav;
            if (options.loadData)
                that.loadData = options.loadData;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.afterInit)
                that.afterInit = options.afterInit;
            if (options.afterNavChanged)
                that.afterNavChanged = options.afterNavChanged;
            if (options.esc)
                that.esc = options.esc;
        }

        if (that.defaultid.startWith("td"))
            tdid = that.defaultid;
        else
            nvid = that.defaultid;

        that.initTable(tdid);
        that.initNav(nvid);

        if (that.curNavCode && that.curNavCode != "")
            that.navCtr.showCurFontCode(that.curNavCode);

        if (that.afterInit)
            that.afterInit();
    },
    //table function===================================
    initTable: function (defaultid) {
        var that = IndexEvent;
        that.tabCtr = new tableevent({
            defaultid: defaultid ? defaultid : that.defaultid,
            noMove: that.table_noMove,
            extEnter: that.enter,
            extEsc: that.tbesc,
            extSelid: that.selid,
            extUnSelid: that.unselid
        });
        if (defaultid && defaultid != "")
        that.tabCtr.begin();
        //tableEvent.init({
        //    defaultid: defaultid ? defaultid : that.defaultid,
        //    noMove: that.table_noMove,
        //    doEnter: that.enter,
        //    doEsc: that.tbesc,
        //    extSelid: that.selid,
        //    extUnSelid:that.unselid,
        //});
    },
    table_noMove: function (attr) {
        var that = IndexEvent;
        that.noMove(attr, tp_enum_ctrType.table);
    },
    enter: function (key) {
        var that = IndexEvent;
        if (that.doEnter)
            that.doEnter(that.tabCtr.curCtr, key);
    },
    tbesc: function (key) {
        var that = IndexEvent
        if (that.esc)
            that.esc(key, tp_enum_ctrType.table);
        else
            that.navCtr.baseEsc(key);
        return;

        var that = IndexEvent;
        //返回上一页
        //TODO：
        if (that.tabCtr.curid != "td0")
            that.tabCtr.selid("td0");
        else {
            var backUrl = tp.util.getQueryString("backUrl");
            if (!backUrl) return;
            tp.util.redirectUrl(backUrl);
        }
    },
    //nav function=====================================
    initNav: function (navid) {
        var that = IndexEvent;
        that.navCtr = new navevent({
            defaultid: navid,
            noMove: that.nav_noMove,
            curChanged: that.nav_Changed,
            extEsc: that.navesc
        });
        if (navid && navid != "")
            that.navCtr.begin();
        //navEvent.init({
        //    defaultid: navid,
        //    noMove: that.nav_noMove,
        //    curChanged: that.nav_Changed,
        //    doEsc: that.navesc
        //});
    },
    nav_noMove: function (attr) {
        var that = IndexEvent;
        that.noMove(attr, tp_enum_ctrType.nav);
    },
    nav_Changed: function (lastNav, curNav) {
        var that = IndexEvent;
        var id = curNav.getAttribute("id");
        var navcode = id.substring(3);

        if (that.curNavCode == navcode) return;

        if (that.loadData)
            that.loadData(navcode);
        that.tmpTdID = "";
        that.curNavCode = navcode;

        if (that.afterNavChanged)
            that.afterNavChanged();
    },
    navesc: function (key) {
        var that = IndexEvent
        if (that.esc)
            that.esc(key, tp_enum_ctrType.nav);
        else
            that.navCtr.baseEsc(key);
    },
    //function=====================================
    noMove: function (attr, ctrType) {
        var that = IndexEvent;
        if (ctrType == tp_enum_ctrType.table) {
            if (attr == tp_enum_moveData.up) {
                that.tmpTdID = that.tabCtr.curid;
                //that.tabCtr.unfocus();
                that.tabCtr.unselid(that.tabCtr.curid);
                that.initNav("nv_" + that.curNavCode);
            }
            else if (attr == tp_enum_moveData.left || attr == tp_enum_moveData.right)//切换左侧或右侧页面
            {
                var curNavCode = that.curNavCode
                var nv = document.all("nv_" + curNavCode);
                var nextNavID = nv.getAttribute(attr);

                if (!nextNavID || nextNavID == "") return;

                var nextNavCode = nextNavID.substring(3);
                var nextNV = document.all(nextNavID);
                var tdid = "td0";
                if (nextNavCode && nextNavCode != "") {
                    //切换数据
                    that.nav_Changed(nv, nextNV);
                    //设置当前字体
                    that.navCtr.showNormalFontCode(curNavCode);
                    //设置nextnav字体
                    that.navCtr.showCurFontCode(nextNavCode);
                    //设置焦点
                    if (attr == tp_enum_moveData.left) {
                        tdid = that.getRightTD();
                    }
                    that.tabCtr.selid(tdid);
                }
            }
        }
        else {
            if (attr == tp_enum_moveData.down) {
                var tdid = "td0";
                if (that.tmpTdID) {
                    tdid = that.tmpTdID;
                    that.tmpTdID = null;
                }
                var ctr = that.navCtr.curCtr;
                if (ctr) {
                    that.navCtr.unselid(that.navCtr.curid);
                    that.navCtr.showCurFontCtr(ctr);
                }               
                //navEvent.unfocus();
                that.initTable(tdid);
            }
        }
    },
    getCurNav: function () {
        var that = IndexEvent;
        return that.navCtr.curCtr;
    },
    getCurTD: function () {
        var that = IndexEvent;
        return that.tabCtr.curCtr;
    },
    getCurTdID: function () {
        var that = IndexEvent;
        return that.tabCtr.curid;
    },
    selTableID: function (id) {
        var that = IndexEvent;
        that.tabCtr.selid(id);
    },
    selid:function(id){
        //tableEvent.baseSelid(id);
        var that = this;
        if (!id) return;
        var ctr = document.all(id);
        var len = 0;

        if (!ctr) return;
        if (!ctr.children) return;
        len = ctr.children.length;
        if (!len || len <= 1) return;

        var itemnametype = ctr.getAttribute("itemnametype");
        var imgD = ctr.children[0];
        var divT = null;
        var divS = null;
        var divL = null;
        var divD = ctr.children[1];            

        that.unselid(that.curid);
        //divD.style.width = imgD.style.width;
        //divD.style.height = imgD.style.height;
        divD.style.width = imgD.offsetWidth;
        divD.style.height = imgD.offsetHeight;
        divD.className = "wrap-new";

        if (len > 2) {
            divT = ctr.children[2];

            divT.className = "";
            if (itemnametype == 0) {
                divT.style.width = imgD.offsetWidth;
                //divT.style.marginTop = imgD.offsetHeight - 45;
            }
           

            if (itemnametype==0 && divT.children && divT.children.length > 1) {
                divL = divT.children[0];
                divS = divT.children[1];

                divL.style.width = imgD.offsetWidth;
               

                divS.style.width = imgD.offsetWidth;
                divS.style.height = divL.offsetHeight;
   
                divL.style.marginTop = imgD.offsetHeight - 45;
                divS.style.marginTop = imgD.offsetHeight - 45;
               

            }
        }

        that.curCtr = ctr;
        that.curid = id;
    },
    unselid:function(id){
        if (!id) return;
        var that = this;
        var ctr = document.all(id);

        if (!ctr) return;
        if (!ctr.children) return;
        var len = ctr.children.length;
        if (!len || len <= 1) return;
        
        var itemnametype = ctr.getAttribute("itemnametype");
        var imgD = ctr.children[0];
        var divD = ctr.children[1];
        var divT = null;

        divD.className = "tile-hide";
        divD.style.width = "";
        divD.style.height = "";

        if (len > 2) {
            divT = ctr.children[2];
            if (itemnametype == 0)
                divT.className = "tile-title-hide";
        }

        if (id == that.curid) {
            that.curid = null;
            that.cur = null;
        }
    },
    getRightTD: function () {
        var tbCtr = document.all("page_content").children[0];
        var focusid = "td0";
        //var tbCtr = document.getElementById(tableid);
        var rows = tbCtr.rows;
        if (rows == null || rows == undefined || rows.length <= 0)
            focusid = "td0";
        else
            focusid = rows[0].cells[rows[0].cells.length - 1].getAttribute("id");
        return focusid;
    }
}