function page_init() {
    accompany_order1.init();
}

var accompany_order1 = {
    control: null,
    defaultid: "td0",
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = accompany_order1;
        that.control = new controlevent({
            selid: that.selid,
            extEnter: that.enter,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = accompany_order1;
        var url = "", backUrl = "";
        backUrl = tp.util.getQueryString("backUrl");

        url = config.portal_accompany_order1_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        tp.util.redirectUrl(url);
    },
    selid: function (id) {
        var that = accompany_order1;
        var ctr = null, control = null;
        var divD = null, imgD = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        divD = ctr.children[1];
        imgD = ctr.children[0];

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        divD.style.width = imgD.offsetWidth;
        divD.style.height = imgD.offsetHeight;
        divD.className = "wrap-new";

        //if (!ctr.className.contains("goods-item-focus"))
        //    ctr.className += " goods-item-focus";

        control.curCtr = ctr;
        control.curid = id;

        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = accompany_order1;
        var ctr = null, control = null, imgD = null, divD = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        imgD = ctr.children[0];
        divD = ctr.children[1];

        divD.className = "tile-hide";
        divD.style.width = "";
        divD.style.height = "";

        //if (ctr.className.contains("goods-item-focus"))
        //    ctr.className = ctr.className.replace("goods-item-focus", "");

        if (that.control != null)
            control = that.control;

        if (id == control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
        if (control.after_unselid)
            control.after_unselid(id);
    }
}