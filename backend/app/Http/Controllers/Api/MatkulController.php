<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Matkul;

class MatkulController extends Controller
{
    public function index()
    {
        $matkul = Matkul::all();

        return response()->json([
            'message' => 'Data mata kuliah berhasil diambil',
            'data' => $matkul
        ], 200);
    }
}
