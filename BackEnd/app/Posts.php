<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $guarded = ["id","created_at", "updated_at"];

    public function users(){
        return $this->belongsTo("App\User","UserID");
    }
    public function likes(){
        return $this->hasMany("App\Reaccion","idPost");
    }

    public function comments(){
        return $this->hasMany("App\Comment","idPost");
    }


}
