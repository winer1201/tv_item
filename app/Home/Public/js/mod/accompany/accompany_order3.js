function page_init() {
    accompany_order3.init();
}

var accompany_order3 = {
    control: null,
    defaultid: "d1",
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = accompany_order3;
        that.control = new controlevent({
            selid: that.selid,
            extEnter: that.enter,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = accompany_order3;
        var url = "", backUrl = "";
        backUrl = tp.util.getQueryString("backUrl");

        url = config.portal_accompany_order4_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        tp.util.redirectUrl(url);
    },
    selid: function (id) {
        var that = accompany_order3;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;


        if (!ctr.className.contains("goods-item-focus"))
            ctr.className += " goods-item-focus";

        control.curCtr = ctr;
        control.curid = id;

        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = accompany_order3;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (ctr.className.contains("goods-item-focus"))
            ctr.className = ctr.className.replace("goods-item-focus", "");

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