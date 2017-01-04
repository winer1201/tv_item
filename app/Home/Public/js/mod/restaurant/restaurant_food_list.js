function page_init() {
    mapinfo.init();
}

var mapinfo = {
    title:"",
    selid: "",
    attr:"",
    datalist:null,
    control: null,
    curindex: 0,
    startindex:0,
    endindex:0,
    account: 0,
    direct:0,//0:初始化、-1：向上、1向下
    init: function () {
        var that = mapinfo;
        //加载背景图片
        loadingHelper.loadbg();
        tp_ui.popup.loading.show({
            closeCallBack: function () {
                that.addlisten();
            }
        });
        that.loaddata();
        tp_ui.popup.loading.close();
    },
    loaddata: function () {
        var that = mapinfo;
        var map_category = null;
        if (!food_list || !food_list || food_list.length <= 0) return;
        var html='',d_up="",d_down="";
        
		var info=food_list[0].datalist;
		for(var i=0;i<food_list[0].datalist.length;i++){
			d_up="",d_down="";
			if(i==0)
				d_down=" data-down='food"+(i+1)+"' ";
			else if (i==info.length-1)
				d_up=" data-up='food"+(i-1)+"' ";
			else{
				d_down=" data-down='food"+(i+1)+"' ";
				d_up=" data-up='food"+(i-1)+"' ";
			}
		         html =html+'<dl class="clear" food_id="'+(i+1)+'" id="food'+i+'" '+d_up + d_down +'><dt><img src="'+info[i].src+'" /></dt>'
			+  '<dd class="food_name clear"><span>'+info[i].name+'</span><i>￥'+info[i].price+'</i></dd><dd class="shicai">'+info[i].shicai+'</dd></dl>';
		}
		document.all("foodlist").innerHTML=html;  
        if (!that.datalist) return;
        
        that.account = that.datalist.length;
       
    },
    addlisten: function () {
        var that = mapinfo;
        that.control = new controlevent({
            selid: that.selid,//控件选中后事件
            noMove: that.nomove,//控件移动失败后事件
            extEnter: that.enter,
            extMoveData:that.extMoveData,//控件移动前扩展事件
            defaultid: "food0"//默认光标控件id
        });
        that.control.begin();
    },
    enter:function(){
    	var control=this;
    	var food_id=document.getElementById(control.curid);
   		var food_id=food_id.getAttribute('food_id');
   		//console.log(food_id);
    	backUrl=window.location.href;
    	backUrl = encodeURIComponent(backUrl);
    	url=config.portal_restaurant_cart_url
    	url=common.setBaseParam(url);
    	url = tp.util.appendParam(url, "backUrl",backUrl);
    	url = tp.util.appendParam(url, "food_id",food_id);
    	tp.util.redirectUrl(url);
    },
    selid: function (id) {
        var that = mapinfo;
        var control = this;
        var ctr = document.all(id);
        var url = "";
        var ctr_mask=null;

        if (!ctr) return;
        ctr_mask=document.all("d_mask");
		
        that.unselid(control.curid);
        
         if (that.control != null)
            control = that.control;
            
        if(that.attr == tp_enum_moveData.up)
        	that.doup();
        else if(that.attr == tp_enum_moveData.down)
        	that.dodown();

        control.curCtr = ctr;
        control.curid = id;
    },
    doup:function(){
    	var that = mapinfo;
    	var length=$('#foodlist dl').length;
		var index = that.curindex;
		//console.log(length);
		if(length>2){
			//console.log(index);
			if(index<=1){
			 	$('.mask').css('top',index*174);
			}
			if(index<length-1&&index>1){
			 	$('.mask').css('top',248);
			}		
			//console.log(index);
			/*foodlist移动*/
			if(index==1){
				$('#foodlist').css('top',0);
			}
			if(index>1&&index<length-2){
				var top=$('#foodlist').css('top');
				top1=parseInt(top);
				//console.log(top1);
				$('#foodlist').css('top',top1+174);
			}
			
			if(index==length-2&&index!=1){
				var top=$('#foodlist').css('top');
					top1=parseInt(top);
				//console.log(3);
				$('#foodlist').css('top',top1+109);
			}
			if(index==length-2&&index==1){
				$('#foodlist').css('top',0);
			}
		}
		if(length==2){
			if(index==1){
				index--;
				$('.mask').css('top',index*174);
			}
		}
    },
    dodown:function(){
    	var that = mapinfo;
    	var length=$('#foodlist dl').length;
		var index = that.curindex;
		//console.log(length);
		//console.log(index);
		if(length>2){
			//console.log(index);
			if(index==1){
			  	$('.mask').css('top',index*174);
			}
			if(index>1&&index<=length-1){
			 	$('.mask').css('top',2*124);
			}
			if(index==length-1){
				$('.mask').css('top',312);
			}
	
			if(index==2){
				//console.log('top');
				$('#foodlist').css('top',-index*50);
			}
			if(index>2&&index<length-1){
				$('#foodlist').css('top',-2*50-(index-2)*174);
			}
			if(index==length-1){
				$('#foodlist').css('top',487-length*174);
			}
		}
		if(length==2){
			if(index==0){
				index++;
				$('.mask').css('top',index*174);
			}
		}
			//console.log(index);
		//console.log(index);
    },
    unselid: function (id) {
        var that = mapinfo;
        var ctr = document.all(id);
        var control = this;
        if (!ctr) return;
        //ctr.className = "mapinfo-right-item";
        if (that.control != null)
            control = that.control;

        if (id == that.control.curid) {
            control.curid = null;
            control.curCtr = null;
        }
    },
    nomove: function (attrname) {
        var that = mapinfo;
	
        if (attrname == tp_enum_moveData.up)
            that.direct = -1;
        else if (attrname == tp_enum_moveData.down)
            that.direct = 1;
        else
            return;

        //that.formatdata();
    },
    extMoveData: function (attr) {
        var that = mapinfo;

        var ctr = this;
        var tdID = ctr.curCtr.getAttribute(attr);
        that.attr="";
        if (tdID && tdID != ""){
            if (attr == tp_enum_moveData.up)
                that.curindex = that.curindex - 1;
            else if(attr == tp_enum_moveData.down)
                that.curindex = that.curindex + 1;
            that.attr = attr;
        }
        ctr.baseMoveData(attr);
        if (ctr.afterMove)
            ctr.afterMove(attr);
    }
}