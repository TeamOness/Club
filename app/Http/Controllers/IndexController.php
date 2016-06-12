<?php
/*
 * 首页控制器 ---牛亮 2016-06-11
 *
 */
namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //定义加载首页的方法
    public function index()
    {   

        header('content-type:text/html;charset=utf-8');
        //查询出汽车信息的
        $carinfo=DB::select('select * from details inner join brand on details.brand_id=brand.brand_id ');
        
        $car=$this->objectToArray($carinfo);
         
         //print_r($car);die;
        
        foreach ($car as $k => $v) {
            //echo $v->brand_id;
            $a=$v['parent_id'];
            $info=DB::select("select brand_name ,brand_id from brand where brand_id=$a  ");
             $info1=$this->objectToArray($info);
            $car[$k][ ]=$info1;

        }
      return view('index',['carinfo'=>$car]);
    }


    //将对象转化为数组
    public function objectToArray($e){
    $e=(array)$e;
    foreach($e as $k=>$v){
        if( gettype($v)=='resource' ) return;
        if( gettype($v)=='object' || gettype($v)=='array' )
            $e[$k]=(array)$this->objectToArray($v);
    }
    return $e;
    }

    




//END
}
