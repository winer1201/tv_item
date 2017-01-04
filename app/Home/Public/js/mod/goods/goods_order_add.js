function page_init() {
    goods_order_add.init();
}

var goods_order_add = {
    control: null,
    defaultid: "l_pay",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = goods_order_add;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    enter: function () {
        var that = goods_order_add;
        var control = this;
        var btn_pay_oldcard = null, btn_pay_tvcard = null;

        if (!control) return;

        btn_pay_oldcard = document.all("d_pay_oldcard");
        btn_pay_tvcard = document.all("d_pay_tvcard");

        if (control.curid == "d_pay_oldcard") {
            btn_pay_oldcard.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_order_add_pay_bg.png" + ")";
            btn_pay_tvcard.style.backgroundImage = "";
            
        }
        else if (control.curid == "d_pay_tvcard") {
            btn_pay_oldcard.style.backgroundImage = "";
            btn_pay_tvcard.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_order_add_pay_bg.png" + ")";            
        }
        else if(control.curid=="l_pay"){
            //二次确认
            that.confirm();
        }
    },
    selid: function (id) {
        var that = goods_order_add;
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
        var that = goods_order_add;
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
        var that = goods_order_add;


    }
}