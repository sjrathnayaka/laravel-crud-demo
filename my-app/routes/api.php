<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SongController;

// Public Routes
Route::post('register', [AuthController::class, 'register']); // User registration
Route::post('login', [AuthController::class, 'login']); // User login

// Protected Routes (Accessible only to authenticated users)
Route::middleware('auth:sanctum')->group(function () {
    // Public Songs Routes (Any authenticated user can access)
    Route::get('songs', [SongController::class, 'index']); // List all songs
    Route::get('songs/{id}', [SongController::class, 'show']); // Get a single song

    // Admin Routes (Only admin users with appropriate permissions can access these)
    Route::post('songs', [SongController::class, 'store'])
        ->middleware('can:create songs'); // Create a new song

    Route::put('songs/{song}', [SongController::class, 'update'])
        ->middleware('can:edit songs'); // Update an existing song

    Route::delete('songs/{song}', [SongController::class, 'destroy'])
        ->middleware('can:delete songs'); // Delete a song

    // Logout Route (Invalidate token)
    Route::post('logout', [AuthController::class, 'logout']); // Logout user and invalidate token
});
