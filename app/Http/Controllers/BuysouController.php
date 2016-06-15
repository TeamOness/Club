<?php

//牛宗亮(买车页进行搜索的方法)


namespace App\Http\Controllers;

use DB;
use Request;
use Illuminate\Support\Facades\Input;
//use Illuminate\Pagination\Paginator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BuysouController extends BaseController
{
   
   use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

   //定义点击品牌进行搜索的方法
    public function index()
    {	
       header('content-type:text/html;charset=utf-8');
       $brand_id=Input::get('brand_id');
       //echo $brand_id;
       $branch=DB::select("select * from brand where parent_id=$brand_id");
       //print_r($branch);die;
       foreach($branch as $k>$v){
       	
       }






    //查询出所有的品牌(牛亮搜索功能)
    $brandinfo=DB::select('select * from brand where parent_id=0');


    return view('buy',['brandinfo'=>$brandinfo]);

    }





//END
 }

 ?>