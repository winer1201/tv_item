function page_init() {
    goods_order.init();
}
var index=0;
var arr=[];
var goods_order = {
    control: null,
    defaultid: "address",
    init: function () {
        var that = this;
        //加载背景图片
        loadingHelper.loadbg();
        that.addlisten();
    },
    addlisten: function () {
        var that = goods_order;
        that.control = new controlevent({
            extEnter: that.enter,
            extEsc: that.esc,
            selid: that.selid,
            defaultid: that.defaultid,
           	extMove: that.move,
        });
        that.control.begin();
    },
    esc:function(key){
    	var control=this;
    	var time=document.getElementById('time_ul');
    	if(time.style.display=='block'){
    		time.style.display='none';
    		control.selid('goodstime');
    	}else{
    		control.baseEsc(key);  
    	}
    },
    enter: function () {
        var that = goods_order;
        var control = this;
        var url = "", backUrl = "";
		var time=document.getElementById('time_ul');
		var sp=document.getElementById('sp');        	
    	var timer=document.getElementById('goodstime');
        backUrl = tp.util.getQueryString("backUrl");
        if (control.curid == "goodstime"){
        	time.style.display="block";
        	//sp.style.display="block";
        	if(!arr[0]){
        		//console.log(arr);
        		control.selid('li_one');	
        	}else{
        		control.selid(arr[0]);	
        	}
        	//that.move(key);
        	return;
        	
        }
        if (control.curid == "li_one"||control.curid =="li_two"||control.curid =="li_three"||control.curid =="li_four"||control.curid =="li_five"||control.curid =="li_six"){
        	var li_this=document.getElementById(control.curid);
        	var input=document.getElementById('txtphone');
        	//console.log(li_this);
        	arr=[];
        	arr.push(control.curid);
        	var val=li_this.innerHTML;
        	//console.log(val);
        	input.value=val.substring(0,14);
        	time.style.display="none";
        	//sp.style.display="none";
        	control.selid('goodstime');
        }
        if (control.curid == "btnAdd") {
            url = config.portal_goods_cart_url;
            url = common.setBaseParam(url);
            url = tp.util.appendParam(url, "backUrl", encodeURIComponent(backUrl));
        }
        else if (control.curid == "btnBack") {
            url = backUrl;
        }
        else {
            return;
        }       
        tp.util.redirectUrl(url);
       
    },
    selid: function (id) {
        var that = goods_order;
        var ctr = null, control = null;
        var lis=document.getElementsByTagName('li');
        ctr = document.all(id);
        control = this;
        if (!ctr) return;
        that.unselid(control.curid);
        if (that.control != null)
            control = that.control;
        if (!ctr.className.contains("goods-item-focus"))
            ctr.className += " goods-item-focus";
	        control.curCtr = ctr;
	        control.curid = id;
	        /*给时间段添加背景*/
		var li_id=document.getElementById(control.curid);    
		if (control.curid == "li_one"||control.curid =="li_two"||control.curid =="li_three"||control.curid =="li_four"||control.curid =="li_five"||control.curid =="li_six"){
    		for(var i=0;i<lis.length;i++){
    			lis[i].className='';	
    		}
    		li_id.className='blue goods-item-focus';
    	}
        if (control.after_selid)
        control.after_selid(id);
    },
    move:function(key){
    	var control=this;
    	var num_sub=document.getElementById('num_sub');
    	var ph_num=document.getElementById('txtphone2');
    	control.baseMove(key);   	
    	/*判断选中光标是否为电话，若果是显示获得焦点否则失去*/
    	if(control.curid=="telephone"){
    		ph_num.focus();
    	}else{
    		ph_num.blur();
    	}
    	if(control.curid=="d_number"){
			if(key == tp_move_key.right){
				if(index<99){
					index++;
					
					num_sub.innerHTML=index;
				}
    			
			}
			if(key == tp_move_key.left){
				if(index>1){
					index--;
					num_sub.innerHTML=index;
				}
    			
			}
		}
		
    	
    },
    unselid: function (id) {
        var that = goods_order;
        var ctr = null, control = null;

        ctr = document.all(id);
        control = this;
        if (!ctr) return;

        if (ctr.className.contains("goods-item-focus"))
            ctr.className = ctr.className.replace("goods-item-focus", "");
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