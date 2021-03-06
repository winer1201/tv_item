﻿function page_init() {
    exam_sleep_data.init();
}

var exam_sleep_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    defaultid: "",
    datalist: [
    {
        date: "2016-09-29",
        sleeptime: "29号 00:10",
        wakeuptime: "29号 07:57",
        wakenumber: "4",
        totaltime: "4小时42分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "1小时9分钟",
        bedtime:"",
        device: "Beddit"
    },
    {
        date: "2016-09-28",
        sleeptime: "28号 00:36",
        wakeuptime: "28号 08:36",
        wakenumber: "7",
        totaltime: "5小时18分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "1小时7分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-27",
        sleeptime: "27号 01:03",
        wakeuptime: "27号 07:58",
        wakenumber: "4",
        totaltime: "5小时5分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "1小时2分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-26",
        sleeptime: "26号 00:25",
        wakeuptime: "26号 08:22",
        wakenumber: "4",
        totaltime: "5小时56分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "40分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-24",
        sleeptime: "24号 13:55",
        wakeuptime: "25号 08:50",
        wakenumber: "5",
        totaltime: "4小时56分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "2小时42分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-23",
        sleeptime: "23号 23:56",
        wakeuptime: "24号 08:36",
        wakenumber: "1",
        totaltime: "7小时52分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "18分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-23",
        sleeptime: "23号 00:58",
        wakeuptime: "23号 08:05",
        wakenumber: "2",
        totaltime: "5小时50分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "1小时4分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-21",
        sleeptime: "21号 23:39",
        wakeuptime: "22号 08:24",
        wakenumber: "2",
        totaltime: "7小时21分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "46分钟",
        bedtime: "",
        device: "Beddit"
    },
    {
        date: "2016-09-20",
        sleeptime: "20号 23:16",
        wakeuptime: "21号 09:00",
        wakenumber: "7",
        totaltime: "4小时20分钟",
        shallowsleep: "",
        deepsleep: "",
        sobertime: "2小时32分钟",
        bedtime: "",
        device: "Beddit"
    }],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.formatdata();
        that.listen();
    },
    listen: function () {
        var that = exam_sleep_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_sleep_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_sleep_url;

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
        var that = exam_sleep_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_sleep_data;

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
                html += "<td>" + obj.sleeptime + "</td>";
                html += "<td>" + obj.wakeuptime + "</td>";
                html += "<td>" + obj.wakenumber + "</td>";
                html += "<td>" + obj.totaltime + "</td>";
                html += "<td>" + obj.shallowsleep + "</td>";
                html += "<td>" + obj.deepsleep + "</td>";
                html += "<td>" + obj.sobertime + "</td>";
                //html += "<td>" + obj.bedtime + "</td>";
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
        return "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    }
}