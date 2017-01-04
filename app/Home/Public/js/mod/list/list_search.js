document.body.onload = function () {
    ListSearchInstance.init();
}

var ListSearchInstance = {
    control: null,
    //datalist: [],
    categorylist:[],
    areacode: "",
    category_code: "",//父节点编码
    category_name: "",//父节点名称
    focusid: "",
    backUrl: "",
    //category
    maxCategory: 5,
    category_cur_code:"",
    category_offset: 0,//总的偏移量
    category_index: 0,
    category_position:0,
    move_category_offset:90,//每次移动的偏移量
    defaultid: "dv_0",
    default_categorycode: "",
    //data
    load_times: 0,
    load_times_pre:0,
    tableid:"td_00",
    maxRow: 2,
    maxCol: 4,
    load_data_length: 40,
    load_data_offset: 0,
    show_data_row:0,
    data_max_row: 0,
    //data_cur_index: -1,
    data_load_finished:false,
    rowlist: [],
    //extend------
    afterLoadDataList: null,
    extendEnter: null,
    extendCreateTd:null,
    //数据初始化
    init: function () {
        var that = ListSearchInstance;
        var index = 1;
        //加载背景图片
        loadingHelper.loadbg();

        that.areacode = m_areacode;
        that.category_code = tp.util.getQueryString("category_code");
        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");
        that.default_categorycode = tp.util.getQueryString("cur_categorycode");
        that.category_position = tp.util.getQueryString("position");
        that.load_times_pre = tp.util.getQueryString("times");
        that.show_data_row = tp.util.getQueryString("cr");

        if (!index || index == "" || index < 1)
            index = 1;

        if (!that.show_data_row || that.show_data_row == "")
            that.show_data_row = 0;

        if (that.focusid && that.focusid != "")
            that.defaultid = that.focusid;

        if (!that.category_position || that.category_position == "")
            that.category_position = 1;

        that.loadCategory();
    },
    //添加按键监听事件
    addlisten: function () {
        var that = ListSearchInstance;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid,
            extMoveData: that.extMoveData,
            noMove: that.noMove,
        });
        that.control.begin();
    },
    //加载分类数据
    loadCategory:function(){
        var that = ListSearchInstance;

        var url = config.tps_category_list_url;
        url = tp.util.appendParam(url, "areacode", that.areacode);
        url = tp.util.appendParam(url, "category_code", that.category_code);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                that.actionlog("进入", "");
            }
        });
        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                if (!that.initCategoryData(data)) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("data-error");
                }
                //else tp_ui.popup.loading.close();
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    //初始化分类列表数据
    initCategoryData:function(data){
        var that = ListSearchInstance;

        if (!data) return false;
        var categoryData = JSON.parse(data);
        if (categoryData.retcode != 0 || !categoryData.data) return false;

        categoryData = categoryData.data;
        that.category_name = categoryData.category_name;
        that.categorylist = categoryData.detail_list;

        that.formatCategoryList();

        //that.addlisten();
        that.loadListData(that.category_cur_code, function () {
            that.init_load_back();
        }, { showloading: false });

        return true;
    },
    init_load_back:function(){
        var that = ListSearchInstance;
        that.load_times_pre--;
        if (that.load_times_pre > 0 && !that.data_load_finished) {
            that.loadListData(that.category_cur_code, function () {
                that.init_load_back();
            }, { showloading: false });
        }
        else
        {
            that.formatTable();
            that.addlisten();
        }
    },

    //格式化分类数据到UI
    formatCategoryList:function(){
        var that = ListSearchInstance;
        var lblTitle = null, offsetDV = null,dvTop=null,dvDown=null;
        var html = "", move_right = "", move_up = "", move_down = "";
        var cfilter = "";
        var categoryinfo = null;

        lblTitle = document.all("lbltitle");
        offsetDV = document.all("dv_offset");
        dvTop=document.all("dv_up");
        dvDown=document.all("dv_down");

        if (that.category_name)
            lblTitle.innerHTML = that.category_name;

        if (!that.categorylist) return;
        if (that.categorylist.length <= 0) return;

        for (var i = 0; i < that.categorylist.length; i++) {
            categoryinfo = that.categorylist[i];
            if (i == 0) {
                if (that.default_categorycode == "")
                    that.default_categorycode = categoryinfo.category_code;
                move_up = "";
            }
            else move_up = ' data-up="dv_' + (i - 1) + '" ';
            if (i < that.categorylist.length - 1)
                move_down = ' data-down="dv_' + (i + 1) + '" ';
            else
                move_down = "";
            
            //move_right = ' data-right="' + that.tableid + '" ';

            if (categoryinfo.category_code == that.default_categorycode) {
                that.category_index = i;
                cfilter = "filter_bg_select"
            }
            else
            {
                cfilter = "filter_bg"
            }
                

            html += '<div class="'+cfilter+'" id="dv_' + i + '" ' + move_down + move_up + move_right
                    + ' categorycode="' + categoryinfo.category_code + '"><div class="list-page-left-container"><label>'
                    + categoryinfo.category_name + '</label></div></div>';           
        }
        offsetDV.innerHTML = html;
        offsetDV.style.marginTop = that.category_offset;

        that.formatDirection();

        if (that.categorylist.length <= that.maxCategory) {
            dvDown.style.display = "none";
        }
        else
        {
           
        }
        that.category_cur_code = that.default_categorycode;
    },
    //格式化方向键
    formatDirection: function () {
        var that = ListSearchInstance;
        var offset = 0;
        var dvTop = null, dvDown = null, dvCategoryList = null;


        dvTop = document.all("dv_up");
        dvDown = document.all("dv_down");
        dvCategoryList = document.all("dvCategoryList");

        if (that.category_offset == 0){
            dvTop.style.display = "none";
            dvCategoryList.style.marginTop = "49.5px";
        }            
        else {
            dvTop.style.display = "";
            dvCategoryList.style.marginTop = "0px";
        }
            

        offset = (that.categorylist.length - that.maxCategory) * that.move_category_offset;
        if (that.category_offset < offset)
            dvDown.style.display = "";
        else
            dvDown.style.display = "none";
    },
    //加载分类下内容列表数据
    loadListData: function (categoryCode,callback,args) {
        var that = ListSearchInstance;
        var showLoading = true;

        if (that.data_load_finished) {
            if (callback) callback();
            return;
        }

        var url = config.tps_content_list_url;
        url = tp.util.appendParam(url, "areacode", that.areacode);
        url = tp.util.appendParam(url, "category_code", categoryCode);
        url = tp.util.appendParam(url, "content_scope", "category");
        url = tp.util.appendParam(url, "count", that.load_data_length);
        url = tp.util.appendParam(url, "offset", that.load_data_offset);

        if (args) {
            if (args.showloading != undefined)
                showLoading = args.showloading;
        }

        if (showLoading == true) {
            tp_ui.popup.loading.show({
                closeCallBack: function () {
                    //if (callback && typeof (callback) == "function")
                    //    callback();
                }
            });
        }

        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                if (!that.initListData(data)) {
                    tp_ui.popup.loading.close();
                    tp.util.showMsg("data-error");
                }
                else {
                    tp_ui.popup.loading.close();
                    if (callback && typeof (callback) == "function")
                        callback();                    
                }
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    //初始化分类列表数据
    initListData:function(data){
        var that = ListSearchInstance;

        if (!data) return false;
        var listdata = JSON.parse(data);
        if (listdata.retcode != 0 || !listdata.data) return false;

        var len = listdata.data.length;
        if (len < that.load_data_length) {
            that.data_load_finished = true;
            if (len <= 0)
                return true;
            else
                that.load_times++;
        }
        else
            that.load_times++;
        that.formTableRowInfo(listdata.data);
        return true;
    },
    //解析内容列表数据至缓存中（将分类列表数据解析为行列格式）
    formTableRowInfo:function(datalist){
        var that = ListSearchInstance;
        var datainfo = null;
        var rowinfo = [];
        var starcol = 0, endcol = 0, curlen = 0;

        //for (var i = that.data_cur_index + 1; i < that.datalist.length; i++) {
        for (var i = 0; i < datalist.length; i++) {
            datainfo = datalist[i];
            if (that.rowlist.length > 0) {
                rowinfo = that.rowlist[that.rowlist.length - 1];
                if (rowinfo.length > 0) {
                    endcol = rowinfo[rowinfo.length - 1].endcol;
                }
            }
            else {
                rowinfo = [];
                that.rowlist[that.rowlist.length] = rowinfo;
                endcol = 0;
            }

            if (datainfo.bindingtype == 0)
                curlen = 1;
            else
                curlen = datainfo.imgsize;

            if ((curlen + endcol) > that.maxCol) {
                rowinfo = [];
                that.rowlist[that.rowlist.length] = rowinfo;
                endcol = 0;
            }

            rowinfo[rowinfo.length] = {
                startcol: endcol + 1,
                endcol: endcol + curlen,
                data: datainfo
            }
        }
        that.data_max_row = that.rowlist.length;
        that.load_data_offset += datalist.length;
        if (that.afterLoadDataList)
            that.afterLoadDataList(datalist);
    },
    //格式化内容数据至UI界面
    formatTable:function(){
        var that = ListSearchInstance;
        var dtList = document.all("dtlist"), dvContainer = document.all("tbcontainer");
        var html = "", rowinfo = null,dataobj=null, datainfo = null, rowTmp = null, dataTmp = null;
        var dvOffset = 0, width = 200, height = 200, rwith = 0,spwidth=40;
        var startrow = 0, showlen = 3;
        var move_left = "", move_up = "", move_right = "", move_down = "";

        if (!dtList) return;
        dtList.innerHTML = html;

        if (!that.rowlist || that.rowlist.length == 0) return;

        if (that.show_data_row == 0 || that.rowlist.length <= 2) {
            startrow = 0;
            dvOffset = 0;
        }
        else if (that.show_data_row == (that.rowlist.length - 1)) {
            startrow = that.show_data_row - 2;
            dvOffset = -220;
        }
        else {
            startrow = that.show_data_row - 1;
            dvOffset = -120;
        }

        if (that.rowlist.length < showlen)
            showlen = that.rowlist.length;

        for (var i = startrow; i < (showlen+startrow); i++) {
            rowinfo = that.rowlist[i];
            html += "<tr>";
            for (var j = 0; j < rowinfo.length;j++)
            {
                move_down = "", move_left = "", move_right = "", move_up = "";
                dataobj = rowinfo[j];
                datainfo = dataobj.data;
                if (datainfo.bindingtype == 0) rwith = width;
                else
                    rwith = width * datainfo.imgsize + spwidth * (datainfo.imgsize - 1);

                if (j > 0)
                    move_left = ' data-left="td_' + i + (j - 1) + '"';
                else
                    move_left = ' data-left="dv_' + that.category_index + '"';
                if (j < rowinfo.length - 1)
                    move_right = ' data-right="td_' + i + (j + 1) + '"';
                if (i > 0)//set move_up
                {
                    rowTmp=that.rowlist[i-1];
                    for (var u = 0; u < rowTmp.length; u++) {
                        dataTmp = rowTmp[u];
                        if (dataTmp.endcol >= dataobj.startcol && dataTmp.endcol <= dataobj.endcol)
                        {
                            move_up = ' data-up="td_' + (i - 1) + u + '"';
                            break;
                        }
                    }
                }

                if (i < (showlen + startrow - 1))//set move_down
                {
                    rowTmp = that.rowlist[i + 1];
                    for (var u = 0; u < rowTmp.length; u++) {
                        dataTmp = rowTmp[u];
                        if (dataTmp.endcol >= dataobj.startcol && dataTmp.endcol <= dataobj.endcol) {
                            move_down = ' data-down="td_' + (i + 1) + u + '"';
                            break;
                        }
                    }
                }

                var arg = {
                    data:datainfo,
                    cname: datainfo.contentname,
                    iurl: datainfo.smimgurl,
                    h: height,
                    w: width,
                    ih: height,
                    iw: rwith,
                    row: i,
                    col: j,
                    left: move_left,
                    up: move_up,
                    right: move_right,
                    down: move_down
                };

                if (that.extendCreateTd)
                    html += that.extendCreateTd(arg);
                else
                    html += that.createTdContent(arg);            
            }
            html += "</tr>";
        }
        dtList.innerHTML = html;

        if (dvContainer) {
            dvContainer.style.marginTop = dvOffset + "px";
        }
    },
    //创建界面UI的表格信息
    createTdContent:function(arg){
        var that = ListSearchInstance;

        var html = "";
        var move_left = "", move_up = "", move_right = "", move_down = "";
        var width = 200, height = 200, row_index = 0, col_index = 0, img_width = 200, img_height = 200;
        var data = null;

        if (arg) {
            if (arg.data)
                data = arg.data;
            if (arg.h)
                height = arg.h;
            if (arg.w)
                width = arg.w;
            if (arg.ih)
                img_height = arg.ih;
            if (arg.iw)
                img_width = arg.iw;
            if (arg.row)
                row_index = arg.row;
            if (arg.col)
                col_index = arg.col;
            if (arg.left)
                move_left = arg.left;
            if (arg.up)
                move_up = arg.up;
            if (arg.right)
                move_right = arg.right;
            if (arg.down)
                move_down = arg.down;
        }
        if (!data)
            return html;

        html += '  <td style="width:' + width + 'px;height:' + height + 'px;" row="' + row_index + '" col="' + col_index + '" ' + 'data-title="' + data.contentname + '" ' + move_left + move_right + move_up + move_down + ' id="td_' + row_index + col_index + '">';
        html += '<div style="width:200px;margin:9px;">';
        html += '<img class="lazy" style="width:' + img_width + 'px;height:' + img_height + 'px;" data-src="' + data.smimgurl + '" src="' + data.smimgurl + '" >';
        html += '</div>';
        html += '<div class="content-info colname" style="width:' + img_width + 'px;"> <label>' + data.contentname + '</label></div>';
        html += '</td>';

        return html;
    },
    //移动分类事件
    moveCategory:function(attr){
        var that = ListSearchInstance;
        var ctr = that.control;
        var offsetDV = document.all("dv_offset");

        if (!ctr) return;

        if (attr == tp_enum_moveData.up) {
            that.category_index--;            
            if (that.category_position == 1) {
                that.category_offset += that.move_category_offset;
                if (offsetDV)
                    offsetDV.style.marginTop = that.category_offset;
                that.formatDirection();
            }
            else that.category_position--;
        }
        else if (attr == tp_enum_moveData.down) {
            that.category_index++;
            if (that.category_position == that.maxCategory) {
                that.category_offset -= that.move_category_offset;
                if (offsetDV)
                    offsetDV.style.marginTop = that.category_offset;
                that.formatDirection();
            }
            else
                that.category_position++;
        }
    },
    //移动内容表格事件
    moveTdData:function(attr){
        var that = ListSearchInstance;
        var ctr = that.control;

        if (!ctr) return;

        if (attr == tp_enum_moveData.up) {
            if (that.show_data_row <= 0)
                return;
            that.show_data_row--;
            that.formatTable();

        }
        else if (attr == tp_enum_moveData.down) {
            if (that.show_data_row == (that.data_max_row - 3) && !that.data_load_finished) {
                var categorycode = that.categorylist[that.category_index].category_code;
                that.loadListData(categorycode, function () {
                    //if (that.show_data_row == (that.data_max_row-3))
                    //    return;
                    that.show_data_row++;
                    that.formatTable();
                    that.selid(that.control.curid);
                }, { showloading: false });
            }
            else {
                that.show_data_row++;
                that.formatTable();
            }
        }
    },
    //基础控件移动扩展方法
    extMoveData: function (attr) {
        var that = ListSearchInstance;
        var tmp = "";
        var ctr = this;
        var height = 300;

        if (!ctr || !ctr.curCtr) return;

        var dvid = ctr.curCtr.getAttribute(attr);
        //if (!dvid || dvid == "") return;

        if (dvid && dvid != "") {
            if (ctr.curid.startWith("dv_"))
                that.moveCategory(attr);
            if (ctr.curid.startWith("td_"))
                that.moveTdData(attr);
        }       

        ctr.baseMoveData(attr);
        if (ctr.afterMove)
            ctr.afterMove(attr);
    },
    //基础控件-选中事件
    selid: function (id) {
        var that = ListSearchInstance;

        var control = this;
        var name = "";
        var ctr = document.all(id);
        if (!ctr) return;

        if (id.startWith("dv_")) {
            ctr.className = "filter_bg_select";
            if (control.curid && control.curid.startWith("dv_")) {
                control.curCtr.className = "filter_bg";
            }

        }

        that.unselid(control.curid);       

        if (that.control != null)
            control = that.control;

        name = ctr.children[0].className;
        if (!name.contains(" list-category-item-focus"))
            ctr.children[0].className += " list-category-item-focus";

        control.curCtr = ctr;
        control.curid = id;

        that.after_selid(id);
    },
    //基础控件-释放选择事件
    unselid: function (id) {
        var that = ListSearchInstance;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        var name = "";
        name = ctr.children[0].className;
        if (name.contains(" list-category-item-focus"))
            ctr.children[0].className = name.replace(" list-category-item-focus", "");
        //ctr.style.margin = "2px"
        //ctr.children[0].className = "curpage";

        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
        that.after_unselid(id);
    },
    //选中后触发事件
    after_selid: function (id) {
        var that = ListSearchInstance;
        var ctr = null;

        ctr = document.all(id);
        if (!ctr) return;

        if (id.startWith("dv_")) {
            that.category_cur_code = ctr.getAttribute("categorycode");
            if (that.category_cur_code != "") {
                that.tableid = "td_00";
                that.rowlist = [];
                that.show_data_row = 0;
                that.data_max_row = 0;
                that.load_data_offset = 0;
                that.data_load_finished = false;
                that.load_times = 0;
                that.loadListData(that.category_cur_code, function () {
                    that.formatTable();
                }, { showloading: false });
            }
        }
        else {
            that.tableid = id;
            ctr.children[0].style.margin = "6px";
        }

        if (!id.startWith("td_")) return;        

        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var l_title = d_title.children[0];
        var smname = "", name = "";
        var width = ctr.offsetWidth;

        name = ctr.getAttribute("data-title");
        smname = l_title.innerHTML;

        if (!name) return;
        if (name == smname && name.length<=10) return;

        var html = "<div id='d_roll_parent' style='width:" + width + "px;height:30px;margin:0 auto;white-space: nowrap;overflow:hidden;text-align:center'><div id='d_roll_start' style='display: inline;text-align:left'><label class='content-info-title'>" + name + "</label></div><div id='d_roll_end' style='display: inline;'></div><div>";
        d_title.innerHTML = html;

        //if (!that.rollToopInstance)
        that.rollToopInstance = new RollTool();
        that.rollToopInstance.init();
        that.rollToopInstance.Start();

        d_title.setAttribute("data-title-show", smname);
    },
    //释放后触发事件
    after_unselid: function (id) {
        var that = ListSearchInstance;
        var ctr = null;

        if (!id.startWith("td_")) return;

        ctr = document.all(id);
        if (!ctr) return;
        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var m_title = d_title.children[0];
        var smname = "", name = "";
        smname = d_title.getAttribute("data-title-show")
        name = m_title.innerHTML;

        if (!smname || smname == null)
            return;

        var html = "<label>" + smname + "</label>";
        if (that.rollToopInstance) {
            that.rollToopInstance.Stop();
        }
        d_title.innerHTML = html;
    },
    //无法移动的事件
    noMove: function (attr) {
        var that = ListSearchInstance;
        var control = that.control;

        if (!control) return;

        if (control.curid.startWith("td_")) {
            if (attr == tp_enum_moveData.down)//加载数据
            {
                if (that.data_load_finished) return;
                
            }
        }
        else if (control.curid.startWith("dv_")) {
            if (attr == tp_enum_moveData.right)//向右选择数据列表
            {
                if (that.tableid && that.tableid != "")
                    control.selid(that.tableid);
            }
        }
       
    },
    //回车响应事件
    enter: function (key) {
        var that = ListSearchInstance;
        var id = "", row = "", col = "";
        var data = null, rowinfo = null, ctr = null;

        var control = that.control;
        if (!control)
            control = this;

        if (!control || !control.curid || control.curid == "")
            return;

        id = control.curid;
        ctr = control.curCtr;
        if(!id.startWith("td_"))
            return;

        row = ctr.getAttribute("row");
        col = ctr.getAttribute("col");

        if (!row || row == "")
            return;

        if (!col || col == "")
            return;

        rowinfo = that.rowlist[row];
        if (!rowinfo) return;

        data = rowinfo[col];
        if (!data) return;

        data = data.data;
        if (!data)
            return;

        if (that.extendEnter) {
            that.extendEnter(data);
            return;
        }

        var callback = "", backurl = "";
        
        if (data.bindingtype == 0) {
            if (that.extendEnter) {
                url = that.extendEnter(data);
            }
            else {
                url = config.portal_vedio_new_url;
                url = tp.util.appendParam(url, "content_code", data.contentcode);
            }          
        }
        else
        {
            url = common.getTdTargetUrl(ctr);
        }
        callback = config.portal_list_search_url;
        callback = common.setBaseParam(callback);
        callback = tp.util.appendParam(callback, "category_code", that.category_code);
        callback = tp.util.appendParam(callback, "position", that.category_position);
        callback = tp.util.appendParam(callback, "focusid", that.control.curid);
        callback = tp.util.appendParam(callback, "cur_categorycode", that.category_cur_code);
        callback = tp.util.appendParam(callback, "times", that.load_times);
        callback = tp.util.appendParam(callback, "cr", that.show_data_row);
        
        backurl = encodeURIComponent(that.backUrl);
        callback = tp.util.appendParam(callback, "backUrl", backurl);

        callback = encodeURIComponent(callback);
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "backUrl", callback);

        tp.util.redirectUrl(url);

        //记录用户行为
        that.actionlog("点击", "内容_[" + data.contentcode + "]");
        

    },
    //用户行为记录方法
    actionlog: function (action, detail) {
        var that = ListSearchInstance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "带分类列表页" + "[" + that.category_name + "(" + that.category_code + ")]_分类编码[" + that.category_cur_code + "]",
            detail: detail
        });
    }
}