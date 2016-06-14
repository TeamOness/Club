<?php

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

class BuyController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function buy(){
        //获取总条数
        $counts=DB::select("select count(*) from details");
        $c=$this->objectToArray($counts);
        //var_dump($c);
        //总条数
        $size=$c[0]['count(*)'];
        //echo $size;
        //长度
        $length=4;
        //总页数
        $pages=ceil($size/$length);
        //当前页数
        $page=isset($_GET['page']) ? $_GET['page'] :1 ;
        //上一页  下一页
        $prev=$page<=1 ? 1 : $page-1;
        $next=$page>=$pages ?  $pages : $page+1;
        //echo $next;die;
        //偏移量
        $offset=($page-1)*$length;
        //echo $next;die;
        //查询
        $buys=DB::select("select * from details as d join brand as b where d.brand_id=b.brand_id limit $offset,$length");
        $buyss=$this->objectToArray($buys);
        //var_dump($buyss);die;
        foreach ($buyss as $key => $v) {
            //var_dump($value);
            $chexi=$v['parent_id'];
            //echo($chexi);
            //查询车品牌
            $brands=DB::select("select brand_name from brand where brand_id=$chexi");
            // $brands = DB::table('brand')->where('brand_id',$chexi)->simplePaginate(3);
            $brandss=$this->objectToArray($brands);
            //var_dump($brands);
            $buyss[$key][]=$brandss;
            
        }

        //查询出所有的品牌(牛亮搜索功能)
        $brandinfo=DB::select('select * from brand where parent_id=0');





        //var_dump($buyss);die;
    	return view('buy/buy',['buys'=>$buyss,'pages'=>$pages,'prev'=>$prev,'next'=>$next,'counts'=>$size,'brandinfo'=>$brandinfo]);
    }
    //对象转化为数组
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
	
	
	//定义搜索的方法
	 public function buysearch(){
		 $brandinfo=Input::get('brandinfo');
		 //echo $brandinfo;die;
		 $branda=trim($brandinfo);
		 if($brandinfo==''){
			 $sql="select * from details";
		 }else{
			 $sql="select * from brand where brand_name='$branda'";
		 }
		 $arr=DB::select("$sql");
		foreach($arr as $v){
			$brand_id=$v->brand_id;
		}
		//echo $brand_id;
		$p=DB::select("select brand_id from brand where parent_id=$brand_id");
		//print_r($p);
		foreach($p as $v){
			$bid=$v->brand_id;
			//echo $bid;
			$p=DB::select("select * from details where brand_id=$bid");
		}
		print_r($p);
		
		die;
		 
		 
		 
        //获取总条数
        $counts=DB::select("select count(*) from details");
        $c=$this->objectToArray($counts);
        //var_dump($c);
        //总条数
        $size=$c[0]['count(*)'];
        //echo $size;
        //长度
        $length=4;
        //总页数
        $pages=ceil($size/$length);
        //当前页数
        $page=isset($_GET['page']) ? $_GET['page'] :1 ;
        //上一页  下一页
        $prev=$page<=1 ? 1 : $page-1;
        $next=$page>=$pages ?  $pages : $page+1;
        //echo $next;die;
        //偏移量
        $offset=($page-1)*$length;
        //echo $next;die;
        //查询
        $buys=DB::select("select * from details as d join brand as b where d.brand_id=b.brand_id limit $offset,$length");
        $buyss=$this->objectToArray($buys);
        //var_dump($buyss);die;
        foreach ($buyss as $key => $v) {
            //var_dump($value);
            $chexi=$v['parent_id'];
            //echo($chexi);
            //查询车品牌
            $brands=DB::select("select brand_name from brand where brand_id=$chexi");
            // $brands = DB::table('brand')->where('brand_id',$chexi)->simplePaginate(3);
            $brandss=$this->objectToArray($brands);
            //var_dump($brands);
            $buyss[$key][]=$brandss;
            
        }

        //查询出所有的品牌(牛亮搜索功能)
        $brandinfo=DB::select('select * from brand where parent_id=0');





        //var_dump($buyss);die;
    	return view('buy/buy',['buys'=>$buyss,'pages'=>$pages,'prev'=>$prev,'next'=>$next,'counts'=>$size,'brandinfo'=>$brandinfo]);
    }
	
	
	
	
}
