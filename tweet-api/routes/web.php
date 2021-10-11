<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('tweets', [App\Http\Controllers\TweetController::class, 'ping']);
});

Route::get('/', function () {
    return response()->json(['error' => 'Not found'], 404);
});


