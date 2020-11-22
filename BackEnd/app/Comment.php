<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = ["id", "created_at","updated_at"];

    public function post(){
       return $this->belongsTo("App\Posts","idPost");
    }
    public function usuario(){
        return $this->belongsTo("App\User", "idUser");
    }
}
