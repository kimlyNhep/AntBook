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
Route::get('/user/genre/all','Api\Auth\UsersController@getAllGenre');
Route::get('/admin/Book/all/{genre_id}','Api\Auth\Adminscontroller@getAllBooks');

Route::group(['middleware' => 'auth:admin_api'],function ()
{
    Route::get('/admin/users','Api\Auth\Adminscontroller@getUsers');
    Route::get('/admin/info','Api\Auth\Adminscontroller@info');
    Route::post('/admin/addMember','Api\Auth\Adminscontroller@addMember');
    Route::post('/admin/Update','Api\Auth\Adminscontroller@updateInfo');
    Route::get('/admin/Member/all','Api\Auth\Adminscontroller@getAllUsers');
    Route::post('/admin/Genre/add','Api\Auth\Adminscontroller@addGenre');
    Route::get('/admin/Genre/show','Api\Auth\Adminscontroller@getAllGenres');
    Route::put('/admin/Book/approved/{book_id}','Api\Auth\Adminscontroller@approvedBooks');
    Route::get('/admin/Approve/list','Api\Auth\Adminscontroller@getAllTmpBooks');
    Route::get('/admin/logout','Api\Auth\Adminscontroller@logout');
    Route::delete('/admin/Rejected/{book_id}','Api\Auth\Adminscontroller@rejectedBook');
    Route::put('/admin/Genre/{genre_id}','Api\Auth\Adminscontroller@updateGenre');
    Route::get('/admin/Genre/get/{genre_id}','Api\Auth\Adminscontroller@getGenreById');
    Route::delete('/admin/Genre/delete/{genre_id}','Api\Auth\Adminscontroller@deleteGenre');
    Route::post('/admin/add','Api\Auth\Adminscontroller@addAdmin');
    Route::get('/admin/all','Api\Auth\Adminscontroller@getAllAdmin');
});

Route::group(['middleware' => 'auth:api'],function ()
{
    Route::post('/user/addBook','Api\Auth\UsersController@addBooks');
    Route::get('/user/book/get/{genre_id}','Api\Auth\UsersController@getTmpBooks');
    Route::get('/user/all','Api\Auth\UsersController@getAllUsers');
    Route::get('/user/logout','Api\Auth\Userscontroller@logout');
    Route::get('/user/info','Api\Auth\Userscontroller@info');
    Route::post('/user/Update','Api\Auth\Userscontroller@updateInfo');
    Route::post('/user/Book/Update','Api\Auth\Userscontroller@updateBook');
    Route::delete('/user/Book/Delete/{book_id}','Api\Auth\Userscontroller@deleteBook');
});
