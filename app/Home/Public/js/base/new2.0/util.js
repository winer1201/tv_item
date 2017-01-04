var tp = {

}
tp.util = {
    getQueryString: function (name) {
        var sResult = "";
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) sResult = unescape(r[2]);
        if (sResult == null || sResult == undefined && sResult == "undefined")
            sResult = "";
        return sResult;
    },
    //给当前URL追加参数
    replaceParam: function (url, parames) {
        var pattern = /(\w+)=(\w)/g;
        var urlparames = {};
        if (!url) return "";
        url.replace(pattern, function (a, b, c) {
            urlparames[b] = c;
        });
        for (var i = 0; i < parames.length; i++) {
            urlparames[parames[i].name] = parames[i].value;
        }
        if (url.indexOf("?") >= 0) {
            url = url.substring(0, url.indexOf("?"));
        }
        url = url + "?";
        for (var key in urlparames) {
            url = (url + (key + "=" + urlparames[key]) + "&");
        }
        if (url.lastIndexOf("&") + 1 == url.length) {
            url = url.substring(0, url.lastIndexOf("&"));
        }
        return url;
    },
    appendParam: function (url, paramName, paramValue) {
        if (!url) return "";
        if (url.indexOf("?") >= 0)
            url += "&";
        else
            url += "?";
        url += paramName + "=" + paramValue;
        return url;
    },
    redirectUrl: function (url) {
        url = this.appendParam(url, "_v", this.getRandom());
        window.location.href = url;
    },
    getRandom:function(){
        var dom = Math.random();
        dom = dom * 100000;
        dom = Math.floor(dom);
        return dom;
    },
    showMsg: function (msg,arg) {
        tp_ui.popup.message.show({
            text:msg
        });        
        setTimeout(function () {
            tp_ui.popup.message.close();
        }, 1000);
    },
    base64_encode: function (param) {
        var base64Obj = new base64Encode();
        var param16to8 = "";
        param16to8 = base64Obj.utf16to8(param);
        param = base64Obj.base64encode(param16to8);
        return param;
    },
    delchar: function (str) {
        if (!str || delchar == null || delchar == "") return "";
        return str.substring(0, str.length - 1);
    }
}

tp.util.base64Encode = function () {
    this.base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    this.base64decodechars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
}

tp.util.base64Encode.prototype = {
    base64encode: function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += this.base64encodechars.charAt(c1 >> 2);
                out += this.base64encodechars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += this.base64encodechars.charAt(c1 >> 2);
                out += this.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += this.base64encodechars.charAt((c2 & 0xf) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += this.base64encodechars.charAt(c1 >> 2);
            out += this.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += this.base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
            out += this.base64encodechars.charAt(c3 & 0x3f);
        }
        return out;
    },
    base64decode: function (str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {

            do {
                c1 = this.base64decodechars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            do {
                c2 = this.base64decodechars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = this.base64decodechars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = this.base64decodechars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    },
    utf16to8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007f)) {
                out += str.charAt(i);
            } else if (c > 0x07ff) {
                out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
            } else {
                out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
            }
        }
        return out;
    },
    utf8to16: function (str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0f) << 12) |
                       ((char2 & 0x3f) << 6) |
                       ((char3 & 0x3f) << 0));
                    break;
            }
        }
        return out;
    }
};

tp.ajax = function (options) {
    try{
        var ajax = new tp.ajax.func(options);
        if (!ajax) return false;
        return ajax.send();
    }
    catch (e) {
        return false;
    }
}

tp.ajax.func = function (options) {    
    var me = this;
    this.method = "POST";
    this.url = "";
    this.async = true;
    this.data = "";
    this.success = function () { };
    this.error = function () { };
    this.loading = function () { };
    this.xmlHttp = false;
    this.createRequest = function () {
        try {
            me.xmlHttp = new XMLHttpRequest();        //FireFox专有  
        }
        catch (e) {
            try {
                me.xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
            }
            catch (e2) {
                try {
                    me.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e3) {
                    //alert("你的浏览器不支持XMLHTTP对象，请升级到IE6以上版本！");
                    me.xmlHttp = false;
                }
            }
        }        
    };
    this.send = function () {
        if (me.url == "") {
            return false;
        }
        if (!me.xmlHttp) {
            return IframePost();
        }

        try {
            me.url = tp.util.appendParam(me.url, "_v", tp.util.getRandom());//增加随机数,防止缓存
            me.xmlHttp.open(me.method, me.url, me.async);
            if (me.method == "POST") {
                me.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            me.xmlHttp.onreadystatechange = function () {
                if (me.xmlHttp.readyState == 4) {
                    if (me.xmlHttp.status == 200) {
                        var response = me.xmlHttp.responseText;
                        me.xmlHttp = null;
                        if (typeof (me.success) == "function")
                            me.success(response);
                    }
                    else {
                        var http = me.xmlHttp;
                        me.xmlHttp = null;
                        if (typeof (me.error) == "function")
                            me.error(http, "http error");
                    }
                    me.xmlHttp = null;                
                }
                else {
                    if (typeof (me.loading) == "function")
                        me.loading();
                }
            }
            if (me.method == "POST") {
                me.xmlHttp.send(me.data);
            }
            else {
                me.xmlHttp.send(null);
            }
        }
        catch (e) {
            me.error(me.xmlHttp, "error", e);
        }
    };

    try{
        if (options != undefined || options != null) {
            if (options.method != null && options.method != undefined)
                this.method = options.method;
            if (options.url != null && options.url != undefined)
                this.url = options.url;
            if (options.async != null && options.async != undefined)
                this.async = options.async;
            if (options.data != null && options.data != undefined)
                this.data = options.data;
            if (typeof (options.success) == "function" && options.success != null && options.success != undefined)
                this.success = options.success;
            if (typeof (options.error) == "function" && options.error != null && options.error != undefined)
                this.error = options.error;
            if (typeof (options.loading) == "function" && options.loading != null && options.loading != undefined)
                this.loading = options.loading;
        }
        //创建request对象
        this.createRequest();
        //发送数据
        //this.send();
    }
    catch(e)
    {
        return false;
    }
    return true;
}
tp_ui = {

}
tp_ui.popup = {
    loading: {
        loadingid: "tp_popup_title_loading",
        show: function (options) {
            var argOptions = {
                id: this.loadingid,
                width: 220,
                height: 220,
                cancel: true,
                title: 'loading..',
                //text:"loading...",
                closeCallBack: function () { },
                removeCallBack: function () { }
            };
            if (options != null && options != undefined) {
                if (options.title != null && options.title != undefined)
                    argOptions.title = options.title;
                if (options.text != null && options.text != undefined)
                    argOptions.text = options.text;
                if (options.cancel != null && options.cancel != undefined)
                    argOptions.cancel = options.cancel;
                if (options.width != null && options.width != undefined)
                    argOptions.width = options.width;
                if (options.height != null && options.height != undefined)
                    argOptions.height = options.height;
                if (options.closeCallBack)
                    argOptions.closeCallBack = options.closeCallBack;
                if (options.removeCallBack)
                    argOptions.removeCallBack = options.removeCallBack;
            }

            tp_ui.popup.showModal(argOptions);
            //设置居中
            var divcontent = document.all("tp-ui-popup-content-" + this.loadingid);
            if (divcontent) {
                divcontent.style.top = -1 * divcontent.offsetHeight / 2 + "px";
            }
        },
        close: function () {
            var that = this;
            setTimeout(function () {
                var closeResult = tp_ui.popup.close(that.loadingid);                
            }, 300);
        }
    },
    message:{
        messageid: "tp_popup_message",
        show: function (options) {
            var argOptions = {
                id: this.messageid,
                width: 600,
                height: 50,
                cancel: false,
                title: '',
                text: "出错了.",
                listenEvent: false,
                //style: 1,
                backOpacity:"0",
                closeCallBack: function () { },
                removeCallBack: function () { }
            };
            if (options != null && options != undefined) {
                if (options.title != null && options.title != undefined)
                    argOptions.title = options.title;
                if (options.text != null && options.text != undefined)
                    argOptions.text = options.text;
                if (options.cancel != null && options.cancel != undefined)
                    argOptions.cancel = options.cancel;
                if (options.width != null && options.width != undefined)
                    argOptions.width = options.width;
                if (options.height != null && options.height != undefined)
                    argOptions.height = options.height;
                if (options.closeCallBack)
                    argOptions.closeCallBack = options.closeCallBack;
            }
            tp_ui.popup.showModal(argOptions);
            //设置居中
            var divcontent = document.all("tp-ui-popup-box-" + this.messageid);
            if (divcontent) {
                divcontent.style.top = divcontent.offsetHeight / 3 - 30 + "px";
            }
        },
        close: function () {
            var that = this;
            setTimeout(function () {
                var closeResult = tp_ui.popup.close(that.messageid);
            }, 300);
        }
    },
    page:{
        pageid: "tp_popup_page",
        show: function (options) {
            var argOptions = {
                id: this.pageid,
                width: 220,
                height: 220,
                cancel: true,
                title: '',
                style: 1,
                //text:"loading...",
                closeCallBack: function () { },
                removeCallBack: function () { }
            };
            if (options != null && options != undefined) {
                if (options.title != null && options.title != undefined)
                    argOptions.title = options.title;
                if (options.text != null && options.text != undefined)
                    argOptions.text = options.text;
                if (options.html != null && options.html != undefined)
                    argOptions.html = options.html;
                if (options.cancel != null && options.cancel != undefined)
                    argOptions.cancel = options.cancel;
                if (options.width != null && options.width != undefined)
                    argOptions.width = options.width;
                if (options.height != null && options.height != undefined)
                    argOptions.height = options.height;
                if (options.closeCallBack)
                    argOptions.closeCallBack = options.closeCallBack;
                if (options.removeCallBack)
                    argOptions.removeCallBack = options.removeCallBack;
                if (options.enter)
                    argOptions.enter = options.enter;
                if (options.selid)
                    argOptions.selid = options.selid;
                if (options.defaultid)
                    argOptions.defaultid = options.defaultid;
                if (options.move)
                    argOptions.move = options.move;
                argOptions.defaultid = options.defaultid;
                if (options.backOpacity)
                    argOptions.backOpacity = options.backOpacity;
                
                
            }

            tp_ui.popup.showModal(argOptions);
            //设置居中
            var divcontent = document.all("tp-ui-popup-content-" + this.pageid);
            if (divcontent) {
                divcontent.style.top = -1 * divcontent.offsetHeight / 2 + "px";
            }
        },
        close: function () {
            var that = this;
            setTimeout(function () {
                var closeResult = tp_ui.popup.close(that.pageid);
            }, 300);
        }
    },
    showModal: function (options) {
        //var argOptions =
        //    {
        //        //default options
        //        size: 'large',
        //        padding: 0,
        //        width: 400,
        //        height: 300
        //    };
        //if (options != null || options != undefined) {
        //    //property
        //    if (options.id != null || options.id != undefined)
        //        argOptions.id = options.id;
        //    if (options.title != null && options.title != undefined)
        //        argOptions.title = options.title;
        //    if (options.width != null && options.width != undefined)
        //        argOptions.width = options.width;
        //    if (options.height != null && options.height != undefined)
        //        argOptions.height = options.height;
        //    if (options.cancel != null && options.cancel != undefined)
        //        argOptions.cancel = options.cancel;
        //}
        if (options && options.id && options.id != "")
            this.close(options.id);

        var d = new tp_ui.dialog(options);
        d.width(options.width);
        d.height(options.height);
        d.showModal();
    },
    close: function (id,returnValue) {
        var d = null;

        var d = tp_ui.dialog.get(id);
        if (d == null || d == undefined) return false;

        d.close(returnValue).remove();
        return true;
    },
    width: function (id,value) {
        var d = null;

        if (!id || !value)
            return false;

        d = tp_ui.dialog.get(id);
        if (!d) return false;

        d.width(value);
        return true;
    },
    height: function (id,value) {
        var d = null;
       
        if (!id || !value)
            return false;

        d = tp_ui.dialog.get(id);
        if (!d) return false;

        d.height(value);
        return true;
    }
}

tp_ui.dialog = function (options) {
    var that = this;
    var beforEvent = null;
    var ctr = null;
    this.g_id = tp.util.getRandom();
    this.id = null;
    var popupListen = null;

    var defaultOptions = {
        id: "tp-ui-dialog-id",
        title: "",
        text: "",
        html:null,
        pageWidth: 1280,
        pageHeight:720,
        width: 400,
        height: 300,
        backOpacity:0.7,
        ok: null,
        okimg:null,
        cancel: null,
        cancelimg: null,
        listenEvent: true,
        style: 0,//0:全屏；1：弱提示,
        escClose: that.close,
        closeCallBack: function () { },
        removeCallBack: function () { }
    };

    if (options) {
        if (options.id)
            defaultOptions.id = options.id;
        if (options.title)
            defaultOptions.title = options.title;
        if (options.text)
            defaultOptions.text = options.text;
        if (options.html)
            defaultOptions.html = options.html;
        if (options.pageWidth)
            defaultOptions.pageWidth = options.pageWidth;
        if (options.pageHeight)
            defaultOptions.pageHeight = options.pageHeight;
        if (options.width)
            defaultOptions.width = options.width;
        if (options.height)
            defaultOptions.height = options.height;
        if (options.ok)
            defaultOptions.ok = options.ok;
        if (options.okimg)
            defaultOptions.okimg = options.okimg;
        if (options.cancel)
            defaultOptions.cancel = options.cancel;
        if (options.cancelimg)
            defaultOptions.cancelimg = options.cancelim;
        if (typeof (options.listenEvent) == "boolean")
            defaultOptions.listenEvent = options.listenEvent;
        if (options.style)
            defaultOptions.style = options.style;
        if (options.closeCallBack)
            defaultOptions.closeCallBack = options.closeCallBack;
        if (options.selid)
            defaultOptions.selid = options.selid;
        if (options.enter)
            defaultOptions.enter = options.enter;
        if (options.defaultid)
            defaultOptions.defaultid = options.defaultid;
        if (options.move)
            defaultOptions.move = options.move;
        if(options.backOpacity)
            defaultOptions.backOpacity = options.backOpacity;
    };

    if (defaultOptions.id)
        this.id = defaultOptions.id;


    this.width = function (value) {

    };
    this.height = function (value) {

    },
    this.close = function (returnValue) {
        var div_backdrop_id = "tp-ui-popup-backdrop-" + that.id;
        var div_backContent_id = "tp-ui-popup-backcontent-" + that.id;
        var divctr_drop = document.all(div_backdrop_id);
        var divctr_content = document.all(div_backContent_id);

        if (!divctr_drop || !divctr_content) return;

        divctr_drop.style.display = "none";
        divctr_content.style.display = "none";
        //卸载事件监听
        //if (defaultOptions.listenEvent && defaultOptions.listenEvent == true) {
        //    popupEvent.uninit();
        //}

        if (popupListen != null)
            popupListen.stop();

        defaultOptions.closeCallBack();


        //defaultOptions.closeCallBack = null;
        return that;
    };
    this.remove = function () {
        var div_backdrop_id = "tp-ui-popup-backdrop-" + that.id;
        var div_backContent_id = "tp-ui-popup-backcontent-" + that.id;
        var divctr_drop = document.all(div_backdrop_id);
        var divctr_content = document.all(div_backContent_id);

        if (!divctr_drop || !divctr_content) return;

        document.body.removeChild(divctr_drop);
        document.body.removeChild(divctr_content);
        //卸载事件监听
        //if (defaultOptions.listenEvent && defaultOptions.listenEvent == true) {
        //    popupEvent.uninit();
        //}

        if (popupListen != null)
            popupListen.uninit();
       
        defaultOptions.removeCallBack();

        removePopup(this);

    };
    this.showModal = function () {

    };

    function removePopup(p) {
        if (!p) return;
        var j = 0, dialog = null;

        for (var i = 0; i < tp_ui.dialog.arglist.length; i++) {
            dialog = tp_ui.dialog.arglist[i];
            if (dialog.id != p.id) {
                tp_ui.dialog.arglist[j] = tp_ui.dialog.arglist[i];
                j++;
            };
        }
        tp_ui.dialog.arglist.length = j;
    }


    defaultOptions.escClose = this.close;

    ctr = createPopup(defaultOptions);

    tp_ui.dialog.arglist.push(this);


    function createPopup(ops) {
        var pageWidth = 1280, pageHeight = 720;
        var width = 400, height = 300;
        var textContent = "";
        var htmlContent="";
        var html = "",popupContainer=null, popupNode = null, popupBackdropNode = null;
        var body = document.body;
        var popupContainerID = "tp-ui-popup-container";
        var backid = "tp-ui-popup-backdrop";
        var backconentid = "tp-ui-popup-backcontent";
        var boxid = "tp-ui-popup-box";
        var subid = "tp-ui-popup-sub";
        var contentid = "tp-ui-popup-content"
        var loadingimg = config.portal_public_url + "img/loading5.gif";


        pageWidth = body.offsetWidth;
        pageHeight = body.offsetHeight;

        if (ops) {
            if (ops.id && ops.id != "") {
                popupContainerID = popupContainerID + "-" + ops.id;
                backid = backid + "-" + ops.id;
                backconentid = backconentid + "-" + ops.id;
                boxid = boxid + "-" + ops.id;
                subid = subid + "-" + ops.id;
                contentid = contentid + "-" + ops.id;
            }
            if (ops.width)
                width = ops.width;
            if (ops.height)
                height = ops.height;
            if (ops.text)
                textContent = ops.text;
            if(ops.html)
                htmlContent = ops.html;
        }


        if (!pageWidth || pageWidth == "")
            pageWidth = document.body.offsetWidth;
        if (!pageHeight || pageHeight == "")
            pageHeight = document.body.offsetHeight;

        popupBackdropNode = document.createElement("div");
        popupBackdropNode.setAttribute("tabindex", "0");
        popupBackdropNode.setAttribute("id", backid);
        popupBackdropNode.style.width = pageWidth + "px";
        popupBackdropNode.style.height = pageHeight + "px";
        popupBackdropNode.className = "tp-popup-backdrop";
        popupBackdropNode.style.opacity = ops.backOpacity;
        body.appendChild(popupBackdropNode);

        popupNode = document.createElement("div");
        popupNode.setAttribute("tabindex", "0");
        popupNode.setAttribute("id", backconentid);
        popupNode.style.width = pageWidth + "px";
        popupNode.style.height = pageHeight + "px";
        popupNode.className = "tp-popup-backcontent";
        
        html += "<div tabindex=\"-1\" id=\"" + boxid + "\" class=\"tp-popup-box\">";
        html += "<div tabindex=\"-2\" id=\"" + subid + "\" class=\"tp-popup-sub\">";
        //if(ops.style=1)
        //    html += "<div tabindex=\"-3\" id=\"" + contentid + "\" class=\"tp-popup-content\" style=\"width:" + width + "px;height:" + height + "px;opacity:1; \">";
        //else
            html += "<div tabindex=\"-3\" id=\"" + contentid + "\" class=\"tp-popup-content\" style=\"width:" + width + "px;height:" + height + "px; \">";
        //content
        if (htmlContent && htmlContent != "")
            html += htmlContent;
        else if(textContent && textContent!=""){
            html += "<label >" + textContent + "</label>";
        }        
        else
        {
            html += "<img style='width:" + width + "px;height:" + height + "px' src = '" + loadingimg + "' />";
        }
        html += "</div>";
        html += "</div>";
        html += "</div>";

        
        popupNode.innerHTML = html;
        body.appendChild(popupNode);
    }
    //初始化popup事件监听
    if (defaultOptions.listenEvent && defaultOptions.listenEvent == true) {
        popupListen = new popupEvent({
            id: defaultOptions.id,
            defaultid: defaultOptions.defaultid ? defaultOptions.defaultid : null,
            selid: defaultOptions.selid ? defaultOptions.selid : null,
            extEnter: defaultOptions.enter ? defaultOptions.enter : null,
            extEsc: defaultOptions.escClose,
            extMove: defaultOptions.move ? defaultOptions.move : null,
        });
        popupListen.begin();
    }
};

tp_ui.dialog.arglist = new Array();

tp_ui.dialog.get = function (id) {
    var dialog = null;
    for(var i=0;i<tp_ui.dialog.arglist.length;i++)
    {
        dialog = tp_ui.dialog.arglist[i];
        if (dialog.id == id) {
            return dialog;
        }
    }
    return null;
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}

String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

String.prototype.contains = function (str) {
    if (str == null || this.length == 0 || str.length > this.length)
        return false;
    if (str == "")
        return true;
    if (this.indexOf(str) > -1)
        return true;

    return false;
}
