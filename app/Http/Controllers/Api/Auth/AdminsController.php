<?php

namespace App\Http\Controllers\Api\Auth;

use App\Admin;
use App\Book;
use App\Genre;
use App\Http\Controllers\Controller;
use App\TmpBook;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminsController extends Controller
{
    public function info()
    {
        // Get the currently authenticated user...
        return auth('admin_api')->user();
    }

    public function login(Request $request)
    {
        $creds = $request->only(['username','password']);

        if(!$token = auth('admin_api')->attempt($creds))
        {
            return response()->json(['error'=> 'Incorrect email or password'],401);
        }
        else return response()->json(['admin_token'=> $token]);
    }

    public function logout()
    {
        auth('admin_api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'first_name' => 'required|string|min:4|max:20',
            'last_name'=> 'required|string|min:4|max:20',
            'username'=> 'required|string|min:4|max:20',
            'email'=> 'required|string|email|max:20|unique:admins',
            'password'=> 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $admin = Admin::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password_confirmation')),
        ]);

        $token = auth('admin_api')->login($admin);

        return response()->json(['admin_token'=> $token],201);
    }

    public function getUsers()
    {
        $users = Admin::find(1)->Users;
        return response()->json(['users' => $users]);
    }

    public function addMember(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'first_name' => 'required|string|min:4|max:20',
            'last_name'=> 'required|string|min:4|max:20',
            'username'=> 'required|string|min:4|max:20',
            'email'=> 'required|string|email|max:50',
            'password'=> 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
            'profile' => 'required|mimes:jpg,png,svg,jpeg|max:100000'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $admin_id = $this->info();

        $imageFilename = time().'.'.$request->profile->extension();

        $request->profile->move(public_path('images/Profiles/'), $imageFilename);

        $user = User::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password_confirmation')),
            'admin_id' => $admin_id->id,
            'profile' => '/images/Profiles/' . $imageFilename,
        ]);

        return response()->json(['user'=> $user],200);
    }

    public function updateInfo(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'first_name' => 'required|string|min:4|max:20',
            'last_name'=> 'required|string|min:4|max:20',
            'username'=> 'required|string|min:4|max:20',
            'email'=> 'required|string|email|max:20',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $admin_id = $this->info();

        $admin = Admin::find($admin_id->id)->update([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
        ]);

        return response()->json(['success'=> $admin],200);
    }

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json(['users'=>$users],200);
    }

    public function addGenre(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'title' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $admin_id = $this->info()->id;

        $genre = new Genre();

        $genre->title = $request->title;
        $genre->admin_id = $admin_id;

        $genre->save();

        return response()->json(['genre' => $genre],201);
    }

    public function getAllGenres()
    {
        $genres = Genre::all();

        return response()->json(['genres' => $genres],200);
    }

    public function getAllBooks()
    {
        $books = Book::all();
        return response()->json(['books' => $books],200);
    }

    public function getAllTmpBooks()
    {
            foreach(TmpBook::with(['User','Genre'])->get() as $tmpBook) {
                $tmpBooks[] = array(
                    'title' => $tmpBook->title,
                    'author' => $tmpBook->author,
                    'pages' => $tmpBook->pages,
                    'images' => $tmpBook->images,
                    'resource' => $tmpBook->resource,
                    'user' => $tmpBook->User->username,
                    'genre' => $tmpBook->Genre->title);
            }
        return response()->json(['tmpbooks' => $tmpBooks],200);
    }

    public function approvedBooks(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'title' => 'required|string|min:4|max:50',
            'author'=> 'required|string|min:4|max:20',
            'pages'=> 'required|numeric',
            'images' => 'required|mimes:jpg,png,svg,jpeg|max:100000',
            'resource' => 'required|mimes:pdf|max:100000'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $imageFilename = time().'.'.$request->images->extension();

        $request->images->move(public_path('/images/Books/'), $imageFilename);

        $resourceFilename = time().'.'.$request->resource->extension();

        $request->resource->move(public_path('/Files/'), $resourceFilename);

        $user_id = $this->info()->id;

        $book = Book::create([
            'title' => $request->get('title'),
            'author' => $request->get('author'),
            'genre_id' => $request->get('genre_id'),
            'pages' => $request->get('pages'),
            'user_id' => $user_id,
            'images' => '/images/Books/' . $imageFilename,
            'resource' => '/Files/' . $resourceFilename,
        ]);

        return response()->json(['approvedBook' => $book],201);
    }
}
