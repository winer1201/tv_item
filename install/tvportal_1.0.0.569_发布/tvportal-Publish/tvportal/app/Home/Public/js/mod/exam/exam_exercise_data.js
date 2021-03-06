﻿function page_init() {
    exam_exercise_data.init();
}

var exam_exercise_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    defaultid: "",
    datalist: [
    {
        date: "2016-09-28",
        number: "5201",
        numberflag: 1,
        distance: "3.953",
        distanceflag: 1,
        calorie: "213",
        device: "益体康GPRS计步器"
    },
     {
         date: "2016-09-27",
         number: "5725",
         numberflag: 1,
         distance: "4.351",
         distanceflag: 1,
         calorie: "233",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-26",
         number: "6048",
         numberflag: 0,
         distance: "4.596",
         distanceflag: 0,
         calorie: "246",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-25",
         number: "6809",
         numberflag: 0,
         distance: "5.175",
         distanceflag: 0,
         calorie: "280",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-24",
         number: "5070",
         numberflag: 1,
         distance: "3.853",
         distanceflag: 1,
         calorie: "211",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-23",
         number: "8255",
         numberflag: 0,
         distance: "6.274",
         distanceflag: 0,
         calorie: "339",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-22",
         number: "7313",
         numberflag: 0,
         distance: "5.558",
         distanceflag: 0,
         calorie: "298",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-21",
         number: "12468",
         numberflag: 0,
         distance: "9.476",
         distanceflag: 0,
         calorie: "502",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-20",
         number: "9212",
         numberflag: 0,
         distance: "7.001",
         distanceflag: 0,
         calorie: "381",
         device: "益体康GPRS计步器"
     },
     {
         date: "2016-09-19",
         number: "7935",
         numberflag: 0,
         distance: "6.031",
         distanceflag: 0,
         calorie: "327",
         device: "益体康GPRS计步器"
     }],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.formatdata();
        that.listen();
    },
    listen: function () {
        var that = exam_exercise_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_exercise_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_exercise_trend_url;

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
    formatdata: function () {
        var that = exam_exercise_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_exercise_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "", arr_down_img = "";
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
                html += "<td>" + obj.date + "</td>";
                if (obj.numberflag > 0)
                    html += "<td><label class='exam-form-data-blue'>" + obj.number + "</label>" + arr_down_img + "</td>";
                else
                    html += "<td>" + obj.number + "</td>";
                if (obj.distanceflag > 0)
                    html += "<td><label class='exam-form-data-blue'>" + obj.distance + "</label>" + arr_down_img + "</td>";
                else
                    html += "<td>" + obj.distance + "</td>";
                html += "<td>" + obj.calorie + "</td>";
                html += "<td>" + obj.device + "</td>";
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
            down.style.display = "none";
        else
            down.style.display = "block";
    },
    getEmptyHtml: function () {
        return "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
    }
}