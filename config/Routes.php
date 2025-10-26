<?php

namespace Corpotech\Landingpage\Config;

use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use Corpotech\Landingpage\Helpers\ViewHelper;
use Corpotech\Landingpage\Services\MailService;

class Routes
{
    private static $dispatcher;
    
    public static function init()
    {
        self::$dispatcher = \FastRoute\simpleDispatcher(function(RouteCollector $r) {
            // Strona główna - używa home.layout.php
            $r->addRoute('GET', '/', function() {
                ViewHelper::render('home', ['title' => ''], 'home');
            });
            
            // Strony używające app.layout.php
            $r->addRoute('GET', '/o-nas', function() {
                ViewHelper::render('about', ['title' => 'O nas - ', 'description' => 'O nas - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.', 'keywords' => 'O nas, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT']);
            });
            
            $r->addRoute('GET', '/kontakt', function() {
                ViewHelper::render('contact', ['title' => 'Kontakt - ', 'description' => 'Kontakt - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.', 'keywords' => 'Kontakt, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT']);
            });
            
            $r->addRoute('POST', '/kontakt', function() {
                self::handleContactForm();
            });

            $r->addRoute('GET', '/polityka-prywatnosci', function() {
                ViewHelper::render('privacy-policy', ['title' => 'Polityka prywatności - ', 'description' => 'Polityka prywatności - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.', 'keywords' => 'Polityka prywatności, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT']);
            });

            $r->addRoute('GET', '/regulamin', function() {
                ViewHelper::render('terms-of-service', ['title' => 'Regulamin - ', 'description' => 'Regulamin - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.', 'keywords' => 'Regulamin, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT']);
            });
            
            // API endpoints
            $r->addRoute('GET', '/api/health', function() {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'ok', 'timestamp' => time()]);
            });
            
            // 404 - ostatnia trasa
            $r->addRoute('GET', '/{path:.*}', function() {
                self::handleNotFound();
            });
        });
    }
    
    public static function dispatch()
    {
        if (!self::$dispatcher) {
            self::init();
        }
        
        // Pobierz metodę HTTP i URI
        $httpMethod = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];
        
        // Usuń query string z URI
        if (false !== $pos = strpos($uri, '?')) {
            $uri = substr($uri, 0, $pos);
        }
        
        // Dekoduj URI
        $uri = rawurldecode($uri);
        
        $routeInfo = self::$dispatcher->dispatch($httpMethod, $uri);
        
        switch ($routeInfo[0]) {
            case Dispatcher::NOT_FOUND:
                self::handleNotFound();
                break;
                
            case Dispatcher::METHOD_NOT_ALLOWED:
                self::handleMethodNotAllowed($routeInfo[1]);
                break;
                
            case Dispatcher::FOUND:
                $handler = $routeInfo[1];
                $vars = $routeInfo[2];
                
                // Wywołaj handler (closure)
                if (is_callable($handler)) {
                    $handler($vars);
                }
                break;
        }
    }
    
    private static function handleContactForm()
    {
        // Sprawdź CSRF token
        $csrfToken = $_POST['csrf_token'] ?? '';
        if (!ViewHelper::verifyCsrfToken($csrfToken)) {
            http_response_code(403);
            ViewHelper::render('error', [
                'error_code' => 403,
                'error_message' => 'Invalid CSRF token'
            ]);
            return;
        }
        
        // Walidacja danych
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $message = trim($_POST['message'] ?? '');
        
        $errors = [];
        
        if (empty($name)) {
            $errors['name'] = 'Imię jest wymagane';
        }
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Prawidłowy email jest wymagany';
        }
        
        if (empty($message)) {
            $errors['message'] = 'Wiadomość jest wymagana';
        }
        
        if (!empty($errors)) {
            // Przekieruj z błędami
            $_SESSION['form_errors'] = $errors;
            $_SESSION['old_input'] = $_POST;
            ViewHelper::redirect('/kontakt');
            return;
        }
        
        // Wyślij email (jeśli MailService jest dostępny)
        try {
            if (class_exists('Corpotech\Landingpage\Services\MailService')) {
                $mailService = new MailService();
                $mailService->sendContactForm($name, $email, $message);
            }
            
            // Sukces
            $_SESSION['success_message'] = 'Wiadomość została wysłana pomyślnie!';
            ViewHelper::redirect('/kontakt');
            
        } catch (Exception $e) {
            // Błąd wysyłania
            $_SESSION['form_errors'] = ['general' => 'Wystąpił błąd podczas wysyłania wiadomości.'];
            $_SESSION['old_input'] = $_POST;
            ViewHelper::redirect('/kontakt');
        }
    }
    
    private static function handleNotFound()
    {
        http_response_code(404);
        ViewHelper::render('error', [
            'error_code' => 404,
            'error_message' => 'Strona nie została znaleziona'
        ]);
    }
    
    private static function handleMethodNotAllowed($allowedMethods)
    {
        http_response_code(405);
        ViewHelper::render('error', [
            'error_code' => 405,
            'error_message' => 'Metoda nie jest dozwolona'
        ]);
    }
}