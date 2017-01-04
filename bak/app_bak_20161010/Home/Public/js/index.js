function page_init() {
    indexInstance.init();
}

//一级页面数据处理
var indexInstance = {
    backUrl: "",
    curNavCode: null,
    curNavInfo:null,
    defaultNavCode: "",
    focusid:"",
    datalist:null,
    fromNavCode: "",
    imglist: [],
    userinfo:null,
    init: function () {
        var that = indexInstance;
        //that.areacode = tp.util.getQueryString("areacode");
        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");
        that.fromNavCode=tp.util.getQueryString("navcode");

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
                    esc:that.esc
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
                data =  eval('(' + data + ')');
                if (data)
                    code = data.retcode;
                if (code != 0) {
                    tp.util.showMsg("error(" + code + ")");
                }
                else {
                    that.userinfo = data.data;
                }
            },
            async:false,
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
        if(!list.data)
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


        for (var i = 0; i < that.datalist.length; i++)
        {
            var tmp = that.datalist[i].imglist;
            for (var j = 0; j < tmp.length; j++)
            {
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
                            imgid:allimg[i].imgid,
                            url:src
                        };
                        //设置页面背景图
                        var imgctr = document.all(allimg[i].imgid);
                        if(imgctr){
                            imgctr.setAttribute("src",src);
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
        var data_left="",data_right="";
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
        for (var i = 0; i < that.datalist.length;i++){
            navInfo = that.datalist[i];
            if(navInfo.navcode == navCode){
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
            for(var j=0;j<that.imglist.length;j++)
            {
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

        var backUrl = "", targetUrl = "", callback = "",id = "";

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
    afterInit:function(){
        var that = indexInstance;
        //用户行为数据上报
        var detail = that.getActionDetail();
        that.actionlog("进入", detail);
    },
    getActionDetail: function () {
        var that = indexInstance;
        var curNav = null,navName="",navCode="";
        var curtd = null, curtdid = "",jumpType = "", jumpName = "", pageName = "";
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
        else if(curNav!=null){
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
