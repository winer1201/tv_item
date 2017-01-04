function page_init() {
    dance.init();
}
var arr=[],content_arr=[];
var dance = {
    control: null,
    defaultid: "dl0",
    imglist: [],
    category_code:'',
    xuan:'',
    load_one:true,
    one_move:true,
    maxcol:4,
    res_num:[],
    key:[],
    tui_arr:[],
    page:0,
    url:'',
    load_ci:0,
    callback:null,
    ajax:null,
    init: function () {
        var that = this;
        that.category_code = tp.util.getQueryString("category_code");
        /*that.xuan = tp.util.getQueryString("xuan");
        if(that.xuan){
        	that.defaultid=that.xuan;
        }*/	
    var url = config.tps_content_list_url;
        url = tp.util.appendParam(url, "areacode", m_areacode);
        url = tp.util.appendParam(url, "content_scope", 'category');
        url = tp.util.appendParam(url, "category_code", that.category_code);
        url = tp.util.appendParam(url, "count",12);
        that.url=url;
        url = tp.util.appendParam(url, "offset",0);
        that.ajax=function (url,callback){
        	tp.ajax({
	            url: url,
	            success: function (data) {
	            	var res=JSON.parse(data);
	            	//console.log(callback)
	            	callback(res);
	            	/*$('#category_name').html(res.category_name);
	            	//console.log(res);
	                dance.loading_dl(res);
	                dance.loading_zan();
	                loadingHelper.loadbg();
	        		that.addlisten();*/
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
        that.callback=function (res){
        	$('#category_name').html(res.category_name);
        	console.log(res);
            dance.loading_dl(res);
            dance.loading_zan();
            loadingHelper.loadbg();
            dance.res_num.push(res.data);
            if(dance.load_one){
            	that.addlisten();
            	dance.load_one=false;
        	}
        }
    		
        that.ajax (url,that.callback);
        
         //加载背景图片
    },
   
    loading_dl:function(res){
    	 var that=dance;
    	 /*var info=JSON.parse(res).data;*/
    	 /*that.loadimg(info);*/
    	if(res.retcode) return;
    	var info=res.data;
    	/*if(info[0].bindingtype==1){
    		$('.tui_wrap').append($('<div class="tui"  id="dl0" contentcode="'+info[0].contentcode+'" vediocode="'+info[0].vediocode+'"jumptype="'+info[0].jumptype+'" url="'+info[0].url+'"categorycode="'+info[0].categorycode+'" pagecode="'+info[0].pageid+'" style="width:'+info[0].imgsize*254+'px;background-image:url('+info[0].smimgurl+')"></div>'));
    	}else{
    		$('.tui_wrap').css('display','none');
    	}*/
    	if(info.length>=4){
    		for(var i=0; i<4;i++){
    			if(info[i].bindingtype==1){
    				that.tui_arr.push(info[i]);
    			}
    		}
    	}else{
    		for(var n=0; n<info.length;n++){
    			if(info[n].bindingtype==1){
    				that.tui_arr.push(info[n]);
    			}
    		}
    	}
    	var size=0,g,html='',do_rt='',do_lt='',do_up='',do_down='';
    	if(that.tui_arr.length!=0){
    		for(g=0;g<that.tui_arr.length;g++){
    		size+=parseInt(that.tui_arr[g].imgsize);
	    		if(size>4){
	    			break;
	    		}
	    	}
	    	for(var j=0;j<g;j++){
	    		/*if(j=0 && g>1){
	    			do_rt='data-right="dl'+(j+1)+'"'
	    			if($('.dance_load').children().length>2){
	    				do_down='data-down="dl'+g+'"'
	    			}
	    		}*/
	    		$('.tui_wrap').append($('<div class="tui"  id="dl'+j+'" vediocode="'+that.tui_arr[j].vediocode+'"jumptype="'+that.tui_arr[j].jumptype+'" url="'+that.tui_arr[j].url+'"categorycode="'+that.tui_arr[j].categorycode+'" pagecode="'+that.tui_arr[j].pageid+'" style="width:'+that.tui_arr[j].imgsize*254+'px;background-image:url('+that.tui_arr[j].smimgurl+')"></div>'));
	    	}
	    	for(var l=g;l<info.length;l++){
	    		html+='<dl id="dl'+(l)+'" '+do_lt+do_rt+do_up+do_down+' vediocode="'+info[l].vediocode+'" contentcode="'+info[l].contentcode+'" >'
				+'<dt><img src="'+info[l].smimgurl+'" alt="" /></dt>'
				+'<dd>舞曲：<span>'+info[l].contentname+'</span></dd><dd>作者：<span>'+info[l].authors+'</span></dd>'
				+'<dd style="position:relative;padding-left:23px;padding-bottom:6px;">'
				+'<span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i><span class="play_num"></span></span></dd></dl>'
	    	}
	    	$('.dance_load').append(html);
	   /* var curcol=1,coltemp=0,currow=1,cursize=0,colsize=0;
    	var changerow=false;
    	var move_left="",move_right="",move_up="",move_down="";
    	var start1="",start2="",end1="",end2="";
    	var index=[];
    	for(var i=that.load_ci*12;i<info.length*(that.load_ci+1);i++){
    		html='';
    		if(info[i-that.load_ci*12].bindingtype==1){
    			cursize=info[i-that.load_ci*12].imgsize;
    		}
    		else{
    			cursize=1;
    		}
    		cursize=parseInt(cursize);
    		colsize+=cursize;
    		if(colsize>that.maxcol){
    			changerow=true;
    			currow++;
    			curcol=1;
    			colsize=cursize;
    			coltemp=cursize;
    		}
    		else{
    			changerow=false;
    			curcol=coltemp+1;
    			coltemp=colsize;
    		}    	
    		index[i]={id:'dl'+i,row:currow,col:curcol,csize:(colsize-cursize)};
    		
    		if(curcol==1){
    			
    		}
    		else{
    			move_left = ' data-left="dl' + (i-1) + '" ';
    		}
    		//set move down
    		var msize=0,mcsize=0,mcol=0,hasright=false,hasdown=false,nextrow=false;
    		msize=colsize;
    		for(var j=i+1;j<(that.load_ci+1)*12;j++){
    			if(info[j-that.load_ci*12].bindingtype==1){
    				mcsize=info[j-that.load_ci*12].imgsize;
    			}
    			else{
    				mcsize=1;    				
    			}
    			msize+=parseInt(mcsize);
    			if(!nextrow){	    			
	    			if(!hasright && msize<=that.maxcol){
	    				move_right=' data-right="dl' + j + '" ';
	    				hasright=true;
	    			}
    			}
    			if(msize>that.maxcol){
    				nextrow=true;
    				mcol+=mcsize;
    			}
    				
    			if(nextrow && mcol>(colsize-cursize))
    			{
    				move_down=' data-down="dl' + j + '" ';
    				hasdown=true;
    				break;
    			}
    		}
    		if(!hasdown && nextrow){
    			move_down=' data-down="dl' + (j-1) + '" ';
    		}
    		
    		//set move up
    		var usize=0,ucsize=0,hasup=false,upresize=0;
    		if(currow>1){
    			usize=colsize;
    			upresize=that.maxcol;
    			for(var j=i-1;j>=that.load_ci*12;j--){
    				var o = index[j];
    				if(o.row!=currow-1)continue;
    				if(o.csize<colsize){
    					move_up=' data-up="dl' + j + '" ';
	    				break;
    				}
    			}    			
    		}*/
	    	
    	}else{
    		$('.tui_wrap').css('display','none');
    		for(var h=0; h<info.length;h++){
    			do_rt='';  do_lt=''; do_up=''; do_down='';
    			if((h+1)%4==0){
    				do_lt='data-left="dl'+(h-1)+'"';
    				if(h!=3){
    					do_up='data-up="dl'+(h-4)+'"'
    				}
    				if(h+4<=(info.length-1)){
    					do_down='data-down="dl'+(h+4)+'"'
    				}
    			}else if((h+1)%4==3){
    				do_lt='data-left="dl'+(h-1)+'"';
    				if((h+1)<=info.length-1){
    					do_rt='data-right="dl'+(h+1)+'"';
    				}
    				if(h!=2){
    					do_up='data-up="dl'+(h-4)+'"';
    				}
    				if(h+4<=(info.length-1)){
    					do_down='data-down="dl'+(h+4)+'"';
    				}
    			}else if((h+1)%4==2){
    				do_lt='data-left="dl'+(h-1)+'"';
    				if((h+1)<=info.length-1){
    					do_rt='data-right="dl'+(h+1)+'"';
    				}
    				if(h!=1){
    					do_up='data-up="dl'+(h-4)+'"';
    				}
    				if(h+4<=(info.length-1)){
    					do_down='data-down="dl'+(h+4)+'"';
    				}
    			}else{
    				if((h+1)<=info.length-1){
    					do_rt='data-right="dl'+(h+1)+'"';
    				}
    				if(h!=0){
    					do_up='data-up="dl'+(h-4)+'"';
    				}
    				if(h+4<=(info.length-1)){
    					do_down='data-down="dl'+(h+4)+'"';
    				}
    			}
    			
    			html+='<dl id="dl'+(h)+'" '+do_lt+do_rt+do_up+do_down+' vediocode="'+info[h].vediocode+'" contentcode="'+info[h].contentcode+'" >'
				+'<dt><img src="'+info[h].smimgurl+'" alt="" /></dt>'
				+'<dd>舞曲：<span>'+info[h].contentname+'</span></dd><dd>作者：<span>'+info[h].authors+'</span></dd>'
				+'<dd style="position:relative;padding-left:23px;padding-bottom:6px;">'
				+'<span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i><span class="play_num"></span></span></dd></dl>'
    		}
    		$('.dance_load').html(html);
    		
    	}
    	
/*    	var html='',d_up='',d_lt='',d_rt='',d_down='';
    	var curcol=1,coltemp=0,currow=1,cursize=0,colsize=0;
    	var changerow=false;
    	var move_left="",move_right="",move_up="",move_down="";
    	var start1="",start2="",end1="",end2="";
    	var index=[];
    	for(var i=that.load_ci*12;i<info.length*(that.load_ci+1);i++){
    		html='';
    		if(info[i-that.load_ci*12].bindingtype==1){
    			cursize=info[i-that.load_ci*12].imgsize;
    		}
    		else{
    			cursize=1;
    		}
    		cursize=parseInt(cursize);
    		colsize+=cursize;
    		if(colsize>that.maxcol){
    			changerow=true;
    			currow++;
    			curcol=1;
    			colsize=cursize;
    			coltemp=cursize;
    		}
    		else{
    			changerow=false;
    			curcol=coltemp+1;
    			coltemp=colsize;
    		}    	
    		index[i]={id:'dl'+i,row:currow,col:curcol,csize:(colsize-cursize)};
    		
    		if(curcol==1){
    			
    		}
    		else{
    			move_left = ' data-left="dl' + (i-1) + '" ';
    		}
    		//set move down
    		var msize=0,mcsize=0,mcol=0,hasright=false,hasdown=false,nextrow=false;
    		msize=colsize;
    		for(var j=i+1;j<(that.load_ci+1)*12;j++){
    			if(info[j-that.load_ci*12].bindingtype==1){
    				mcsize=info[j-that.load_ci*12].imgsize;
    			}
    			else{
    				mcsize=1;    				
    			}
    			msize+=parseInt(mcsize);
    			if(!nextrow){	    			
	    			if(!hasright && msize<=that.maxcol){
	    				move_right=' data-right="dl' + j + '" ';
	    				hasright=true;
	    			}
    			}
    			if(msize>that.maxcol){
    				nextrow=true;
    				mcol+=mcsize;
    			}
    				
    			if(nextrow && mcol>(colsize-cursize))
    			{
    				move_down=' data-down="dl' + j + '" ';
    				hasdown=true;
    				break;
    			}
    		}
    		if(!hasdown && nextrow){
    			move_down=' data-down="dl' + (j-1) + '" ';
    		}
    		
    		//set move up
    		var usize=0,ucsize=0,hasup=false,upresize=0;
    		if(currow>1){
    			usize=colsize;
    			upresize=that.maxcol;
    			for(var j=i-1;j>=that.load_ci*12;j--){
    				var o = index[j];
    				if(o.row!=currow-1)continue;
    				if(o.csize<colsize){
    					move_up=' data-up="dl' + j + '" ';
	    				break;
    				}
    			}    			
    		}
    		if(info[i-that.load_ci*12].bindingtype==1){    			
    			$('.dance_load').append($('<div class="tui" row="'+currow+'" col="'+curcol+'" ' + move_down + move_right + move_left + move_up +' id="dl'+i+'" contentcode="'+info[i-that.load_ci*12].contentcode+'" vediocode="'+info[i-that.load_ci*12].vediocode+'"jumptype="'+info[i-that.load_ci*12].jumptype+'" url="'+info[i-that.load_ci*12].url+'"categorycode="'+info[i-that.load_ci*12].categorycode+'" pagecode="'+info[i-that.load_ci*12].pageid+'" style="background-image:url('+info[i-that.load_ci*12].smimgurl+')"></div>'));
    			$('#dl'+i).css('width',254*info[i-that.load_ci*12].imgsize);    			
    		}else{    			
    			html='<dl id="dl'+(i)+'"  row="'+currow+'" col="'+curcol+'" ' + move_down + move_right + move_left + move_up + 'vediocode="'+info[i-that.load_ci*12].vediocode+'" contentcode="'+info[i-that.load_ci*12].contentcode+'" >'
				+'<dt><img src="'+info[i-that.load_ci*12].smimgurl+'" alt="" /></dt>'
				+'<dd>舞曲：<span>'+info[i-that.load_ci*12].contentname+'</span></dd><dd>作者：<span>'+info[i-that.load_ci*12].authors+'</span></dd>'
				+'<dd style="position:relative;padding-left:23px;padding-bottom:6px;">'
				+'<span><i style="display:block;position:absolute;left:0;top:2px;width:21px;height:21px;background:url(/app/Home/Public/img/list/dance/play.png) no-repeat;"></i><span class="play_num"></span></span></dd></dl>'
    			$('.dance_load').append(html);
    		}
    		move_right="";
    		move_left="";
    		move_down="";
    		move_up="";
    	}*/
    	//set move_right
    	//set move up down
    },
    draw:function(){
    	
    },
    loading_zan:function(){
    	var that=dance;
    	   //获取点赞数量
	    var url_zan=config.cbs_user_videonum;
	    	url_zan = tp.util.appendParam(url_zan, "usercode", m_usercode);
	    	url_zan = tp.util.appendParam(url_zan, "user_session", m_user_session);
	    	if(that.load_ci==0){
	    		var children=$('dl'),code;
		    	for(var i=0;i<children.length;i++ ){
		    		code=children.eq(i).attr('contentcode');
		    		content_arr.push(code);
		    	}
		    	url_zan = tp.util.appendParam(url_zan, "contentcodelist", content_arr);
		    	that.ajax(url_zan,zan)
	    	}
	    	function zan(res){
	    		if(res.retcode==0 && res.data.length!=0 ){
	    			for(var j=0;j<children.length;j++){
	    				$('.play_num').eq(j).html(res.data[j]);
	    			}
	    		}else{
	    			for(var g=0;g<children.length;g++){
	    				$('.play_num').eq(g).html('0次');
	    			}
	    		}
	    	}
	    	//console.log(content_arr) 	
    },
    /*loadimg:function(info){
    	var allimg = [];
        var allurl = [];
        if (!info) return;
        var that = dance;
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
        var that = dance;
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
        var that = dance;
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
	    backUrl=config.portal_home_url;
        id = ctr.getAttribute("id");
        backUrl = encodeURIComponent(backUrl);
        callback = config.portal_toolbar_url;
        //callback = tp.util.appendParam(callback, "areacode", that.areacode);
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
   		dance.key.push(key);
   		control.baseMove(key);
   		
   	},
    selid: function (id) {
        var that = dance;
        var ctr = null, control = null;
        ctr = document.all(id);
        control = this;
        if (!ctr) return;
		for(var i=0;i<$('dl').length;i++){
			$('dl').eq(i).css('height','343')
		}
		for(var j=0;j<$('.tui').length;j++){
			$('.tui').eq(j).css('height','343')
		}
		$('#'+id).css('height','337');
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
        var offtop=$('#'+id).offset().top;
		if(720-offtop<$('#'+id)[0].offsetHeight){
			if(dance.one_move){
				var top=parseInt($('.dance_load').css('top'));
				$('.dance_load').css('top',top-250);
				dance.one_move=false;
			}else{
				dance.draw();
			}
			
			
		}
        control.curCtr = ctr;
        control.curid = id;
       var row=$('#'+id).attr('row'),children=$('.dance_load').children(),last_row=children.eq(children.length-1).attr('row');
       var lastlt=children.eq(children.length-1).offset().left+children.eq(children.length-1)[0].offsetWidth;
       /*for(var i=0;i<children.length;i++){
        	if(children.eq(i).attr('row')==last_row){
        		last_size+=$()
        	}
        }*/
       /*var url=that.url;
        if(last_row-row==1 && !(lastlt+10>1170) && dance.key[0]==40){
        	that.load_ci++;
        	url = tp.util.appendParam(url, "offset",that.load_ci*20);
        	that.ajax(url,that.callback);
        }*/
        arr=[];
        dance.key=[];
        /*给enter进入存储id*/
		arr.push(id);
        if (control.after_selid)
            control.after_selid(id);
    },
    unselid: function (id) {
        var that = dance;
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
            page: "最新热舞_" + navName + "[" + navCode + "]",
            detail: detail
        });
    }
}
