<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::firstOrCreate(
            [ 'email' => 'admin@wp.pl' ],
            [
               'name' => 'Admin',
               'password' => bcrypt('H4L78ESakd'),
            ]
        );
    }
}
