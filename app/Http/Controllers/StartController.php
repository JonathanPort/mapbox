<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class StartController extends Controller
{

    public function __construct() {
        //
    }


    public function startMapbox()
    {

        //  Register any application variables here

        $endpoints = [
            'mapboxStart' => route('start.mapbox'),
        ];

        $keys = [
            'mapbox' => env('MAPBOX_API_KEY'),
        ];

        $appData = [
            'endpoints' => $endpoints,
            'keys' => $keys,
        ];

        return response()->json($appData, Response::HTTP_OK);

    }


}
