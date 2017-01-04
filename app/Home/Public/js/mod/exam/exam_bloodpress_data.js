function page_init() {
    exam_bloodpress_data.init();
}

var exam_bloodpress_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    data_alllength: 0,
    data_loadsize: 80,
    data_inited: false,
    data_curpage:0,
    data_loadfinished:false,
    defaultid: "",
    newreach_token: "",
    datalist: [
    {
        date: "2016-09-06 16:58",
        high: 127,
        low: 87,
        heart:78,
        device:"广为GSM血压计"
    },
    {
        date: "2016-09-05 12:03",
        high: 133,
        low: 92,
        heart: 82,
        device: "广为GSM血压计"
    },
    {
        date: "2016-08-31 20:52",
        high: 142,
        low: 96,
        heart: 88,
        device: "欧姆龙HEM-7081-1T"
    },
    {
        date: "2016-08-31 09:31",
        high: 143,
        low: 74,
        heart: 74,
        device: "欧姆龙HEM-7081-1T"
    },
    {
        date: "2016-08-30 21:01",
        high: 140,
        low: 81,
        heart: 77,
        device: "广为GSM血压计"
    },
    {
        date: "2016-08-30 09:13",
        high: 118,
        low: 82,
        heart: 77,
        device: "广为GSM血压计"
    },
    {
        date: "2016-08-28 16:40",
        high: 120,
        low: 76,
        heart: 70,
        device: "手工录入"
    },
    {
        date: "2016-08-28 08:58",
        high: 138,
        low: 110,
        heart: 77,
        device: "手工录入"
    },
    {
        date: "2016-08-26 17:52",
        high: 165,
        low: 110,
        heart: 72,
        device: "广为GSM血压计"
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
    listen: function () {
        var that = exam_bloodpress_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    loaddata: function (callback) {
        var that = exam_bloodpress_data;
        var url = config.cbs_newreach_healthdata + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        if (that.data_loadfinished) {
            callback();
            return;
        }
        
        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "measure_type", "bp");
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
    move: function (key) {
        var that = exam_bloodpress_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_bloodpress_bloodtrends_url;

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
    formatdata:function(changepage) {
        var that = exam_bloodpress_data;

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
        var that = exam_bloodpress_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "", arr_down_img = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index-1) * that.pageLength;
        end = start+that.pageLength;
        
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
                if (obj.systolic > 139)
                    html += "<td><label class='exam-form-data-red'>" + obj.systolic + "</label>" + arrimg + "</td>";
                else if (obj.systolic < 90)
                    html += "<td><label class='exam-form-data-blue'>" + obj.systolic + "</label>" + arr_down_img + "</td>";
                else
                    html += "<td>" + obj.systolic + flag + "</td>";

                if (obj.diastolic > 89)
                    html += "<td><label class='exam-form-data-red'>" + obj.diastolic + "</label>" + arrimg + "</td>";
                else if (obj.diastolic < 60)
                    html += "<td><label class='exam-form-data-blue'>" + obj.diastolic + "</label>" + arr_down_img + "</td>";
                else
                    html += "<td>" + obj.diastolic + flag + "</td>";

                if (obj.heartRate > 100)
                    html += "<td><label class='exam-form-data-red'>" + obj.heartRate + "</label>" + arrimg + "</td>";
                else if (obj.heartRate <60)
                    html += "<td><label class='exam-form-data-blue'>" + obj.heartRate + "</label>" + arr_down_img + "</td>";
                else
                    html += "<td>" + obj.heartRate + flag + "</td>";
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
                //var lenth = that.curPageIndex * that.pageLength;
                //that.pageAccount = Math.ceil(length / that.pageLength);
                if (that.pageAccount <= that.curPageIndex)
                    //if (lenth >= that.data_alllength)
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