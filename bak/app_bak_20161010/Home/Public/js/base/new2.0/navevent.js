var navevent = function (options) {
    var that = this;

    if (options && options.prototype)
        return;

    if (!options) {
        options = {
            doEnter: that.enter
        }
    }

    if (options) {
        if (options.extEnter)
            this.extEnter = options.extEnter;
        if (options.extSelid)
            this.extSelid = options.extSelid;
        if (options.after_selid)
            this.after_selid = options.after_selid;
        if (options.extUnSelid)
            this.extUnSelid = options.extUnSelid;
        if (options.after_unselid)
            that.after_unselid = options.after_unselid;

        if (options.curChanged)
            that.curChanged = options.curChanged;
    }

    controlevent.call(this, options);
}

navevent.prototype = new controlevent({ prototype: true });

navevent.prototype.enter = function (key) {
    var that = this;
    if (that.extEnter)
        that.extEnter(key);
    else
        that.baseEnter(key);
}

navevent.prototype.baseEnter = function (key) {
    
}

navevent.prototype.selid = function (id) {
    var that = this;
    if (that.extSelid)
        that.extSelid(id);
    else
        that.baseSelid(id);

    if (that.after_selid)
        that.after_selid(id);
}

navevent.prototype.baseSelid = function (id) {
    if (!id) return;
    var that = this;
    var lastCtr = that.curCtr;
    var ctr = document.all(id);
    that.unselid(that.curid);

    ctr.className = "navbar sel";
    ctr.children[0].className = "";

    that.curCtr = ctr;
    that.curid = id;

    if (that.curChanged)
        that.curChanged(lastCtr, that.curCtr);
}

navevent.prototype.unselid = function (id) {
    var that = this;
    if (that.extUnSelid)
        that.extUnSelid(id);
    else
        that.baseUnSelid(id);

    if (id == that.curid && that.after_unselid)
        that.after_unselid(id);
}

navevent.prototype.baseUnSelid = function (id) {
    if (!id) return;
    var that = this;
    var ctr = document.all(id);
    
    ctr.className = "navbar";
}

//设置栏目为当前显示字体
navevent.prototype.showCurFontCode = function (navcode) {
    if (!navcode || navcode == "") return;
    var that = this;
    var navid = "nv_" + navcode;
    that.showCurFontID(navid);        
}

navevent.prototype.showCurFontID = function(navid){
    if (!navid) return;
    var that = this;
    var ctr = document.all(navid);
    that.showCurFontCtr(ctr);
}

navevent.prototype.showCurFontCtr = function (navctr) {
    if (!navctr) return;
    navctr.children[0].className = "curpage";
}

//恢复之前导航字体
navevent.prototype.showNormalFontCode= function (navcode) {
    if (!navcode || navcode == "") return;
    var that = this;
    var navid = "nv_" + navcode;
    that.showNormalFontID(navid);        
}

navevent.prototype.showNormalFontID = function(navid){
    if (!navid) return;
    var that = this;
    var ctr = document.all(navid);
    that.showNormalFontCtr(ctr);
}

navevent.prototype.showNormalFontCtr = function (navctr) {
    if (!navctr) return;
    navctr.children[0].className = "";
}

var navEvent_old = {
    curCtr: null,
    curid: null,
    defaultid: null,
    moveLeft: null,
    moveUp: null,
    moveDown: null,
    moveRight: null,
    doMoveData: null,
    doMove: null,
    doEsc: null,
    doEnter: null,
    doBackSpace: null,
    noMove: null,
    curChanged: null,
    init: function (options) {
        var that = navEvent;
        eventHelper.initialize({
            doFocus: that.move,
            doEsc: that.esc,
            doEnter: that.enter,
            doBackSpace: that.doBackSpace
        });

        if (options) {
            if (options.moveLeft)
                that.moveLeft = options.moveLeft;
            if (options.moveUp)
                that.moveUp = options.moveUp;
            if (options.moveDown)
                that.moveDown = options.moveDown;
            if (options.moveRight)
                that.moveRight = options.moveRight;
            if (options.doMoveData)
                that.doMoveData = options.doMoveData;
            if (options.doMove)
                that.doMove = options.doMove;
            if (options.noMove)
                that.noMove = options.noMove;
            if (options.doEsc)
                that.doEsc = options.doEsc;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.curChanged)
                that.curChanged = options.curChanged;
            if (options.defaultid) {
                that.defaultid = options.defaultid;
                that.selid(options.defaultid);
            }

            if (options.atferInit)
                options.atferInit();
        }
    },
    move: function (key) {
        var that = navEvent;
        if (that.doMove)
            that.doMove(key);
        else that.baseMove(key);
    },
    esc: function (key) {
        var that = navEvent;
        if (that.doEsc)
            that.doEsc(key);
        else that.baseEsc(key);
    },
    enter: function (key) {
        var that = navEvent;
        if (that.doEnter)
            that.doEnter(key);
        else that.baseEnter(key);
    },
    backSpace: function (key) {
        var that = navEvent;
        if (that.doBackSpace)
            that.doBackSpace(key);
        else that.baseBackSpace(key);
    },
    left: function () {
        var that = navEvent;
        if (that.moveLeft)
            that.moveLeft();
        else that.baseMoveLeft();
    },
    right: function () {
        var that = navEvent;
        if (that.moveRight)
            that.moveRight();
        else that.baseMoveRight();
    },
    up: function () {
        var that = navEvent;
        if (that.moveUp)
            that.moveUp();
        else that.baseMoveUp();
    },
    down: function () {
        var that = navEvent;
        if (that.moveDown)
            that.moveDown();
        else that.baseMoveDown();
    },
    moveData: function (attr) {
        var that = navEvent;
        if (that.doMoveData)
            that.doMoveData(attr);
        else that.baseMoveData(attr);
    },
    //base function========================================================================
    baseMove: function (key) {
        var that = navEvent;
        if (!that.curCtr) return;
        var tdID = "", tdCtr = null;
        if (key == 37) {
            //向左切换td
            //TODO：
            that.left();
        }
        else if (key == 39) {
            //向右切换td
            that.right();
        }
        else if (key == 38) {//向上切换焦点至导航
            //向上切换td
            that.up();
        }
        else if (key == 40) {//向下切换td
            //向下切换td
            that.down();
        }
    },
    baseEsc: function (key) {
        var that = navEvent;
        //返回上一页
        //TODO：
        var backUrl = tp.util.getQueryString("backUrl");
        if (!backUrl) return;
        tp.util.redirectUrl(backUrl);
    },
    baseEnter: function (key) {

    },
    baseBackSpace: function (key) {
        var that = navEvent;
        that.enter(key);
    },
    baseMoveRight: function (key) {
        var that = navEvent;
        that.moveData(tp_enum_moveData.right);
    },
    baseMoveLeft: function (key) {
        var that = navEvent;
        that.moveData(tp_enum_moveData.left);
    },
    baseMoveUp: function (key) {
        var that = navEvent;
        that.moveData(tp_enum_moveData.up);
    },
    baseMoveDown: function (key) {
        var that = navEvent;
        that.moveData(tp_enum_moveData.down);
    },
    baseMoveData: function (attrname) {
        if (!attrname) return;
        var that = navEvent;
        var tdID = that.curCtr.getAttribute(attrname);
        if (tdID && tdID != "")
            that.selid(tdID);
        else {
            if (that.noMove)
                that.noMove(attrname);
        }
    },
    //function ==========================================================
    selid: function (id) {
        if (!id) return;
        var that = navEvent;
        var ctr = document.all(id);
        that.selctr(ctr);
    },
    selctr: function (ctr) {
        if (!ctr) return;
        var that = navEvent;
        var lastCtr = that.curCtr;
        var id = ctr.getAttribute("id");
        that.unselctr(lastCtr);

        ctr.className = "navbar sel";
        ctr.children[0].className = "";

        that.curCtr = ctr;
        that.curid = id;

        if (that.curChanged)
            that.curChanged(lastCtr, that.curCtr);
    },
    unselid: function (id) {
        if (!id) return;
        var that = navEvent;
        var ctr = document.all(id);
        that.unselctr(ctr);
    },
    unselctr: function (ctr) {
        if (!ctr) return;
        var that = navEvent;

        ctr.className = "navbar";
        //ctr.children[0].className = "curpage";

        var id = ctr.getAttribute("id");
        if (id == that.curid) {
            that.curid = null;
            that.curCtr = null;
        }
    },
    //设置栏目为当前显示字体
    showCurFontCode: function (navcode) {
        if (!navcode || navcode == "") return;
        var that = navEvent;
        var navid = "nv_" + navcode;
        that.showCurFontID(navid);
    },
    showCurFontID: function (navid) {
        if (!navid) return;
        var that = navEvent;
        var ctr = document.all(navid);
        that.showCurFontCtr(ctr);
    },
    showCurFontCtr: function (navctr) {
        if (!navctr) return;
        navctr.children[0].className = "curpage";
    },
    //恢复之前导航字体
    showNormalFontCode: function (navcode) {
        if (!navcode || navcode == "") return;
        var that = navEvent;
        var navid = "nv_" + navcode;
        that.showNormalFontID(navid);
    },
    showNormalFontID: function (navid) {
        if (!navid) return;
        var that = navEvent;
        var ctr = document.all(navid);
        that.showNormalFontCtr(ctr);
    },
    showNormalFontCtr: function (navctr) {
        if (!navctr) return;
        navctr.children[0].className = "";
    },
    unfocus: function () {
        var that = navEvent;
        if (!that.curCtr) return;

        var cur = that.curCtr;
        that.unselctr(cur);
        that.showCurFontCtr(cur);
    }
};