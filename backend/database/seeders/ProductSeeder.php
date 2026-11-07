<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Casual Tote Bag',
                'category' => 'Tote Bag',
                'description' => 'Tas simpel dan praktis untuk kuliah dan aktivitas sehari-hari.',
                'price' => 75000,
                'stock' => 10,
                'image' => '/assets/ToteBag.jpeg',
                'label' => 'Best Seller',
            ],
            [
                'name' => 'Korean Shoulder Bag',
                'category' => 'Shoulder Bag',
                'description' => 'Tas wanita dengan desain modern dan elegan.',
                'price' => 120000,
                'stock' => 10,
                'image' => '/assets/ShoulderBag.jpeg',
                'label' => 'Popular',
            ],
            [
                'name' => 'Mini Sling Bag',
                'category' => 'Sling Bag',
                'description' => 'Tas kecil yang praktis untuk bepergian.',
                'price' => 95000,
                'stock' => 10,
                'image' => '/assets/SlingBag.jpeg',
                'label' => 'Favorit',
            ],
            [
                'name' => 'Korean School Bag',
                'category' => 'School Bag',
                'description' => 'Tas sekolah dengan desain lucu dan kapasitas luas.',
                'price' => 145000,
                'stock' => 10,
                'image' => '/assets/SchoolBag.jpeg',
                'label' => 'New',
            ],
            [
                'name' => 'Daily Backpack',
                'category' => 'Backpack',
                'description' => 'Tas ransel nyaman untuk sekolah dan kegiatan harian.',
                'price' => 175000,
                'stock' => 10,
                'image' => '/assets/Backpack.jpeg',
                'label' => 'Popular',
            ],
        ];

        foreach ($products as $product) {
            DB::table('luvbag_products')->updateOrInsert(
                ['name' => $product['name']],
                array_merge($product, [
                    'updated_at' => now(),
                    'created_at' => now(),
                ])
            );
        }
    }
}
