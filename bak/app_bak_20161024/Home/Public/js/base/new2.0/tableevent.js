var tableevent = function (options) {
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
        //if (!options.doEnter)
        //    options.doEnter = that.enter;
    }

    controlevent.call(this, options);
}

tableevent.prototype = new controlevent({ prototype: true });

tableevent.prototype.enter = function (key) {
    var that = this;
    if (that.extEnter)
        that.extEnter(key);
    else
        that.baseEnter(key);
}

tableevent.prototype.baseEnter = function (key) {
    var that = this;
    var ctr = that.curCtr;
    if (!ctr) return;

    var content_code = "", category_code = "";;
    var imglist = "", pagecode = "";
    var backUrl = "", targetUrl = "", callback = "";


    targetUrl = common.getTdTargetUrl(ctr);
    if (!targetUrl || targetUrl == "") return;

    category_code = tp.util.getQueryString("category_code");
    backUrl = tp.util.getQueryString("backUrl");
    backUrl = encodeURIComponent(backUrl);

    callback = config.portal_list_url;

    callback = common.setBaseParam(callback);
    callback = tp.util.appendParam(callback, "category_code", category_code);
    callback = tp.util.appendParam(callback, "pageindex", 1);
    callback = tp.util.appendParam(callback, "focusid", that.curid);
    callback = tp.util.appendParam(callback, "backUrl", backUrl);

    callback = encodeURIComponent(callback);

    targetUrl = common.setBaseParam(targetUrl);
    targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

    tp.util.redirectUrl(targetUrl);
}
tableevent.prototype.selid = function (id) {
    var that = this;
    if (that.extSelid)
        that.extSelid(id);
    else
        that.baseSelid(id);

    if (that.after_selid)
        that.after_selid(id);
}
tableevent.prototype.baseSelid = function (id) {
    var that = this;
    if (!id) return;
    var ctr = document.all(id);
    
    if (!ctr.children) return;
    if (!ctr.children.length || ctr.children.length == 0) return;

    that.unselid(that.curid);

    ctr.children[0].className = "tile wrap";

    that.curCtr = ctr;
    that.curid = id;
}
tableevent.prototype.unselid = function (id) {
    var that = this;
    if (that.extUnSelid)
        that.extUnSelid(id);
    else
        that.baseUnSelid(id);

    if (that.after_unselid)
        that.after_unselid(id);
}
tableevent.prototype.baseUnSelid = function (id) {
    if (!id) return;
    var that = this;
    var ctr = document.all(id);

    ctr.children[0].className = "tile";

    if (id == that.curid) {
        that.curid = null;
        that.cur = null;
    }
}