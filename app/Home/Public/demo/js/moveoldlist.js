
function androidKeyDown(key) {
    var e = {};
    e.keyCode = key;
    moveHelper.keyDownFn(e);
}


var moveHelper = {
    currentCtr: null,//当前选择的控件（磁贴、导航）
    preTdCtr:null,//切换导航前的磁贴td
    initialize: function () {
        var that = this;
        var tdCtr = null;

        if (typeof (afterPageInit) != "undefined" && typeof (afterPageInit) == "function")
            afterPageInit();
        document.onkeydown = function (e) {
            that.keyDownFn(e);
        };
    },
    //初始化当前导航样式
    formatNav: function () {
        if (typeof(navid) == "undefined") return;
        var navCtr = document.getElementById(navid);
        if (navCtr == null || navCtr == undefined)
            return;
        navCtr.className = "navbar";
        navCtr.children[0].className = 'curpage';
    },
    //获取最右侧td
    getRightTD:function(){
        var tbCtr = document.getElementById(tableid);
        var rows = tbCtr.rows;
        if (rows == null || rows == undefined || rows.length <= 0)
            return null;
        return rows[0].cells[rows[0].cells.length - 1];
    },
    //获取td内的div
    getBorderDiv: function (tdCtr) {
        if (tdCtr == null || tdCtr == undefined) return null;
        return tdCtr.children[0];
    },
    //选择当前磁贴TD
    selectTdBorder: function (tdCtr) {
        if (tdCtr == null || tdCtr == undefined) return;
        if (this.currentCtr != null) {
            this.getBorderDiv(this.currentCtr).className = 'tile';
        }
        this.getBorderDiv(tdCtr).className = 'tile wrap';
        this.currentCtr = tdCtr;
    },
    //选择当前导航
    selectNavBorder: function () {
        var navCtr = document.getElementById(navid);
        if (navCtr == null || navCtr == undefined) return;
        if (this.currentCtr != null) {
            this.preTdCtr = this.currentCtr;
            this.getBorderDiv(this.currentCtr).className = 'tile';
        }
        navCtr.className = "navbar sel";
        navCtr.children[0].className = '';
        this.currentCtr = navCtr;
    },
    //按键处理方法
    keyDownFn: function (e) {
        var e = e || event;
        var currKey = e.keyCode || e.which || e.charCode;
        //if ((currKey > 7 && currKey < 14) || (currKey > 31 && currKey < 47)) {
        //    switch (currKey) {
        //        case 8: keyName = "[退格]"; break;
        //        case 9: keyName = "[制表]"; break;
        //        case 13: keyName = "[回车]"; break;
        //        case 32: keyName = "[空格]"; break;
        //        case 33: keyName = "[PageUp]"; break;
        //        case 34: keyName = "[PageDown]"; break;
        //        case 35: keyName = "[End]"; break;
        //        case 36: keyName = "[Home]"; break;
        //        case 37: keyName = "[方向键左]"; break;
        //        case 38: keyName = "[方向键上]"; break;
        //        case 39: keyName = "[方向键右]"; break;
        //        case 40: keyName = "[方向键下]"; break;
        //        case 46: keyName = "[删除]"; break;
        //        default: keyName = ""; break;
        //    }
        //}

        if (currKey != 8 && currKey != 13 && currKey != 27 && currKey != 37 && currKey != 38 && currKey != 39 && currKey != 40)
            return;

        //方向键
        if (currKey > 36 && currKey < 41) {
            if (typeof (changeDirect) != "undefined" && typeof (changeDirect) == "function")
                changeDirect(currKey);
            else
                this.changeFocus(currKey);
        }
        else if (currKey == 8 || currKey == 27) {//后退&esc
            this.goBack(currKey);
        }
        else if (currKey == 13) {//回车
            this.doEnter(currKey);
        }
    },
    //响应方向键
    changeFocus: function (key) {
        if (this.currentCtr == null || this.currentCtr==undefined) return;
        var nextID = '';
        if (this.judgeCurrentType()==1) {//响应导航
            if (key == 37) {//left
                if (leftPage == null || leftPage == '' || leftPage == undefined)
                    return;
                var url = tp.util.appendParam(leftPage, "from", "rightnav");
                this.redirectUrl(url);
            }
            else if (key == 39) {//right
                if (rightPage == null || rightPage == '' || rightPage == undefined)
                    return;
                var url = tp.util.appendParam(rightPage, "from", "leftnav");
                this.redirectUrl(url);
            }
            else if (key == 40) {//down
                var tdCtr = null;
                if (this.preTdCtr != null && this.preTdCtr != undefined)
                    tdCtr = this.preTdCtr;
                else
                    tdCtr = document.getElementById('td0');
                this.currentCtr.className = "navbar";
                this.currentCtr.children[0].className = 'curpage';
                this.currentCtr = null;
                this.selectTdBorder(tdCtr);
            }
        }
        else {//响应磁贴
            if (key == 37) {//left
                nextID = this.currentCtr.getAttribute('data-left');
            }
            else if (key == 38) {//up
                nextID = this.currentCtr.getAttribute('data-up');
				if(nextID=="td0"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>登陆送鸡蛋</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td1"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>扫码送油</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td2"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>鸡蛋免费</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td3"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>瓜子免费</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td4"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>免费体检</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td5"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>周末旅游</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td6"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>横扫夏日</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td7"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>夕阳红</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td8"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>健康讲堂</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td9"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>献爱心活动</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}
            }
            else if (key == 39) {//right
                nextID = this.currentCtr.getAttribute('data-right');
            }
            else if (key == 40) {//down
                nextID = this.currentCtr.getAttribute('data-down');
				if(nextID=="td0"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>登陆送鸡蛋</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td1"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>扫码送油</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td2"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>鸡蛋免费</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td3"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>瓜子免费</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td4"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>免费体检</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td5"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>周末旅游</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td6"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>横扫夏日</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td7"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>夕阳红</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td8"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>健康讲堂</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}else if(nextID=="td9"){
					document.getElementById("mov").innerHTML="<table style='width:650px; float:right; height:550px; border:1px #999 solid; margin-top:-552px; margin-right:70px; background-color:#FFF; opacity: 0.5;'><tr><td style='text-align:center; height:50px;'><h1>献爱心活动</h1></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动时间：2015年4月1日————2015年6月1日</h2></td></tr><tr><td style='height:50px;'><h2 style='margin-left:30px;'>活动详情：</h2><span style='font-size:18px; color:525252; margin-left:30px;'>1.凭兑换码可以去以下地址领取1枚鸡蛋<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址1：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td></tr><tr><td></td></tr></table>";
				}
            }

            if (nextID == '' || nextID == null || nextID == undefined) {
                if (key == 37) {//向左侧切换页面
                    if (leftPage == null || leftPage == '' || leftPage == undefined)
                        return;
                    var url = tp.util.appendParam(leftPage, "from", "right");
                    this.redirectUrl(url);
                }
                else if (key == 39) {//向右侧切换页面
                    if (rightPage == null || rightPage == '' || rightPage == undefined)
                        return;
                    var url = tp.util.appendParam(rightPage, "from", "left");
                    this.redirectUrl(url);
                }
                if (key == 38) {//选择当前导航
                    this.selectNavBorder();
                }
                return;
            }
            var nextTdCtr = document.getElementById(nextID);
            this.selectTdBorder(nextTdCtr);
        }
    },
    //返回或回退键
    goBack: function (key) {
        if (typeof (afterGoBack) != "undefined" && typeof (afterGoBack) == "function")
            afterGoBack(key);
        else {
            var backUrl = tp.util.getQueryString('backUrl');
            if (backUrl != null && backUrl != undefined && backUrl != "")
            {
                this.redirectUrl(backUrl);
            }
        }
    },
    //回车键
    doEnter: function () {
        if (typeof (afterEnter) != "undefined" && typeof (afterEnter) == "function")
            afterEnter(this.currentCtr);
        else {
            if (this.judgeCurrentType() != 2) return;
            var url = this.currentCtr.getAttribute('jump-url');
            if (url == null || url == undefined || url == '') return;
            var fromID = this.currentCtr.id;
            
            var backUrl = pageUrl;
            var curBackUrl = tp.util.getQueryString("backUrl");
            backUrl = tp.util.appendParam(backUrl, "fromID", fromID);
            if (curBackUrl != null && curBackUrl != "")
                backUrl = tp.util.appendParam(backUrl, "backUrl", encodeURIComponent(curBackUrl));
            
            backUrl = encodeURIComponent(backUrl);
            url = tp.util.appendParam(url, "backUrl", backUrl);
            this.redirectUrl(url);
        }
    }
    , judgeCurrentType: function () {//判断当前焦点下的控件类型（1：导航、2：首页磁贴、3：列表页磁贴）
        if(this.currentCtr.tagName == "DIV")
            return 1;
        else return 2;
    },
    redirectUrl: function (url) {
        if (typeof (redirectUrl) != "undefined" && typeof (redirectUrl) == "function")
            redirectUrl(url);
        else
            window.location.href = url;
    }
}