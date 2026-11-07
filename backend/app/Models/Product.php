<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'luvbag_products';

    protected $fillable = [
    'name',
    'category',
    'description',
    'price',
    'stock',
    'image',
    'label',
    ];
}
