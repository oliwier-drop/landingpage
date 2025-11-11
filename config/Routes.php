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
                    'description' => 'Corpotech to doświadczona firma IT oferująca kompleksowe rozwiązania dla biznesu – od cyberbezpieczeństwa i serwerowni, po administrację siecią, outsourcing IT i doradztwo technologiczne. Pomagamy firmom rozwijać się bezpiecznie od 2010 roku.',
                    'keywords' => 'usługi IT, firma IT, outsourcing IT, administracja siecią, bezpieczeństwo IT, cyberbezpieczeństwo, serwerownia, rozwiązania informatyczne, konsultacje IT, wsparcie techniczne, Corpotech',
                    'robots' => 'index, follow'
                ], 'home');
            });
            
            // Strony używające app.layout.php
            $r->addRoute('GET', '/o-nas', function() {
                ViewHelper::render('about', [
                    'title' => 'O nas - ',
                    'description' => 'Poznaj firmę Corpotech – zespół specjalistów IT z wieloletnim doświadczeniem. Od 2010 roku pomagamy firmom rozwijać infrastrukturę informatyczną, wdrażać bezpieczne rozwiązania sieciowe i dbać o stabilność systemów.',
                    'keywords' => 'o nas, Corpotech, specjaliści IT, doświadczenie IT, firma informatyczna, zespół IT, eksperci IT, bezpieczeństwo systemów, infrastruktura IT',
                    'robots' => 'index, follow'
                ]);
            });

            $r->addRoute('GET', '/uslugi', function() {
                ViewHelper::render('services', [
                    'title' => 'Usługi - ',
                    'description' => 'Oferujemy pełen zakres usług IT: cyberbezpieczeństwo, administracja sieciami, konfiguracja serwerów, helpdesk, outsourcing informatyczny oraz doradztwo technologiczne. Corpotech – kompleksowe wsparcie IT dla Twojej firmy.',
                    'keywords' => 'usługi IT, cyberbezpieczeństwo, administracja sieciami, serwery, helpdesk, doradztwo IT, outsourcing informatyczny, wsparcie IT, Corpotech, obsługa firm IT',
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