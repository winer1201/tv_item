//document.body.onload = function () {
//    oldcard_add_instance.init();
//}

function page_init() {
    oldcard_add_instance.init();
}

var oldcard_add_instance = {
    isvaling: false,
    valsec: 0,
    control: null,
    init: function () {
        var that = this;

        //加载背景图片
        loadingHelper.loadbg();

        that.actionlog("进入", "");
        //监听外设消息
        that.addlisten();
    },
    addlisten: function () {
        var that = oldcard_add_instance;
        that.control = new controlevent({
            extEsc: that.esc,
            extEnter: that.enter,
            selid: that.selid,
            numKey: that.onNumKey,
            doBackSpace:that.doback,
            defaultid: "txtcardno"
        });
        that.control.begin();
    },
    esc:function(key){
        var that = oldcard_add_instance;
        var backUrl = tp.util.getQueryString("backUrl");
        tp.util.redirectUrl(backUrl);

        that.actionlog("外设返回", "");
    },
    enter:function(key){
        var that = oldcard_add_instance;
        var control = this;
        if (that.control != null)
            control = that.control;
        var ctr = control.curCtr;
        var id = ctr.getAttribute("id");
       

        if (id != "btnverity" && id != "btnsubmit")
            return;

        var ctrCard = document.all("txtcardno");
        var ctrPhone = document.all("txtphoneno");
        var ctrVerity = document.all("txtveritycode");

        var cardno = ctrCard.value;
        var phone = ctrPhone.value;
        var verity = ctrVerity.value;

        if (id == "btnverity") {
            if (phone == "" || phone == "银行预留手机号" || !tp.util.phoneNumValied(phone)) {
                control.selid('txtphoneno');
                return;
            }
            if (that.isvaling) return;
            if (that.valsec > 0) return;

            var btnverity = document.all("btnverity");
            var numlbl = document.all("lblnum");
            btnverity.setAttribute("src", config.portal_public_url + "img/add_oldcard/valiedbg.png");
            //btnverity.style.enabled = false;
            btnverity.style.disabled = "disabled";
            numlbl.style.display = "block";
            var className = ctrPhone.getAttribute("class");
            if (!className.contains("item-text-val"))
                className += "  item-text-val";
            ctrPhone.setAttribute("class", className);
            that.valsec = 60;
            that.numCounter();

            that.actionlog("点击", "获取验证码[" + phone + "]");
        }
        else if (id == "btnsubmit") {

            if (cardno == "" || cardno == "卡号") {
                control.selid('txtcardno');
                return;
            }
            else if (phone == "" || phone == "银行预留手机号") {
                control.selid('txtphoneno');
                return;
            }
            else if (verity == "" || verity == "验证码") {
                control.selid('txtveritycode');
                return;
            }
            if (!tp.util.phoneNumValied(phone)) {//手机号是否合法
                control.selid('txtphoneno');
                return;
            }
            that.actionlog("点击", "提交_cardno[" + cardno + "]_phone[" + phone + "]_verity[" + verity + "]");
        }
    },
    onNumKey: function (key) {
        var that = oldcard_add_instance;
        var ctr = that.control.curCtr;
        var id = ctr.getAttribute("id");
        if (id != "txtcardno" && id != "txtphoneno" && id != "txtveritycode")
            return;
        if (id == "txtphoneno") {
            if (that.isvaling) return;
            if (ctr.value == "银行预留手机号")
                ctr.value = "";
        }
        else if (id == "txtcardno") {
            if (ctr.value == "卡号")
                ctr.value = "";
        }
        else if (id == "txtveritycode") {
            if (ctr.value == "验证码")
                ctr.value = "";
        }

        var length = ctr.value.length;
        var maxLength = ctr.getAttribute("maxLength");
        if (maxLength <= length)
            return;

        if (id == "txtcardno") {
            if (length == 4 || length == 9 || length == 14 || length == 19)
                ctr.value += " ";
        }

        var value = common.getCodeValue(key);
        ctr.value += value;

        if (id == "txtcardno") {
            length = ctr.value.length;
            if (length == 4 || length == 9 || length == 14 || length == 19)
                ctr.value += " ";
        }
    },
    selid:function(id){
        var that = oldcard_add_instance;
        var control = this;
        var ctr = document.all(id);
        if (!ctr) return;
        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (id == "btnverity") {
            if (!that.isvaling)
                ctr.setAttribute("src", config.portal_public_url + "img/add_oldcard/vcoded.png");
        }

        var className = ctr.getAttribute("class");
        if (!className.contains("oldcard-wrap"))
            className += " oldcard-wrap";
        ctr.setAttribute("class", className);

        control.curCtr = ctr;
        control.curid = id;
    },
    unselid: function (id) {
        var that = oldcard_add_instance;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;

        if (id == "btnverity") {
            if (!that.isvaling)
                ctr.setAttribute("src", config.portal_public_url + "img/add_oldcard/vcode.png");
        }
        else if (id == "txtcardno") {
            if (ctr.value == "")
                ctr.value = "卡号";
        }
        else if (id == "txtphoneno") {
            if (ctr.value == "")
                ctr.value = "银行预留手机号";
        }
        else if (id == "txtveritycode") {
            if (ctr.value == "")
                ctr.value = "验证码";
        }

        var className = ctr.getAttribute("class");
        if (className.contains("oldcard-wrap"))
            className = className.replace("oldcard-wrap", "");
        ctr.setAttribute("class", className);

        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    },
    doback:function(e){
        e.returnValue = false;

        var that = oldcard_add_instance;
        var ctr = that.control.curCtr;
        var id = ctr.getAttribute("id");
        if (id != "txtcardno" && id != "txtphoneno" && id != "txtveritycode")
            return;

        if (id == "txtphoneno") {
            if (that.isvaling) return;
        }

        var txt = tp.util.delchar(ctr.value);
        ctr.value = txt;

        if (id == "txtcardno") {
            length = ctr.value.length;
            if (length == 20 || length == 15 || length == 10 || length == 5) {
                txt = tp.util.delchar(ctr.value);
                ctr.value = txt;
            }
        }
    },
    numCounter: function () {
        var that = oldcard_add_instance;
        if (that.valsec < 0)
        {
            that.isvaling = false;
            var curid = that.control.curCtr.getAttribute("id");
            var numlbl = document.all("lblnum");
            var btnverity = document.all("btnverity");
            var ctrPhone = document.all("txtphoneno");

            if (curid == "btnverity")
                btnverity.setAttribute("src", config.portal_public_url + "img/add_oldcard/vcoded.png");
            else
                btnverity.setAttribute("src", config.portal_public_url + "img/add_oldcard/vcode.png");
            btnverity.style.disabled = "disabled";
            numlbl.style.display = "none";

            var className = ctrPhone.getAttribute("class");
            if (className.contains("item-text-val"))
            {
                className = className.replace("item-text-val", "");
                ctrPhone.setAttribute("class", className);
            }
            return;
        }

        that.isvaling = true;
        var numlbl = document.all("lblnum");
        numlbl.innerText = that.valsec;
        that.valsec--;

        setTimeout(function () {
            that.numCounter();
        }, 1000);
    },
    actionlog: function (action, detail) {
        var that = oldcard_add_instance;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "老年卡新增页",
            detail: detail
        });
    }
}