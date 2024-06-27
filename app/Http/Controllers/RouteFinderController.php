<?php

namespace App\Http\Controllers;

use App\Models\RouteNode;
use Inertia\Inertia;

class RouteFinderController extends Controller
{
    public function index()
    {
        $nodes = RouteNode::all();
        return Inertia::render('testBFS', [
            'nodes' => $nodes
        ]);
    }
}   