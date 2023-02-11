<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Todo::orderBy('created_at', 'DESC')->paginate(1);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->user()->id;
        $todo = Todo::create($data);
        $todo->save();
        $response = [
            'success' => true,
            'data' => $todo,
            'message' => 'New record has been created'
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $existingTodo = Todo::find($id);
        if ($existingTodo) {
            $existingTodo->completed = $request->completed ? true : false;
            $existingTodo->completed_at = $request->completed ? Carbon::now() : null;
            $existingTodo->archive = $request->archive ? true : false;
            $existingTodo->save();
            return response()->json([
                'success' => true,
                'data' => $existingTodo,
                'message' => 'You are now logged in'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Item not found'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $existingTodo = Todo::find($id);
        if ($existingTodo) {
            $existingTodo->active = false;
            $existingTodo->save();
            return response()->json([
                'success' => true,
                'message' => 'Item successfully deleted'
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Item not found'
        ], 200);
    }
}
