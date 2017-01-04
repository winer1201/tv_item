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
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}