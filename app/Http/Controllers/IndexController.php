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
        

        //查询出降价急售汽车信息(只查出8条)
        $carinfo=DB::select('select * from details inner join brand on details.brand_id=brand.brand_id where details.sell_type=0 limit 8');
        
        $car=$this->objectToArray($carinfo);
         
         //print_r($car);die;
        
        foreach ($car as $k => $v) {
            //echo $v->brand_id;
            $a=$v['parent_id'];
            $info=DB::select("select brand_name ,brand_id from brand where brand_id=$a  ");
             $info1=$this->objectToArray($info);
            $car[$k][ ]=$info1;

        }
        //查询出降价急售汽车信息(只查出8条)
            
       // print_r($car);die;



        //查询处最新上架信息(只查出4条)
        $newcarinfo=DB::select('select * from details inner join brand on details.brand_id=brand.brand_id order by details_id desc limit 8');
        //print_r($newcarinfo);die;
        $newcar=$this->objectToArray($newcarinfo);
        //print_r($newcar);die;
        foreach ($newcar as $k => $v) {
            //echo $v->brand_id;
            $a=$v['parent_id'];
            $info=DB::select("select brand_name ,brand_id from brand where brand_id=$a  ");
             $info1=$this->objectToArray($info);
            $newcar[$k][ ]=$info1;

        }
      //print_r($newcar);die;


     
      return view('index',['carsell'=>$car,'newcar'=>$newcar]);
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
