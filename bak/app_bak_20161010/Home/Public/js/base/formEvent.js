var formEvent = {
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
    dosel: null,
    dounsel:null,
    init: function (options) {
        var that = formEvent;
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
            if (options.dosel)
                that.dosel = options.dosel;
            if (options.dounsel)
                that.dounsel = options.dounsel;
            if (options.defaultid) {
                that.defaultid = options.defaultid;
                that.selid(options.defaultid);
            }

            if (options.atferInit)
                options.atferInit();
        }
    },
    move: function (key) {
        var that = formEvent;
        if (that.doMove)
            that.doMove(key);
        else that.baseMove(key);
    },
    esc: function (key) {
        var that = formEvent;
        if (that.doEsc)
            that.doEsc(key);
        else that.baseEsc(key);
    },
    enter: function (key) {
        var that = formEvent;
        if (that.doEnter)
            that.doEnter(key);
        else that.baseEnter(key);
    },
    backSpace: function (key) {
        var that = formEvent;
        if (that.doBackSpace)
            that.doBackSpace(key);
        else that.baseBackSpace(key);
    },
    left: function () {
        var that = formEvent;
        if (that.moveLeft)
            that.moveLeft();
        else that.baseMoveLeft();
    },
    right: function () {
        var that = formEvent;
        if (that.moveRight)
            that.moveRight();
        else that.baseMoveRight();
    },
    up: function () {
        var that = formEvent;
        if (that.moveUp)
            that.moveUp();
        else that.baseMoveUp();
    },
    down: function () {
        var that = formEvent;
        if (that.moveDown)
            that.moveDown();
        else that.baseMoveDown();
    },
    moveData: function (attr) {
        var that = formEvent;
        if (that.doMoveData)
            that.doMoveData(attr);
        else that.baseMoveData(attr);
    },
    selctr:function(ctr){
        var that = formEvent;
        if (that.dosel)
            that.dosel(ctr);
        else that.baseSel(ctr);
    },
    unselctr:function(ctr){
        var that = formEvent;
        if (that.dounsel)
            that.dounsel(ctr);
        else that.baseUnSel(ctr);
    },
    //base function========================================================================
    baseMove: function (key) {
        var that = formEvent;
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
        var that = formEvent;
        //返回上一页
        //TODO：
        var backUrl = tp.util.getQueryString("backUrl");
        if (!backUrl) return;
        tp.util.redirectUrl(backUrl);
    },
    baseEnter: function (key) {

    },
    baseBackSpace: function (key) {
        var that = formEvent;
        that.enter(key);
    },
    baseMoveRight: function (key) {
        var that = formEvent;
        that.moveData(tp_enum_moveData.right);
    },
    baseMoveLeft: function (key) {
        var that = formEvent;
        that.moveData(tp_enum_moveData.left);
    },
    baseMoveUp: function (key) {
        var that = formEvent;
        that.moveData(tp_enum_moveData.up);
    },
    baseMoveDown: function (key) {
        var that = formEvent;
        that.moveData(tp_enum_moveData.down);
    },
    baseMoveData: function (attrname) {
        if (!attrname) return;
        var that = formEvent;
        var tdID = that.curCtr.getAttribute(attrname);
        if (tdID && tdID != "")
            that.selid(tdID);
        else {
            if (that.noMove)
                that.noMove(attrname);
        }
    },
    baseSel: function (ctr) {
        if (!ctr) return;
        var that = formEvent;
        var lastCtr = that.curCtr;
        var id = ctr.getAttribute("id");
        that.unselctr(lastCtr);

        var className = ctr.getAttribute("class");
        if (!className.contains("wrap")) {
            className += " wrap";
            ctr.setAttribute("class", className);
        }

        that.curCtr = ctr;
        that.curid = id;
    },
    //function ==========================================================
    selid: function (id) {
        if (!id) return;
        var that = formEvent;
        var ctr = document.all(id);
        that.selctr(ctr);
    },
    
    unselid: function (id) {
        if (!id) return;
        var that = formEvent;
        var ctr = document.all(id);
        that.unselctr(ctr);
    },
    baseUnSel: function (ctr) {
        if (!ctr) return;
        var that = formEvent;

        var className = ctr.getAttribute("class");
        if (className.contains("wrap"))
        {
            className = className.replace("wrap", "");
            ctr.setAttribute("class", className);
        }

        var id = ctr.getAttribute("id");
        if (id == that.curid) {
            that.curid = null;
            that.cur = null;
        }
    },
    unfocus: function () {
        var that = formEvent;
        if (!that.curCtr) return;

        var cur = that.curCtr;
        that.unselctr(cur);
    }
};