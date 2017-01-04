function page_init() {
    exam_pulmonary.init();
}

var exam_pulmonary = {
    control: null,
    pageLength: 5,
    curPageIndex: 1,
    pageAccount: 0,
    datalength: 0,
    defaultid: "",
    datalist: [
    {
        date: "2016-09-22 16:38",
        fvc: "3.48",
        fev: "3.44",
        pef: "8.24",
        breathrate: "98.85",
        vc25: "8.07",
        vc50: "6.09",
        vc75: "3.76",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-22 16:38",
        fvc: "3.47",
        fev: "3.43",
        pef: "8.34",
        breathrate: "98.85",
        vc25: "7.91",
        vc50: "6.6",
        vc75: "4.68",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-20 16:57",
        fvc: "2.75",
        fev: "2.67",
        pef: "6.77",
        breathrate: "97.09",
        vc25: "6.65",
        vc50: "3.85",
        vc75: "2.27",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-20 16:57",
        fvc: "3.59",
        fev: "2.49",
        pef: "4.05",
        breathrate: "69.36",
        vc25: "3.4",
        vc50: "2.03",
        vc75: "1.55",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-20 16:57",
        fvc: "3.96",
        fev: "2.58",
        pef: "3.12",
        breathrate: "65.15",
        vc25: "2.89",
        vc50: "2.38",
        vc75: "1.98",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-12 17:04",
        fvc: "2.75",
        fev: "2.72",
        pef: "6.85",
        breathrate: "98.91",
        vc25: "5.45",
        vc50: "5.42",
        vc75: "3.62",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-12 17:04",
        fvc: "3.21",
        fev: "1.42",
        pef: "2.72",
        breathrate: "44.24",
        vc25: "1.54",
        vc50: "1.96",
        vc75: "2.67",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-12 17:04",
        fvc: "1.86",
        fev: "1.86",
        pef: "7.92",
        breathrate: "100",
        vc25: "7.38",
        vc50: "6.67",
        vc75: "4.31",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-06 16:35",
        fvc: "2.34",
        fev: "2.34",
        pef: "9.06",
        breathrate: "100",
        vc25: "8.88",
        vc50: "5.64",
        vc75: "3.55",
        device: "康泰肺活量计SP10BT"
    },
    {
        date: "2016-09-05 15:28",
        fvc: "3.35",
        fev: "2.94",
        pef: "6.27",
        breathrate: "87.76",
        vc25: "5.86",
        vc50: "3.35",
        vc75: "1.64",
        device: "康泰肺活量计SP10BT"
    }],
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.formatdata();
        that.listen();
    },
    listen: function () {
        var that = exam_pulmonary;
        that.control = new controlevent({
            extMove: that.move,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    move: function (key) {
        var that = exam_pulmonary;
        if (key != tp_move_key.down && key != tp_move_key.up)
            return;
        var url = "", backUrl = "";

        backUrl = tp.util.getQueryString("backUrl");

       if (key == tp_move_key.down) {
            that.changePage(that.curPageIndex + 1);
        }
        else if (key == tp_move_key.up) {
            that.changePage(that.curPageIndex - 1);
        }

    },
    formatdata: function () {
        var that = exam_pulmonary;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_pulmonary;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        //var arrimg = "", arr_down_img = "";
        var up = null, down = null;

        if (that.pageAccount < index || index < 1) return;
        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        //arrimg = "<img src='" + arrowurl + "' />";
        //arr_down_img = "<img src='" + arrow_down_url + "' />";
        up = document.all("upctr");
        down = document.all("downctr");

        for (var i = 0; i <= that.pageLength-1; i++) {
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
                html += "<td>" + obj.fvc + "</td>";
                html += "<td>" + obj.fev + "</td>";
                html += "<td>" + obj.pef + "</td>";
                html += "<td>" + obj.breathrate + "</td>";
                html += "<td>" + obj.vc25 + "</td>";
                html += "<td>" + obj.vc50 + "</td>";
                html += "<td>" + obj.vc75 + "</td>";
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