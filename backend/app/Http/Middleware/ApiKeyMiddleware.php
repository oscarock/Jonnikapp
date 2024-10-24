<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Obtener la API Key del header
        $apiKey = $request->header('x-api-key');

        // Comprobar si la API Key es válida
        if ($apiKey !== config('services.api_key')) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        // Continuar con la ejecución de la solicitud
        return $next($request);
    }
}
