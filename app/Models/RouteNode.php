<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteNode extends Model
{
    protected $fillable = ['lat', 'lng', 'name', 'connections'];

    protected $casts = [
        'connections' => 'array',
    ];
}