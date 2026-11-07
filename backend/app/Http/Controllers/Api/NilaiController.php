<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Nilai;

class NilaiController extends Controller
{
    public function index()
    {
        $nilai = Nilai::with(['mahasiswa', 'matkul'])->get();

        return response()->json([
            'message' => 'Data nilai berhasil diambil',
            'data' => $nilai
        ], 200);
    }
}
