<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/admin/login','Api\Auth\Adminscontroller@login');
Route::post('/admin/register','Api\Auth\Adminscontroller@register');

Route::post('/user/login','Api\Auth\Userscontroller@login');

Route::group(['middleware' => 'auth:admin_api'],function ()
{
    Route::get('/admin/users','Api\Auth\Adminscontroller@getUsers');
    Route::get('/admin/info','Api\Auth\Adminscontroller@info');
    Route::post('/admin/addMember','Api\Auth\Adminscontroller@addMember');
    Route::post('/admin/Update','Api\Auth\Adminscontroller@updateInfo');
    Route::get('/admin/Member/all','Api\Auth\Adminscontroller@getAllUsers');
    Route::post('/admin/Genre/add','Api\Auth\Adminscontroller@addGenre');
    Route::get('/admin/Genre/show','Api\Auth\Adminscontroller@getAllGenres');
    Route::post('/admin/Book/approved','Api\Auth\Adminscontroller@approvedBooks');
    Route::get('/admin/Approve/list','Api\Auth\Adminscontroller@getAllTmpBooks');
    Route::get('/admin/logout','Api\Auth\Adminscontroller@logout');
});

Route::group(['middleware' => 'auth:api'],function ()
{
    Route::post('/user/addBook','Api\Auth\UsersController@addBooks');
    Route::get('/user/book/get/{genre_id}','Api\Auth\UsersController@getTmpBooks');
    Route::get('/user/genre/all','Api\Auth\UsersController@getAllGenre');
    Route::get('/user/all','Api\Auth\UsersController@getAllUsers');
    Route::get('/user/logout','Api\Auth\Userscontroller@logout');
    Route::get('/user/info','Api\Auth\Userscontroller@info');
});
