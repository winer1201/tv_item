function page_init() {
    exam_sleep_trend.init();
}

var exam_sleep_trend = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_sleep_trend;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        if (key != tp_move_key.right && key != tp_move_key.left)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.right)
            url = config.portal_exam_sleep_data_url;
        else
            url = config.portal_exam_sleep_url;

        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

        tp.util.redirectUrl(url);
    }
}