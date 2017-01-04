//document.body.onload = function () {
//    oldcard_info_instance.init();
//}

function page_init() {
    oldcard_info_instance.init();
}

var oldcard_info_instance = {
    control: null,
    datalist: {
        consumelist: [
            {
                time: "2016.02.16 11:08:22",
                name: "庆丰包子",
                amount:22
            },
            {
                time: "2016.02.12 12:10:11",
                name: "庆丰包子",
                amount: 35
            },
            {
                time: "2016.02.19 18:08:37",
                name: "庆丰包子",
                amount: 11.5
            }
        ],
        grantlist: [
            {
                time: "2016.02.01 10:00:01",
                name: "养老补贴",
                amount: 100
            }
        ],
        discountlist: [
            {
                time: "2016.02.16 11:08:23",
                name: "庆丰包子",
                amount: 2
            },
            {
                time: "2016.02.12 12:10:12",
                name: "庆丰包子",
                amount: 5
            },
            {
                time: "2016.02.19 18:08:38",
                name: "庆丰包子",
                amount: 0.5
            }
        ]
    },
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();

        that.actionlog("进入", "");
        //监听外设消息
        that.addlisten();
        that.formatTable("td3");
    },
    addlisten: function () {
        var that = oldcard_info_instance;
        that.control = new controlevent({
            extEsc: that.esc,
            extEnter: that.enter,
            selid: that.selid,
            afterMove:that.afterMove,
            defaultid: "td0"
        });
        that.control.begin();
    },
    esc: function (key) {
        var that = oldcard_info_instance;
        var backUrl = tp.util.getQueryString("backUrl");
        tp.util.redirectUrl(backUrl);

        that.actionlog("外设返回", "");
    },
    enter:function(key){
        var that = oldcard_info_instance;
        var radid = "", unradid = "";
        var id = that.control.curid;

        if (id == "td0" || id == "td1") {
            if (id == "td0") {
                radid = "rdyl"
                unradid = "rdzc";
            }
            else if (id == "td1") {
                radid = "rdzc";
                unradid = "rdyl";
            }
            if (radid == "") return;
            document.all(radid).checked = "checked";
            document.all(unradid).checked = "";
        }
        else if (id == "td2")
        {
            that.actionlog("点击", "解绑定_cardno[]");
        }            
    },
    selid: function (id) {
        var that = oldcard_info_instance;
        var control = this;
        var ctr = document.all(id);
        if (!ctr) return;
        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        ctr.children[0].className = "tile wrap oldcard-info-rad";

        control.curCtr = ctr;
        control.curid = id;

        that.formatTable(id);
    },
    unselid: function (id) {
        var that = oldcard_info_instance;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        ctr.children[0].className = "tile oldcard-info-rad oldcard-info-noborder";
        //ctr.style.margin = "2px"
        //ctr.children[0].className = "curpage";

        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }

    },
    formatTable: function (id) {
        var that = oldcard_info_instance;
        if (id != "td3" && id != "td4" && id != "td5")
            return;
        var tbctr = document.all("tblist");
        var trctr = document.all("trtitle");
        var titlehtml = "";
        var tbhtml = "";
        var allline = 10;
        var list = null;
        if (!tbctr || !trctr) return;
        //title
        if (id == "td3") {
            titlehtml = " <td>消费时间</td><td>消费内容</td><td>消费金额</td>";            
        }
        else if (id == "td4") {
            titlehtml = " <td>发放时间</td><td>发放内容</td><td>发放金额</td>";            
        }
        else {
            titlehtml = " <td>打折时间</td><td>打折内容</td><td>打折金额</td>";
        }

        //table
        if (id == "td3") {
            list = that.datalist.consumelist;
        }
        else if (id == "td4") {
            list = that.datalist.grantlist;
        }
        else {
            list = that.datalist.discountlist;
        }
        var number = list.length - 1;;
        for (var i = 0; i < allline; i++) {
            if (i <= number) {
                var info = list[i];
                tbhtml += "<tr><td>" + info.time + "</td><td>" + info.name + "</td><td>" + info.amount + "</td></tr>";
            }
            else {
                tbhtml += "<tr><td></td><td></td><td></td></tr>";
            }
        }

        trctr.innerHTML = titlehtml;
        tbctr.innerHTML = tbhtml;
    },
    afterMove:function(attr){
        var that = oldcard_info_instance;
        var control = this;
        var ctrid = "";

        if (that.control != null)
            control = that.control;
        ctrid = control.curid;

        if (ctrid != "td3" && ctrid != "td4" && ctrid != "td5")
            return;
    },
    actionlog: function (action, detail) {
        var that = oldcard_info_instance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "老年卡信息页",
            detail: detail
        });
    }

}