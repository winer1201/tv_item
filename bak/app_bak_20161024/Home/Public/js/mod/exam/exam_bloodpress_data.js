﻿function page_init() {
    exam_bloodpress_data.init();
}

var exam_bloodpress_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    pageAccount: 0,
    datalength:0,
    defaultid: "",
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
        that.formatdata();
        that.listen();
    },
    listen: function () {
        var that = exam_bloodpress_data;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_bloodpress_data;
        if (key != tp_move_key.left && key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

        if (key == tp_move_key.left) {
            url = config.portal_exam_bloodpress_hearttrends_url;

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
    formatdata:function() {
        var that = exam_bloodpress_data;

        if (!that.datalist || that.datalist.length == 0)
            return;
        
        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_bloodpress_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index-1) * that.pageLength;
        end = start+that.pageLength;
        
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
                if (obj.high > 139)
                    html += "<td><label class='exam-form-data-red'>" + obj.high + "</label>" + arrimg + "</td>";
                else
                    html += "<td>" + obj.high + flag + "</td>";
                if (obj.low > 89)
                    html += "<td><label class='exam-form-data-red'>" + obj.low + "</label>" + arrimg + "</td>";
                else
                    html += "<td>" + obj.low + flag + "</td>";
                if (obj.heart > 100)
                    html += "<td><label class='exam-form-data-red'>" + obj.heart + "</label>" + arrimg + "</td>";
                else
                    html += "<td>" + obj.heart + flag + "</td>";
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