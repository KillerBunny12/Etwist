<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    protected $guarded = ["id","created_at","updated_at"];

    public function info(){
        return $this->belongsTo("App\User","idUser");
    }
}
