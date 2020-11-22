<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

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
    //Funcion para almacenar un comentario
    public function store(Request $request)
    {
        $comment = new Comment([
           "comment" => $request->comment,
           "idPost" => $request->idPost,
            "idUser" => $request->idUser
        ]);
        if($comment->save()){
            return response()->json(["RESPUESTA" => "Se ha agregado un comentario"]);
        }else{
            return response()->json(["ERROR" => "No se pudo agregar comentario"]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    //Funcion para retornar los comentarios de cierto post
    public function show($id)
    {
        $comments = Comment::with("usuario")->where('idPost', $id)->get();
        return $comments;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    //Funcion para borrar un comentario
    public function destroy(Comment $comment)
    {
        if($comment->delete()){
            return response()->json(["RESPUESTA" => "Se ha eliminado el comentario"]);
        }else{
            return response()->json(["ERROR" => "No se ha podido eliminar el comentario"]);
        }
    }
}
