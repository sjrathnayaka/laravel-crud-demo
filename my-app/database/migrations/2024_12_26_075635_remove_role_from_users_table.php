<?php
// database/migrations/xxxx_xx_xx_xxxxxx_remove_role_from_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveRoleFromUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role'); // Drop the 'role' column
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user'); // Add the 'role' column back in case of rollback
        });
    }
}
