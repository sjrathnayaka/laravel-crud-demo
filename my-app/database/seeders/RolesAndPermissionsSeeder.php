<?php
// database/seeders/RolesAndPermissionsSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Create permissions
        $createSongPermission = Permission::create(['name' => 'create songs']);
        $editSongPermission = Permission::create(['name' => 'edit songs']);
        $deleteSongPermission = Permission::create(['name' => 'delete songs']);

        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // Assign permissions to roles
        $adminRole->givePermissionTo($createSongPermission, $editSongPermission, $deleteSongPermission);
        $userRole->givePermissionTo($createSongPermission);  // Only assign 'create songs' to user role
    }
}
