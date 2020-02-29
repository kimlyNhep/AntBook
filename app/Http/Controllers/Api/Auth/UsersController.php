<?php

namespace App\Http\Controllers\Api\Auth;

use App\Book;
use App\Http\Controllers\Controller;
use App\TmpBook;
use App\User;
use App\Genre;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function info()
    {
        // Get the currently authenticated user...
        return auth('api')->user();
    }

    public function login(Request $request)
    {
        $creds = $request->only(['username','password']);

        if(!$token = auth('api')->attempt($creds))
        {
            return response()->json(['error'=> 'Incorrect email or password'],401);
        }
        else return response()->json(['user_token'=> $token]);
    }

    public function logout()
    {
        auth('api')->logout(true);

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function addBooks(Request $request)
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

        $request->resource->move(public_path('/Files/Books/'), $resourceFilename);

        $user_id = $this->info()->id;

        $book = TmpBook::create([
            'title' => $request->get('title'),
            'author' => $request->get('author'),
            'genre_id' => $request->get('genre_id'),
            'pages' => $request->get('pages'),
            'user_id' => $user_id,
            'images' => '/images/Books/' . $imageFilename,
            'resource' => '/Files/Books/' . $resourceFilename,
        ]);

        return response()->json(['book' => $book],201);
    }

    public function getTmpBooks($genre_id)
    {

        $user_id = $this->info()->id;

        $books = TmpBook::where([
            ['user_id', '=', $user_id],['genre_id','=',$genre_id]])->get();

        return response()->json(['books' => $books],200);
    }

    public function getAllGenre()
    {
        $genres = Genre::all();

        return response()->json(['genres' => $genres],200);
    }

    public function getAllUsers(Request $request)
    {
        $users = User::all();

        return response()->json(['users' => $users],200);
    }

    public function getAllBooks()
    {
        $books = Book::all();
        return response()->json(['books' => $books],200);
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

        $user_id = $this->info()->id;

        $user = User::find($user_id)->update([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
        ]);

        return response()->json(['success'=> $user],200);
    }
}
