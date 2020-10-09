<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

    </head>
    <body>

        <div id="app-start">
            <app-start ref="AppStart"></app-start>
        </div>

        <script src="{{ mix('js/App.js') }}"></script>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    </body>
</html>
