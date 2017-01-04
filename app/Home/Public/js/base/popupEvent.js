var popupEvent = {
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
    closePoppup: null,
    hasUnit: false,
    popupid: null,
    //---before---
    beforeFocus: null,
    befoerEsc: null,
    beforeEnter: null,
    beforeBackSpace: null,
    //------------
    init: function (options) {
        var that = popupEvent;
        that.hasUnit = false;

        that.beforeFocus = eventHelper.doFocus;
        that.befoerEsc = eventHelper.doEsc;
        that.beforeEnter = eventHelper.doEnter;
        that.beforeBackSpace = eventHelper.doBackSpace;

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
            if (options.defaultid) {
                that.defaultid = options.defaultid;
                that.selid(options.defaultid);
            }
            if (options.closePoppup)
                that.closePoppup = options.closePoppup;
            if (options.popupid)
                that.popupid = options.popupid;

            if (options.atferInit)
                options.atferInit();
        }
    },
    unInit:function(){
        var that = popupEvent;
        if (that.hasUnit) return;
        that.hasUnit = true;

        eventHelper.doFocus = that.beforeFocus;
        eventHelper.doEsc = that.befoerEsc;
        eventHelper.doEnter = that.beforeEnter;
        eventHelper.doBackSpace = that.beforeBackSpace;
        
    },
    move: function (key) {
        var that = popupEvent;
        if (that.doMove)
            that.doMove(key);
        else that.baseMove(key);
    },
    esc: function (key) {
        var that = popupEvent;
        if (that.doEsc)
            that.doEsc(key);
        else that.baseEsc(key);
    },
    enter: function (key) {
        var that = popupEvent;
        if (that.doEnter)
            that.doEnter(key);
        else that.baseEnter(key);
    },
    backSpace: function (key) {
        var that = popupEvent;
        if (that.doBackSpace)
            that.doBackSpace(key);
        else that.baseBackSpace(key);
    },
    left: function () {
        var that = popupEvent;
        if (that.moveLeft)
            that.moveLeft();
        else that.baseMoveLeft();
    },
    right: function () {
        var that = popupEvent;
        if (that.moveRight)
            that.moveRight();
        else that.baseMoveRight();
    },
    up: function () {
        var that = popupEvent;
        if (that.moveUp)
            that.moveUp();
        else that.baseMoveUp();
    },
    down: function () {
        var that = popupEvent;
        if (that.moveDown)
            that.moveDown();
        else that.baseMoveDown();
    },
    moveData: function (attr) {
        var that = popupEvent;
        if (that.doMoveData)
            that.doMoveData(attr);
        else that.baseMoveData(attr);
    },
    //base function========================================================================
    baseMove: function (key) {
        var that = popupEvent;
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
        var that = popupEvent;
        //返回上一页
        //TODO：
        //var backUrl = tp.util.getQueryString("backUrl");
        //if (!backUrl) return;
        //tp.util.redirectUrl(backUrl);
        if (that.closePoppup && typeof (that.closePoppup) == "function")
            that.closePoppup();
    },
    baseEnter: function (key) {

    },
    baseBackSpace: function (key) {
        var that = popupEvent;
        that.enter(key);
    },
    baseMoveRight: function (key) {
        var that = popupEvent;
        that.moveData(tp_enum_moveData.right);
    },
    baseMoveLeft: function (key) {
        var that = popupEvent;
        that.moveData(tp_enum_moveData.left);
    },
    baseMoveUp: function (key) {
        var that = popupEvent;
        that.moveData(tp_enum_moveData.up);
    },
    baseMoveDown: function (key) {
        var that = popupEvent;
        that.moveData(tp_enum_moveData.down);
    },
    baseMoveData: function (attrname) {
        if (!attrname) return;
        var that = popupEvent;
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
        var that = popupEvent;
        var ctr = document.all(id);
        that.selctr(ctr);
    },
    selctr: function (ctr) {
        if (!ctr) return;
        var that = popupEvent;
        var lastCtr = that.curCtr;
        var id = ctr.getAttribute("id");
        that.unselctr(lastCtr);

        //ctr.className = "navbar sel";
        //ctr.children[0].className = "";

        that.curCtr = ctr;
        that.curid = id;
    },
    unselid: function (id) {
        if (!id) return;
        var that = popupEvent;
        var ctr = document.all(id);
        that.unselctr(ctr);
    },
    unselctr: function (ctr) {
        if (!ctr) return;
        var that = popupEvent;

        //ctr.className = "navbar";
        //ctr.children[0].className = "curpage";

        var id = ctr.getAttribute("id");
        if (id == that.curid) {
            that.curid = null;
            that.cur = null;
        }
    },
    unfocus: function () {
        var that = popupEvent;
        if (!that.curCtr) return;

        var cur = that.curCtr;
        that.unselctr(cur);
    }
}