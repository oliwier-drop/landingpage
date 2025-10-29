<?php

namespace Corpotech\Landingpage\Services;

use Corpotech\Landingpage\Config\App;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;

class MailService
{
    private $mailer;
    private string $fromEmail;
    private string $fromName;
    private string $toEmail;

    public function __construct()
    {
        $this->fromEmail = App::getEnv('MAIL_FROM_ADDRESS');
        $this->fromName = App::getEnv('MAIL_FROM_NAME', 'Corpotech');
        $this->toEmail = App::getEnv('MAIL_TO_ADDRESS');  
        
        // Walidacja adresu email nadawcy
        if (empty($this->fromEmail)) {
            throw new \RuntimeException('MAIL_FROM_ADDRESS nie jest ustawiony w pliku .env. Ustaw np. MAIL_FROM_ADDRESS=noreply@corpotech.com.pl');
        }
        
        if (!filter_var($this->fromEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \RuntimeException('MAIL_FROM_ADDRESS "' . $this->fromEmail . '" nie jest prawidłowym adresem email w pliku .env. Ustaw np. MAIL_FROM_ADDRESS=noreply@corpotech.com.pl');
        }
        
        // Jeśli MAIL_TO_ADDRESS nie jest ustawiony, użyj MAIL_FROM_ADDRESS
        if (empty($this->toEmail)) {
            $this->toEmail = $this->fromEmail;
        }
        
        // Walidacja adresu email odbiorcy
        if (!filter_var($this->toEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \RuntimeException('MAIL_TO_ADDRESS "' . $this->toEmail . '" nie jest prawidłowym adresem email w pliku .env. Ustaw np. MAIL_TO_ADDRESS=biuro@corpotech.com.pl');
        }
        
        $this->setupMailer();
    }

    private function setupMailer()
    {
        $host = App::getEnv('MAIL_HOST', 'localhost');
        $port = (int) App::getEnv('MAIL_PORT', 587);
        $username = App::getEnv('MAIL_USERNAME');
        $password = App::getEnv('MAIL_PASSWORD');
        $encryption = App::getEnv('MAIL_ENCRYPTION', 'tls');
        
        // Dla portu 465 domyślnie używa SSL, dla innych TLS
        // null = auto-detection, true = wymuszone TLS, false = wyłączone
        $tls = null; // auto-detection
        if ($encryption === 'ssl') {
            $tls = true;
        } elseif ($encryption === 'none' || $encryption === 'false') {
            $tls = false;
        }
        
        $transport = new EsmtpTransport($host, $port, $tls);
        
        // Uwierzytelnianie
        if ($username && $password) {
            $transport->setUsername($username);
            $transport->setPassword($password);
        }
        
        $this->mailer = new Mailer($transport);
    }

    public function sendEmail($to, $subject, $body, $fromName = null)
    {
        $email = (new Email())
            ->from(new Address($this->fromEmail, $fromName ?? $this->fromName))
            ->to(new Address($to))
            ->subject($subject)
            ->text($body);
        
        $this->mailer->send($email);
    }

    public function sendContactForm($name, $email, $subject, $message)
    {
        $toEmail = $this->toEmail;
        $emailSubject = trim((string)$subject);

        // Plain-text fallback (bez imienia – tylko email, temat, wiadomość)
        $textBody  = "Nowa wiadomość z formularza kontaktowego\n\n";
        $textBody .= "Email: {$email}\n";
        $textBody .= "Temat: {$emailSubject}\n\n";
        $textBody .= "Wiadomość:\n{$message}\n";

        // Proste, czytelne HTML z podstawowym stylowaniem inline
        $escapedEmail   = htmlspecialchars((string)$email, ENT_QUOTES, 'UTF-8');
        $escapedSubject = htmlspecialchars($emailSubject, ENT_QUOTES, 'UTF-8');
        $escapedMessage = nl2br(htmlspecialchars((string)$message, ENT_QUOTES, 'UTF-8'));

        $htmlBody = '<!DOCTYPE html>' .
            '<html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' .
            '<title>Wiadomość z formularza kontaktowego</title></head>' .
            '<body style="margin:0;padding:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;color:#0d1b2a;">' .
              '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f6f7f9;padding:24px 0;">' .
                '<tr><td align="center">' .
                  '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">' .
                    '<tr>' .
                      '<td style="background:#ff6a00;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700;">' .
                        'Nowa wiadomość z formularza kontaktowego' .
                      '</td>' .
                    '</tr>' .
                    '<tr>' .
                      '<td style="padding:24px;">' .
                        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;color:#0d1b2a;">' .
                          '<tr>' .
                            '<td style="padding:8px 0;width:120px;color:#415a77;">Email</td>' .
                            '<td style="padding:8px 0;font-weight:600;">' . $escapedEmail . '</td>' .
                          '</tr>' .
                          '<tr>' .
                            '<td style="padding:8px 0;color:#415a77;">Temat</td>' .
                            '<td style="padding:8px 0;font-weight:600;">' . $escapedSubject . '</td>' .
                          '</tr>' .
                        '</table>' .
                        '<div style="margin:16px 0;border-top:1px solid #e6e8eb;"></div>' .
                        '<div>' .
                          '<div style="color:#415a77;margin-bottom:8px;">Wiadomość</div>' .
                          '<div style="font-size:15px;line-height:1.6;white-space:normal;color:#0d1b2a;">' . $escapedMessage . '</div>' .
                        '</div>' .
                      '</td>' .
                    '</tr>' .
                    '<tr>' .
                      '<td style="background:#f2f4f7;padding:16px 24px;color:#415a77;font-size:12px;">' .
                        'Ta wiadomość została wysłana z formularza kontaktowego na stronie ' . htmlspecialchars((string)App::getEnv('APP_URL', 'http://localhost'), ENT_QUOTES, 'UTF-8') .
                      '</td>' .
                    '</tr>' .
                  '</table>' .
                '</td></tr>' .
              '</table>' .
            '</body></html>';

        $emailMessage = (new Email())
            ->from(new Address($this->fromEmail, $this->fromName))
            ->to(new Address($toEmail))
            ->subject($emailSubject)
            ->text($textBody)
            ->html($htmlBody);

        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailMessage->replyTo(new Address($email, $name ?: $email));
        }

        $this->mailer->send($emailMessage);
    }
}