<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NilaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nilai')->insert([
            [
                'mahasiswa_id' => 1,
                'matkul_id' => 1,
                'semester' => '5',
            ],
            [
                'mahasiswa_id' => 2,
                'matkul_id' => 2,
                'semester' => '5',
            ],
            [
                'mahasiswa_id' => 3,
                'matkul_id' => 3,
                'semester' => '5',
            ],
        ]);
    }
}
