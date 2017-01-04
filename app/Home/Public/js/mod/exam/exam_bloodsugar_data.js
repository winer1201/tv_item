function page_init() {
    exam_bloodsugar_data.init();
}

var exam_bloodsugar_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    data_alllength: 0,
    data_loadsize: 80,
    data_inited: false,
    data_curpage: 0,
    data_loadfinished: false,
    defaultid: "",
    newreach_token:"",
    datalist: [
    {
        date: "2016-09-06 16:43",
        high: "22.3",
        highflag:1,
        low: "",
        logflag:0,
        result: "血糖很高",
        device: "怡成5D-8B血糖仪"
    },
    {
        date: "2016-08-23 19:14",
        high: "8",
        highflag:1,
        low: "",
        lowflag:0,
        result: "血糖稍微偏高",
        device: "手工录入"
    },
     {
         date: "2016-08-20 10:22",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "	血糖很高",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-08-15 19:02",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "血糖很高	",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-08-07 15:49",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "血糖很高	",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-08-02 16:13",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "血糖很高	",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-08-01 12:31",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "血糖很高",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-07-23 20:09",
         high: "",
         highflag: 0,
         low: "-1",
         lowflag: 0,
         result: "糖尿病患者血糖控制很差",
         device: "博唐平A1C EZ 2.0"
     },
     {
         date: "2016-07-23 20:09",
         high: "",
         highflag: 0,
         low: "-1",
         lowflag: 0,
         result: "糖尿病患者血糖控制很差",
         device: "博唐平A1C EZ 2.0"
     },
     {
         date: "2016-07-23 20:08",
         high: "",
         highflag: 0,
         low: "-1",
         lowflag: 0,
         result: "糖尿病患者血糖控制很差",
         device: "博唐平A1C EZ 2.0"
     },
     {
         date: "2016-07-06 11:45",
         high: "22.3",
         highflag: 1,
         low: "",
         lowflag: 0,
         result: "血糖很高",
         device: "怡成5D-8B血糖仪"
     },
     {
         date: "2016-06-24 11:11",
         high: "4.3",
         highflag: 0,
         low: "",
         lowflag: 0,
         result: "血糖正常",
         device: "爱奥乐GSM血糖仪"
     },
     {
         date: "2016-05-04 18:06",
         high: "",
         highflag: 0,
         low: "16.4 ",
         lowflag: 1,
         result: "血糖很高",
         device: "柯诺血糖仪"
     },],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.newreach_token = tp.util.getQueryString("newreach_token");
        that.loaddata(function () {
            that.formatdata(true);
            that.listen();
        });
    },
    loaddata:function(callback){
        var that = exam_bloodsugar_data;
        var url = config.cbs_newreach_healthdata + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        if (that.data_loadfinished) {
            callback();
            return;
        }

        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "measure_type", "bg");
        url = tp.util.appendParam(url, "timetype", "3");
        url = tp.util.appendParam(url, "page", that.data_curpage);
        url = tp.util.appendParam(url, "pagesize", that.data_loadsize);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //that.location();
                callback();
            }
        });
        if (!that.data_inited)
            that.datalist = [];
        that.data_inited = true;
        //loaddata
        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                var jsondata = that.initData(data);
                tp_ui.popup.loading.close();
                if (jsondata && jsondata.retcode == 0 && jsondata.data) {
                    that.data_alllength = jsondata.data.account;
                    that.data_curpage += 1;
                    var datalist = jsondata.data.datalist;

                    for (var i = 0; i < datalist.length; i++) {
                        that.datalist.push(datalist[i]);
                    }

                    that.datalength += datalist.length;

                    if (that.datalength >= that.data_alllength)
                        that.data_loadfinished = true;
                    else if (datalist.length < that.data_loadsize)
                        that.data_loadfinished = true;
                }
                else {
                    tp.util.showMsg("data-error");
                }
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("data-error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });

    },
    listen: function () {
        var that = exam_bloodsugar_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_bloodsugar_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            //url = config.portal_exam_bloodsugar_tolerance_url;
            url = config.portal_exam_bloodsugar_trend_url;            

            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

            tp.util.redirectUrl(url);
        }
        else if (key == tp_move_key.down) {
            that.changePage(that.curPageIndex + 1);
        }
        else if (key == tp_move_key.up) {
            that.changePage(that.curPageIndex - 1);
        }

    },
    formatdata: function (changepage) {
        var that = exam_bloodsugar_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        if (changepage)
        that.changePage(1);

    },
    initData: function (json) {
        var that = this;
        if (!json) return;
        var data = JSON.parse(json);
        return data;
    },
    changePage: function (index) {
        var that = exam_bloodsugar_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "", arr_down_img = "", result = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        arrimg = "<img src='" + arrowurl + "' />";
        arr_down_img = "<img src='" + arrow_down_url + "' />";
        up = document.all("upctr");
        down = document.all("downctr");

        for (var i = 0; i <= 7; i++) {
            startindex = i + start;
            if (startindex <= end) {
                obj = that.datalist[i + start];
                if (!obj) {
                    html += that.getEmptyHtml();
                    continue;
                }
                flag = "";
                html += "<tr>";
                html += "<td>" + obj.measureTime + "</td>";
                switch (obj.result) {
                    case 0: result = "未诊断（餐前血糖）"; break;
                    case 1: result = "正常血糖"; break;
                    case 2: result = "空腹血糖受损"; break;
                    case 3: result = "糖耐量减低"; break;
                    case 4: result = "糖尿病"; break;
                    case 5: result = "低血糖"; break;
                    default: result = "";break;
                }
                if (obj.mealType == "after_meal") {
                    if (obj.bgValue > 7.79)
                        html += "<td><label class='exam-form-data-red'>" + obj.bgValue + "</label>" + arrimg + "</td>";
                    else if (obj.bgValue < 3.9)
                        html += "<td><label class='exam-form-data-blue'>" + obj.bgValue + "</label>" + arr_down_img + "</td>";
                    else
                        html += "<td>" + obj.bgValue + "</td>";

                    html += "<td></td>";
                }
                else {
                    html += "<td></td>";
                    if (obj.bgValue > 7.79)
                        html += "<td><label class='exam-form-data-red'>" + obj.bgValue + "</label>" + arrimg + "</td>";
                    else if (obj.bgValue < 3.9)
                        html += "<td><label class='exam-form-data-blue'>" + obj.bgValue + "</label>" + arr_down_img + "</td>";
                    else
                        html += "<td>" + obj.bgValue + "</td>";
                }
                //if (obj.heart > 100)
                //    html += "<td><label class='exam-form-data-red'>" + obj.heart + "</label>" + arrimg + "</td>";
                //else
                html += "<td>" + obj.comments + "</td>";
                html += "<td>" + obj.mdevice + "</td>";
                html += "</tr>";
            }
            else {
                html += that.getEmptyHtml();
            }
        }

        var tbody = document.all("tbbody");
        tbody.innerHTML = html;

        that.curPageIndex = index;

        if (index <= 1)
            up.style.display = "none";
        else
            up.style.display = "block";

        if (index >= that.pageAccount)
        {
            that.loaddata(function () {
                that.formatdata(false);
                if (that.pageAccount <= that.curPageIndex)
                    down.style.display = "none";
                else
                    down.style.display = "block";
            });
        }
        else
            down.style.display = "block";
    },
    getEmptyHtml: function () {
        return "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
    }
}