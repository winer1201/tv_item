function page_init() {
    exam_exercise.init();
}

var exam_exercise = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_exercise;
        that.control = new controlevent({
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}