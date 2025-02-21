<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Tworzenie ról (jeśli nie istnieją)
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $teacherRole = Role::firstOrCreate(['name' => 'teacher']);
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $guestRole = Role::firstOrCreate(['name' => 'guest']);

        // Tworzenie uprawnień (jeśli nie istnieją)
        $permManageUsers = Permission::firstOrCreate(['name' => 'manage users']);
        $permManageCourses = Permission::firstOrCreate(['name' => 'manage courses']);

        // Przypisywanie uprawnień do ról
        $adminRole->givePermissionTo([$permManageUsers, $permManageCourses]);
        $teacherRole->givePermissionTo([$permManageCourses]);

        // Znajdujemy użytkownika ID=1 (o ile istnieje)
    //     $firstUser = User::find(1);
    //    $firstUser = User::where('email','admin@wp.pl')->first();
    //     $firstUser->assignRole('admin');


    $firstUser = User::firstOrCreate(
        [ 'email' => 'admin@wp.pl' ],
        [
            'name' => 'Admin Account',
            'password' => bcrypt('secret123'), // hasło testowe
        ]
    );

    // Teraz już $firstUser NIGDY nie będzie nullem
    $firstUser->assignRole('admin');

    }
}
