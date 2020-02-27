<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title','author','genre_id','pages','user_id','admin_id'
    ];

    protected function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function Genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
