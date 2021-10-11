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



Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('tweets', [App\Http\Controllers\TweetController::class, 'getPosts']);
    Route::post('tweets/create', [App\Http\Controllers\TweetController::class, 'addPost']);
    Route::post('tweets/edit', [App\Http\Controllers\TweetController::class, 'updatePost']);
    Route::post('tweets/delete', [App\Http\Controllers\TweetController::class, 'deletePost']);
});
