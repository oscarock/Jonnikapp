<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

class LocationController extends Controller
{
    /**
     * Retorna la lista de sedes desde un archivo JSON ubicado en la carpeta public.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $path = public_path('locations.json');
            $json = file_get_contents($path);
            if ($json === false) {
                throw new Exception('No se pudo leer el archivo JSON.');
            }
            $locations = json_decode($json, true);

            return response()->json([
                'data' => $locations,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Error en la ejecución',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
