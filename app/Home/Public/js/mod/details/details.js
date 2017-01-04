function page_init() {
    details.init();
}
var arr=[],focusid=[],flag=true;
var details = {
    control: null,
    defaultid: "sp1",
    imglist:null,
    ajax:null,
    albumcodelist:[],
    dianzan:null,
    idarr:[],
    contentcode:[],
    liid:['li1'],
    init: function () {
        var that = this;
        that.albumcodelist[0]=tp.util.getQueryString("albumcode");
        that.ajax=function(url,callback,dom){
        	tp.ajax({
	            url: url,
	            success: function (data) {
	            	var res=JSON.parse(data);
	            	callback(res,dom);
	            	//console.log(res);
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
        }
     	details.loading_li();
        loadingHelper.loadbg();
		that.addlisten();
     	
    },
    loading_li:function(){
    		var that=details;
    		var li_url=config.tps_content_list_url;
    	 	li_url=tp.util.appendParam(li_url, "content_scope",'album');
    	 	li_url=tp.util.appendParam(li_url, "areacode",m_areacode);
    	 	li_url=tp.util.appendParam(li_url, "album_code",that.albumcodelist[0]);
    	 	li_url=tp.util.appendParam(li_url, "offset",0);
    	 	li_url=tp.util.appendParam(li_url, "count",10);
    	 	that.ajax(li_url,loadli);
    	 	function loadli(res){
    	 		var info=res.data;
    	 		console.log(res);
    	 		if(info.length>0 && res.retcode==0){
    	 			$('#dancename').html(res.album_name);
    	 			$('#album').html(res.album_stars);
    	 			$('#abstract').html(res.album_description);
    	 			$('#videoname').html(res.data[0].contentname)
		         	var	html='',d_lt="",d_rt="";
		        	for(var i=1;i<=info.length+1;i++){
		        		
		        		if(i==1)
							d_rt=" data-right='li"+(i+1)+"' ";
						else if (i==info.length+1)
							d_lt=" data-left='li"+(i-1)+"' ";
						else{
							d_rt=" data-right='li"+(i+1)+"' ";
							d_lt=" data-left='li"+(i-1)+"' ";
						}
						if(i!=info.length+1){
							//给点赞存储contentcode值
							//that.contentcode.push(info[i-1].contentcode);
							html+='<li id="li'+i+'" '+d_lt+d_rt+'data-up="sp1" starturl="'+info[i-1].starturl+'"contentcode="'+info[i-1].contentcode+'"style="background:url('+info[i-1].smimgurl+') no-repeat"></li>'
						}else{
							if(info.length=10){
								html=html+'<li id="li'+i+'" '+d_lt+d_rt+'data-up="sp1" style="background:url(/app/Home/Public/img/details/duo.png) no-repeat"></li>'
							}	
						}
		        	}
		        	$('.tuo').html(html);
		        }
    	 		//var src=details.fileurl('li3');
    	 		//$('video').attr('src',src);
    		}
    	 
    },
    fileurl:function(dom){
    	var starturl=$('#'+dom).attr('starturl');
    	var num=starturl.indexOf('=');
    	var file='http://10.10.20.11:15150/video/'+starturl.substring(num+1);
    	return file;
    },
	userzan:function(id){
		var that=details;
		var dianzanurl=config.cbs_user_setdianzan;
		    dianzanurl=tp.util.appendParam(dianzanurl, "usercode",m_usercode);
		    dianzanurl=tp.util.appendParam(dianzanurl, "user_session",m_user_session);
		var contentcode=$('#'+id).attr('contentcode');    
		    dianzanurl=tp.util.appendParam(dianzanurl, "contentcode",contentcode);
		    dianzanurl=tp.util.appendParam(dianzanurl, "albumcode",that.albumcodelist[0]);
		    that.ajax(dianzanurl,zan);
		    function zan(res){
		    	if(res.retcode==0){
		    		$('#wu_zan').html('已有'+res.data.votenumber+'人点赞');
		    		$('#sp1').html('已赞');
		    	}
		    	if(res.retcode==121150){
		    		alert('您当日点赞次数已用完，请明天再来吧！')
		    	}
		    }
	},
    addlisten: function () {
        var that = details;
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
    	if(focusid[0]=='sp2' && $('video').css('width')==1280+'px'){
    		$('video').css({'width':'462','height':'296','position':'static','z-index':'0'});
    		if(flag){
    			$('#sp1').html('暂停');
    		}else{
    			$('#sp1').html('播放');
    		}
    	}
    	/*判断播放按键*/
    	
    	/*var backUrl = tp.util.getQueryString("backUrl");
    	    tp.util.redirectUrl(backUrl);*/
    },
    enter: function () { 
    	function quanping(dom){
    		dom.css({'width':1280,'height':720,'position':'absolute','left':'0','top':'0','z-index':'10'});
    		$('video')[0].play();
    	}
			
        var that = details;
        var control=this;
        var width=$('video').css('width');
        if(width==1280+'px' && flag){
        	$('video')[0].pause();
        	flag=false;
        	return;
        	
        }else if(width==1280+'px' && flag==false){
        	$('video')[0].play();
        	flag=true;
        	return;
        }
        if($('#'+focusid[0]).parent()[0].className=='btn'){
       		var num=parseInt(focusid[0].substring(2));
       		switch(num){
       			case 1:if($('#sp1').html()=="播放"){
       						$('video')[0].play();
       						$('#sp1').html('暂停');
       				   }else{
       				   		$('video')[0].pause();
       				   		$('#sp1').html('播放');
       				   }		   
       			break;
       			case 2:quanping($('video'));
       			break;
       			default:$('#mask').css('display','block')
       					$('#sao').css('display','block');
       					 /*当二维码出来时，屏蔽按键*/
				       	if($('#mask').css('display')=='block'){
				       		$('#sp4').attr({'data-left':'','data-right':'','data-down':''});
				       	}
       			break;
       		}
        }
        if($('#'+focusid[0]).parent()[0].className=='tuo' && focusid[0]!='li11'){
        	that.liid=[];
        	that.liid.push(focusid[0]);
        	var src=that.fileurl(focusid[0]);
        	$('video').attr('src',src);
        	$('video')[0].play();
		}
    },
    move:function(key){
    	var control=this;
    	arr.push(key);
    	control.baseMove(key);
    	
		/*if(key != tp_move_key.right && key != tp_move_key.left){
			var backUrl = tp.util.getQueryString("backUrl");
    	    tp.util.redirectUrl(backUrl);
		}	*/
    },
    selid: function (id) {
        var that = details;
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
        /*对视频列表进行拖动*/
       var left=$('#'+id).offset().left;
   		if(arr[0] == tp_move_key.right && $('#'+id).parent()[0].className!='btn'){
			var distance=1170-left;
			if(distance<$('#'+id)[0].offsetWidth){
				var lf=parseInt($('.tuo').css('left'));
				$('.tuo').css('left',lf-187);
			}
   		}
   		/*if(arr_num[0] == tp_move_key.left && id==IndexEvent.defaultid){
   			$('table').css('left',118);
   			return;
   		}*/
   		if(arr[0] == tp_move_key.left){
   			//console.log(left)
			if(left-110<0){
				var lf=parseInt($('.tuo').css('left'));
				$('.tuo').css('left',lf+187);
			}
   		}
        control.curCtr = ctr;
        control.curid = id;
        arr=[];
        focusid=[];
        focusid.push(id);
        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = details;
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
    }   
}