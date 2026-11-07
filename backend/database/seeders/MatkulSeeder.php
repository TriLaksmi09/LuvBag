<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MatkulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('matkul')->insert([
            [
                'Nama_matkul' => 'Teknologi Web',
            ],
            [
                'Nama_matkul' => 'Teori Bahasa Otomata',
            ],
            [
                'Nama_matkul' => 'Grafika Komputer',
            ],
        ]);
        
    }
}
