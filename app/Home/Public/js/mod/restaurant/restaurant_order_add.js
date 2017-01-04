function page_init() {
    restaurant_order_add.init();
}

var restaurant_order_add = {
    control: null,
    defaultid: "l_pay",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = restaurant_order_add;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = restaurant_order_add;
        var control = this;
        var btn_pay_oldcard = null, btn_pay_tvcard = null;
        var ctr_lbl_all = null, ctr_lbl_discount = null, ctr_item_discount = null;

        if (!control) return;
        ctr_lbl_all = document.all("lbl_all");
        ctr_lbl_discount = document.all("lbl_discount");
        ctr_item_discount = document.all("item_discount");

        btn_pay_oldcard = document.all("d_pay_oldcard");
        btn_pay_tvcard = document.all("d_pay_tvcard");

        if (control.curid == "d_pay_oldcard") {
            btn_pay_oldcard.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_order_add_pay_bg.png" + ")";
            btn_pay_tvcard.style.backgroundImage = "";
            if (ctr_lbl_all && ctr_lbl_discount) {
                ctr_lbl_all.innerHTML = "13.00";
                ctr_lbl_discount.innerHTML = "2.00";
                if (ctr_item_discount)
                    ctr_item_discount.innerHTML = "￥2.00";
            }
        }
        else if (control.curid == "d_pay_tvcard") {
            btn_pay_oldcard.style.backgroundImage = "";
            btn_pay_tvcard.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_order_add_pay_bg.png" + ")";
            if (ctr_lbl_all && ctr_lbl_discount) {
                ctr_lbl_all.innerHTML = "15.00";
                ctr_lbl_discount.innerHTML = "0.00";
                if (ctr_item_discount)
                    ctr_item_discount.innerHTML = "￥0.00";
            }
        }
        else if (control.curid == "l_pay") {
            //二次确认
            that.confirm();
        }
        var val=document.getElementById('lbl_all').innerHTML;
        var item_price=document.getElementById('item_price');
       		item_price.innerHTML='￥'+val;
    },
    selid: function (id) {
        var that = restaurant_order_add;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (!ctr.className.contains("goods-order-focus"))
            ctr.className += " goods-order-focus";

        control.curCtr = ctr;
        control.curid = id;

        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = restaurant_order_add;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (ctr.className.contains("goods-order-focus"))
            ctr.className = ctr.className.replace("goods-order-focus", "");

        if (that.control != null)
            control = that.control;

        if (id == control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
        if (control.after_unselid)
            control.after_unselid(id);
    },
    confirm: function () {
        var that = restaurant_order_add;


    }
}