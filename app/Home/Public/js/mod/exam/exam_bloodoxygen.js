function page_init() {
    exam_bloodoxygen.init();
}

var exam_bloodoxygen = {
    control: null,
    defaultid: "",
    newreach_token: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.newreach_token = tp.util.getQueryString("newreach_token");
        that.listen();
    },
    listen: function () {
        var that = exam_bloodoxygen;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_bloodoxygen;
        if (key != tp_move_key.right)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");
        url = config.portal_exam_bloodoxygen_trend_url;
        url = common.setBaseParam(url);
        //url = tp.util.appendParam(url, "newreach_token", that.newreach_token);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

        tp.util.redirectUrl(url);
    }
}