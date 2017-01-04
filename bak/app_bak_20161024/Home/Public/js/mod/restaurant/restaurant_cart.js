function page_init() {
    restaurant_card.init();
}

var restaurant_card = {
    control: null,
    defaultid: "btnpay",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = restaurant_card;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = restaurant_card;
        var url = "", backUrl = "", control = null;

        control = this;
        backUrl = tp.util.getQueryString("backUrl");
        if (control.curid == 'btnclear') {
            //clear
            var body = document.all("tbody");
            if (!body) return;
            body.innerHTML = "";
        }
        else if (control.curid == "btnpay") {
            url = config.portal_restaurant_order_add_url;
            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
            tp.util.redirectUrl(url);
        }
        else if (control.curid == "btnadd") {
            tp.util.redirectUrl(backUrl);
        }
        else if (control.curid.startWith("tr_item")) {
            var ctr = control.curCtr, img_url = "";
            var img = null;
            if (!ctr || !ctr.children) return;
            img = ctr.children[0];
            if (!img || !img.children) return;
            img = img.children[0];
            if (!img) return;

            img_url = img.getAttribute("src");
            if (img_url.contains("goods_cart_unsel_img"))
                img.setAttribute("src", "/app/Home/Public/img/goods/goods_cart_sel_img.png");
            else
                img.setAttribute("src", "/app/Home/Public/img/goods/goods_cart_unsel_img.png");
        }
    },
    selid: function (id) {
        var that = restaurant_card;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (id.startWith("tr_item")) {
            ctr.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_cart_sel_bg.png" + ")";
        }
        else {
            if (!ctr.className.contains("goods-item-focus"))
                ctr.className += " goods-item-focus";
        }

        control.curCtr = ctr;
        control.curid = id;

        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = restaurant_card;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (id.startWith("tr_item")) {
            ctr.style.backgroundImage = "";
        }
        else {
            if (ctr.className.contains("goods-item-focus"))
                ctr.className = ctr.className.replace("goods-item-focus", "");
        }
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