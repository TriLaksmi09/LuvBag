<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    
// Menampilkan produk dengan Pagination dan Filter
public function index(Request $request)
{
    $request->validate([
        'page' => 'nullable|integer|min:1',
        'limit' => 'nullable|integer|min:1|max:100',
        'category_id' => 'nullable|exists:categories,id',
        'keyword' => 'nullable|string'
    ]);

    $query = Product::query();

    // Filter berdasarkan kategori
    if ($request->filled('category_id')) {
        $category = Category::find($request->category_id);

        $query->where('category', $category->name);
    }

    // Pencarian berdasarkan nama produk
    if ($request->filled('keyword')) {
        $query->where('name', 'like', '%' . $request->keyword . '%');
    }

    // Pagination
    $limit = $request->input('limit', 10);

    $products = $query->paginate($limit);

    return response()->json([
        'success' => true,
        'data' => $products->items(),
        'pagination' => [
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'per_page' => $products->perPage(),
            'total' => $products->total()
        ]
    ]);
}


    
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
    ]);

    // Simpan gambar ke storage
    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')
            ->store('products', 'public');
    }

    // Simpan data produk ke database
    $product = Product::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Produk berhasil ditambahkan',
        'data' => $product
    ], 201);
}


    // Menampilkan satu produk
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    // Mengubah produk
public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'category' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'sometimes|required|numeric',
        'stock' => 'sometimes|required|integer',
        'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
    ]);

    // Jika ada gambar baru, simpan gambar tersebut
    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')
            ->store('products', 'public');
    }

    $product->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Produk berhasil diperbarui',
        'data' => $product
    ]);
}

    // Menghapus produk
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}