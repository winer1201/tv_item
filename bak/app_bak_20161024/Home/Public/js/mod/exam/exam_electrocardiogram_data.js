﻿function page_init() {
    exam_electrocardiogram_data.init();
}

var exam_electrocardiogram_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    defaultid: "",
    datalist: [
    {
        date: "2016-07-07 10:29记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-07-06 13:59记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-07-06 13:58记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-07-06 12:14记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-07-06 11:44记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-06-21 17:12记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-06-21 15:03记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "Aerotel心电仪"
    },
    {
        date: "2016-06-21 14:59记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "Aerotel心电仪"
    },
    {
        date: "2016-06-21 13:45记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "Aerotel心电仪"
    },
    {
        date: "2016-06-21 11:44记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "康泰PM80"
    },
    {
        date: "2016-06-20 14:52记录",
        chart: "",
        opinion: "",
        result: "尚未诊断",
        device: "Aerotel心电仪"
    }],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.formatdata();
        that.listen();
    },
    listen: function () {
        var that = exam_electrocardiogram_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_electrocardiogram_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_electrocardiogram_url;

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
        var that = exam_electrocardiogram_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_electrocardiogram_data;

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
                html += "<td>" + obj.date + "</td>";
                html += "<td>" + obj.chart + "</td>";
                html += "<td>" + obj.opinion + "</td>";
                html += "<td>" + obj.result + "</td>";
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