function page_init() {
    accompany_result.init();
}

var accompany_result = {
    control: null,
    defaultid: "btn_next",
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = accompany_result;
        that.control = new controlevent({
            extEnter: that.enter
        });
        that.control.begin();
    },
    enter: function () {
        var that = accompany_result;
        var url = "", backUrl = "";
        backUrl = tp.util.getQueryString("backUrl");
        tp.util.redirectUrl(backUrl);
    }
}