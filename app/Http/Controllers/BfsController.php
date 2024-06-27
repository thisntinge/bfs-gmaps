<?php

namespace App\Http\Controllers;

use App\Models\RouteNode;
use Inertia\Inertia;

class BfsController extends Controller
{
    public function index()
    {
        $routeNodes = RouteNode::all();
        return Inertia::render('testBFS', [
            'routeNodes' => $routeNodes
        ]);
    }
}