function page_init() {
    accompany_index.init();
}

var accompany_index = {
    control: null,
    defaultid: "btn_next",
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = accompany_index;
        that.control = new controlevent({
            selid: that.selid,
            extEnter: that.enter,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function (key) {
        var that = accompany_index;
        var url = "", backUrl = "";
        var control = this;
        backUrl = tp.util.getQueryString("backUrl");

        if (!control) return;
        if (control.curid != "btn_next") return;

        url = config.portal_accompany_order2_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        tp.util.redirectUrl(url);
    },
    selid: function (id) {
        var that = accompany_index;
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
        var that = accompany_index;
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