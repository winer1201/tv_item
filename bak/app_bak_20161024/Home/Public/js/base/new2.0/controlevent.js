var controlevent = function (options) {
    var that = this;

    this.curCtr = null;
    this.curid = null;
    this.defaultid = null;

    if (options && options.prototype)
        return;

    eventHelper.call(this, options);
    if (options) {
        if (options.prototype)
            return;
        if (options.extEsc)
            this.extEsc = options.extEsc;
        if (options.extEnter)
            this.extEnter = options.extEnter;
        if (options.defaultid)
            that.defaultid = options.defaultid;
        if (options.selid)
            that.selid = options.selid;
        if (options.extMove)
            that.extMove = options.extMove;
        if (options.extMoveData)
            that.extMoveData = options.extMoveData;
        if(options.afterMove)
            that.afterMove = options.afterMove;
        if (options.noMove)
            that.noMove = options.noMove;
    }
    if (that.defaultid && that.defaultid != "")
        that.selid(that.defaultid);
}
eventHelper.prototype.keyDownFn = function () { };
controlevent.prototype = new eventHelper({ prototype: true });
controlevent.prototype.selid = function () {

}


controlevent.prototype.move = function (key) {
    var that = this;
    if (that.extMove)
        that.extMove(key);
    else that.baseMove(key);
}

controlevent.prototype.esc = function (key) {
    var that = this;
    if (that.extEsc)
        that.extEsc(key);
    else that.baseEsc(key);
}

controlevent.prototype.enter = function (key) {
    var that = this;
    if (that.extEnter)
        that.extEnter(key);
    else that.baseEnter(key);
}

controlevent.prototype.backSpace = function (key) {
    var that = this;
    if (that.extBackSpace)
        that.extBackSpace(key);
    else that.baseBackSpace(key);
}

controlevent.prototype.moveData = function (attr) {
    var that = this;
    if (that.extMoveData)
        that.extMoveData(attr);
    else that.baseMoveData(attr);
    if (that.afterMove)
        that.afterMove(attr);
}


//======================base_func=======================================
controlevent.prototype.baseEnter = function (key) {

}

controlevent.prototype.baseBackSpace= function (key) {
    var that = this;
    that.enter(key);
}

controlevent.prototype.baseEsc = function (key) {
    var that = this;
    //返回上一页
    //TODO：
    var backUrl = tp.util.getQueryString("backUrl");
    if (!backUrl) return;
    tp.util.redirectUrl(backUrl);
}

controlevent.prototype.baseMove = function (key) {
    var that = this;
    if (!that.curCtr) return;
    var tdID = "", tdCtr = null;
    if (key == tp_move_key.left) {
        //向左切换td
        //TODO：
        //that.left();
        that.moveData(tp_enum_moveData.left);
    }
    else if (key == tp_move_key.right) {
        //向右切换td
        that.moveData(tp_enum_moveData.right);
        //that.right();
    }
    else if (key == tp_move_key.up) {//向上切换焦点至导航
        //向上切换td
        that.moveData(tp_enum_moveData.up);
        //that.up();
    }
    else if (key == tp_move_key.down) {//向下切换td
        //向下切换td
        that.moveData(tp_enum_moveData.down);
        //that.down();
    }
}

controlevent.prototype.baseMoveData = function (attrname) {
    if (!attrname) return;
    var that = this;
    var tdID = that.curCtr.getAttribute(attrname);
    if (tdID && tdID != "")
        that.selid(tdID);
    else {
        if (that.noMove)
            that.noMove(attrname);
    }
}