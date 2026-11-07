<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mahasiswa')->insert([
            [
                'Nim' => '230101001',
                'Nama' => 'Komang Tri Laksmi Antari',
            ],
            [
                'Nim' => '230101002',
                'Nama' => 'Syahrull Adhiyaksa',
            ],
            [
                'Nim' => '230101003',
                'Nama' => 'Angga',
            ],
            
        ]);
        
    }
}
