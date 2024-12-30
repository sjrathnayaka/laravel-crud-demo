<?php

use Illuminate\Support\Facades\Route;

// Default route to welcome page
Route::get('/', function () {
    return view('welcome');
});

// Login route (for web views)
Route::get('/login', function () {
    return view('auth.login'); // Assuming you have a login blade view
})->name('login');

// Example route requiring authentication
// Use 'auth:sanctum' middleware for API authentication
Route::middleware('auth:sanctum')->get('/dashboard', function () {
    return view('dashboard'); // Assuming you have a dashboard blade view
})->name('dashboard');

// You can add more web routes as needed for your front-end
