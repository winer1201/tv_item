function page_init() {
    exam_bloodoxygen_data.init();
}

var exam_bloodoxygen_data = {
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
    newreach_token: "",
    defaultid: "",
    datalist: [
    {
        date: "2016-09-22 16:37",
        high: "99",
        highflag: 0,
        low: "",
        logflag: 0,
        result: "血氧正常",
        device: "益体康HC-801B"
    },
     {
         date: "2016-09-22 15:26",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-20 16:48",
         high: "98",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-20 16:47",
         high: "96",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-12 16:38",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-12 16:27",
         high: "98",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-07 10:11",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-06 16:33",
         high: "97",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-05 15:31",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-05 15:19",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     },
     {
         date: "2016-09-05 14:03",
         high: "99",
         highflag: 0,
         low: "",
         logflag: 0,
         result: "血氧正常",
         device: "益体康HC-801B"
     }, ],
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
    loaddata: function (callback) {
        var that = exam_bloodoxygen_data;
        var url = config.cbs_newreach_healthdata + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        if (that.data_loadfinished) {
            callback();
            return;
        }

        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "measure_type", "po");
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
        var that = exam_bloodoxygen_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },

    initData: function (json) {
        var that = this;
        if (!json) return;
        var data = JSON.parse(json);
        return data;
    },
    move: function (key) {
        var that = exam_bloodoxygen_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_bloodoxygen_trend_url;

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
        var that = exam_bloodoxygen_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        if (changepage)
            that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_bloodoxygen_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        arrimg = "<img src='" + arrowurl + "' />";
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

                if (obj.spo2 > 100)
                    html += "<td><label class='exam-form-data-red'>" + obj.spo2 + "</label>" + arrimg + "</td>";
                else
                    html += "<td>" + obj.spo2 + flag + "</td>";
                //if (obj.lowflag > 0)
                //    html += "<td><label class='exam-form-data-red'>" + obj.low + "</label>" + arrimg + "</td>";
                //else
                //    html += "<td>" + obj.low + flag + "</td>";
                html += "<td></td>";
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

        if (index >= that.pageAccount) {
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