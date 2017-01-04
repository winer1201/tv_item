function androidKeyDown(key) {
    var e = {};
    var that = eventHelper.current;
    if (!that) return;
    e.keyCode = key;
    that.keyDownFn(e, that);
}

var eventHelper = function (options) {    
    var that = this;
    this.id = "event";
    this.oldKeyDown = null;

    if (options && options.prototype)
        return;

    if (options && options.id)
        that.id += "_" + options.id;
    that.id += "_" + tp.util.getRandom();

    var tmp = eventHelper.get(that.id);
    if (tmp)
        that = tmp;

    if (options) {
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

    that.keyDownFn = function(e,that) {
        var e = e || event;
        
        var currKey = e.keyCode || e.which || e.charCode;

        //方向键
        if (currKey > 36 && currKey < 41) {
            if(that.move)
                that.move(currKey);
        }
        else if (currKey == 8)//backspace
        {
            if (that.doBackSpace)
                that.doBackSpace(e);
            else if (that.backSpace)
                that.backSpace(currKey);
        }
        else if (currKey == 27) {//esc
            if (that.esc)
                that.esc(currKey);
        }
        else if (currKey == 13) {//回车
            if (that.enter)
                that.enter(currKey);
        }
        else {
            if (that.otherKey)
                that.otherKey(currKey, e);
            if (currKey > 47 && currKey < 58) {//数字
                if (that.numKey)
                    that.numKey(currKey, e);
            }
        }
    }

    this.begin = function () {
        var that = this;

        //if (document.onkeydown)
        that.oldKeyDown = document.onkeydown;

        document.onkeydown = function (e) {
            that.keyDownFn(e, that);
        }
        eventHelper.current = that;
        return true;
    }

    this.stop = function () {
        document.onkeydown = that.oldKeyDown;
    }

    if (typeof (that.afterInit) != "undefined" && typeof (that.afterInit) == "function")
        that.afterInit();

    eventHelper.list[that.id] = that;
    return that;
}

eventHelper.prototype.afterInit = function () { };
eventHelper.prototype.oldKeyDown = null;

eventHelper.prototype.uninit = function () {
    delete eventHelper.list[this.id];
}


eventHelper.get = function (id) {
    return id === undefined
    ? eventHelper.list
    : eventHelper.list[id];
}

eventHelper.current = null;

eventHelper.list = {};