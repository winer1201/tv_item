function page_init() {
    exam_bloodoxygen.init();
}

var exam_bloodoxygen = {
    control: null,
    defaultid: "",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.listen();
    },
    listen: function () {
        var that = exam_bloodoxygen;
        that.control = new controlevent({
            defaultid: that.defaultid
        });
        that.control.begin();
    }
}