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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource("personal" , "PersonalInformationController");
Route::apiResource("post", "PostsController");
Route::apiResource("comment", "CommentController");
Route::post("updateinfo", "PersonalInformationController@editar");
Route::post("delete_post","PostsController@eliminar");
Route::post("like","ReaccionController@reaccion");
Route::apiResource("estadocivil","StatusController");
Route::apiResource("reaccion","ReaccionController");
Route::group(["prefix" => "auth"], function () {
    Route::post("login", "AuthController@login");
    Route::post("signup", "AuthController@signup");
    Route::post("update","AuthController@update");
    Route::post("updateprofilepic","AuthController@updatePic");
    Route::post("search", "AuthController@search");
    Route::group(["middleware" => "auth:api"], function() {
        Route::get("logout", "AuthController@logout");
        Route::get("user", "AuthController@user");
    });
});
