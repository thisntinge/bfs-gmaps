<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RouteNode;

class RouteNodeSeeder extends Seeder
{
    public function run()
    {
        RouteNode::create(['name' => 'UNS', 'lat' => -7.5589, 'lng' => 110.8566, 'connections' => ['Persimpangan_Kentingan']]);
    RouteNode::create(['name' => 'Persimpangan_Kentingan', 'lat' => -7.5591, 'lng' => 110.8558, 'connections' => ['UNS', 'Gerbang_UNS']]);
    RouteNode::create(['name' => 'Gerbang_UNS', 'lat' => -7.5597, 'lng' => 110.8556, 'connections' => ['Persimpangan_Kentingan', 'Persimpangan_Jl_Ki_Hajar']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_Ki_Hajar', 'lat' => -7.5614, 'lng' => 110.8555, 'connections' => ['Gerbang_UNS', 'Persimpangan_Jl_Surya']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_Surya', 'lat' => -7.5636, 'lng' => 110.8554, 'connections' => ['Persimpangan_Jl_Ki_Hajar', 'Persimpangan_Jl_Adi_Sucipto']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_Adi_Sucipto', 'lat' => -7.5659, 'lng' => 110.8552, 'connections' => ['Persimpangan_Jl_Surya', 'Bundaran_Manahan']]);
    RouteNode::create(['name' => 'Bundaran_Manahan', 'lat' => -7.5545, 'lng' => 110.8149, 'connections' => ['Persimpangan_Jl_Adi_Sucipto', 'Persimpangan_Jl_MT_Haryono']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_MT_Haryono', 'lat' => -7.5539, 'lng' => 110.8132, 'connections' => ['Bundaran_Manahan', 'Persimpangan_Jl_Brigjen_Slamet_Riyadi']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_Brigjen_Slamet_Riyadi', 'lat' => -7.5662, 'lng' => 110.7992, 'connections' => ['Persimpangan_Jl_MT_Haryono', 'Persimpangan_Jl_Adi_Sumarmo']]);
    RouteNode::create(['name' => 'Persimpangan_Jl_Adi_Sumarmo', 'lat' => -7.5669, 'lng' => 110.7988, 'connections' => ['Persimpangan_Jl_Brigjen_Slamet_Riyadi', 'Solo_Technopark']]);
    RouteNode::create(['name' => 'Solo_Technopark', 'lat' => -7.5676, 'lng' => 110.7985, 'connections' => ['Persimpangan_Jl_Adi_Sumarmo']]);
    }
}