<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matkul extends Model
{
    use HasFactory;
    protected $table = 'Matkul';

    protected $fillable = [
        'Nama_matkul',
    ];

    public function nilai()
    {
        return $this->hasMany(Nilai::class, 'matkul_id');
    }
}
