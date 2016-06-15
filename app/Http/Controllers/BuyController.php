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
		
		//查询出所有的车系(牛亮搜索功能)
		$branch=DB::select('select * from brand where parent_id!=0 limit 12');
		//print_r($branch);die;





        //var_dump($buyss);die;
    	return view('buy/buy',['buys'=>$buyss,'pages'=>$pages,'prev'=>$prev,'next'=>$next,'counts'=>$size,'brandinfo'=>$brandinfo,'branch'=>$branch]);
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
	
	
	
	
	
	
	
	
	//定义搜索的方法(牛亮)
	 public function buysearch(){
		 $sql="select * from details inner join brand on details.bid=brand.brand_id where 1=1 ";
		 
		 //车品牌提交
		 if($a=$_GET['a']){ 
		 //$a=Input::get('a');
		 if(empty($a)){
			$sql=$sql; 
		 }
		 if(!empty($a)){
			$aa=trim($a);
		 $sql.="and brand.brand_name='$aa'"; 
		 }
		 
		}
		
		//价格提交
		if($b=$_GET['b']){
			$sql.=" and ".$_GET['b'];
		}
		
		echo $sql;die;
		
		
		
		
		 $arr=DB::select($sql);
		 print_r($arr);die;
		 
		 

		
		
		
		
		print_r($arr);die;
		 
        //获取总条数
       // $counts=DB::select("select count(*) from details");
	   
	  // echo $counts;die;
        $c=$this->objectToArray($arr);
        //print_r($c);die;
        //总条数
       $size=count($arr);
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
        $buys=DB::select("$sql limit $offset,$length");
        $buyss=$this->objectToArray($buys);
        //var_dump($buyss);die;
		print_r($buyss);die;
        foreach ($buyss as $key => $v) {
            //var_dump($value);
            $chexi=$v['parent_id'];
            //echo($chexi);
            //查询车品牌
            $brands=DB::select("select brand_name from brand where brand_id=$chexi");
           
            $brandss=$this->objectToArray($brands);
           
            $buyss[$key][]=$brandss;
            
        }

      





        //var_dump($buyss);die;
    	return view('buy/buy',['buys'=>$buyss,'pages'=>$pages,'prev'=>$prev,'next'=>$next,'counts'=>$size,'brandinfo'=>$brandinfo]);
    }
	
	
	
	
}
