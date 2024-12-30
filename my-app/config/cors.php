<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file defines the settings for Cross-Origin Resource Sharing (CORS)
    | in your application. You can adjust the settings for specific routes
    | or globally by modifying the following options.
    |
    */

    'paths' => [
        'api/*',             // Apply to all API routes
        'sanctum/csrf-cookie' // Include Sanctum CSRF cookie route for frontend authentication
    ],

    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['http://localhost:3000'], // Your frontend URL (add more if needed)
    // Example for multiple environments: 
    // 'allowed_origins' => ['http://localhost:3000', 'https://yourdomain.com'],

    'allowed_origins_patterns' => [], // Optional: use patterns to allow multiple subdomains

    'allowed_headers' => ['*'], // Allow all headers (adjust if needed)

    'exposed_headers' => [], // Adjust if specific headers need to be exposed

    'max_age' => 0, // You may adjust the pre-flight request caching time if needed

    'supports_credentials' => true, // Allow credentials for Sanctum (important for cookies)
];
