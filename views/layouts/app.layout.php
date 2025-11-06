<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?> Corpotech | Rozwiązania IT, dla twojego biznesu</title>

    <meta name="description" content="<?= $description ?>">
    <meta name="keywords" content="<?= $keywords ?>">
    <meta name="author" content="Corpotech">
    <meta name="robots" content="<?= isset($robots) ? htmlspecialchars($robots, ENT_QUOTES, 'UTF-8') : 'index, follow' ?>">
    <meta name="googlebot" content="index, follow">
    <meta name="google" content="notranslate">
    <meta name="google-site-verification" content="google-site-verification=google-site-verification">
    <meta name="google-site-verification" content="google-site-verification">
    
    <!-- Google Fonts - Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Corpotech" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
    <!-- Vite Assets -->
    <?php
    require_once __DIR__ . '/../../src/Helpers/ViteHelper.php';
    ViteHelper::tags('resources/js/app.js');
    ?>
</head>
<body>
    <!-- Header with Logo -->
    <header id="main-header" class="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all duration-500">
        <div class="container" style="padding-left: 0; padding-right: 0;">
            <div class="relative py-4 h-20" style="align-items: center;">
                <!-- Certificates/Standards (Left side) -->
                <div class="hidden lg:flex items-center space-x-4 h-16 absolute left-0 top-1/2 transform -translate-y-1/2">
                    <div class="flex items-center space-x-3 h-16">
                        <img src="/assets/images/certificates/iso-27001.png" alt="ISO 27001" class="h-16">
                        <img src="/assets/images/certificates/iso-9001.png" alt="ISO 9001" class="h-16">
                        <img src="/assets/images/certificates/gdpr.png" alt="GDPR" class="h-16">
                        <!-- <img src="/assets/images/certificates/cisco.png" alt="Cisco" class="h-16"> -->
                    </div>
                </div>
                
                <!-- Logo (Center) - Logo stays in overlay -->
                <div id="header-logo-slot" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16">
                    <a href="/" class="block transition-transform duration-300 hover:scale-105">
                        <img src="/assets/images/logos/logo-poziome-pomarancz.png" alt="Corpotech" class="h-16">
                    </a>
                </div>
                
                <!-- Navigation (Right side) -->
                <nav class="hidden md:flex items-center space-x-8 h-16 absolute right-0 top-1/2 transform -translate-y-1/2">
                    <a href="/o-nas" class="text-white hover:text-brand-orange-main transition-colors duration-300 flex items-center justify-center h-16 text-lg leading-none">O nas</a>
                    <a href="/uslugi" class="text-white hover:text-brand-orange-main transition-colors duration-300 flex items-center justify-center h-16 text-lg leading-none">Usługi</a>
                    <a href="/#projects" class="text-white hover:text-brand-orange-main transition-colors duration-300 flex items-center justify-center h-16 text-lg leading-none">Projekty</a>
                    <a href="/kontakt" class="text-white hover:text-brand-orange-main transition-colors duration-300 flex items-center justify-center h-16 text-lg leading-none">Kontakt</a>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button class="md:hidden text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </header>
    <!-- Main Content -->
    <main id="main-content" class="bg-brand-navy-main min-h-screen relative z-10 opacity-100">
        <?= $content ?? '' ?>
    </main>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top-button">
        <svg class="svgIcon" viewBox="0 0 384 512">
            <path
                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            ></path>
        </svg>
    </button>

    <section id="contact-cta" class="min-h-screen flex items-center justify-center relative">
    <div class="container text-center">
        <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight cta-title-animate">
            Rozpocznij współpracę z nami!
        </h2>
        <p class="text-lg text-gray-300 mb-8 cta-description-animate">Skontaktuj się z nami, aby omówić, jak możemy pomóc w rozwoju Twojego biznesu.</p>
        <a href="/kontakt" class="animated-button cta-button-animate">
                <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                    <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
                <span class="text">Skontaktuj się</span>
                <span class="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                    <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
        </a>
    </div>
    </section>
    <!-- Footer poza hero section -->
    <footer class="bg-black relative z-10">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Dane spółki -->
                <div class="space-y-4">
                    <h3 class="text-white text-lg font-semibold mb-4">Grupa Corpotech Sp. z o.o.</h3>
                    <div class="space-y-2 text-gray-300 text-sm">
                        <p><span class="text-gray-400">NIP:</span> 6671793232</p>
                        <p><span class="text-gray-400">REGON:</span> 542943503</p>
                        <p><span class="text-gray-400">Adres:</span>
                        ul. T. Kościuszki 5,<br>
                        62-400 Słupca</p>
                    </div>
                </div>
                
                <!-- Linki prawne -->
                <div class="space-y-4">
                    <h3 class="text-white text-lg font-semibold mb-4">Informacje prawne</h3>
                    <div class="space-y-2">
                        <a href="/polityka-prywatnosci" class="block text-gray-400 hover:text-brand-orange-main transition-colors duration-300 text-sm">Polityka prywatności</a>
                        <a href="/regulamin" class="block text-gray-400 hover:text-brand-orange-main transition-colors duration-300 text-sm">Regulamin</a>
                    </div>
                </div>
                
                <!-- Kontakt i developer -->
                <div class="space-y-4">
                    <h3 class="text-white text-lg font-semibold mb-4">Kontakt</h3>
                    <div class="space-y-2 text-gray-300 text-sm">
                        <p><span class="text-gray-400">Email:</span> biuro@corpotech.com.pl</p>
                        <p><span class="text-gray-400">Telefon:</span> +(48) 573 296 093</p>
                    </div>
                    <div class="pt-2">
                        <a href="https://linkedin.com/company/corpotech-group/" target="_blank" class="inline-flex items-center gap-2 text-gray-400 hover:text-brand-orange-main transition-colors duration-300 text-sm">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span>Śledź nas na LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t border-brand-navy-light mt-8 pt-6">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p class="text-gray-400 text-sm">
                        &copy; <?= date('Y') ?> Grupa Corpotech Sp. z o.o. Wszelkie prawa zastrzeżone.
                    </p>
                    <p class="text-gray-400 text-sm">
                        Developed by <a href="https://linkedin.com/in/oliwier-drop" target="_blank" class="text-gray-400 hover:text-brand-orange-main transition-colors duration-300">Oliwier Drop</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>

<link rel="stylesheet" id="silktide-consent-manager-css" href="/assets/cookie-banner/silktide-consent-manager.css">
<script defer src="/assets/cookie-banner/silktide-consent-manager.js"></script>