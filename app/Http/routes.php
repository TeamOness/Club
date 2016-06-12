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

/*Route::get('/', function () {
    return view('welcome');
});
<<<<<<< HEAD
Route::get('common','CommonController@common');//分期购车表单添加页面
=======
*/
//���ؾ�̬ҳ��ķ���(ţ��)

Route::any('/','IndexController@index');




>>>>>>> 5af2ca2ac12c399f70284b37f7bfdbf442648de1
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
