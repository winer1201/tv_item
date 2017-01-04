function page_init() {
    exam_temperature.init();
}

var exam_temperature = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_temperature;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        if (key != tp_move_key.right)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");
        url = config.portal_exam_temperature_trend_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

        tp.util.redirectUrl(url);
    }
}