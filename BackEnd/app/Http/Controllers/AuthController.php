<?php

namespace App\Http\Controllers;
use App\PersonalInformation;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //Metodo de registro, valida y registra un usuario.
    public function signup(Request $request)
    {
        //Validación de datos ingresados.
        $request->validate([
            "name"     => "required|string",
            "email"    => "required|string|email|unique:users",
            "password" => "required|string|confirmed",
        ]);

        //Se crea el User.
        $user = new User([
            "name"     => $request->name,
            "email"    => $request->email,
            //Se encripta la contraseña
            "password" => bcrypt($request->password),
        ]);

        //Se guarda el objeto en la base de datos.
        $user->save();

        //Crea un campo en la tabla Personal Information, como estos datos son opcionales, genera unos default
        $personal = new PersonalInformation([
            "Name" => "No definido",
            "Lastname" => "No definido",
            "birthdate" => "",
            "idStatus"=>"1",
            "idUser" => $user->id
        ]);
        //El método save() sirve para guardar tanto como para actualizar
        $personal->save();

        //Se devuelve una respuesta al front.
        return response()->json(["RESPUESTA: " => "Usuario creado correctamente"], 201);
    }

    //Método de login, valida los datos ingresados y si coinciden, genera un token de acceso.
    public function login(Request $request)
    {
        //Valida los datos ingresados
        $request->validate([
            "email"       => "required|string|email",
            "password"    => "required|string",
            "remember_me" => "boolean",
        ]);
        //Se le asignan solo las credenciales (email y password) a una variable.
        $credentials = request(["email", "password"]);

        //Se verifica si coinciden las credenciales mediante un Auth::attempt
        if (!Auth::attempt($credentials)) {
            //Si no coincide con ninguna en la base de datos, retorna respuesta errónea.
            return response()->json([
                "Error:" => "Credenciales no válidas"], 401);
        }
        //En caso de que las credenciales sean validas, se saca el user() con los datos del request
        $user = $request->user();

        //Y se genera un token de acceso para el usuario que se logueó.
        $tokenResult = $user->createToken("Personal Access Token");
        $token = $tokenResult->token;

        //Si el usuario quiere ser recordado, lo será por una semana, después, el token expira.
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        //Se guarda el token en la base de datos.
        $token->save();

        //Se retorna una respuesta al front con el token de acceso, que se almacenará en el dispositivo.
        return response()->json([
            "access_token" => $tokenResult->accessToken,
            "token_type"   => "Bearer",
            "expires_at"   => Carbon::parse(
                $tokenResult->token->expires_at)
                ->toDateTimeString(),
        ]);
    }


    //Método de cerrar sesión o logout, modifica el estado del token de acceso y lo deja inutilizable.
    public function logout(Request $request)
    {
        //Se recibe el token en los headers de la peticion, con esto se revoca el token de la BD
        $request->user()->token()->revoke();
        //Se retorna la respuesta al front
        return response()->json(["RESPUESTA:" =>
            "Cerró sesión"]);
    }

    //Retorna ciertos datos del usuario mediante el token de acceso.
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    //Modifica el nombre de usuario y el email del usuario
    public function update(Request $request){
        //Con el User::find, se encuentra un usuario con el id, solo con el id
        $user = User::find($request->id);
        //Si el email que se recibe es el mismo que tiene el usuario y el nombre es distinto
        if($request->email == $user->email && $request->name != $user->name){
            //Se ejecuta esto
            //Valida que venga el id y el name, en este caso no viene el email porque es igual
            //Va a retornar un error de que el email has already been taken
            $request->validate([
                "id" => "required",
                "name" => "required|string|unique:users",
            ]);
            //Se le asigna el name que viene en el request al user
            $user->name = $request->name;
            //Si se actualiza de forma correcta, retorne tal, si no, retorne tal
            if($user->save()){
                return response()->json(["Ok!"=>"Se actualizó la informacion del usuario"]);
            }else{
                return response()->json(["Error:"=>"Error en el servidor"]);
            }
        //Else if, si el email es distinto el que se recibe es el mismo y el nombre es igual
        }else if($request->email != $user->email && $request->name == $user->name){
            //Ejecute esto, solo va a actualizar el email
            //Solo se valida el correo
            $request->validate([
                "id" => "required",
                "email" => "required|string|unique:users",
            ]);
            //Se le asigna el email que viene en el request al user
            $user->email = $request->email;
            //Si se actualiza, se retorna la respuesta, si no, se retorna error
            if($user->save()){
                return response()->json(["Ok!"=>"Se actualizó la informacion del usuario"]);
            }else{
                return response()->json(["Error:"=>"Error en el servidor"]);
            }
        //Si el el email y el name son distintos
        }else if($request->email != $user->email && $request->name != $user->name){
            //Ejecute esto, van a actualizar ambos
            //Valida ambos
            $request->validate([
                "id" => "required",
                "name" => "required|string|unique:users",
                "email" => "required|string|unique:users",
            ]);
            //Se asignan ambos al user
            $user->name = $request->name;
            $user->email = $request->email;
            //Si se actualiza, se retorna la respuesta, si no, se retorna error
            if($user->save()){
                return response()->json(["Ok!"=>"Se actualizó la informacion del usuario"]);
            }else{
                return response()->json(["Error:"=>"Error en el servidor"]);
            }
        }
    }
    //Modifica solo la foto del perfil del usuario
    public function updatePic(Request $request){
        $user = User::find($request->id);
        $user->profilePic = $request->profilePic;
        if($user->save()){
            return response()->json(["Ok!"=>"Se actualizó la foto de perfil"]);
        }else{
            return response()->json(["Error:"=>"Error en el servidor"]);
        }
    }
    //Modifica solo la contraseña del usuario (Este no lo he probado, no sé si funciona)
    public function updatePassword(Request $request){
        $user = User::find($request->id);
        $pass = bcrypt($request->password);
        if($user->password === $pass){
            if($user->save()){
                return response()->json(["Ok!"=>"Se actualizó la contraseña"]);
            }else{
                return response()->json(["Error:"=>"Error en el servidor"]);
            }
        }else{
            return response()->json(["Error:"=>"Error en la contraseña"]);
        }
    }
    //Método para buscar un usuario.
    public function search(Request $request){
        return User::where("name","LIKE","%".$request->name."%")->get();
    }
}

