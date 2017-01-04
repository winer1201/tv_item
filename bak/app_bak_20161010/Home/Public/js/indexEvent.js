var IndexEvent = {
    tmpTdID:"",
    defaultid: "td0",
    curNavCode: "",
    //moveNav:null,
    loadData: null,
    doEnter: null,
    afterInit: null,
    afterNavChanged: null,
    esc:null,
    init: function (options) {
        var that = IndexEvent;

        if (options) {
            if (options.curNavCode) {
                that.curNavCode = options.curNavCode;
                navEvent.showCurFontCode(that.curNavCode);
            }                
            if (options.defaultid)
                that.defaultid = options.defaultid;
            //if (options.moveNav)
            //    that.moveNav = options.moveNav;
            if (options.loadData)
                that.loadData = options.loadData;
            if (options.doEnter)
                that.doEnter = options.doEnter;
            if (options.afterInit)
                that.afterInit = options.afterInit;
            if (options.afterNavChanged)
                that.afterNavChanged = options.afterNavChanged;
            if (options.esc)
                that.esc = options.esc;
        }

        if (that.defaultid.startWith("td"))       
            that.initTable(that.defaultid);         
        else
            that.initNav(that.defaultid);

        if (that.afterInit)
            that.afterInit();
    },
    //table function===================================
    initTable: function (defaultid) {
        var that = IndexEvent;
        tableEvent.init({
            defaultid: defaultid ? defaultid : that.defaultid,
            noMove: that.table_noMove,
            doEnter: that.enter,
            doEsc: that.tbesc,
        });
    },
    table_noMove:function(attr){
        var that = IndexEvent;
        that.noMove(attr, tp_enum_ctrType.table);
    },
    enter:function(key){
        var that = IndexEvent;
        if (that.doEnter)
            that.doEnter(tableEvent.curCtr, key);
    },
    tbesc: function (key) {
        var that = IndexEvent
        if (that.esc)
            that.esc(key, tp_enum_ctrType.table);
        else
            navEvent.baseEsc(key);
        return;

        var that = IndexEvent;
        //返回上一页
        //TODO：
        if (tableEvent.curid != "td0")
            tableEvent.selid("td0");
        else {
            var backUrl = tp.util.getQueryString("backUrl");
            if (!backUrl) return;
            tp.util.redirectUrl(backUrl);
        }
    },
    //nav function=====================================
    initNav: function (navid) {
        var that = IndexEvent;
        navEvent.init({
            defaultid: navid,
            noMove: that.nav_noMove,
            curChanged: that.nav_Changed,
            doEsc: that.navesc
        });
    },
    nav_noMove: function (attr) {
        var that = IndexEvent;
        that.noMove(attr, tp_enum_ctrType.nav);
    },
    nav_Changed: function (lastNav, curNav) {
        var that = IndexEvent;
        var id = curNav.getAttribute("id");
        var navcode = id.substring(3);

        if (that.curNavCode == navcode) return;

        if (that.loadData)
            that.loadData(navcode);
        that.tmpTdID = "";
        that.curNavCode = navcode;

        if (that.afterNavChanged)
            that.afterNavChanged();
    },
    navesc: function (key) {
        var that = IndexEvent
        if (that.esc)
            that.esc(key, tp_enum_ctrType.nav);
        else
            navEvent.baseEsc(key);
    },
    //function=====================================
    noMove: function (attr, ctrType) {
        var that = IndexEvent;
        if (ctrType == tp_enum_ctrType.table) {
            if (attr == tp_enum_moveData.up) {
                that.tmpTdID = tableEvent.curid;
                tableEvent.unfocus();
                that.initNav("nv_" + that.curNavCode);
            }
            else if (attr == tp_enum_moveData.left || attr == tp_enum_moveData.right)//切换左侧或右侧页面
            {                               
                var curNavCode = that.curNavCode
                var nv = document.all("nv_" + curNavCode);
                var nextNavID = nv.getAttribute(attr);

                if (!nextNavID || nextNavID == "") return;

                var nextNavCode = nextNavID.substring(3);
                var nextNV = document.all(nextNavID);
                var tdid = "td0";
                if (nextNavCode && nextNavCode != "")
                {                  
                    //切换数据
                    that.nav_Changed(nv, nextNV);
                    //设置当前字体
                    navEvent.showNormalFontCode(curNavCode);
                    //设置nextnav字体
                    navEvent.showCurFontCode(nextNavCode);                    
                    //设置焦点
                    if (attr == tp_enum_moveData.left) {
                        tdid = that.getRightTD();
                    }
                    tableEvent.selid(tdid);
                }
            }
        }
        else {
            if (attr == tp_enum_moveData.down)
            {
                var tdid = "td0";
                if (that.tmpTdID) {
                    tdid = that.tmpTdID;
                    that.tmpTdID = null;
                }
                navEvent.unfocus();
                that.initTable(tdid);
            }
        }
    },
    getCurNav: function () {
        return navEvent.curCtr;
    },
    getCurTD: function () {
        return tableEvent.curCtr;
    },
    getCurTdID:function(){
        return tableEvent.curid;
    },
    selTableID:function(id){
        tableEvent.selid(id);
    },
    getRightTD: function () {
        var tbCtr = document.all("page_content").children[0];
        var focusid = "td0";
        //var tbCtr = document.getElementById(tableid);
        var rows = tbCtr.rows;
        if (rows == null || rows == undefined || rows.length <= 0)
            focusid = "td0";
        else
            focusid = rows[0].cells[rows[0].cells.length - 1].getAttribute("id");
        return focusid;
    }
}