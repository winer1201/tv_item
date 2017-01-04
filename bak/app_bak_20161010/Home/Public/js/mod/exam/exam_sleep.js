function page_init() {
    exam_sleep.init();
}

var exam_sleep = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_sleep;
        that.control = new controlevent({
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}