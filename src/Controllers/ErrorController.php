<?php

namespace Corpotech\Landingpage\Controllers;

use Corpotech\Landingpage\Helpers\ViewHelper;

class ErrorController
{
    public static function notFound()
    {
        http_response_code(404);
        header('X-Robots-Tag: noindex, nofollow, noarchive');
        ViewHelper::render('errors/404', [
            'title' => 'Błąd 404 - ',
            'description' => 'Strona nie została znaleziona',
            'keywords' => 'błąd 404',
            'robots' => 'noindex, nofollow',
            'error_code' => 404,
            'error_message' => 'Strona nie została znaleziona'
        ]);
    }
    
    public static function methodNotAllowed($allowedMethods)
    {
        http_response_code(405);
        header('X-Robots-Tag: noindex, nofollow, noarchive');
        ViewHelper::render('errors/405', [
            'title' => 'Błąd 405 - ',
            'description' => 'Metoda nie jest dozwolona',
            'keywords' => 'błąd 405',
            'robots' => 'noindex, nofollow',
            'error_code' => 405,
            'error_message' => 'Metoda nie jest dozwolona'
        ]);
    }
}
