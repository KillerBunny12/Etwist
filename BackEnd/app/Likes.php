<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
  protected $guarded = ["id" ,"created_at","updated_at"];
}
