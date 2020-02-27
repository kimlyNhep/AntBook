<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TmpBook extends Model
{
    protected $fillable = [
        'title','author','genre_id','pages','user_id','images','resource'
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
