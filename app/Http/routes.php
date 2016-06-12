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
Route::get('/', 'BuyController@buy');
Route::get('goodslist', 'BuyController@goodslist');
=======
*/
//加载静态页面的方法(牛亮)

Route::any('/','IndexController@index');




>>>>>>> d6532c240a11b0326635f4b18eb3c771e7653a0c
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
