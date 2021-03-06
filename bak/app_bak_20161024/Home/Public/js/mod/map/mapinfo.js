﻿
function page_init() {
    mapinfo.init();
}

var mapinfo = {
    selid: "",
    datalist:null,
    control: null,
    curindex: 0,
    startindex:0,
    endindex:0,
    account: 0,
    direct:0,//0:初始化、-1：向上、1向下
    init: function () {
        var that = mapinfo;
        //加载背景图片
        loadingHelper.loadbg();
        tp_ui.popup.loading.show({
            closeCallBack: function () {
                that.addlisten();
            }
        });
        that.loaddata();
    },
    loaddata: function () {
        var that = mapinfo;
        if (!tp_maplist || !tp_maplist.rccf || !tp_maplist.rccf.datalist) return;

        that.datalist = tp_maplist.rccf.datalist;
        that.account = that.datalist.length;
        that.formatdata();

        tp_ui.popup.loading.close();
    },
    formatdata:function(){
        var that = mapinfo;
        if (!that.datalist || this.datalist.length <= 0)
            return;
        var startindex = 0;
        var endindex = 0;
        var index=0;        
        var dtop = null;
        var dcenter = null;
        var dbottom = null;
        var hastop = false, hasbottom = false;

        if (that.direct == 0) {
            that.curindex = 0;
            that.startindex = 0;
            if (that.account > 1)
                that.endindex = 1;
            else
                that.endindex = 0;
        }
        else if (that.direct == -1) {
            if (that.curindex == 0)
                return;
            if (that.curindex == that.startindex) {
                that.startindex = that.startindex - 1;
                that.endindex = that.endindex - 1;
            }
            that.curindex = that.curindex - 1;
        }
        else {
            if (that.curindex >= that.account - 1)
                return;
            if (that.curindex == that.endindex) {
                that.startindex = that.startindex + 1;
                that.endindex = that.endindex + 1;
            }
            that.curindex = that.curindex + 1;
        }

        dtop = document.all("content-top");
        dcenter = document.all("content-center");
        dbottom = document.all("content-bottom");       

        //top
        if (dtop && that.direct != 0) {
            dtop.innerHTML = "";
            that.formattop();
        }        
        //center
        if (dcenter) {
            dcenter.innerHTML = "";
            that.formatcenter();
        }
            
        //bottom
        if (dbottom) {
            dbottom.innerHTML = "";
            that.formatbottom();
        }            
        
        if (dtop.innerHTML.length > 10)
            hastop = true;
        if (dbottom.innerHTML.length > 10)
            hasbottom = true;

        if (hastop && hasbottom) {
            dtop.style.height = "172px";
            dtop.style.marginTop = "-120px";
            dbottom.style.height = "65px";
        }
        else if (!hastop && !hasbottom)
        {
            dtop.style.height = "0px";
            dtop.style.marginTop = "0px";
            dbottom.style.height = "0px";
        }
        else {
            if(hastop)
            {
                //dtop.style.height = "140px";
                dtop.style.height = "172px";
                dtop.style.marginTop = "-70px";
                dbottom.style.height = "0px";
            }
            else {
                dtop.style.height = "0px";
                dtop.style.marginTop = "0px";
                dbottom.style.height = "140px";
            }
        }
        if (that.direct != 0) {
            that.control.selid("map" + that.curindex);
        }
    },
    formattop:function(){
        var that = mapinfo;
        var dtop = null;
        var index = 0;
        var info = null;
        var html = "";

        dtop = document.all("content-top");
        if(!dtop)return;
        if(that.direct==0)return;

        if (that.startindex == 0)
            return;
        index = that.startindex - 1;

        //if (index <= 0) 
        //    return;
        
        info = that.datalist[index];
        if (!info) return;
        //html = " <div class='mapinfo-right-item'><label>"
        //        + info.name + "</label><br /><label>"
        //        + info.price + "</label><br /><label>"
        //        + info.address + "</label><br /><label>"
        //        + info.phone + "</label></div>";
        html = that.gethtmlinfo(info);
        dtop.innerHTML = html;
    },
    formatcenter:function(){
        var that = mapinfo;
        var dcenter = null;
        var html = "";
        var h = "", n = 0;
        var d_down="",d_up="";
        var info = null;

        dcenter = document.all("content-center");
        if (!dcenter) return;

        var i = that.startindex;
        for (i = that.startindex; i <= that.endindex; i++) {
            info = that.datalist[i];
            if (info) {
                d_up = "";
                d_down = "";
                if (i < that.endindex) {
                    n = i + 1;
                    d_down = "map" + n;
                }                    

                if (i > that.startindex) {
                    n = i - 1;
                    d_up = "map" + n;
                }                    

                h = that.gethtmlinfo(info, "map" + i, d_down, d_up);
                html += h;
            }
        }
        dcenter.innerHTML = html;
    },
    formatbottom:function(){
        var that = mapinfo;
        var dbottom = null;
        var html = "";
        var info = null;
        var index = 0;

        dbottom = document.all("content-bottom");
        if (!dbottom) return;

        if (that.endindex >= that.account - 1)
            return;

        index = that.endindex + 1;
        info = that.datalist[index];

        if (!info) return;

        html = that.gethtmlinfo(info);
        dbottom.innerHTML = html;

    },
    gethtmlinfo: function (info,id,down,up) {
        var that = mapinfo;
        if(id && id!="")
            html = " <div class='mapinfo-right-item' id='" + id + "' data-down='" + down + "' data-up='" + up + "' url='" + info.url + "'><label>";
        else
            html = " <div class='mapinfo-right-item' style='margin-top:0px;'><label>";
        html += info.name + "</label><br /><label>"
                + info.price + "</label><br /><label>"
                + info.address + "</label><br /><label>"
                + info.phone + "</label></div>";
        return html;
    },
    addlisten: function () {
        var that = mapinfo;
        that.control = new controlevent({
            selid: that.selid,
            noMove: that.nomove,
            extMoveData:that.extMoveData,
            defaultid: "map0"
        });
        that.control.begin();
    },
    esc: function () {

    },
    selid: function (id) {
        var that = mapinfo;
        var control = this;
        var ctr = document.all(id);
        var url = "";
        var map = null;

        if (!ctr) return;
        url = ctr.getAttribute("url");
        map = document.all("mappage");

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (url && url != "" && map)
            map.setAttribute("src", url);

        ctr.className = "mapinfo-right-item wrap";

        control.curCtr = ctr;
        control.curid = id;

        //that.formatTable(id);
    },
    unselid: function (id) {
        var that = mapinfo;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        ctr.className = "mapinfo-right-item";

        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    },
    nomove: function (attrname) {
        var that = mapinfo;

        if (attrname == tp_enum_moveData.up)
            that.direct = -1;
        else if (attrname == tp_enum_moveData.down)
            that.direct = 1;

        that.formatdata();
    },
    extMoveData: function (attr) {
        var that = mapinfo;

        var ctr = this;
        var tdID = ctr.curCtr.getAttribute(attr);
        if (tdID && tdID != ""){
            if (attr == tp_enum_moveData.up)
                that.curindex = that.curindex - 1;
            else if (attr == tp_enum_moveData.down)
                that.curindex = that.curindex + 1;
        }
        ctr.baseMoveData(attr);
        if (ctr.afterMove)
            ctr.afterMove(attr);
    }
}