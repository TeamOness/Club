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
<<<<<<< HEAD

Route::any('common','CommonController@common');//分期购车表单添加页面

Route::post('commonok','CommonController@commonok');//分期购车表单添加成功页面

=======
<<<<<<< HEAD
Route::get('/', 'BuyController@buy');
Route::get('goodslist', 'BuyController@goodslist');
=======
*/
//���ؾ�̬ҳ��ķ���(ţ��)
>>>>>>> d68ceb6833d1bb1ceb25fc7a525411b9315278b4

Route::any('/','IndexController@index');




<<<<<<< HEAD






=======
<<<<<<< HEAD

=======
>>>>>>> d6532c240a11b0326635f4b18eb3c771e7653a0c
>>>>>>> d68ceb6833d1bb1ceb25fc7a525411b9315278b4
>>>>>>> 8c45dd508b378e685e32985ed1f7fffd7769e12b
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
