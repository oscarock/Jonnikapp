<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    // Usar echo en lugar de $this->comment()
    echo Inspiring::quote();
})->purpose('Display an inspiring quote');