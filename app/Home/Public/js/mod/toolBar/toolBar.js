function page_init() {
    tool_bar.init();
}
var arr=[];
var tool_bar = {
    control: null,
    defaultid: "li1",
    imglist: [],
    xuan:'',
    init: function () {
        var that = this;
        that.xuan = tp.util.getQueryString("xuan");
        if(that.xuan){
        	that.defaultid=that.xuan;
        }
        var url = config.tps_tool_url;
        url = tp.util.appendParam(url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "websitecode", m_websitecode);
        tp.ajax({
            url: url,
            success: function (res) {
                tool_bar.lodding_li(res);
                loadingHelper.loadbg();
        		that.addlisten();
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
         //加载背景图片
    },
    lodding_li:function(res){
    	 var that=tool_bar;
    	 var info=JSON.parse(res).data;
    	 /*that.loadimg(info);*/
    	 if(info.length>0){
         	var	html='',d_lt="",d_rt="";
        	for(var g=1;g<=info.length;g++){
        		if(g==1)
					d_rt=" data-right='li"+(g+1)+"' ";
				else if (g==info.length)
					d_lt=" data-left='li"+(g-1)+"' ";
				else{
					d_rt=" data-right='li"+(g+1)+"' ";
					d_lt=" data-left='li"+(g-1)+"' ";
				}
        		for(var j=0;j<info.length;j++){
        			
					if(info[j].tool_index==g){
						html+='<li '+d_lt+d_rt+ 'id="li'+g+'"pagecode="'+info[j].pageid+'" categorycode="'+info[j].categorycode+ '" tool_code="'+info[j].tool_code+'" tool_name="'+info[j].tool_name+'" jumptype="'+info[j].jumptype+'"style="background-image:url('+config.pms_imgurl+info[j].tool_img_url+')"></li>';
						//$('li').eq(g-1).css('background-image','url('+config.pms_imgurl+info[j].tool_img_url+')');
					}
				}
        	}
        	$('.tool_load').html(html);
        	
        }
    },
    /*loadimg:function(info){
    	var allimg = [];
        var allurl = [];
        if (!info) return;
        var that = tool_bar;
        for (var i = 0; i < info.length; i++) {
            var tmp =info;
            for (var j = 0; j < tmp.length; j++) {
                allimg[allimg.length] = tmp[j].tool_img_url;
                //allurl[allurl.length] = config.tp_pms_url + "application/" + tmp[j].url;
                allurl[allurl.length] = config.pms_imgurl + tmp[j].url;
            }
        }
        var imagepool = initImagePool(5);
        imagepool.load(allurl, {
            success: function (src) {
                for (var i = 0; i < allimg.length; i++) {
                    if (src.endWith(allimg[i].url)) {
                        //添加到缓存中
                        that.imglist[that.imglist.length] = {
                            id: allimg[i].id,
                            imgid: allimg[i].imgid,
                            url: src
                        };
                        //设置页面背景图
                        var imgctr = document.all(allimg[i].imgid);
                        if (imgctr) {
                            imgctr.setAttribute("src", src);
                        }
                    }
                }
            },
            error: function (src) {
                console.log("error:::::" + src);
                //document.writeln(src);
            }
        });
    },*/
    addlisten: function () {
        var that = tool_bar;
        that.control = new controlevent({
            extEnter: that.enter,
            selid: that.selid,
            extMove: that.move,
            extEsc: that.esc,
            defaultid: that.defaultid
        });
        that.control.begin();
    },
    esc:function(){
    	var backUrl = tp.util.getQueryString("backUrl");
    	    tp.util.redirectUrl(backUrl);
    },
    enter: function () {
        var that = tool_bar;
        var control=this;
        var ctr=document.getElementById(arr[0]);
       /* var num_lis=parseInt(control.curid.substring(2));
        var url = "", backUrl = window.location.href;*/
        /*根据用户点击id的不同跳转到不同的页面*/
       /* switch(num_lis){
        	case 1: 
        	url=config.portal_myinfo_gai_url;
	        url = common.setBaseParam(url);
	        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
	        tp.util.redirectUrl(url);
	        break;
	        case 2:
	      	url=config.portal_myinfo_gai_url;
	        url = common.setBaseParam(url);
	        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
	        tp.util.redirectUrl(url);
	        break;
	        case 3:
	      	url=config.portal_myinfo_gai_url;
	        url = common.setBaseParam(url);
	        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
	        tp.util.redirectUrl(url);
	        break;
	        case 4:
	      	url=config.portal_myinfo_gai_url;
	        url = common.setBaseParam(url);
	        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
	        tp.util.redirectUrl(url);
	        break;
	        default:
	      	url=config.portal_myinfo_gai_url;
	        url = common.setBaseParam(url);
	        url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
	        tp.util.redirectUrl(url);
	        break;
	        
        }*/
        
        if (!ctr) return;
        var backUrl = "", targetUrl = "", callback = "", id = "";
        targetUrl = common.getTdTargetUrl(ctr);
        if (!targetUrl || targetUrl == "") return;
	    backUrl= tp.util.getQueryString("backUrl");
        id = ctr.getAttribute("id");
        backUrl = encodeURIComponent(backUrl);
        callback = config.portal_toolbar_url;
        callback = tp.util.appendParam(callback, "areacode", that.areacode);
        callback = tp.util.appendParam(callback, "usercode", m_usercode);
        callback = tp.util.appendParam(callback, "user_session", m_user_session);
        callback = tp.util.appendParam(callback, "websitecode", m_websitecode);
        callback = tp.util.appendParam(callback, "xuan", id);
        var newreach_token = tp.util.getQueryString("newreach_token");
        if (newreach_token && newreach_token != "") {
            callback = tp.util.appendParam(callback, "newreach_token", newreach_token);
            targetUrl = tp.util.appendParam(targetUrl, "newreach_token", newreach_token);
        }
            
        callback = tp.util.appendParam(callback, "backUrl", backUrl);

        callback = encodeURIComponent(callback);

        //targetUrl = tp.util.appendParam(targetUrl, "areacode", that.areacode);
        targetUrl = tp.util.appendParam(targetUrl, "usercode", m_usercode);
        targetUrl = tp.util.appendParam(targetUrl, "user_session", m_user_session);
        targetUrl = tp.util.appendParam(targetUrl, "websitecode", m_websitecode);
        targetUrl = tp.util.appendParam(targetUrl, "backUrl", callback);

        tp.util.redirectUrl(targetUrl);
        //记录用户行为
        var detail = that.getActionDetail();
        that.actionlog("点击", detail);
        
    },
    move:function(key){
    	var control=this;
    	control.baseMove(key);
		if(key != tp_move_key.right && key != tp_move_key.left){
			var backUrl = tp.util.getQueryString("backUrl");
    	    tp.util.redirectUrl(backUrl);
		}	
    },
    selid: function (id) {
        var that = tool_bar;
        var ctr = null, control = null;
        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        that.unselid(control.curid);

        if (that.control != null)
            control = that.control;

        if (id.startWith("tr_item")) {
            ctr.style.backgroundImage = "url(" + config.portal_public_url + "img/goods/goods_cart_sel_bg.png" + ")";
        }
        else {
            if (!ctr.className.contains("goods-item-focus"))
                ctr.className += " goods-item-focus";
        }

        control.curCtr = ctr;
        control.curid = id;
        arr=[];
        /*给enter进入存储id*/
		arr.push(id);
        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = tool_bar;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (id.startWith("tr_item")) {
            ctr.style.backgroundImage = "";
        }
        else {
            if (ctr.className.contains("goods-item-focus"))
                ctr.className = ctr.className.replace("goods-item-focus", "");
        }
        //ctr.style.margin = "2px"
        //ctr.children[0].className = "curpage";

        if (that.control != null)
            control = that.control;

        if (id == control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
        if (control.after_unselid)
            control.after_unselid(id);
    },
    
    afterInit: function () {
	    var that = indexInstance;
	    //用户行为数据上报
	    var detail = that.getActionDetail();
	    that.actionlog("进入", detail);
    },
    getActionDetail: function () {
        var that = indexInstance;
        var curNav = null, navName = "", navCode = "";
        var curtd = null, curtdid = "", jumpType = "", jumpName = "", pageName = "";
        var targetcode = "", targeturl = "", detail = "";

        curtd = IndexEvent.getCurTD();
        curNav = IndexEvent.getCurNav();
        if (curtd != null) {
            curtdid = IndexEvent.getCurTdID();
            jumpType = curtd.getAttribute("jumptype");
            targetcode = common.getTargetcode(curtd);
            targeturl = common.getTdTargetUrl(curtd);
            jumpName = common.getJumpName(jumpType);

            if (jumpType == "4") {
                pageName = common.getPageName(targetcode);
                jumpName += "_" + pageName;
            }

            detail = "tilsid[" + curtdid + "]_jumptype[" + jumpType + "_" + jumpName + "]_code[" + targetcode + "]_url[" + targeturl + "]";
        }
        else if (curNav != null) {
            if (that.curNavInfo) {
                navCode = that.curNavInfo.navcode
                navName = that.curNavInfo.navname;
            }
            else if (that.curNavCode) {
                navCode = that.curNavCode;
                navName = that.curNavCode;
            }
            detail = "nav_name[" + navName + "]_code[" + navCode + "]";
        }

        return detail;
    },
    actionlog: function (action, detail) {
        var that = this;
        //上传用户行为数据
        var navName = "";
        var navCode = "";

        if (that.curNavInfo) {
            navCode = that.curNavInfo.navcode
            navName = that.curNavInfo.navname;
        }
        else if (that.curNavCode) {
            navCode = that.curNavCode;
            navName = that.curNavCode;
        }

        ActionHelper.record({
            usercode: m_usercode,
            user_session: m_user_session,
            websitecode: m_websitecode,
            action: action,
            page: "工具栏_" + navName + "[" + navCode + "]",
            detail: detail
        });
    }
}