<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Tweet extends Model
{
    // for the model to bind correctly to mongodb collection overwrite the following inherited variables
    protected $connection = 'mongodb';
    protected $collection = 'tweets';

    protected $fillable = [
        'title',
        'user',
        'description'
    ];

}
