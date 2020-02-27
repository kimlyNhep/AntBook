<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'first_name'=> 'Kimly',
            'last_name'=> 'Nhep',
            'username'=> 'Roselyn',
            'email'=> 'kimly@gmail.com',
            'password'=> Hash::make('p@ssword')
        ]);
    }
}
