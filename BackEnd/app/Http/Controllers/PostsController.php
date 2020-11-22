<?php

namespace App\Http\Controllers;

use App\Posts;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Esto retorna todos los posts con el usuario que lo publico y los likes de cada uno
        return Posts::where("isActive",1)->with("users","likes","comments")->get();
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
    public function store(Request $request)
    {
        //Lo que hago acá es hacer un objeto post, ¿porque?, para llenar solo las cosas que quiero..
        $post = new posts([
            "description"=>$request->description,
            "imageURL"=>$request->imageURL,
            "UserID"=>$request->UserID
        ]);
        //El método save() sirve para guardar tanto como para ACTUALIZAR
        $post->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($post = Posts::find($id)){
            return $post->load("users","likes");
        }else{
            return response()->json(["Error"=>"No se encontro"]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function edit(posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, posts $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function destroy(posts $posts)
    {
        $posts->delete();
    }

    //Funcion para eliminar un post
    public function eliminar(Request $request){
        $post = Posts::find($request->id);
        $post->isActive = 0;
        if($post->save()){
            return response()->json(["RESPUESTA:" => "El post se ha eliminado correctamente"]);
        }else{
            return response()->json(["RESPUESTA:" => "El post no se ha eliminado"]);
        }
    }
}
