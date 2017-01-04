function page_init() {
    exam_electrocardiogram_data.init();
}

var exam_electrocardiogram_data = {
    control: null,
    pageLength: 8,
    curPageIndex: 1,
    //总页数
    pageAccount: 0,
    datalength: 0,
    data_alllength: 0,
    data_loadsize: 80,
    data_inited: false,
    data_curpage: 0,
    data_loadfinished: false,
    newreach_token: "",
    defaultid: "d_left",
    datalist: [],
    ecg_account:0,//ecg图片位置计数
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
        var that = exam_electrocardiogram_data;
        var url = config.cbs_newreach_healthdata + "?usercode=" + m_usercode + "&user_session=" + m_user_session;

        if (that.data_loadfinished) {
            callback();
            return;
        }

        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "measure_type", "ecg");
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
        var that = exam_electrocardiogram_data;
        that.control = new controlevent({
            //extMove: that.move,
            defaultid: that.defaultid,
            extEnter: that.enter,
            selid: that.selid
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
    formatdata: function (changepage) {
        var that = exam_electrocardiogram_data;

        if (!that.datalist || that.datalist.length == 0)
            return;

        var length = that.datalist.length;
        that.datalength = length;
        that.pageAccount = Math.ceil(length / that.pageLength);

        if (changepage)
            that.changePage(1);

    },
    changePage: function (index) {
        var that = exam_electrocardiogram_data;

        if (that.pageAccount < index || index < 1) return;
       
        //获取数据
        if (!that.data_loadfinished && index >= that.pageAccount) {
            that.loaddata(function () {
                that.formatdata(false);
                //计算翻页状态
                that.format_page_turning(index);
                //生成页面数据   
                that.format_table(index);
            });
            return;
        }        

        //计算翻页状态
        that.format_page_turning(index);
        //生成页面数据        
        that.format_table(index);
    },
    //计算翻页状态
    format_page_turning:function(index){
        var that = exam_electrocardiogram_data;
        var up = null, down = null, data_up = "";
        var showUp = true, showDown = true;
        var last_td_id = 0;

        up = document.all("d_upctr");
        down = document.all("d_downctr");

        up.style.display = "none";
        down.style.display = "none";

        if (that.pageAccount < index || index < 1) return;

        if (index <= 1)
            showUp = false;
        if (index >= that.pageAccount) {
            showDown = false;
            last_td_id = that.data_alllength % that.pageLength - 1;
        }
        else
            last_td_id = 7;
            
        data_up = "td_" + last_td_id;
        up.setAttribute("data-up", data_up);
        down.setAttribute("data-up", data_up);

        if (showUp) {
            up.style.display = "block";
            if (showDown) {
                down.style.display = "block";
                up.setAttribute("data-right", "d_downctr");
                down.setAttribute("data-left", "d_upctr");
            }
            else {
                up.setAttribute("data-right", "");
            }
        }
        else if (showDown) {
            down.style.display = "block";
            down.setAttribute("data-left", "d_left");
        }        

        if (that.control && that.control != null) {
            var control = that.control;
            if (control.curid == "d_upctr" && !showUp) {
                if (showDown)
                    control.selid("d_downctr")
                else
                    control.selid("d_left");
            }
            if (control.curid == "d_downctr" && !showDown) {
                if (showUp)
                    control.selid("d_upctr")
                else
                    control.selid("d_left");
            }
        }
    },
    //生成页面数据        
    format_table: function (index) {
        var that = exam_electrocardiogram_data;
        var start = 0, end = 0, startindex = 0;
        var arrimg = "", result = "";
        var tbody = document.all("tbbody");
        var up = null, down = null, left = null;
        var showUp = false, showDown = false;
        var td_right = "", html = "";

        up = document.all("d_upctr");
        down = document.all("d_downctr");
        left = document.all("d_left");
        left.setAttribute("data-right", "");

        if (that.pageAccount < index || index < 1) return;       

        if (up.style.display != "none")
            showUp = true;
        if (down.style.display != "none")
            showDown = true;

        if (showUp)
            td_right = " data-right='d_upctr' ";
        else if (showDown)
            td_right = " data-right='d_downctr' ";

        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        arrimg = "<img src='" + arrowurl + "' />";
        for (var i = 0; i <= 7; i++) {
            startindex = i + start;
            if (startindex <= end) {
                if (i == 0){
                    left.setAttribute("data-right", "td_0");
                    upCtr = "";
                }                   
                else
                    upCtr = "td_" + (i - 1);

                if (i == 7 || startindex == end) {

                    if (that.pageAccount <= 1)
                        downCtr = "";
                    else if (showUp)
                        downCtr = "d_upctr";
                    else
                        downCtr = "d_downctr";
                }
                else
                    downCtr = "td_" + (i + 1);

                upCtr = " data-up='" + upCtr + "' ";
                downCtr = " data-down='" + downCtr + "' ";

                obj = that.datalist[i + start];
                if (!obj) {
                    html += that.getEmptyHtml();
                    continue;
                }
                switch (obj.ecgResult) {
                    case 0: result = "未诊断"; break;
                    case 1: result = "未见异常"; break;
                    case 2: result = "异常"; break;
                    case 3: result = "测量不正确"; break;
                    default: result = ""; break;
                }
                flag = "";
                html += "<tr>";
                html += "<td>" + obj.measureTime + "</td>";
                html += "<td id='td_" + i + "' data-left='d_left' " + upCtr + downCtr + td_right + " data-id='" + obj.id + "'><label >查看</label></td>";
                html += "<td></td>";
                html += "<td>" + result + "</td>";
                html += "<td>" + obj.mdevice + "</td>";
                html += "</tr>";
            }
            else {
                html += that.getEmptyHtml();
            }
        }

        tbody.innerHTML = html;
        that.curPageIndex = index;
    },
    changePage_old: function (index) {
        var that = exam_electrocardiogram_data;

        var start = 0, end = 0, startindex = 0;
        var html = "", flag = "", obj = null;
        var arrimg = "", result = "";
        var upCtr = "", downCtr = "";
        var up = null, down = null, left = null,data_up="";
        var lastIndex = -1;
        var showUp = false, showDown = false;

        up = document.all("d_upctr");
        down = document.all("d_downctr");
        left = document.all("d_left");

        left.setAttribute("data-right", "");

        if (that.pageAccount < index || index < 1) return;
        start = (index - 1) * that.pageLength;
        end = start + that.pageLength;

        if (that.datalength <= end)
            end = that.datalength - 1;

        arrimg = "<img src='" + arrowurl + "' />";
        

        for (var i = 0; i <= 7; i++) {
            startindex = i + start;
            if (startindex <= end) {
                lastIndex = i;
                if (i == 0)
                    upCtr = "";
                else
                    upCtr = "td_" + (i - 1);

                if (i == 7 || startindex==end){
                    
                    if (that.pageAccount <= 1)
                        downCtr = "";
                    else if (index >= that.pageAccount)
                        downCtr = "d_upctr";
                    else
                        downCtr = "d_downctr";
                }                    
                else
                    downCtr = "td_" + (i + 1);

                upCtr = " data-up='" + upCtr + "' ";
                downCtr = " data-down='" + downCtr + "' ";

                obj = that.datalist[i + start];
                if (!obj) {
                    html += that.getEmptyHtml();
                    continue;
                }
                switch (obj.ecgResult) {
                    case 0: result = "未诊断"; break;
                    case 1: result = "未见异常"; break;
                    case 2: result = "异常"; break;
                    case 3: result = "测量不正确"; break;
                    default: result = ""; break;
                }
                flag = "";
                html += "<tr>";
                html += "<td>" + obj.measureTime + "</td>";
                html += "<td id='td_" + i + "' data-left='d_left' " + upCtr + downCtr + " data-id='" + obj.id + "'><label >查看</label></td>";
                html += "<td></td>";
                html += "<td>" + result + "</td>";
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
        else {
            showUp = true;
            up.style.display = "block";
        }            

        if (index >= that.pageAccount) {
            that.loaddata(function () {
                that.formatdata(false);
                if (that.pageAccount <= that.curPageIndex)
                    down.style.display = "none";
                else
                    down.style.display = "block";
            });
            //return;
        }
        else {
            down.style.display = "block";
            showDown = true;
        }            

        data_up = "";
        if (lastIndex >= 0)
            data_up = "td_" + lastIndex;

        up.setAttribute("data-up", data_up);
        down.setAttribute("data-up", data_up);

        left.setAttribute("data-right", "td_0");
        if (showUp) {
            down.setAttribute("data-left", "d_upctr");
        }
        else {
            down.setAttribute("data-left", "d_left");
        }
        if (showDown){
            up.setAttribute("data-right", "d_downctr");
        }            
        else
            up.setAttribute("data-right", "");

        if (that.control && that.control != null) {
            var control = that.control;
            if (control.curid == "d_upctr" && !showUp) {
                if (showDown)
                    control.selid("d_downctr")
                else
                    control.selid("d_left");
            }
            if (control.curid == "d_downctr" && !showDown) {
                if (showUp)
                    control.selid("d_upctr")
                else
                    control.selid("d_left");
            }
        }
    },
    getEmptyHtml: function () {
        return "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
    },
    enter: function (key) {
        var that = exam_electrocardiogram_data;
        var control = this;
        var curid = "",ctr=null, up = null, down = null, ecgid = "";

        if (that.control != null)
            control = that.control;

        curid = control.curid;
        ctr=control.curCtr;
        if(!curid || curid=="")return;

        if(curid=="d_downctr"){
            that.changePage(that.curPageIndex + 1);
        }
            
        else if (curid == "d_upctr"){
            that.changePage(that.curPageIndex - 1);
        }
            
        else if(curid == "d_left")
        {
            var backUrl = tp.util.getQueryString("backUrl");
            url = config.portal_exam_electrocardiogram_url;

            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));

            tp.util.redirectUrl(url);
        }
        else if (curid.startWith("td_")) {
            //展示心电图
            ecgid = ctr.getAttribute("data-id");
            that.loadEcgImg(ecgid);
        }
    },
    selid:function(id){
        var that = exam_electrocardiogram_data;
        var control = this;
        var lbl = null;

        var ctr = document.all(id);
        if (!ctr) return;
        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (id.startWith("td_")) {
            lbl = ctr.children[0];
            lbl.style.color = "#bff668";
        }
       
        var className = ctr.getAttribute("class");
        if (!className || className == null)
            className = "";
        if (!className.contains("goods-order-focus"))
            className += " goods-order-focus";
        ctr.setAttribute("class", className);        

        control.curCtr = ctr;
        control.curid = id;
    },
    unselid: function (id) {
        var that = exam_electrocardiogram_data;
        var ctr = document.all(id);
        var lbl = null;
        var control = this;
        if (!ctr) return;

        if (id.startWith("td_")) {
            lbl = ctr.children[0];
            lbl.style.color = "whitesmoke";
        }
     
        var className = ctr.getAttribute("class");
        if (!className || className == null)
            className = "";
        if (className.contains("goods-order-focus"))
            className = className.replace("goods-order-focus", "");
        ctr.setAttribute("class", className);
        

        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    },
    loadEcgImg: function (id) {
        var that = exam_electrocardiogram_data;
        var control = that.control;
        var imgdata = null, url = "";

        url = config.cbs_newreach_healthecg + "?usercode=" + m_usercode + "&user_session=" + m_user_session;
        url = tp.util.appendParam(url, "token", that.newreach_token);
        url = tp.util.appendParam(url, "ecgid", id);

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                //that.location();
                //callback();
                that.showEcgImg(imgdata);
            }
        });

        //loaddata
        tp.ajax({
            url: url,
            success: function (data) {
                //数据格式化
                var jsondata = that.initData(data);
                
                if (jsondata && jsondata.retcode == 0 && jsondata.data) {
                    imgdata = jsondata.data.imgdata;
                }
                else {
                    tp.util.showMsg("data-error");
                }
                tp_ui.popup.loading.close();
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
    showEcgImg: function (imgdata) {
        var that = exam_electrocardiogram_data;
        var control = that.control;
        var htmlContent = "";

        if (!imgdata || imgdata == null || imgdata == "")
            return;

        htmlContent += "<div ><img style='height:400px' id=\"ecgimg\" src=\"data:image/png;base64," + imgdata + "\" /><br />";
        htmlContent += "<div style=\"position: absolute;margin-top: 10px;margin-left: 475px;display:none;\" id=\"ecg_left\" data-right=\"ecg_right\">";
        htmlContent += " <img src=\"../../app/home/Public/img/exam/exam_left.png\" />";
        htmlContent += "</div>";
        htmlContent += "<div style=\"position: absolute;margin-top: 10px;margin-left: 640px;\" id=\"ecg_right\" data-left=\"ecg_left\">";
        htmlContent += " <img src=\"../../app/home/Public/img/exam/exam_right.png\" />";
        htmlContent += "</div>";
        htmlContent += "</div>";

        that.ecg_account = 0;
        tp_ui.popup.page.show({
            width: 1200,
            height: 500,
            defaultid: "ecg_right",
            html: htmlContent,
            backOpacity:"0.9",
            closeCallBack: function () {
                //that.location();
                //callback();
                //that.showEcgImg(imgdata);
                that.control.begin();
            },
            move:function(key){
                var control = this;
                var margin = 0;

                if (key != tp_move_key.left && key != tp_move_key.right )
                    return;

                var ecg_img = document.all("ecgimg"), ecg_left = document.all("ecg_left"), ecg_right = document.all("ecg_right");
                margin = ecg_img.style.marginLeft;
                margin = margin.replace("px", "");
                if (!margin || margin == null) margin = 0;
                else
                    margin = parseInt(margin);

                if(key == tp_move_key.left)
                {
                    if (that.ecg_account <= 0) return;
                    margin += 800;
                    ecg_img.style.marginLeft = margin + "px";
                    that.ecg_account--;
                }
                else {
                    if (that.ecg_account >= 3) return;
                    margin -= 800;
                    ecg_img.style.marginLeft = margin + "px";
                    that.ecg_account++;
                }

                ecg_left.style.display = "block";
                ecg_right.style.display = "block";
                if (that.ecg_account <= 0) {
                    ecg_left.style.display = "none";
                    control.selid("ecg_right");
                }
                if (that.ecg_account >= 3) {
                    ecg_right.style.display = "none";
                    control.selid("ecg_left");
                }
            },
            selid: function (id) {
                return;
                var control = this;
                var ctr = document.all(id);
                if (!ctr) return;

                if (!control) return;
                that.ecg_unselid(control.curid);

                var className = ctr.getAttribute("class");
                if (!className || className == null)
                    className = "";
                if (!className.contains("goods-order-focus"))
                    className += " goods-order-focus";
                ctr.setAttribute("class", className);

                control.curCtr = ctr;
                control.curid = id;

            },
            enter: function (id) {
                var control = this;
                if (control.esc)
                    control.esc(id);
                return;


                var ecg_img = document.all("ecgimg"), ecg_left = document.all("ecg_left"), ecg_right = document.all("ecg_right");
                var margin = 0;

                if (!control) return;

                if (control.curid == "ecg_left") {
                    margin = ecg_img.style.marginLeft;
                    margin = margin.replace("px", "");
                    if (!margin || margin == null) margin = 0;
                    else
                        margin = parseInt(margin);
                    margin += 800;
                    ecg_img.style.marginLeft = margin + "px";
                    that.ecg_account--;
                }
                else if (control.curid == "ecg_right") {
                    margin = ecg_img.style.marginLeft;
                    margin = margin.replace("px", "");
                    if (!margin || margin == null) margin = 0;
                    else
                        margin = parseInt(margin);
                    margin -= 800;
                    ecg_img.style.marginLeft = margin + "px";
                    that.ecg_account++;
                }
                ecg_left.style.display = "block";
                ecg_right.style.display = "block";
                if (that.ecg_account <= 0) {
                    ecg_left.style.display = "none";
                    control.selid("ecg_right");
                }
                if (that.ecg_account >= 3) {
                    ecg_right.style.display = "none";
                    control.selid("ecg_left");
                }                    
            }
        });
    },
    ecg_unselid: function (id) {
        var that = exam_electrocardiogram_data;
        var control = this;

        var ctr = document.all(id);

        if (!ctr) return;
        if (!control) return;

        var className = ctr.getAttribute("class");
        if (!className || className == null)
            className = "";
        if (className.contains("goods-order-focus"))
            className = className.replace("goods-order-focus", "");
        ctr.setAttribute("class", className);

        if (id == control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    }
}