<?php

namespace App\Http\Controllers;

use App\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonalInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PersonalInformation  $personalInformation
     * @return \Illuminate\Http\Response
     */
    //Este metodo agarra la informacion personal del id del usuario tal, el id solo se puede obtener al
    //iniciar sesión correctamente
    public function show($personalInformation)
    {
        //El statement es la respuesta de la consulta sql personalizada
        $statement = DB::select("SELECT * FROM personal_information where personal_information.idUser = $personalInformation");

        //Este return, retorna en JSON el ID, Name,Lastname,Birthdate, y el idStatus de la informacion
        //personal de un usuario
        return response()->json([
            "id" => $statement[0]->id,
            "Name" => $statement[0]->Name,
            "Lastname" => $statement[0]->Lastname,
            "birthdate" => $statement[0]->birthdate,
            "idStatus" => $statement[0]->idStatus,
            "updated_at" => $statement[0]->updated_at,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PersonalInformation  $personalInformation
     * @return \Illuminate\Http\Response
     */
    public function edit(PersonalInformation $personalInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PersonalInformation  $personalInformation
     * @return \Illuminate\Http\Response
     */
    //Funcion para actualizar la informacion personal del usuario
    public function update(Request $request, PersonalInformation $personalInformation)
    {
        $fields = $request ->validate([
            "Name"=>"required",
            "Lastname"=>"required",
            "birthdate"=>"required",
            "idStatus"=>"required",
            "idUser"=>"required"
        ]);
        $personalInformation -> update($fields);
        return response()->json("La informacion se ha editado correctamente",200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PersonalInformation  $personalInformation
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonalInformation $personalInformation)
    {
        //
    }

    //Funcion para editar la informacion personal del usuario
    public function editar(Request $request){
        $personal = PersonalInformation::find($request->id);
        $request->validate([
            "Name"=>"required",
            "Lastname"=>"required",
            "birthdate"=>"required",
            "idStatus"=>"required",
        ]);
        $personal->Name = $request->Name;
        $personal->Lastname = $request->Lastname;
        $personal->birthdate = $request->birthdate;
        $personal->idStatus = $request->idStatus;

        if($personal->save()){
            return response()->json("La informacion se ha editado correctamente",200);
        }else{
            return response()->json("La informacion NO se ha editado correctamente",200);
        }
    }
}
