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

class SellController extends Controller
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	//显示我要卖车页面
	public function sell(){
		return view('sell');
	}
	//我要卖车添加成功页面
	public function sellok(request $request){
		$user_address=$request->input('user_address');
		$brand_name=$request->input('brand_name');
		$user_phone=$request->input('user_phone');
		//$arr = DB::select('select * from brand inner join detail on details.brand_id=brand.brand_id');
		//print_r($arr);die;
		$sell=DB::insert('insert into user (user_address,user_phone) values ( ?,?)', [$user_address,$user_phone]);
		//判断
		if($sell){
			echo "<script>alert('添加成功');location.href='sell'</script>";
		}else{
			echo "添加失败";
		}
		//$sell1=DB::insert('insert into brand (user_address,user_phone) values ( ?,?)', [$user_address,$user_phone]);
	}
}
