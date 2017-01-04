function page_init() {
    exam_pulmonary.init();
}

var exam_pulmonary = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_pulmonary;
        that.control = new controlevent({
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}