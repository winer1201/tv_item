function page_init() {
    imgInstance.init();
}

var imgInstance = {
    areacode: "",
    backUrl: "",
    imglist: null,
    defaultid: "",
    imgarray: [],
    imgindex:1,
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.areacode = tp.util.getQueryString('areacode');
        that.backUrl = tp.util.getQueryString('backUrl');
        that.imglist = tp.util.getQueryString('imglist');
        that.initEvent();

        that.actionlog("进入", "");

        if (!that.imglist || that.imglist == "")
        {
            //没有数据
            return;
        }

        tp_ui.popup.loading.show();

        that.imglist = that.imglist.split(';');

        //that.imglist = eval(that.imglist);
        if (that.imglist && that.imglist.length > 0) {
            that.loadimg();
        }      
    },
    initEvent: function () {
        var that = imgInstance;
        formEvent.init({
            defaultid: that.defaultid,
            dosel: that.selCtr,
            dounsel: that.unSelCtr,
            doEnter: that.enter,
            doMove: that.move,
            doEsc: that.esc
        });
    },
    formatdirect:function(){
        var height = 0;
        height = document.body.offsetHeight / 2 - 56;
        document.all("d_left").style.top = height + "px";
        document.all("d_right").style.top = height + "px";
    },
    loadimg: function () {
        var that = imgInstance;
        var imagepool = initImagePool(5);
        //var path = config.tp_pms_url + "application/";
        var path = config.pms_imgurl;
        for (var i = 0; i < that.imglist.length; i++) {
            that.imglist[i] = path + that.imglist[i];
        }

        imagepool.load(that.imglist, {
            success: function (sArray, eArray, count) {
                console.log("sArray:::::" + sArray);
                console.log("eArray:::::" + eArray);
                console.log("count:::::" + count);
                tp_ui.popup.loading.close();
                
                if (sArray && sArray.length > 0) {
                    that.imgarray = sArray;
                    //that.createImg(sArray);
                    that.flushimg();
                }
                that.formatdirect();
            },
            error: function (src) {
                console.log("error:::::" + src);
                tp_ui.popup.loading.close();
                //document.writeln(src);
            },
            once:true
        });
    },
    createImg:function(array){
        if (!array || array.length == 0) return;
        var html = "";
        html = "<img src='" + array[0] + "' class='page-img-show' >";
        document.all("imgdiv").innerHTML = html;
    },
    flushimg:function(){
        var that = imgInstance;
        if (!that.imglist || that.imglist.length <= 0)
        {
            return;
        }
        var html = "";
        html = "<img src='" + that.imglist[that.imgindex - 1] + "' class='page-img-show' >";
        document.all("imgdiv").innerHTML = html;
        that.showdirect();
    },
    showdirect:function(){
        var that = imgInstance;
        var showright = false;
        var showleft = false;
        if (that.imglist && that.imglist.length > 1) {
            if (that.imgindex <=1) {
                showright = true;
            }
            else if (that.imgindex == that.imglist.length)
                showleft = true;
            else
            {
                showright = true;
                showleft = true;
            }
        }
        document.all("d_left").style.display = showleft ? "block" : "none";
        document.all("d_right").style.display = showright ? "block" : "none";
    },
    formatimg: function () {

    },
    selCtr: function () {

    },
    unSelCtr: function () {

    },
    enter: function () {

    },
    esc:function(key){
        var that = imgInstance;
        formEvent.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    move: function (key) {
        var that = imgInstance;
        if (!that.imglist || that.imglist.length <= 0) return;
        if (key == tp_move_key.left)
        {
            if (that.imgindex <= 1)
                return;
            that.imgindex -= 1;
            that.flushimg();
            //记录用户行为
            var detail = "imgindex[" + that.imgindex + "]_imgurl[" + that.imglist[that.imgindex - 1] + "]";
            that.actionlog("左移", detail);
        }
        else if (key == tp_move_key.right)
        {
            if (that.imgindex >= that.imglist.length)
                return;
            that.imgindex += 1;
            that.flushimg();
            //记录用户行为
            var detail = "imgindex[" + that.imgindex + "]_imgurl[" + that.imglist[that.imgindex - 1] + "]";
            that.actionlog("右移", detail);
        }
    },
    actionlog: function (action, detail) {
        var that = imgInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "图片列表页" + "[" + that.imglist + "]",
            detail: detail
        });
    }
}