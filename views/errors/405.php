<section class="min-h-screen flex items-center justify-center bg-brand-navy-main">
    <div class="container text-center px-4 py-24">
        <div class="mx-auto max-w-2xl">
            <p class="text-brand-orange-main font-semibold tracking-wider mb-4">Błąd <?= htmlspecialchars($error_code ?? 405, ENT_QUOTES, 'UTF-8') ?></p>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6">Metoda niedozwolona</h1>
            <p class="text-lg text-gray-300 mb-10">
                <?= htmlspecialchars($error_message ?? 'Żądana metoda HTTP nie jest dozwolona dla tego adresu.', ENT_QUOTES, 'UTF-8') ?>
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" class="py-3 px-6 rounded-lg bg-brand-orange-main text-white font-medium hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-main/30 transition">
                    Wróć na stronę główną
            </div>
        </div>
    </div>
</section>

