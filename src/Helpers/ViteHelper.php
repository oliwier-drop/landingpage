<?php

class ViteHelper
{
    public static function tags($entry)
    {
        // DEV: ładuj z dev-serwera
        if (!empty($_ENV['VITE_DEV']) && $_ENV['VITE_DEV'] === 'true') {
            echo '<script type="module" src="http://localhost:5173/' . $entry . '"></script>';
            return;
        }

        // PROD: wczytaj manifest
        $manifestCandidates = [
            __DIR__ . '/../../public/build/manifest.json',
            __DIR__ . '/../../public/build/.vite/manifest.json',
        ];

        $manifestPath = null;
        foreach ($manifestCandidates as $candidate) {
            if (file_exists($candidate)) {
                $manifestPath = $candidate;
                break;
            }
        }

        if ($manifestPath === null) {
            throw new RuntimeException("Manifest file not found. Checked: " . implode(', ', $manifestCandidates));
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);
        $e = $manifest[$entry] ?? null;
        
        if (!$e) {
            throw new RuntimeException("Brak entry {$entry} w manifest.json");
        }

        // CSS z manifestu
        if (!empty($e['css'])) {
            foreach ($e['css'] as $css) {
                echo '<link rel="stylesheet" href="/build/' . $css . '">' . PHP_EOL;
            }
        }

        // Główny plik JS
        echo '<script type="module" src="/build/' . $e['file'] . '"></script>' . PHP_EOL;

        // (opcjonalnie) preload dla zależności
        if (!empty($e['assets'])) {
            foreach ($e['assets'] as $asset) {
                echo '<link rel="modulepreload" href="/build/' . $asset . '">' . PHP_EOL;
            }
        }
    }
}
