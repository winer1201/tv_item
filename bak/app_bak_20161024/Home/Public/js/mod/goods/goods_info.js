function page_init() {
    goods_info.init();
}

var goods_info = {
    control: null,
    defaultid: "",
    data_list: ["img/goods/goods_xyj_1.png", "img/goods/goods_xyj_2.png", "img/goods/goods_xyj_3.png", "img/goods/goods_xyj_4.png"],
    cur_index: 0,
    account: 0,
    init_data:false,
    init: function () {
        var that = this;

        that.cur_index = tp.util.getQueryString("cur_index");
        if (!that.cur_index || that.cur_index == "")
            that.cur_index = 0;

        //加载背景图片
        loadingHelper.loadbg();
        that.formatdata();
        that.addlisten();
    },
    formatdata:function(){
        var that = goods_info;
        var d_sel = null, d_form = null;
        var html = "", html2 = "";

        d_sel = document.all("dsel");
        d_form = document.all("dform");
        if (!that.data_list || that.data_list.length <= 0)
            return;        

        that.account = that.data_list.length;
        for (var i = 0; i < that.account; i++) {
            if (!that.init_data)
                that.data_list[i] = config.portal_public_url + that.data_list[i];
            if (i == that.cur_index){
                html += "  <img src=\"" + img_sel + "\" />";
                html2 += "<img src=\"" + that.data_list[i] + "\" />";
            }                
            else
                html += "  <img src=\"" + img_unsel + "\" />";
        }
        that.init_data = true;
        if (d_sel) 
            d_sel.innerHTML = html;
        if (d_form)
            d_form.innerHTML = html2;
        that.format_sel();
    },
    format_sel:function(){
        var that = goods_info;
        var d_right = null, d_left = null;

        d_right = document.all("d_right");
        d_left = document.all("d_left");

        if(that.cur_index==0)
        {
            d_left.style.display = "none";
            d_right.style.display = "";
        }
        else if (that.cur_index == that.account - 1)
        {
            d_left.style.display = "";
            d_right.style.display = "none";
        }
        else
        {
            d_left.style.display = "";
            d_right.style.display = "";
        }
    },
    addlisten: function () {
        var that = goods_info;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid,
            extMove: that.move,
        });
        that.control.begin();
    },
    move: function (key) {
        var that = goods_info;
        if (key != tp_move_key.right && key != tp_move_key.left)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.right) {
            if (that.cur_index == that.account - 1)
                return;
            that.cur_index++;
        }
        else {
            if (that.cur_index == 0)
                return;
            that.cur_index--;
        }
        that.formatdata();
    },
    enter: function () {
        var that = goods_info;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        url = config.portal_goods_order_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        tp.util.redirectUrl(url);
    }
}