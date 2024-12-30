<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SongController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('can:create songs')->only('store');
        $this->middleware('can:edit songs')->only('update');
        $this->middleware('can:delete songs')->only('destroy');
    }

    public function index()
    {
        $songs = Song::all();
        return response()->json($songs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'youtube_link' => 'required|url|max:255',
        ]);

        try {
            $data = $request->all();

            // Extract YouTube video ID for thumbnail URL
            $youtubeVideoId = explode('v=', $data['youtube_link'])[1] ?? null;
            $data['thumbnail_url'] = $youtubeVideoId
                ? "https://img.youtube.com/vi/{$youtubeVideoId}/default.jpg" // YouTube thumbnail URL
                : null;

            $song = Song::create($data);
            return response()->json($song, 201);
        } catch (\Exception $e) {
            Log::error('Error creating song: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to create song'], 500);
        }
    }

    public function update(Request $request, Song $song)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'artist' => 'sometimes|string|max:255',
            'album' => 'sometimes|string|max:255',
            'genre' => 'sometimes|string|max:255',
            'youtube_link' => 'sometimes|url|max:255',
        ]);

        try {
            $data = $request->all();

            // Extract YouTube video ID for thumbnail URL
            $youtubeVideoId = explode('v=', $data['youtube_link'])[1] ?? null;
            $data['thumbnail_url'] = $youtubeVideoId
                ? "https://img.youtube.com/vi/{$youtubeVideoId}/default.jpg" // YouTube thumbnail URL
                : $song->thumbnail_url; // Keep existing thumbnail URL if not changed

            $song->update($data);
            return response()->json($song, 200);
        } catch (\Exception $e) {
            Log::error('Error updating song: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to update song'], 500);
        }
    }

    public function destroy(Song $song)
    {
        try {
            $song->delete();
            return response()->json(['message' => 'Song deleted successfully'], 204);
        } catch (\Exception $e) {
            Log::error('Error deleting song: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to delete song'], 500);
        }
    }
}
