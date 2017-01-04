function page_init() {
    goods_order.init();
}

var goods_order = {
    control: null,
    defaultid: "btnAdd",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = goods_order;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = goods_order;
        var control = this;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");
        if (control.curid == "btnAdd") {
            url = config.portal_goods_cart_url;
            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        }
        else if (control.curid == "btnBack") {
            url = backUrl;
        }
        else {
            return;
        }       
        tp.util.redirectUrl(url);
    },
    selid: function (id) {
        var that = goods_order;
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
        var that = goods_order;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (ctr.className.contains("goods-item-focus"))
            ctr.className = ctr.className.replace("goods-item-focus", "");
        //ctr.style.margin = "2px"
        //ctr.children[0].className = "curpage";

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