<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Tweet;
use Illuminate\Support\Facades\Validator;


class TweetController extends Controller
{
    public function getPosts() : JsonResponse {
        try {
            $tweets = Tweet::all();
        } catch (\Exception $e) {
            echo $e;
            return response()->json(['error' => 'Failed to connect to TweetDB'], 500);
        }
        return response()->json(['tweets' => $tweets]);
    }

    public function addPost(Request $request) : JsonResponse {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'user' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Failed validation'], 500);
        }

        try {
            $tweet = Tweet::create(['title' => $request->title, 'user' => $request->user,
                'description' => $request->description]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to publish tweet'], 500);
        }
        return response()->json(['status' => 'ok', 'id' => $tweet->_id, 'updated_at' => $tweet->updated_at]);
    }

    public function updatePost(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Failed validation'], 500);
        }

        try {
            $id = $request->id;

            $description = $request->description;
            $title = $request->title;

            $targetedTweet = Tweet::where('_id', $id);

            $targetedTweet->update(['description' => $description, 'title' => $title], ['upsert' => true]);


        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update tweet'], 500);
        }
        return response()->json(['status' => 'ok']);
    }

    public function deletePost(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Failed validation'], 500);
        }

        try {
            $id = $request->id;


            $targetedTweet = Tweet::where('_id', $id);
            $targetedTweet->delete();

        } catch (\Exception $e) {
            echo $e;
            return response()->json(['error' => 'Failed to delete tweet'], 500);
        }
        return response()->json(['status' => 'ok']);
    }
}
