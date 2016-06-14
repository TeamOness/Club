<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use DB;
//use Request;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\Http\Controllers\Controller;


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
		$buy_money=$request->input('buy_money');
		//echo $buy_name;die;
		$buy_money_date=$request->input('buy_money_date');
		$buy_phone=$request->input('buy_phone');
		$add=DB::insert('insert into buy (buy_money,buy_money_date,buy_phone) values ( ?,?,?)', [$buy_money,$buy_money_date,$buy_phone]);
		//判断
		if($add){
			echo "<script>alert('亲,(づ￣3￣)づ╭❤～,你现在可以贷款了殴!');location.href='common'</script>";
		}else{
			echo "提交失败";
		}

	}
	//分期购车申请成为合作伙伴
	public function partnerok(request $request){
		//接收数据
		$partner_type=$request->input('partner_type');
		$company_name=$request->input('company_name');
		$company_address=$request->input('company_address');
		$name=$request->input('name');
		$phone=$request->input('phone');
		$partner=DB::insert('insert into partner (partner_type,company_name,company_address,name,phone) values ( ?,?,?,?,?)', [$partner_type,$company_name,$company_address,$name,$phone]);
		//判断
		if($partner){
			echo "<script>alert('亲,(づ￣3￣)づ╭❤～,您的申请提交成功了!');location.href='common'</script>";
		}else{
			echo "添加失败";
		}

	}
	//分期购车我要申请添加页面
	public function amountok(){
		//接收表单提交的值

	}
}