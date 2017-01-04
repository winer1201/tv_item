function afterRightEnd() {

}

function afterLeftEnd() {

}

////返回或回退键
function afterGoBack(key) {
    if (key != 8 && key != 27)
        return;
    if (moveHelper.currentCtr.id != "td0") {
        var tdCtr = document.getElementById('td0');
        moveHelper.formatNav();
        moveHelper.selectTdBorder(tdCtr);
    }
    else {
        //先回首页
        var backUrl = tp.util.getQueryString('backUrl');
        window.location.href = backUrl;
    }
}

function afterPageInit() {
    listInstance.init();
}

var listInstance = {
    backUrl: null,
    init: function () {
        loadingHelper.loadbg(config.portal_public_url  + "img/oldcard/portal_BG.png");
        this.backUrl = tp.util.getQueryString('backUrl');
        this.setDefaultFocus();
    },
    setDefaultFocus: function () {
        var fromID = tp.util.getQueryString('fromID');
        var pageNumber = tp.util.getQueryString('pageNumber');
        var tdCtr=null;
        if(fromID!=null && fromID!=undefined&& fromID!='')
            tdCtr = document.getElementById(fromID);
        if (tdCtr == null || tdCtr == undefined || tdCtr == '') {
            tdCtr = document.getElementById('td0');
        }
        if (tdCtr != null && tdCtr != undefined)
            moveHelper.selectTdBorder(tdCtr);
    }
}

//回车键处理方法
//function afterEnter(ctr) {
//    if (ctr == null || ctr == undefined) return;
//    var url = ctr.getAttribute('jump-url');
//    if (url == null || url == undefined || url == '') return;
//    var fromID = this.currentCtr.id;
//    var backUrl = pageUrl + "?fromID=" + fromID;
//    backUrl = tp.util.appendParam(pageUrl, "fromID", fromID);
//    url = tp.util.appendParam(url, "backUrl", backUrl);
//    window.location.href = url;
//}