function page_init() {
    exam_bloodpress_hearttrends.init();
}

var exam_bloodpress_hearttrends = {
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
        var that = exam_bloodpress_hearttrends;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_bloodpress_hearttrends;
        if (key != tp_move_key.right && key != tp_move_key.left)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.right)
            url = config.portal_exam_bloodpress_data_url;
        else
            url = config.portal_exam_bloodpress_bloodtrends_url;

        url = common.setBaseParam(url);
        //url = tp.util.appendParam(url, "newreach_token", that.newreach_token);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

        tp.util.redirectUrl(url);
    }
}