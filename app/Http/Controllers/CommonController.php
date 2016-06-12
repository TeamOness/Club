<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use DB;
use Request;

class CommonController extends Controller
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	//分期购车添加表单页面
	public function common(){
		//echo 1;
		return view('common');
	}
	//分期购车添加成功页面
	public function commonok(request $request){
		//接收表单提交过来的值
		$buy_name=Request::post('buy_name');
		echo $buy_name;die;
		$buy_money_date=$_POST['buy_money_date'];
		$buy_phone=$_POST['buy_phone'];
		$add=DB::insert('insert into buy (buy_name,buy_money_date,buy_phone) values (?, ?,?)', [$buy_name,$buy_money_date,$buy_phone]);
		//判断
		if($add){
			echo "<script>alert('提交成功');location.href='common'</script>";
		}else{
			echo "提交失败";
		}

	}
}