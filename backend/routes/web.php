<?php

use App\Http\Middleware\ApiKeyMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([ApiKeyMiddleware::class])->group(function () {
    
    Route::get('/api/locations', [LocationController::class, 'index']);
});