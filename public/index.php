<?php

try {
    // Autoloader Composer
    require_once __DIR__ . '/../vendor/autoload.php';

    // Inicjalizacja aplikacji
    require_once __DIR__ . '/../config/App.php';
    \Corpotech\Landingpage\Config\App::init();

    // Inicjalizacja routingu
    require_once __DIR__ . '/../config/Routes.php';
    \Corpotech\Landingpage\Config\Routes::init();

    // Uruchomienie routingu
    \Corpotech\Landingpage\Config\Routes::dispatch();

} catch (\Exception $e) {
    // Logowanie błędu (w produkcji)
    if (\Corpotech\Landingpage\Config\App::isProduction()) {
        error_log("Application Error: " . $e->getMessage());
    }
    
    // Wyświetlanie błędu
    http_response_code(500);
    
    if (\Corpotech\Landingpage\Config\App::getEnv('APP_DEBUG', false)) {
        echo "<h1>Application Error</h1>";
        echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
        echo "<p><strong>File:</strong> " . htmlspecialchars($e->getFile()) . "</p>";
        echo "<p><strong>Line:</strong> " . $e->getLine() . "</p>";
        echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    } else {
        echo "<h1>Internal Server Error</h1>";
        echo "<p>Something went wrong. Please try again later.</p>";
    }
}
