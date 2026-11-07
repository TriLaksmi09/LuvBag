<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;

class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswa = Mahasiswa::all();

        return response()->json([
            'message' => 'Data mahasiswa berhasil diambil',
            'data' => $mahasiswa
        ], 200);
    }
}
