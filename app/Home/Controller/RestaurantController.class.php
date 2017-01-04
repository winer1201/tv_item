<?php
namespace Home\Controller;
use Think\Controller;
class RestaurantController extends BaseController {
	//餐厅-商品信息页
	public function info(){
		$this -> formatResolution();
        $this -> display('restaurant_info');   
	}

	//餐厅-购物车页
    public function cart(){  
     	$this -> formatResolution();
     	$this -> display('restaurant_cart');   
     }

     //餐厅-订单新增页
     public function order_add(){
     	$this -> formatResolution();
     	$this -> display('restaurant_order_add');   
     }

     //餐厅列表


     //餐厅-菜品列表
     public function food_list(){
        $this -> formatResolution();
        $this -> display('restaurant_food_list');   
     }
}


?>