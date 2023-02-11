<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request){

        $inputs = $request->validated();
        $inputs['password'] = bcrypt($inputs['password']);
        $user = User::create($inputs);

        $success['token'] = $user->createToken('TodoApp')->plainTextToken;
        $success['name'] = $user->name;

        return response()->json([
            'success' => true,
            'data' => $success,
            'message' => 'User registration has been success'
        ], 200);
    }

    public function login(UserLoginRequest $request){
        $inputs = $request->validated();
        if (Auth::attempt(['email' => $inputs['email'], 'password' => $inputs['password']])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('TodoApp')->plainTextToken;
            $success['user'] = $user->name;

            return response()->json([
                'success' => true,
                'data' => $success,
                'message' => 'You are now logged in'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorised'
            ], 401);
        }
    }

}
