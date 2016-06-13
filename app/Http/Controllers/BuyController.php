<?php

namespace App\Http\Controllers;

use DB;
use Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BuyController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function buy(){
    	//查询车信息
        $buys=DB::select('select * from details as d join brand as b where d.brand_id=b.brand_id');
        // $buys = DB::table('details')
        //     ->join('brand', 'details.brand_id', '=', 'brand.brand_id')
        //     ->simplePaginate(3);
        $buyss=$this->objectToArray($buys);
        //var_dump($buyss);die;
    	foreach ($buyss as $key => $v) {
            //var_dump($value);
    		$chexi=$v['parent_id'];
    		//echo($chexi);
    		//查询车品牌
    		$brands=DB::select("select brand_name from brand where brand_id=$chexi");
    		$brandss=$this->objectToArray($brands);
    		//var_dump($brandss);
    		$buyss[$key][]=$brandss;
    		
    	}
    	//var_dump($buyss);
    	return view('buy/buy',['buys'=>$buyss]);
    }
    public function objectToArray($e){
	    $e=(array)$e;
	    foreach($e as $k=>$v){
	        if( gettype($v)=='resource' ) return;
	        if( gettype($v)=='object' || gettype($v)=='array' )
	            $e[$k]=(array)$this->objectToArray($v);
	    }
	    return $e;
    }

    //商品详情
    public function goodslist(){
    	//获取详情  接收id
        $details_id=Input::get('details_id');
        //echo $details_id;die;
    	//查询车信息
        $buys = DB::table('details')
            ->join('brand', 'details.brand_id', '=', 'brand.brand_id')
            ->where('details_id',$details_id)
            ->get();
        $buyss=$this->objectToArray($buys);
        //var_dump($buyss);die;
        foreach ($buyss as $key => $v) {
            //var_dump($value);
            $chexi=$v['parent_id'];
            //echo($chexi);
            //查询车品牌
            $brands=DB::select("select brand_name from brand where brand_id=$chexi");
            $brandss=$this->objectToArray($brands);
           // var_dump($brandss);
            $buyss[$key][]=$brandss;
            
        }
       // var_dump($buyss);
        return view('buy/goodslist',['lists'=>$buyss]);
    }
}
