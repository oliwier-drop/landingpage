<?php

namespace Corpotech\Landingpage\Controllers;

use Corpotech\Landingpage\Helpers\ViewHelper;
use Corpotech\Landingpage\Services\MailService;

class ContactController
{
    public static function show()
    {
        // Renderuj widok (czyszczenie danych będzie wykonane w widoku)
        ViewHelper::render('contact', [
            'title' => 'Kontakt - ',
            'description' => 'Skontaktuj się z Corpotech – doradzimy najlepsze rozwiązania IT dla Twojej firmy. Zapewniamy szybką reakcję, wsparcie techniczne i indywidualne podejście do potrzeb każdego klienta.',
            'keywords' => 'kontakt Corpotech, kontakt IT, pomoc techniczna, konsultacja IT, wycena usług IT, wsparcie IT, zapytanie ofertowe, firma informatyczna'
        ]);
    }
    
    public static function submit()
    {
        // Sprawdź czy to request AJAX
        $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
                  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
        
        // Sprawdź CSRF token
        $csrfToken = $_POST['csrf_token'] ?? '';
        if (!ViewHelper::verifyCsrfToken($csrfToken)) {
            if ($isAjax) {
                header('Content-Type: application/json');
                http_response_code(403);
                echo json_encode([
                    'success' => false,
                    'message' => 'Nieprawidłowy token bezpieczeństwa. Spróbuj ponownie.'
                ]);
                exit;
            }
            $_SESSION['form_errors'] = ['general' => 'Nieprawidłowy token bezpieczeństwa. Spróbuj ponownie.'];
            ViewHelper::redirect('/kontakt');
            return;
        }
        
        // Walidacja danych
        $email = trim($_POST['email'] ?? '');
        $subject = trim($_POST['subject'] ?? '');
        $message = trim($_POST['message'] ?? '');
        
        $errors = [];
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Prawidłowy email jest wymagany';
        }
        
        if (empty($subject)) {
            $errors['subject'] = 'Temat jest wymagany';
        }
        
        if (empty($message)) {
            $errors['message'] = 'Wiadomość jest wymagana';
        }
        
        if (!empty($errors)) {
            if ($isAjax) {
                header('Content-Type: application/json');
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Proszę poprawić błędy w formularzu.',
                    'errors' => $errors
                ]);
                exit;
            }
            // Przekieruj z błędami (fallback dla braku JS)
            $_SESSION['form_errors'] = $errors;
            $_SESSION['old_input'] = $_POST;
            ViewHelper::redirect('/kontakt');
            return;
        }
        
        // Wyślij email
        try {
            $mailService = new MailService();
            // Kolejność: name, email, subject, message (name nie jest zbierane – przekaż null)
            $mailService->sendContactForm(null, $email, $subject, $message);
            
            if ($isAjax) {
                header('Content-Type: application/json');
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Wiadomość została wysłana pomyślnie!'
                ]);
                exit;
            }
            
            // Sukces (fallback dla braku JS)
            $_SESSION['success_message'] = 'Wiadomość została wysłana pomyślnie!';
            ViewHelper::redirect('/kontakt');
            
        } catch (\Exception $e) {
            // Błąd wysyłania - loguj szczegóły
            error_log("Mail sending error: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
            
            if ($isAjax) {
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Wystąpił błąd podczas wysyłania wiadomości. Sprawdź konfigurację SMTP w pliku .env'
                ]);
                exit;
            }
            
            $_SESSION['form_errors'] = ['general' => 'Wystąpił błąd podczas wysyłania wiadomości. Sprawdź konfigurację SMTP w pliku .env'];
            $_SESSION['old_input'] = $_POST;
            ViewHelper::redirect('/kontakt');
        }
    }
}
