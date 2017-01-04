function page_init() {
    addcard_instance.init();

}

var addcard_instance = {
    isvaling: false,
    valsec: 60,
    init: function () {
        var that = this;
        loadingHelper.loadbg();
        formEvent.init({
            dosel: that.dosel,
            dounsel: that.dounsel,
            doNumKey: that.onNumKey,
            doBack: that.onBack,
            doEsc: that.onEsc,
            doEntry: that.onEntry
        });
        this.selDefaultCtr();
    },
    selDefaultCtr: function () {
        var ctr = document.all("txtcardno");
        formEvent.selnext(ctr);
    },
    dosel: function (ctr) {
        var that = addcard_instance;
        var id = ctr.getAttribute("id");

        if (id == "btnverity") {
            if (!that.isvaling)
                ctr.setAttribute("src", config.portal_public_url + "img/add_oldcard/vcoded.png");
        }
        formEvent.basesel(ctr);
    },
    dounsel: function (ctr) {
        var that = addcard_instance;
        var id = ctr.getAttribute("id");

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

        formEvent.baseunsel(ctr);
    },
    onBack: function (e) {
        e.returnValue = false;

        var that = addcard_instance;
        var ctr = formEvent.curCtr;
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
    onEsc: function (e) {
        var that = addcard_instance;
        var backUrl = that.getBackUrl();
        if (backUrl == null || backUrl == undefined || backUrl == "") return;
        tp.util.redirectUrl(backUrl);
    },
    onNumKey: function (key) {
        var that = addcard_instance;
        var ctr = formEvent.curCtr;
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

        var value = tp.util.getCodeValue(key);
        ctr.value += value;

        if (id == "txtcardno") {
            length = ctr.value.length;
            if (length == 4 || length == 9 || length == 14 || length == 19)
                ctr.value += " ";
        }
    },
    onEntry: function (e) {
        var that = addcard_instance;
        var ctr = formEvent.curCtr;
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
            if (phone == "" || phone == "银行预留手机号") {
                formEvent.selnext(ctrPhone);
                return;
            }


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
            addcard_instance.numCounter();
        }
        else if (id == "btnsubmit") {

            if (cardno == "" || cardno == "卡号") {
                formEvent.selnext(ctrCard);
                return;
            }
            else if (phone == "" || phone == "银行预留手机号") {
                formEvent.selnext(ctrPhone);
                return;
            }
            else if (verity == "" || verity == "验证码") {
                formEvent.selnext(ctrVerity);
                return;
            }
            if (!tp.util.phoneNumValied(phone)) {//手机号是否合法
                formEvent.selnext(ctrPhone);
                return;
            }
        }
    },
    numCounter: function () {
        if (this.valsec < 0) {
            this.isvaling = false;
            var curid = formEvent.curCtr.getAttribute("id");
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
            if (className.contains("item-text-val")) {
                className = className.replace("item-text-val", "");
                ctrPhone.setAttribute("class", className);
            }
            return;;
        }

        this.isvaling = true;
        var numlbl = document.all("lblnum");
        numlbl.innerText = this.valsec;
        this.valsec--;

        setTimeout(function () {
            addcard_instance.numCounter();
        }, 1000);
    },
    getBackUrl: function () {
        return tp.util.getQueryString('backUrl');;
    }
}