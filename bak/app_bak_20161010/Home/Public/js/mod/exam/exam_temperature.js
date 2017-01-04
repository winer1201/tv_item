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
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}