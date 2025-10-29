<!-- Hero and About Stack Wrapper -->
<div class="stack-hero-about">
<!-- Hero Section -->
<section id="hero-pin" class="relative h-screen bg-gradient-to-br from-brand-navy-main via-brand-navy-light to-brand-navy-main flex items-center justify-center overflow-hidden z-10">
    <!-- Background Video -->
    <div class="absolute inset-0 z-0">
        <video 
            class="w-full h-full object-cover opacity-20" 
            autoplay 
            muted 
            loop 
            playsinline
        >
            <source src="/assets/videos/hero-video.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Hero Content -->
    <div class="container relative z-10 text-center">
        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
            <span id="changing-word" class="block font-medium opacity-0 h-16 flex items-center justify-center"></span>
            <span class="block text-white font-medium mt-8">dla  <span class="text-white font-bold">Twojego biznesu.</span></span>
        </h1>
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/kontakt" class="border-2 border-white text-white hover:bg-white hover:text-brand-navy-main px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Skontaktuj się
            </a>
            <a href="https://linkedin.com/company/corpotech-group/" target="_blank" class="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Zaobserwuj nas na LinkedIn
            </a>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
    </div>
</section>

<section id="about" class="bg-white relative py-10">
    <div class="container px-4 mx-auto">
        <!-- Title at the top -->
        <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-navy-main mb-12 leading-tight text-center">
            O nas
        </h2>
        <!-- Content split into two columns -->
        <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <!-- Left side - Description -->
            <div class="flex flex-col">
                <div class="space-y-6 mb-8">
                    <p class="text-lg text-brand-navy-main leading-relaxed">
                        Jesteśmy specjalistami w dziedzinie cyberbezpieczeństwa, konsultacji, serwerowni, sieci i rozwiązań IT. Działamy na rynku od 2011 roku.
                    </p>
                    <p class="text-lg text-brand-navy-main leading-relaxed">
                        Nasza wiedza i doświadczenie pozwalają dostarczać najwyższej jakości rozwiązania technologiczne, które wspierają rozwój biznesu naszych klientów. Żadna branża nie jest nam obca.
                    </p>
                </div>
                <a href="/o-nas" class="animated-button mt-14">
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                    <span class="text">Więcej o nas</span>
                    <span class="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                        <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                        ></path>
                    </svg>
                </a>
            </div>
            
            <!-- Right side - CEO Quote -->
            <figure class="text-center">
            <svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
                <blockquote>
                    <p class="text-xl lg:text-2xl italic font-medium text-brand-navy-main leading-relaxed">
                        "Corpotech łączy wieloletnie doświadczenie z nowoczesnymi technologiami, dostarczając kompleksowe rozwiązania IT, które wspierają rozwój biznesu naszych klientów. Naszym priorytetem jest bezpieczeństwo, niezawodność i efektywność."
                    </p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-8 space-x-3">
                    
                    <div class="flex items-center divide-x-2 divide-gray-300">
                        <cite class="pe-4 font-semibold text-brand-navy-main">Robert Smarzyński</cite>
                        <cite class="ps-4 text-sm text-gray-600">CEO & Członek Zarządu</cite>
                    </div>
                </figcaption>
            </figure>
        </div>
    </div>
</section>
</div>

<section id="clients" class="bg-[#0d1b2a] h-[60vh] flex items-center justify-center relative">
    <div class="container">
        <div class="text-center mb-16 clients-header-animate">
            <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
                Nasi klienci
            </h2>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
                Zaufali nam liderzy branży, którzy doceniają nasze wsparcie
            </p>
        </div>
        
        <!-- Client Logos Slider -->
        <div id="clients-viewport" class="overflow-hidden clients-slider-animate">
            <div id="clients-track" class="flex flex-nowrap items-center will-change-transform">
                <div class="logo-set flex flex-nowrap gap-x-16 flex-none">
                    <div class="client-logo opacity-60 hover:opacity-100 transition-opacity duration-300 flex-none">
                        <a href="https://www.hellermanntyton.pl/" target="_blank"><img src="/assets/images/clients/ht.png" alt="Hellermann Tyton Logo" class="h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300 block"></a>
                    </div>
                    <div class="client-logo opacity-60 hover:opacity-100 transition-opacity duration-300 flex-none">
                        <a href="https://www.watis.com.pl/" target="_blank"><img src="/assets/images/clients/watis.png" alt="Watis Logo" class="h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300 block"></a>
                    </div>
                    <div class="client-logo opacity-60 hover:opacity-100 transition-opacity duration-300 flex-none">
                        <img src="/assets/images/clients/marpol.png" alt="Marpol Logo" class="h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300 block">
                    </div>
                    <div class="client-logo opacity-60 hover:opacity-100 transition-opacity duration-300 flex-none">
                        <img src="/assets/images/clients/agmar.png" alt="Agmar Logo" class="h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300 block">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="partners" class="bg-brand-navy-main py-20 relative">
    <div class="container">
        <div class="text-center mb-16 partners-header-animate">
            <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
                Partnerzy
            </h2>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
                Współpracujemy z najlepszymi dostawcami rozwiązań IT dla biznesu
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 w-full">
            <!-- Blue Energy -->
            <div class="bg-[#0d1b2a] rounded-lg shadow-sm overflow-hidden border border-gray-700 group">
                <a href="https://www.grupablue.pl/" target="_blank" class="block">
                    <div class="h-48 bg-gray-800 flex items-center justify-center p-8">
                        <img src="/assets/images/clients/blue.png" alt="Blue Energy Logo" class="max-h-32 max-w-full object-contain hover:scale-110 transition-transform duration-300" />
                    </div>
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Blue Energy</h5>
                    <p class="mb-3 font-normal text-gray-300">
                        Partner w zakresie rozwiązań infrastruktury IT
                    </p>
                    <a href="https://www.grupablue.pl/" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brand-orange-main rounded-lg hover:bg-brand-orange-light focus:ring-4 focus:outline-none focus:ring-brand-orange transition-colors">
                        Odwiedź stronę
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <!-- Komputronik Biznes Komserwis -->
            <div class="bg-[#0d1b2a] rounded-lg shadow-sm overflow-hidden border border-gray-700 group">
                <a href="https://www.komputronikbiznes.pl/" target="_blank" class="block">
                    <div class="h-48 bg-gray-800 flex items-center justify-center p-8">
                        <img src="/assets/images/clients/komputronik.png" alt="Komputronik Biznes Logo" class="max-h-32 max-w-full object-contain hover:scale-110 transition-transform duration-300" />
                    </div>
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Komputronik Biznes</h5>
                    <p class="mb-3 font-normal text-gray-300">
                        Partner w obszarze sprzętu IT dla biznesu
                    </p>
                    <a href="https://www.komputronikbiznes.pl/" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brand-orange-main rounded-lg hover:bg-brand-orange-light focus:ring-4 focus:outline-none focus:ring-brand-orange transition-colors">
                        Odwiedź stronę
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <!-- Komserwis -->
            <div class="bg-[#0d1b2a] rounded-lg shadow-sm overflow-hidden border border-gray-700 group">
                <a href="https://komserwis.com/" target="_blank" class="block">
                    <div class="h-48 bg-gray-800 flex items-center justify-center p-8">
                        <img src="/assets/images/clients/komserwis.png" alt="Komserwis Logo" class="max-h-32 max-w-full object-contain hover:scale-110 transition-transform duration-300" />
                    </div>
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Komserwis</h5>
                    <p class="mb-3 font-normal text-gray-300">
                        Partner w obszarze sprzętu biurowego i drukarek
                    </p>
                    <a href="https://komserwis.com/" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brand-orange-main rounded-lg hover:bg-brand-orange-light focus:ring-4 focus:outline-none focus:ring-brand-orange transition-colors">
                        Odwiedź stronę
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="services" class="services-section">
    <!-- Services Horizontal Scroll Container -->
    <div class="services-horizontal-container">
            <!-- Service Panel 1 - Cyberbezpieczeństwo -->
            <section class="service-panel cybersecurity-panel">
                <div class="container">
                    <div class="panel-content">
                        <div class="service-info">
                            
                            <h3 class="text-4xl font-bold mb-4 text-white">Cyberbezpieczeństwo</h3>
                            <p class="text-lg text-gray-300 mb-8">Zapewniamy kompleksową ochronę infrastruktury IT i danych poprzez zaawansowane rozwiązania bezpieczeństwa:</p>
                            <ul class="text-white space-y-3 text-left max-w-md">
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Wdrażanie i konfiguracja firewalli</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Audyty bezpieczeństwa infrastruktury IT</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Testy penetracyjne i ocena podatności</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Wdrażanie systemów IDS/IPS</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Polityki bezpieczeństwa i procedury</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Szkolenia z cyberbezpieczeństwa</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Zarządzanie incydentami bezpieczeństwa</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Backup i recovery danych</li>
                            </ul>
                        </div>
                        <div class="service-visual cybersecurity-visual">
                            <div class="brand-logo logo-1">
                                <img src="/assets/images/brands/fortinet.png" alt="Fortinet" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-2">
                                <img src="/assets/images/brands/cisco.png" alt="Cisco" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-3">
                                <img src="/assets/images/brands/palo-alto.png" alt="Palo Alto" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-4">
                                <img src="/assets/images/brands/checkpoint.png" alt="Check Point" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-5">
                                <img src="/assets/images/brands/extreme.png" alt="Extreme Networks" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Panel 2 - Konsultacje IT -->
            <section class="service-panel consulting-panel">
                <div class="container">
                    <div class="panel-content">
                        <div class="service-info">
                            
                            <h3 class="text-4xl font-bold mb-4 text-white">Konsultacje IT</h3>
                            <p class="text-lg text-gray-300 mb-8">Dostarczamy eksperckie doradztwo w zakresie transformacji cyfrowej:</p>
                            <ul class="text-white space-y-3 text-left max-w-md">
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Strategia transformacji cyfrowej</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Optymalizacja procesów IT</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Analiza i projektowanie systemów</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Zarządzanie projektami IT</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Audyty technologiczne</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Wsparcie w wyborze rozwiązań IT</li>
                            </ul>
                        </div>
                        <div class="service-visual consulting-visual">
                            <div class="brand-logo logo-1">
                                <img src="/assets/images/brands/microsoft.png" alt="Microsoft" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-2">
                                <img src="/assets/images/brands/oracle.png" alt="Oracle" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-3">
                                <img src="/assets/images/brands/sap.png" alt="SAP" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-4">
                                <img src="/assets/images/brands/ibm.png" alt="IBM" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Panel 3 - Serwerownia -->
            <section class="service-panel datacenter-panel">
                <div class="container">
                    <div class="panel-content">
                        <div class="service-info">
                            
                            <h3 class="text-4xl font-bold mb-4 text-white">Serwerownia</h3>
                            <p class="text-lg text-gray-300 mb-8">Projektujemy i budujemy kompletne infrastruktury sieciowe oraz serwerownie:</p>
                            <ul class="text-white space-y-3 text-left max-w-md">
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Projektowanie i wdrażanie sieci LAN/WAN</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Konfiguracja switchy, routerów i punktów dostępowych Wi-Fi</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Segmentacja sieci (VLAN) i optymalizacja wydajności</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Projektowanie i budowa serwerowni</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Systemy zasilania awaryjnego (UPS)</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Instalacja systemów chłodzenia i klimatyzacji</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Wdrażanie serwerów fizycznych i wirtualnych</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Monitoring infrastruktury sieciowej</li>
                            </ul>
                        </div>
                        <div class="service-visual datacenter-visual">
                            <div class="brand-logo logo-1">
                                <img src="/assets/images/brands/dell.png" alt="Dell" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-2">
                                <img src="/assets/images/brands/hp.png" alt="HP" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-3">
                                <img src="/assets/images/brands/lenovo.png" alt="Lenovo" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-4">
                                <img src="/assets/images/brands/supermicro.png" alt="Supermicro" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Panel 4 - Sieci -->
            <section class="service-panel networking-panel">
                <div class="container">
                    <div class="panel-content">
                        <div class="service-info">
                            
                            <h3 class="text-4xl font-bold mb-4 text-white">Usługi chmurowe</h3>
                            <p class="text-lg text-gray-300 mb-8">Wspieramy firmy w transformacji cyfrowej poprzez wykorzystanie technologii chmurowych:</p>
                            <ul class="text-white space-y-3 text-left max-w-md">
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Migracja do chmury (AWS, Azure, GCP)</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Architektura rozwiązań chmurowych</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Optymalizacja kosztów infrastruktury</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Zarządzanie środowiskami chmurowymi</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Backup i disaster recovery</li>
                                <li class="flex items-center"><span class="text-brand-orange mr-3 text-lg">→</span>Skalowanie i automatyzacja</li>
                            </ul>
                        </div>
                        <div class="service-visual networking-visual">
                            <div class="brand-logo logo-1">
                                <img src="/assets/images/brands/aws.png" alt="AWS" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-2">
                                <img src="/assets/images/brands/azure.png" alt="Microsoft Azure" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-3">
                                <img src="/assets/images/brands/gcp.png" alt="Google Cloud" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                            <div class="brand-logo logo-4">
                                <img src="/assets/images/brands/vmware.png" alt="VMware" class="max-h-16 max-w-24 w-auto h-auto grayscale hover:grayscale-0 transition-all duration-300">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</section>

<!-- Projects Section with Parallax -->
<section id="projects" class="projects-section">
    <h1 class="header-section lead">Nasze projekty</h1>
    
    <section class="pSection pSection-right">
        <div class="container">
            <div class="pContent pContent-right">
                <h3 class="project-title">System zarządania zamówieniami dla Marpol</h3>
                <p class="project-description">
                    Kompleksowe przygotowanie i wdrożenie systemu zarządania zamówieniami i produkcji dla Marpol.
                </p>
                <div class="project-tags">
                    <span class="tag">MySQL</span>
                    <span class="tag">PHP</span>
                    <span class="tag">JavaScript</span>
                </div>
            </div>
        </div>
        <img class="pImage pImage-right" src="/assets/images/projects/management-system.png" alt="Projekt systemu zarządania zamówieniami">
    </section>
    
    <section class="pSection pSection-left">
        <div class="container">
            <div class="pContent pContent-left">
                <h3 class="project-title">Nowoczesna serwerownia dla Hellermann Tyton</h3>
                <p class="project-description">
                    Projekt i wdrożenie kompletnej infrastruktury serwerowej dla Hellermann Tyton,
                    z systemami chłodzenia, zasilania awaryjnego i monitoringiem.
                </p>
                <div class="project-tags">
                    <span class="tag">Dell</span>
                    <span class="tag">Extreme Networks</span>
                    <span class="tag">Palo Alto</span>
                </div>
            </div>
        </div>
        <img class="pImage pImage-left" src="/assets/images/projects/serverroom.png" alt="Projekt serwerowni">
    </section>
    
    <section class="pSection pSection-right">
        <div class="container">
            <div class="pContent pContent-right">
                <h3 class="project-title">Migracja do chmury hybrydowej dla Watis</h3>
                <p class="project-description">
                    Przeprowadzenie kompleksowej migracji systemów IT do chmurowego środowiska hybrydowego z wykorzystaniem rozwiązania Azure, wraz z nową bazą danych.
                </p>
                <div class="project-tags">
                    <span class="tag">Azure</span>
                    <span class="tag">Oracle</span>
                    <span class="tag">Fortinet</span>
                </div>
            </div>
        </div>
        <img class="pImage pImage-right" src="/assets/images/projects/cloud.png" alt="Projekt chmurowy">
    </section>
</section>



