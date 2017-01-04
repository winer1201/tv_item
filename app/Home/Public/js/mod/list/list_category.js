function page_init() {
    listCategory.init();
}

var listCategory = {
    control: null,
    rollToopInstance:null,
    defaultid: "d11",
    cur_index: 1,
    max_account: 4,
    backUrl:"",
    focusid:"",
    categorycode: "",
    data: null,
    margin_top:0,
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();

        that.categorycode = tp.util.getQueryString('category_code');
        that.backUrl = tp.util.getQueryString("backUrl");
        that.focusid = tp.util.getQueryString("focusid");
        that.margin_top = tp.util.getQueryString("margintop");
        that.cur_index = tp.util.getQueryString("cur_index");
        if (!that.cur_index || that.cur_index == "")
            that.cur_index = 1;
        if (!that.margin_top || that.margin_top == "")
            that.margin_top = 0;
        else
            that.margin_top = parseInt(that.margin_top);

        if (that.focusid != "")
            that.defaultid = that.focusid;

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //初始化焦点事件
                that.addlisten();
            }
        });

        that.loaddata();

    },
    loaddata:function(){
        var that = listCategory;
        var item = null;
        var hasdata = false;

        for (var i = 0; i < tp_listcategory.length; i++) {
            item = tp_listcategory[i];
            if (!item)
                return;
            if (item.category_code == that.categorycode) {
                hasdata = true;
                break;
            }
        }
        if (!hasdata) {
            tp_ui.popup.loading.close();
            return;
        }

        that.data = item;

        that.formate_data();

        tp_ui.popup.loading.close();
    },
    formate_data:function(){
        var that = listCategory;
        var list = null, item = null, item_up = null, item_down = null, content = null, dleft = null, dright = null;
        var hleft = "", hright = "", cleft = "", cright = "", cup = "", cdown = "", name = "";
        var item_up_length = 0, item_down_length = 0;
        if (!that.data)
            return;

        dleft = document.all("dleft");
        dright = document.all("dright");
        
        if (!dleft || !dright)
            return;

        if (that.data.category_name)
            document.all("list-title").innerHTML = that.data.category_name;

        if (!that.data.detail_list || that.data.detail_list.length <= 0)
            return;
        list = that.data.detail_list;

        for (var i = 1; i <= list.length; i++) {
            item = list[i-1];
            if (!item) continue;
            //left
            if (i == 1) {
                item_up = null;
                hleft += "<div class=\"list-category-img-circular1\"><img src=\"" + img_cir + "\" /></div>";
            }
            else {
                item_up = list[i - 2];
                hleft += "<div class=\"list-category-img-circular2\"><img src=\"" + img_cir + "\" /></div>";
            }

            if (i == list.length)
                item_down = null;
            else
                item_down = list[i];

            if (item_up == null)
                item_up_length = 0;
            else
                item_up_length = item_up.content_list.length;

            if (item_down == null)
                item_down_length = 0;
            else
                item_down_length = item_down.content_list.length;

            hleft += "<div class=\"list-category-img-line\"><img src=\"" + img_line + "\" /></div>";

            //right
            hright += "<div class=\"list-category-item\">";
            hright += "  <div class=\"list-category-item-title\">" + item.category_name + "</div>";
            hright += " <div class=\"list-category-item-list\">";
            if (item.content_list && item.content_list.length > 0) {
                for (var j = 1; j <= item.content_list.length; j++) {
                    content = item.content_list[j - 1];

                    //data-left
                    if (j == 1)
                        cleft = "";
                    else
                        cleft = " data-left=\"d" + i + (j - 1) + "\" ";

                    //data-right
                    if (j == item.content_list.length)
                        cright = "";
                    else
                        cright = " data-right=\"d" + i + (j + 1) + "\" ";

                    //data-up
                    if (i == 1)
                        cup = "";
                    else {
                        if (item_up_length < j)
                            cup = " data-up=\"d" + (i - 1) + item_up_length + "\" ";
                        else
                            cup = " data-up=\"d" + (i - 1) + j + "\" ";
                    }

                    //data-down
                    if (i == list.length)
                        cdown = "";
                    else {
                        if(item_down_length <j)
                            cdown = " data-down=\"d" + (i + 1) + item_down_length + "\" ";
                        else
                            cdown = " data-down=\"d" + (i + 1) + j + "\" ";
                    }

                    hright += "<div class=\"list-category-item-info\" id=\"d" + i + j + "\" " + cleft + cright + cup + cdown
                            + " data-title = \"" + content.col_name + "\" jumptype = \"" + content.contenttype + "\" ";
                    switch(content.contenttype)
                    {
                        case 0:
                            hright += " videocode=\"" + content.content_code + "\" ";
                            break;
                        case 1:
                            hright += " appcode=\"" + content.content_code + "\" ";
                            break;
                        case 2:
                            hright += " categorycode=\"" + content.categorycode + "\" ";
                            break;
                        case 3:
                            hright += " imglist=\"" + content.imglist + "\" ";
                            break;
                        case 4:
                            hright += " pagecode=\"" + content.pagecode + "\" ";
                            break;
                        case 5:
                            hright += " pageurl=\"" + content.pageurl + "\" ";
                            break;
                        default:break;
                    }

                    name = content.col_name;
                    if (name.length > 8) {
                        name = name.substring(0, 8);
                        name += "..";
                    }                       

                    hright += "><div class=\"list-category-item-info-img\"><img class=\"list-category-img\" src=\""
                            + (content.smimgurl == "" ? img_default : content.smimgurl)
                            + "\" /></div><div class=\"list-category-item-info-title\"><label>"
                            + name + "</label></div>";
                    hright += "</div>";
                }
            }
            hright += "</div></div>";
        }
        dleft.innerHTML = hleft;
        dright.innerHTML = hright;

        if (that.margin_top && that.margin_top != 0)
            that.resetheight(that.margin_top);
    },
    addlisten: function () {
        var that = listCategory;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            defaultid: that.defaultid,
            extMoveData: that.extMoveData,
        });
        that.control.begin();
    },
    enter: function (key) {
        var that = listCategory;
        var ctr = null;

        if (!that.control) return;
        ctr = that.control.curCtr;
        if (!ctr) return;

        var content_code = "", category_code = "";
        var imglist = "", pagecode = "", areacode = "";
        var backUrl = "", targetUrl = "", targetcode = "", callback = "";

        targetcode = common.getTargetcode(ctr);
        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;


        areacode = tp.util.getQueryString("areacode");
        backUrl = encodeURIComponent(that.backUrl);

        callback = config.portal_list_category_url;
        callback = common.setBaseParam(callback);
        callback = tp.util.appendParam(callback, "category_code", that.categorycode);
        callback = tp.util.appendParam(callback, "margintop", that.margin_top);
        callback = tp.util.appendParam(callback, "cur_index", that.cur_index);
        callback = tp.util.appendParam(callback, "focusid", that.control.curid);

        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);
        targetUrl = common.setBaseParam(targetUrl);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);

        //记录用户行为
        //that.actionlog("点击", "内容图标_[" + targetcode + "]");
    },
    selid: function (id) {
        var that = listCategory;

        var control = this;
        var ctr = document.all(id);
        if (!ctr) return;
        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        ctr.children[0].className = "list-category-item-focus";

        control.curCtr = ctr;
        control.curid = id;

        that.after_selid(id);
    },
    unselid: function (id) {
        var that = listCategory;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        ctr.children[0].className = "list-category-item-info-img";
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
    after_selid:function(id){
        var that = listCategory;
        var ctr = null;

        ctr = document.all(id);
        if (!ctr) return;
        if (ctr.children.length < 2) return;
        var d_title = ctr.children[1];
        var l_title = d_title.children[0];
        var smname = "", name = "";
        var width = ctr.offsetWidth;
        //if (ctr.style.width && ctr.style.width != "")
        //    width = ctr.style.width;
        name = ctr.getAttribute("data-title")
        smname = l_title.innerHTML;

        if (name == smname) return;
        //var html = "<marquee scrollamount='100' scrolldelay='2000' style=\"width:"+width+"px;\" class='content-info-marquee' behavior='scroll' loop='-1' >" + name + "</marquee>";
        //d_title.innerHTML = html;

        var html = "<div id='d_roll_parent' style='width:" + width + "px;height:30px;margin:0 auto;white-space: nowrap;overflow:hidden;text-align:center'><div id='d_roll_start' style='display: inline;text-align:left'><label class='content-info-title'>" + name + "</label></div><div id='d_roll_end' style='display: inline;'></div><div>";
        d_title.innerHTML = html;

        //if (!that.rollToopInstance)
        that.rollToopInstance = new RollTool();
        that.rollToopInstance.init();
        that.rollToopInstance.Start();

        d_title.setAttribute("data-title-show", smname);
    },
    after_unselid:function(id){
        var that = listCategory;
        var ctr = null;

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
    extMoveData: function (attr) {
        var that = listCategory;
        var tmp = "";
        var ctr = this;
        var height = 300;

        var tdID = ctr.curCtr.getAttribute(attr);

        if (tdID && tdID != "") {
            if (attr == tp_enum_moveData.up) {
                if (that.cur_index == 2)
                    height = 200;
                else if (that.cur_index == that.max_account)
                    height = 170;

                that.cur_index--;
                that.resetheight(height,true);
            }
            else if (attr == tp_enum_moveData.down) {
                if (that.cur_index == 1)
                    height = 200;
                else if (that.cur_index == that.max_account - 1)
                    height = 170;

                that.cur_index++;
                that.resetheight(-1*height,true);
            }
        }
        ctr.baseMoveData(attr);
        if (ctr.afterMove)
            ctr.afterMove(attr);
    },
    resetheight: function (h,record) {
        var that = listCategory;
        var tmp = "";
        var dall = document.all("content_all");

        if (!dall)
            return;
        tmp = dall.style.marginTop;
        tmp = tmp.substring(0, tmp.length - 2);
        tmp = parseInt(tmp);
        tmp += h;
        if (record)
            that.margin_top += h;
        dall.style.marginTop = tmp + "px";
    }
}