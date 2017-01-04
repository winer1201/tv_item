var tableEvent = {
    curCtr: null,
    curid: null,
    defaultid:null,
    moveLeft: null,
    moveUp: null,
    moveDown: null,
    moveRight: null,
    doMoveTD:null,
    doMove:null,
    doEsc:null,
    doEnter: null,
    doBackSpace: null,
    after_selid: null,
    after_unselid: null,
    after_selctr: null,
    after_unselctr:null,
    noMove:null,
    init: function (options) {
        var that = tableEvent;
        eventHelper.initialize({
            doFocus: that.move,
            doEsc: that.esc,
            doEnter: that.enter,
            doBackSpace:that.doBackSpace
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
            if (options.doMoveTD)
                that.doMoveTD = options.doMoveTD;
            if (options.doMove)
                that.doMove = options.doMove;
            if (options.noMove)
                that.noMove = options.noMove;
            if (options.doEsc)
                that.doEsc = options.doEsc;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.extSelid)
                that.extSelid = options.extSelid;
            if (options.after_selid)
                that.after_selid = options.after_selid;
            if (options.extUnSelid)
                that.extUnSelid = options.extUnSelid;
            if (options.after_unselid)
                that.after_unselid = options.after_unselid;
            if (options.after_selctr)
                that.after_selctr = options.after_selctr;
            if (options.after_unselctr)
                that.after_unselctr = options.after_unselctr;
            if (options.defaultid)
            {
                that.defaultid = options.defaultid;
                var c = document.all(that.defaultid)
                if (c && c.children && c.children.length > 0) {
                    that.selid(options.defaultid);
                }
                else {
                    that.defaultid = "td0";
                    that.selid(that.defaultid);
                }
            }                

            if (options.atferInit)
                options.atferInit();
        }
    },
    move: function (key) {
        var that = tableEvent;
        if (that.doMove)
            that.doMove(key);
        else that.baseMove(key);
    },
    esc: function (key) {
        var that = tableEvent;
        if (that.doEsc)
            that.doEsc(key);
        else that.baseEsc(key);
    },
    enter: function (key) {
        var that = tableEvent;
        if (that.doEnter)
            that.doEnter(key);
        else that.baseEnter(key);
    },
    backSpace: function (key) {
        var that = tableEvent;
        if (that.doBackSpace)
            that.doBackSpace(key);
        else that.baseBackSpace(key);
    },
    left:function(){
        var that = tableEvent;
        if (that.moveLeft)
            that.moveLeft();
        else that.baseMoveLeft();
    },
    right:function(){
        var that = tableEvent;
        if (that.moveRight)
            that.moveRight();
        else that.baseMoveRight();
    },
    up:function(){
        var that = tableEvent;
        if (that.moveUp)
            that.moveUp();
        else that.baseMoveUp();
    },
    down:function(){
        var that = tableEvent;
        if (that.moveDown)
            that.moveDown();
        else that.baseMoveDown();
    },
    moveTD:function(attr){
        var that = tableEvent;
        if (that.doMoveTD)
            that.doMoveTD(attr);
        else that.baseMoveTD(attr);
    },
    //base function========================================================================
    baseMove: function (key) {
        var that = tableEvent;
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
        var that = tableEvent;
        //返回上一页
        //TODO：
        //if (that.curid != "td0")
        //    that.selid("td0");
        //else
        //{
            var backUrl = tp.util.getQueryString("backUrl");
            if (!backUrl) return;
            tp.util.redirectUrl(backUrl);
        //}
    },
    baseEnter: function (key) {//默认列表页处理规则
        var that = tableEvent;
        var ctr = that.curCtr;
        if (!ctr) return;
        
        var content_code = "", category_code = "";;
        var imglist = "", pagecode = "";
        var backUrl = "", targetUrl = "", callback = "";


        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;


        //areacode = tp.util.getQueryString("areacode");
        category_code = tp.util.getQueryString("category_code");
        backUrl = tp.util.getQueryString("backUrl");
        backUrl = encodeURIComponent(backUrl);

        callback = config.portal_list_url;
        //callback = tp.util.appendParam(callback, "areacode", areacode);
        callback = common.setBaseParam(callback);
        callback = tp.util.appendParam(callback, "category_code", category_code);
        callback = tp.util.appendParam(callback, "pageindex", 1);
        callback = tp.util.appendParam(callback, "focusid", that.curid);
        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);
        
        //targetUrl = tp.util.appendParam(targetUrl, "areacode", areacode);
        targetUrl = common.setBaseParam(targetUrl);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);
    },
    baseBackSpace: function (key) {
        var that = tableEvent;
        that.enter(key);
    },
    baseMoveRight: function (key) {
        var that = tableEvent;
        that.moveTD(tp_enum_moveData.right);
    },
    baseMoveLeft: function (key) {
        var that = tableEvent;
        that.moveTD(tp_enum_moveData.left);
    },
    baseMoveUp: function (key) {
        var that = tableEvent;
        that.moveTD(tp_enum_moveData.up);
    },
    baseMoveDown: function (key) {
        var that = tableEvent;
        that.moveTD(tp_enum_moveData.down);
    },
    baseMoveTD: function (attrname) {
        if (!attrname) return;
        var that = tableEvent;
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
        var that = tableEvent;

        if (that.extSelid) 
            that.extSelid(id);
        else
            that.baseselid(id);
            
        if (that.after_selid)
            that.after_selid(id);
    },
    baseselid:function(id){
        if (!id) return;
        var that = tableEvent;        
        var ctr = document.all(id);
        that.selctr(ctr);
        
    },
    selctr: function (ctr) {
        if (!ctr) return;
        if (!ctr.children) return;
        if (!ctr.children.length || ctr.children.length == 0) return;

        var that = tableEvent;
        var id = ctr.getAttribute("id");
        that.unselctr(that.curCtr);
        ctr.children[0].className = "tile wrap";
        that.curCtr = ctr;
        that.curid = id;
        if (that.after_selctr)
            that.after_selctr(ctr);
    },
    unselid:function(id){
        if (!id) return;
        var that = tableEvent;

        if (that.extUnSelid)
            that.extUnSelid(id);
        else
            that.baseUnSelid(id);

        if (that.after_unselid)
            that.after_unselid(id);
    },
    baseunselid:function(id){
        if (!id) return;
        var that = tableEvent;
        var ctr = document.all(id);
        that.unselctr(ctr);
    },
    unselctr: function (ctr) {
        if (!ctr) return;
        var that = tableEvent;
        ctr.children[0].className = "tile";
        var id = ctr.getAttribute("id");
        if (id == that.curid) {
            that.curid = null;
            that.cur = null;
        }
        if (that.after_unselctr)
            that.after_unselctr(ctr);
    },
    unfocus: function () {
        var that = tableEvent;
        if (!that.curCtr) return;
        that.unselctr(that.curCtr);
    }
};