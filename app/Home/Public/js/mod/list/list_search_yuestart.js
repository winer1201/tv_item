document.body.onload = function () {
    yd_start.init();
}
var yd_start = {
    init:function(){
        ListSearchInstance.afterLoadDataList = yd_start.loadDataList;

        ListSearchInstance.extendEnter = yd_start.enter;

        ListSearchInstance.extendCreateTd = yd_start.createtd;

        ListSearchInstance.init();
    },
    loadDataList: function (datalist) {
        var that = yd_start;
        var datainfo = null;
        var codeArray = "", url = "";

        if (!datalist) return;
        if (datalist.length <= 0) return;

        for (var i = 0; i < datalist.length; i++) {
            datainfo = datalist[i];
            if (i > 0)
                codeArray += ",";
            codeArray += datainfo.contentcode;
        }
        url = common.setBaseParam(url);
        url = tp.util.appendParam(url, "albumcodelist", codeArray);

        tp.ajax({
            url: url,
            success: function (data, datalist) {
                //数据格式化
                that.initListData(data);
            },
            error: function (status) {
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        });
    },
    initDataList:function(data,datalist){
        var that = yd_start;
        var voteinfo=null,datainfo=null;
        var albumcode="",votenumber="",contentcode="";

        if (!data) return false;
        var list = JSON.parse(data);
        if (list.retcode != 0 || !list.data) return false;

        list=list.data;
        for (var i = 0; i < list.length; i++) {
            voteinfo=list[i];
            for (var j = 0; j < datalist.length; j++) {
                datainfo = datalist[j];
                if (datainfo.contentcode != voteinfo.albumcode)
                    continue;
                datainfo.votenumber = voteinfo.votenumber;
                break;
            }
        }
    },
    enter: function (data) {
        var that = yd_start;

        var url = config.portal_vedio_new_url;
        url = tp.util.appendParam(url, "albumcode", data.contentcode);

        return url;
    },
    createtd: function (arg) {
        var that = yd_start;
        var html = "", votenumber = "", votetext = "";
        var move_left = "", move_up = "", move_right = "", move_down = "";
        var width = 200, height = 200, row_index = 0, col_index = 0, img_width = 200, img_height = 200, left_width = 0, right_width = 60;
        var data = null;
        var zanurl = "../../app/home/public/img/list/zan.png";

        if (arg) {
            if (arg.data)
                data = arg.data;
            if (arg.h)
                height = arg.h;
            if (arg.w)
                width = arg.w;
            if (arg.ih)
                img_height = arg.ih;
            if (arg.iw)
                img_width = arg.iw;
            if (arg.row)
                row_index = arg.row;
            if (arg.col)
                col_index = arg.col;
            if (arg.left)
                move_left = arg.left;
            if (arg.up)
                move_up = arg.up;
            if (arg.right)
                move_right = arg.right;
            if (arg.down)
                move_down = arg.down;
        }

        if (!data)
            return html;

        if (data.votenumber)
            votenumber = data.votenumber;

        if (!votenumber || votenumber == "")
            votenumber = 0;

        left_width = img_width - right_width;
        votetext = that.exchangeVoteText(votenumber);

        html += '  <td style="width:' + width + 'px;height:' + height + 'px;" row="' + row_index + '" col="' + col_index + '" ' + 'data-title="' + data.contentname + '" ' + move_left + move_right + move_up + move_down + ' id="td_' + row_index + col_index + '">';
        html += '<div style="width:200px;margin:9px;">';
        html += '<img class="lazy" style="width:' + img_width + 'px;height:' + img_height + 'px;" data-src="' + data.smimgurl + '" src="' + data.smimgurl + '" >';
        html += '</div><div>';
        html += '<div class="content-info colname" style="width:' + left_width + 'px;float:left;"> <label>' + data.contentname + '</label></div>';
        html += '<div style="padding-top:0px;text-align:right;margin-right:0px;"><label>' + votetext + '个</label><img src="' + zanurl + '"></div>';
        html += '</div></td>';

        return html;
    },
    exchangeVoteText: function (number) {
        var text = "0";
        if (!number) return text;
        if (isNaN(number)) return text;
        if (number < 1000) return number + "";
        if (number < 10000)
            return number / 1000 + "千";
        if (number < (10000 * 100))
            return number / 10000 + "万";
        if (number < (10000 * 1000))
            return number / 10000 / 100 + "百万";
        if (number < (10000 * 10000))
            return number / 10000 / 1000 + "千万";
        return "上亿";
    }
}

