<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class StartController extends Controller
{

    public function __construct() {
        $this->var = $var;
    }


    public function startMapbox()
    {

        //  Register any application variables here

        $endpoints = [
            'mapboxStart' => route('start.mapbox'),
        ];

        $appData = [
            'endpoints' => $endpoints,
        ];

        return Response::json($appData, Response::HTTP_OK)

    }


}
