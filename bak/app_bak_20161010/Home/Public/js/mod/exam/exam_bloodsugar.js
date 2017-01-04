function page_init() {
    exam_bloodsugar.init();
}

var exam_bloodsugar = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_bloodsugar;
        that.control = new controlevent({
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}