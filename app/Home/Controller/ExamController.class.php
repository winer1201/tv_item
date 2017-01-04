<?php
namespace Home\Controller;
use Think\Controller;
//体检中心
class ExamController extends BaseController {
	//体检中心-登陆
	public function login(){
		$this -> formatResolution();
        $this -> display('exam_login');
	}
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
	//血糖-趋势图
	public function bloodsugar_trend()
	{		
		$this -> formatResolution();
        $this -> display('exam_bloodsugar_trend');
	}
	//血糖-糖耐趋势图
	public function bloodsugar_tolerance()
	{		
		$this -> formatResolution();
        $this -> display('exam_bloodsugar_tolerance');
	}
	//血糖-历史数据
	public function bloodsugar_data()
	{		
		$this -> formatResolution();
        $this -> display('exam_bloodsugar_data');
	}

	//心电图
	public function electrocardiogram()
	{
		$this -> formatResolution();
        $this -> display('exam_electrocardiogram');
	}
	//心电图-历史数据
	public function electrocardiogram_data()
	{
		$this -> formatResolution();
        $this -> display('exam_electrocardiogram_data');
	}
	//心电图-历史数据_new
	public function electrocardiogram_data_new()
	{
		$this -> formatResolution();
        $this -> display('exam_electrocardiogram_data_new');
	}
	//血氧
	public function bloodoxygen()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodoxygen');
	}
	//血氧 - 趋势图
	public function bloodoxygen_trend()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodoxygen_trend');
	}
	//血氧 - 历史数据
	public function bloodoxygen_data()
	{
		$this -> formatResolution();
        $this -> display('exam_bloodoxygen_data');
	}
	//运动量
	public function exercise()
	{
		$this -> formatResolution();
        $this -> display('exam_exercise');
	}
	//运动量 - 趋势图
	public function exercise_trend()
	{
		$this -> formatResolution();
        $this -> display('exam_exercise_trend');
	}
	//运动量 - 历史数据
	public function exercise_data()
	{
		$this -> formatResolution();
        $this -> display('exam_exercise_data');
	}
	//睡眠
	public function sleep()
	{
		$this -> formatResolution();
        $this -> display('exam_sleep_trend');
	}
	//睡眠 - 历史数据
	public function sleep_data()
	{
		$this -> formatResolution();
        $this -> display('exam_sleep_data');
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
	//体温 - 趋势图
	public function temperature_trend()
	{
		$this -> formatResolution();
        $this -> display('exam_temperature_trend');
	}
	//体温 - 历史数据
	public function temperature_data()
	{
		$this -> formatResolution();
        $this -> display('exam_temperature_data');
	}
	//体重成分
	public function weight(){
		$this -> formatResolution();
        $this -> display('exam_weight');
	}
	//体重成分 - 趋势图
	public function weight_trend(){
		$this -> formatResolution();
        $this -> display('exam_weight_trend');
	}
	//体重成分 - 历史数据
	public function weight_data(){
		$this -> formatResolution();
        $this -> display('exam_weight_data');
	}

	//血脂
	public function bloodfat(){
		$this -> formatResolution();
        $this -> display('exam_bloodfat');
	}
	//血脂 - 趋势图
	public function bloodfat_trend(){
		$this -> formatResolution();
        $this -> display('exam_bloodfat_trend');
	}
	//血脂 - 历史数据
	public function bloodfat_data(){
		$this -> formatResolution();
        $this -> display('exam_bloodfat_data');
	}
}


?>