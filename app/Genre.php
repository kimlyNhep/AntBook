<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = 'genres';

    protected $fillable = [
        'title','admin_id'
    ];

    public function Admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function Books()
    {
        return $this->hasMany(Book::class);
    }

    public function TmpBooks()
    {
        return $this->hasMany(TmpBook::class);
    }
}
