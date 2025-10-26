<?php

namespace Corpotech\Landingpage\Config;

use Dotenv\Dotenv;

class App
{
    public static function init()
    {
        // Ustawienia sesji dla bezpieczeństwa (PRZED uruchomieniem sesji)
        if (session_status() === PHP_SESSION_NONE) {
            ini_set('session.cookie_httponly', 1);
            ini_set('session.cookie_secure', isset($_SERVER['HTTPS']));
            ini_set('session.use_strict_mode', 1);
            
            // Inicjalizacja sesji
            session_start();
        }
        
        
        // Ładowanie zmiennych środowiskowych
        $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
        if (file_exists(__DIR__ . '/../.env')) {
            $dotenv->load();
        }
    }
    
    public static function getEnv($key, $default = null)
    {
        return $_ENV[$key] ?? $default;
    }
    
    public static function isProduction()
    {
        return self::getEnv('APP_ENV', 'development') === 'production';
    }
    
    public static function getBaseUrl()
    {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        return $protocol . '://' . $host;
    }
}
