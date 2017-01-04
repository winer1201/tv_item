function page_init() {
    myinfo_gai.init();
}

var myinfo_gai = {
    areacode: "",
    usercode: "",
    usersession: "",
    backUrl: "",
    data:null,
    init: function () {
        var that = this;
        that.areacode = tp.util.getQueryString('areacode');
        that.usercode = tp.util.getQueryString("usercode");
        that.usersession = tp.util.getQueryString("usersession");
        that.backUrl = tp.util.getQueryString("backUrl");

        var url = config.cbs_user_getuserinfo;
            url = common.setBaseParam(url);
        that.actionlog("进入", "");

        tp_ui.popup.loading.show({
            closeCallBack: function () {
                formEvent.init({
                    doEsc: that.esc
                });
            }
        });

        tp.ajax({
            url: url,
            success: function (data) {
                //获取用户信息
                //加载数据
                var code = -1;
                var jsonObj = common.getResultObj(data);
                if (jsonObj != -1)
                    code = jsonObj.retcode;

                tp_ui.popup.loading.close();

                if (code != 0)
                    tp.util.showMsg("error(" + code + ")");
                else {
                    that.loadData(jsonObj);
                }              
            },
            error: function (status) {
                tp_ui.popup.loading.close();
                tp.util.showMsg("error");
                console.log(status);
            },
            loading: function () {
                console.log('loading');
            }
        })
    },
    loadData: function (data) {
        if (!data) return;
        var data = data.data;
        if (!data) return;
        //usercode
        var d_usercode = document.all("d_usercode");
        if(d_usercode && data.usercode)
            d_usercode.innerHTML = "<label id='lblUserCode'>" + data.usercode+ "</label>";
        //usermark
       /* var d_usermark = document.all("d_usermark");
        if(d_usermark && typeof (data.terminalusermark) == "string")
            d_usermark.innerHTML = "<label id='lblDevice'>" + data.terminalusermark + "</label>";*/
        //username
        var d_username = document.all("d_username");
        if (data.username && typeof (data.username) == "string")
            d_username.innerHTML = data.username;
        else{
        	d_username.innerHTML = '';
        }
       //nickname
        var d_userni = document.all("nicheng");
        if (data.nickname && typeof (data.nickname) == "string")
            d_userni.innerHTML = data.nickname;
        else{
        	d_userni.innerHTML = '';
        }
         //team
        var d_userteam = document.all("team");
        if (data.dance_team_name && typeof (data.dance_team_name) == "string")
        	if(data.dance_team_identity=='1'){
        		d_userteam.innerHTML = data.dance_team_name+'(队长)';
        	}else
            d_userteam.innerHTML =  data.dance_team_name;
        else{
        	 d_userteam.innerHTML = '';
        }
        //sex
        var d_usersex = document.all("sex");
        if (d_usersex && (data.usersex==0 || data.usersex==1))
        	if(data.usersex==0){
        		$('.head_pic').css('background-image','url(/app/Home/Public/img/myinfo/man.png)');
        		d_usersex.innerHTML = '男';
        	}else{
        		$('.head_pic').css('background-image','url(/app/Home/Public/img/myinfo/header.png)');
        		d_usersex.innerHTML = '女';
        	}
            
        else{
        	$('.head_pic').css('background-image','url(/app/Home/Public/img/myinfo/default.png)');
        	d_usersex.innerHTML = '';
        }
        //phone
        var d_phone = document.all("d_phone");
        if (data.phone && typeof (data.phone) == "string")
            d_phone.innerHTML =data.phone.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3');
        else{
        	 d_phone.innerHTML ='';
        }
        //出生日期
        var d_birthday = document.all("birthday");
        if (data.birthday && typeof (data.birthday) == "string")
           d_birthday.innerHTML =data.birthday;
        else{
        	d_birthday.innerHTML ='';
        }
        //address
       /* var d_address = document.all("d_address");
        if (data.address && typeof (data.address) == "string")
            d_address.innerHTML =data.address;
         else{
         	 d_address.innerHTML ='未填写';
         }*/
        //qrcode
        var m_qrcode =document.getElementById('myqrcode');
        //console.log(m_qrcode)
        if (m_qrcode && data.qrcodeurl && data.qrcodeurl != "") {
            var codeurl = data.qrcodeurl, ver = "";
            ver = Guid.NewGuid().ToString();
            codeurl = tp.util.appendParam(codeurl, "_ver", ver);
           m_qrcode.style.background='url('+codeurl+') no-repeat';
            m_qrcode.style.backgroundSize='100% 100%';
        }
    },
    esc: function (key) {
        var that = myinfo_gai;
        formEvent.baseEsc(key);
        that.actionlog("外设返回", "");
    },
    actionlog: function (action, detail) {
        var that = myinfo_gai;

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "我的信息页",
            detail: detail
        });
    }
}
