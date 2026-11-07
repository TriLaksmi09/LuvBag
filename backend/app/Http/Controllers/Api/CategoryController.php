<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // Mengambil semua kategori
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Category::all()
        ]);
    }
}