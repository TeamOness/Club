<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/buy', 'BuyController@buy');
// Route::get('/goodslist', 'BuyController@goodslist');


Route::any('common','CommonController@common');//分期购车表单添加页面

Route::post('commonok','CommonController@commonok');//分期购车表单添加成功页面


Route::any('sell','SellController@sell');

Route::get('/', 'BuyController@buy');
Route::get('goodslist', 'BuyController@goodslist');


//牛宗亮加载首页
//Route::any('/','IndexController@index');


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
//Route::any('/','CommonController@common');//分期购车表单添加页面
//Route::any('commonok','CommonController@commonok');//分期购车表单添加页面