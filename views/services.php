<section id="hero-subpage" class="relative h-[50vh] flex items-center justify-center overflow-hidden z-10">
    <div class="container relative z-10 text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
            Usługi
        </h1>
    </div>
</section>



<section id="services-list" class="bg-white py-20 h-min-screen">
    <div class="container">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-navy-main mb-8 leading-tight">
                Oferujemy kompleksowe usługi:
            </h2>
        </div>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-title="Serwerownie" data-details="Projektujemy, budujemy i utrzymujemy nowoczesne serwerownie zgodne z najlepszymi praktykami (redundancja zasilania i chłodzenia, kontrola dostępu, monitoring środowiskowy). Zapewniamy skalowalność, bezpieczeństwo i ciągłość działania." data-tech="UPS/ATS,Rack 19”,KVM/IPMI,VMware/Proxmox,Hyper‑V,RAID/NAS/SAN,Monitoring SNMP" data-points="Projekt i budowa serwerowni;Zasilanie awaryjne (UPS) i redundancja;Chłodzenie precyzyjne i kontrola środowiska;Okablowanie, patch‑panele i porządek w szafach;Serwery fizyczne i wirtualizacja;Monitoring i alertowanie 24/7">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/serverroom.png" alt="Projektowanie i utrzymanie serwerowni" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Serwerownie</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Projektowanie, budowa i utrzymanie serwerowni – niezawodność, bezpieczeństwo i skalowalność.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            Kompleksowe wdrożenia, okablowanie, zasilanie awaryjne, chłodzenie precyzyjne, monitoring oraz dokumentacja i audyty.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadowsm hover:shadow-md transition-shadow" data-title="Chmura" data-details="Przygotowujemy architekturę chmurową, prowadzimy migracje, automatyzujemy infrastrukturę i optymalizujemy koszty. Zapewniamy zgodność i bezpieczeństwo usług." data-tech="AWS,Azure,Google Cloud,Docker,Kubernetes,Terraform,Ansible" data-points="Architektura i landing zone;Migracje aplikacji i danych;Automatyzacja (IaC, CI/CD);Backup i disaster recovery;Optymalizacja kosztów (FinOps);Bezpieczeństwo i zgodność (IAM, polityki)">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/cloud.png" alt="Rozwiązania chmurowe" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Chmura</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Migracje, optymalizacja kosztów i bezpieczeństwo usług w chmurze publicznej i prywatnej.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            AWS, Azure, backup i DR, konteneryzacja, CI/CD, IaC, projektowanie hybrydowe, polityki bezpieczeństwa i IAM.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-title="Cyberbezpieczeństwo" data-details="Realizujemy audyty, twardnienie systemów, wdrożenia EDR/WAF/SIEM oraz stały monitoring SOC. Prowadzimy szkolenia i pomagamy w przygotowaniu do certyfikacji (np. ISO 27001)." data-tech="EDR/XDR,SIEM,WAF,IDS/IPS,VPN,MFA,ISO 27001" data-points="Audyty i testy penetracyjne;Hardening systemów i aplikacji;Monitoring i reagowanie na incydenty;Ochrona endpointów i poczty;Bezpieczny dostęp (VPN/MFA);Przygotowanie do ISO 27001">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/cybersecurity.png" alt="Cyberbezpieczeństwo" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Cyberbezpieczeństwo</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Audyty, hardening, SOC/NOC, monitorowanie i reagowanie na incydenty bezpieczeństwa.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            Testy penetracyjne, WAF/EDR, SIEM, szyfrowanie, zgodność z normami (ISO 27001), szkolenia bezpieczeństwa.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-title="Sieci i łączność" data-details="Projektujemy i wdrażamy wydajne, bezpieczne sieci przewodowe i bezprzewodowe. Segmentacja, polityki QoS oraz wysokie SLA dla krytycznych usług." data-tech="Cisco,MikroTik,Extreme Networks,Ubiquiti UniFi,TP‑Link,HP/Aruba,Fortinet" data-points="Projekt i wdrożenia LAN/WAN;Wi‑Fi enterprise i pomiary;Segmentacja VLAN i polityki QoS;Routing (OSPF/BGP) i redundancja;Bezpieczeństwo brzegowe (NGFW);Monitoring i utrzymanie SLA">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/network.png" alt="Sieci i łączność" class="w-full h-full object-contain bg-white">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Sieci i łączność</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Projektowanie i wdrożenia LAN/WAN/Wi‑Fi, segmentacja, QoS, wysokie SLA i monitoring.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            Routing i switching, bezpieczeństwo brzegowe, VPN, VoIP, Wi‑Fi enterprise, pomiary i optymalizacja pokrycia.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-title="Konsulting IT" data-details="Doradzamy strategicznie: budujemy roadmapy, modernizujemy środowisko, optymalizujemy koszty i ryzyko. Przygotowujemy plany DR/BCP i modele operacyjne." data-tech="ITIL,COBIT,TOGAF,FinOps,DR/BCP,CMDB,SLA/OLA" data-points="Strategia i roadmapy IT;Audyty i optymalizacja TCO/ROI;DR/BCP i ciągłość działania;Procesy ITIL/CMDB/SLA;Compliance i governance;Wsparcie zakupów i vendor management">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/consulting.png" alt="Konsulting IT" class="w-full h-full object-contain bg-white">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Konsulting IT</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Strategia IT, modernizacja infrastruktury, optymalizacja kosztów i ciągłość działania.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            Roadmapy rozwoju, audyty TCO/ROI, plany migracji, compliance, budżetowanie i governance IT.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="service-card bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" data-title="Utrzymanie i wsparcie" data-details="Zapewniamy 24/7 monitoring, helpdesk, patch management i proaktywne utrzymanie systemów. Raportujemy KPI i proponujemy działania usprawniające." data-tech="Zabbix,Prometheus,Elastic,Jira,OpenProject,Tactical RMM,SLA" data-points="Helpdesk i wsparcie użytkowników;Monitoring 24/7 i alerty;Patch management i hardening;Inwentaryzacja i CMDB;Raporty KPI/SLAs;Proaktywne działania optymalizacyjne">
                <div class="aspect-[16/9] overflow-hidden bg-gray-200">
                    <img src="/assets/images/services/support.png" alt="Utrzymanie i wsparcie" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-brand-navy-main mb-2">Utrzymanie i wsparcie</h3>
                    <p class="text-brand-navy-main/80 leading-relaxed">Umowy serwisowe, monitoring 24/7, szybkie SLA i proaktywne utrzymanie systemów.</p>
                    <button type="button" class="service-toggle mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange-main text-white text-sm font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30">Więcej</button>
                    <div class="service-extra" style="height:0;overflow:hidden;opacity:0">
                        <div class="pt-4 text-sm text-brand-navy-main/80">
                            Zdalne wsparcie, helpdesk, patch management, inwentaryzacja, raportowanie i automatyzacja rutynowych zadań.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
