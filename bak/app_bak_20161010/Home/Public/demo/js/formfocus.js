var formfocusInstance = {
    curCtr: null,
    preCtr: null,
    doBack: null,
    doEsc: null,
    doEnter: null,
    atferInit: null,
    afterfocus: null,
    dosel: null,
    dounsel: null,
    dofocus: null,
    doOtherKey: null,
    doNumKey: null,
    init: function (options) {
        var that = this;
        eventHelper.initialize({
            doFocus: that.focus,
            doBackSpace: that.back,
            doEsc: that.esc,
            doEnter: that.enter,
            otherKey: that.otherKey,
            numKey:that.numKey
        });

        if (options) {
            if (options.doBack)
                that.doBack = options.doBack;
            if (options.doEsc)
                that.doEsc = options.doEsc;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.afterfocus)
                that.afterfocus = options.afterfocus;
            if (options.dosel)
                that.dosel = options.dosel;
            if (options.dounsel)
                that.dounsel = options.dounsel;
            if (options.dofocus)
                that.dofocus = options.dofocus;
            if (options.doOtherKey)
                that.doOtherKey = options.doOtherKey;
            if (options.doNumKey)
                that.doNumKey = options.doNumKey;


            if (options.atferInit)
                options.atferInit();
        }
    },
    back: function (e) {
        var that = formfocusInstance;
        if (that.doBack)
            that.doBack(e);
        else
            that.baseBack(e);
    },
    esc: function (e) {
        var that = formfocusInstance;
        if (that.doEsc)
            that.doEsc(e);
        else
            that.baseesc(e);
    },
    enter: function (e) {
        var that = formfocusInstance;
        if (that.doEnter)
            that.doEnter(e);
        else
            that.baseenter(e);
    },
    baseBack: function (key) {

    },
    baseesc: function (key) {

    },
    baseenter: function (e) {
        var jumpurl = this.curCtr.getAttribute("jumpurl");
        if (jumpurl != null || jumpurl != "") {
            //TODO:location
        }
    },
    basefocus: function (data) {
        if (this.curCtr == null || this.curCtr == undefined)
            return;
        var ctrid = this.curCtr.getAttribute(data);
        if (ctrid == null || ctrid == undefined)
            return;
        var ctr = document.all(ctrid);
        if (ctr == null) return;
        this.selnext(ctr);
        //this.unselctr(this.curCtr);
        //this.selctr(ctr);
    },
    baseOtherKey: function (key) {

    },
    baseNumKey: function (key) {

    },
    basesel: function (ctr) {
        if (ctr == null || ctr == undefined) return;
        var className = ctr.getAttribute("class");
        if (!className.contains("wrap"))
            className += " wrap";
        ctr.setAttribute("class", className);
        this.curCtr = ctr;
    },
    baseunsel: function (ctr) {
        if (ctr == null || ctr == undefined) return;
        var className = ctr.getAttribute("class");
        if (className.contains("wrap"))
            className = className.replace("wrap", "");
        ctr.setAttribute("class", className);
        this.preCtr = ctr;
    },
    otherKey: function (key) {
        var that = formfocusInstance;
        if (that.doOtherKey)
            that.doOtherKey(key);
        else
            that.baseOtherKey(key);
    },
    numKey: function (key) {
        var that = formfocusInstance;
        if (that.doNumKey)
            that.doNumKey(key);
        else
            that.baseNumKey(key);
    },
    focus: function (key,e) {
        var that = formfocusInstance;
        if (that.curCtr == null || that.curCtr == undefined) return;
        var ctrNodeName = that.curCtr.nodeName.toLowerCase();
        var className = that.curCtr.getAttribute("class");
        var ctrid = that.curCtr.getAttribute("id");
        var data = "";

        if (key == 37)//left
            data = "data-left";
        else if (key == 38)//up
            data = "data-up";
        else if (key == 39)//right
            data = "data-right";
        else if (key == 40)//down
            data = "data-down";

        if (that.dofocus)
            that.dofocus(data, e);
        else
            that.basefocus(data, e);

        if (that.afterfocus)
            that.afterfocus();
    },
    selctr: function (ctr) {
        if (ctr == null || ctr == undefined) return;
        if (this.dosel)
            this.dosel(ctr);
        else
            this.basesel(ctr);
    },
    unselctr: function (ctr) {
        if (ctr == null || ctr == undefined) return;
        if (this.dounsel)
            this.dounsel(ctr);
        else
            this.baseunsel(ctr);
    },
    selnext: function (ctr) {
        if (ctr == null || ctr == undefined) return;
        this.unselctr(this.curCtr);
        this.selctr(ctr);
    }
}