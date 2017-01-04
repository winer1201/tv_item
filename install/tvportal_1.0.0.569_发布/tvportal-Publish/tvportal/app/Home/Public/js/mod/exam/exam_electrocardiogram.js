function page_init() {
    exam_electrocardiogram.init();
}

var exam_electrocardiogram = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_electrocardiogram;
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
        url = config.portal_exam_electrocardiogram_data_url;
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

        tp.util.redirectUrl(url);
    }
}