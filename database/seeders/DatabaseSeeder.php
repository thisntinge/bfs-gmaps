<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call(RouteNodeSeeder::class);
        // User::factory(10)->create();

      
        // User::factory()->create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        //     'role' => 'admin', // role admin
        // ]);

       
        // User::factory()->create([
        //     'name' => 'Regular User',
        //     'email' => 'user@example.com',
        //     'role' => 'user', // role user
        // ]);
    }
}
