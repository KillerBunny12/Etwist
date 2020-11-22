<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reaccion extends Model
{
    protected $guarded = ["id", "created_at" , "updated_at"];

    public function posts(){
        $this->belongsTo("App\posts","idPost");
    }
}
