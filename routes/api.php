<?php

use App\Http\Controllers\StartController;
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

/**
 *  Application
 *
 *  TODO: -- Exposed, needs API Middleware to make sure that application API is only accessible
 *  TODO:    from the server or device it is served from.
 *
 */
Route::group([], function () {

    Route::get('/mapbox-start', StartController::class . '@startMapbox')->name('start.mapbox');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
