function androidKeyDown(key) {
    var e = {};
    e.keyCode = key;
    eventHelper.keyDownFn(e);
}

var eventHelper = {

    afterInit: function () { },
    doFocus: function () { },
    doEsc: function () { },
    doEnter: function () { },
    doBackSpace: function () { },
    otherKey: function () { },
    numKey: function () { },

    initialize: function (options) {
        var that = this;

        if (options)
        {
            if (options.doFocus)
                that.doFocus = options.doFocus;
            if (options.doEsc)
                that.doEsc = options.doEsc;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.doBackSpace)
                that.doBackSpace = options.doBackSpace;
            if (options.otherKey)
                that.otherKey = options.otherKey;
            if (options.numKey)
                that.numKey = options.numKey;
        }
        
        document.onkeydown = function (e) {
            that.keyDownFn(e);
        };

        if (typeof (that.afterInit) != "undefined" && typeof (that.afterInit) == "function")
            that.afterInit();
    },
    //按键处理方法
    keyDownFn: function (e) {
        var e = e || event;
        var that = this;
        var currKey = e.keyCode || e.which || e.charCode;

        //if (currKey != 8 && currKey != 13 && currKey != 27 && currKey != 37 && currKey != 38 && currKey != 39 && currKey != 40)
        //    return;

        //方向键
        if (currKey > 36 && currKey < 41) {
            if (typeof (that.doFocus) != "undefined" && typeof (that.doFocus) == "function")
                that.doFocus(currKey);
        }
        else if(currKey == 8)//backspace
        {
            if (that.doBackSpace)
                that.doBackSpace(currKey);
        }
        else if (currKey == 27) {//esc
            if (typeof (that.doEsc) != "undefined" && typeof (that.doEsc) == "function")
                that.doEsc(currKey);
        }
        else if (currKey == 13) {//回车
            if (typeof (that.doEnter) != "undefined" && typeof (that.doEnter) == "function")
                that.doEnter(currKey);
        }
        else {
            if (typeof (that.otherKey) != "undefined" && typeof (that.otherKey) == "function")
                that.otherKey(currKey, e);

            if (currKey > 47 && currKey < 58) {//数字
                if (typeof (that.numKey) != "undefined" && typeof (that.numKey) == "function")
                    that.numKey(currKey, e);
            }
        }
    }
}