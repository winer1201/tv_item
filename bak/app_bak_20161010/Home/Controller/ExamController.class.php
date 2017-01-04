<?php
namespace Home\Controller;
use Think\Controller;
//体检中心
class ExamController extends BaseController {
	//血压/心率
	public function bloodpress()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodpress');
	}
	//血压/心率 - 血压趋势图
	public function bloodpress_bloodtrends()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodpress_bloodtrends');
	}
	//血压/心率 - 心率趋势图
	public function bloodpress_hearttrends(){
		$this -> formatResolution();
        $this -> display('exam_bloodpress_hearttrends');
	}
	//血压/心率 - 历史数据
	public function bloodpress_data(){
		$this -> formatResolution();
        $this -> display('exam_bloodpress_data');
	}

	//血糖
	public function bloodsugar()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodsugar');
	}
	//心电图
	public function electrocardiogram()
	{
		$this -> formatResolution();
        $this -> display('exam_electrocardiogram');
	}
	//血氧
	public function bloodoxygen()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodoxygen');
	}
	//运动量
	public function exercise()
	{
		$this -> formatResolution();
        $this -> display('exam_exercise');
	}
	//睡眠
	public function sleep()
	{
		$this -> formatResolution();
        $this -> display('exam_sleep');
	}
	//肺功能
	public function pulmonary()
	{
		$this -> formatResolution();
        $this -> display('exam_pulmonary');
	}
	//体温
	public function temperature()
	{
		$this -> formatResolution();
        $this -> display('exam_temperature');
	}
}


?>