<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Tworzenie ról
        $admin = Role::create(['name' => 'admin']);
        $teacher = Role::create(['name' => 'teacher']);
        $user = Role::create(['name' => 'user']);
        $guest = Role::create(['name' => 'guest']);

        // Tworzenie uprawnień
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage courses']);

        // Przypisanie uprawnień do ról
        $admin->givePermissionTo(['manage users', 'manage courses']);
        $teacher->givePermissionTo(['manage courses']);
    }
}
