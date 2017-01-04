<?php
namespace Home\Controller;
use Think\Controller;
class GoodsController extends BaseController {
	//商城-购物车页
    public function cart(){  
     	$this -> formatResolution();
        $this -> display('goods_cart');   
    }

    //商城-商品信息页
    public function info(){  
     	$this -> formatResolution();
        $this -> display('goods_info');   
    }

    //商城-商品下单页
    public function order(){  
     	$this -> formatResolution();
        $this -> display('goods_order');   
    }

    //商城-商品订单新增页
    public function order_add(){  
     	$this -> formatResolution();
        $this -> display('goods_order_add');   
    }

    //商城-商品订单信息页
    public function order_info(){  
     	$this -> formatResolution();
        $this -> display('goods_order_info');   
    }

    //商城-商品订单列表页
    public function order_list(){  
     	$this -> formatResolution();
        $this -> display('goods_order_list');   
    }

	//商城-商品列表页
    public function list(){
		$this -> formatResolution();
        $this -> display('goods_list'); 
    }
}


?>