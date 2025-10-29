<?php

namespace Corpotech\Landingpage\Helpers;

use Corpotech\Landingpage\Config\App;

class ViewHelper
{
    public static function render($viewName, $data = [], $layout = 'app')
    {
        // Ustaw zmienne dla widoku
        extract($data);
        
        // Rozpocznij buforowanie wyjścia
        ob_start();
        
        // Załaduj widok
        $viewPath = __DIR__ . "/../../views/{$viewName}.php";
        if (file_exists($viewPath)) {
            include $viewPath;
        } else {
            echo "View {$viewName} not found";
        }
        
        // Pobierz zawartość widoku
        $content = ob_get_clean();
        
        // Załaduj layout
        $layoutPath = __DIR__ . "/../../views/layouts/{$layout}.layout.php";
        if (file_exists($layoutPath)) {
            include $layoutPath;
        } else {
            echo "Layout {$layout} not found";
        }
    }
    
    public static function redirect($url, $statusCode = 302)
    {
        header("Location: {$url}", true, $statusCode);
        exit;
    }
    
    public static function url($path = '')
    {
        return App::getBaseUrl() . $path;
    }
    
    public static function asset($path)
    {
        return self::url('/build/' . $path);
    }
    
    public static function csrfToken()
    {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    public static function csrfField()
    {
        return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars(self::csrfToken(), ENT_QUOTES, 'UTF-8') . '">';
    }
    
    public static function verifyCsrfToken($token)
    {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
    
    public static function old($key, $default = '')
    {
        return htmlspecialchars($_SESSION['old_input'][$key] ?? $default, ENT_QUOTES, 'UTF-8');
    }
    
    public static function error($key)
    {
        return $_SESSION['form_errors'][$key] ?? '';
    }
    
    public static function hasError($key)
    {
        return !empty($_SESSION['form_errors'][$key]);
    }
    
    public static function getError($key)
    {
        $error = $_SESSION['form_errors'][$key] ?? '';
        // Usuń błąd po pobraniu (podobnie jak successMessage)
        if (!empty($error)) {
            unset($_SESSION['form_errors'][$key]);
            // Jeśli nie ma już żadnych błędów, usuń całą tablicę
            if (empty($_SESSION['form_errors'])) {
                unset($_SESSION['form_errors']);
            }
        }
        return $error;
    }
    
    public static function successMessage()
    {
        $message = $_SESSION['success_message'] ?? '';
        unset($_SESSION['success_message']);
        return $message;
    }
    
    public static function clearFormData()
    {
        unset($_SESSION['form_errors'], $_SESSION['old_input']);
    }
}
