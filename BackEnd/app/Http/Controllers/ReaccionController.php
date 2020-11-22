<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Reaccion;
use Illuminate\Http\Request;

class ReaccionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //Devuelve todas los status
    public function index()
    {
        return Reaccion::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //
    public function store(Request $request)
    {
        //Lo que hago acá es hacer un objeto Reaccion, ¿porque?, para llenar solo las cosas que quiero..
        $reaccion = new Reaccion([
            "idPost" => $request->idPost,
            "idUser" => $request->idUser
        ]);

        //El método save() sirve para guardar tanto como para ACTUALIZAR
        $reaccion->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Reaccion  $reaccion
     * @return \Illuminate\Http\Response
     */
    public function show(Reaccion $reaccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Reaccion  $reaccion
     * @return \Illuminate\Http\Response
     */
    public function edit(Reaccion $reaccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reaccion  $reaccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reaccion $reaccion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reaccion  $reaccion
     * @return \Illuminate\Http\Response
     */

    public function destroy(Reaccion $reaccion)
    {
        if($reaccion->delete()){
            return response()->json("Se ha borrado el like");
        }else{
            return response()->json("No se ha borrado el like");
        }
    }

    //Esto borra el like si existe y si no lo crea
    public function reaccion(Request $request){
        $like = Reaccion::where("idPost",$request->idPost)->where("idUser",$request->idUser)->first();

        if(!is_null($like)){
            $like->delete();
            return response()->json(["RESPUESTA: "=>"Se creó"]);
        }else{
            $var = $request->validate([
                "idPost"=>"required",
                "idUser"=>"required"
            ]);
            $reaccion = Reaccion::create($var);
            return response()->json(["RESPUESTA: "=>"Se creó", $reaccion]);
        }
    }
}
