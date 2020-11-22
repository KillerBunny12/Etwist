<?php

use Illuminate\Database\Seeder;
use App\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = new Status();
        $status->situation = "Prefiero no decirlo";
        $status->save();

        $status = new Status();
        $status->situation = "Soltero\a";
        $status->save();

        $status = new Status();
        $status->situation = "En una relación";
        $status->save();

        $status = new Status();
        $status->situation = "Casado\a";
        $status->save();

        $status = new Status();
        $status->situation = "Viudo\a";
        $status->save();

    }
}
