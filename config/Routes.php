<?php

namespace Corpotech\Landingpage\Config;

use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use Corpotech\Landingpage\Helpers\ViewHelper;
use Corpotech\Landingpage\Controllers\ContactController;
use Corpotech\Landingpage\Controllers\ErrorController;

class Routes
{
    private static $dispatcher;
    
    public static function init()
    {
        self::$dispatcher = \FastRoute\simpleDispatcher(function(RouteCollector $r) {
            // Strona główna - używa home.layout.php
            $r->addRoute('GET', '/', function() {
                ViewHelper::render('home', [
                    'title' => '',
                    'description' => 'Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.',
                    'keywords' => 'Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT, usługi informatyczne, usługi IT, usługi cyberbezpieczeństwa, usługi konsultacji, usługi serwerowni, usługi sieci, usługi rozwiązań IT',
                    'robots' => 'index, follow'
                ], 'home');
            });
            
            // Strony używające app.layout.php
            $r->addRoute('GET', '/o-nas', function() {
                ViewHelper::render('about', [
                    'title' => 'O nas - ',
                    'description' => 'O nas - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.',
                    'keywords' => 'O nas, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT',
                    'robots' => 'index, follow'
                ]);
            });

            $r->addRoute('GET', '/uslugi', function() {
                ViewHelper::render('services', [
                    'title' => 'Usługi - ',
                    'description' => 'Usługi - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.',
                    'keywords' => 'Usługi, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT',
                    'robots' => 'index, follow'
                ]);
            });
            
            $r->addRoute('GET', '/kontakt', function() {
                ContactController::show();
            });
            
            $r->addRoute('POST', '/kontakt', function() {
                ContactController::submit();
            });

            $r->addRoute('GET', '/polityka-prywatnosci', function() {
                ViewHelper::render('privacy-policy', [
                    'title' => 'Polityka prywatności - ',
                    'description' => 'Polityka prywatności - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.',
                    'keywords' => 'Polityka prywatności, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT',
                    'robots' => 'noindex, nofollow'
                ]);
            });

            $r->addRoute('GET', '/regulamin', function() {
                ViewHelper::render('terms-of-service', [
                    'title' => 'Regulamin - ',
                    'description' => 'Regulamin - Corpotech to firma zajmująca się IT, dla twojego biznesu. Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2010 roku.',
                    'keywords' => 'Regulamin, Corpotech, IT, cyberbezpieczeństwo, konsultacja, serwerownia, sieć, rozwiązania IT',
                    'robots' => 'noindex, nofollow'
                ]);
            });
            
            // API endpoints
            $r->addRoute('GET', '/api/health', function() {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'ok', 'timestamp' => time()]);
            });
            
            // 404 - ostatnia trasa
            $r->addRoute('GET', '/{path:.*}', function() {
                ErrorController::notFound();
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
                ErrorController::notFound();
                break;
                
            case Dispatcher::METHOD_NOT_ALLOWED:
                ErrorController::methodNotAllowed($routeInfo[1]);
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
}