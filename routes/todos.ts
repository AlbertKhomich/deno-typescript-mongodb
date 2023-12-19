import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ObjectId } from 'https://deno.land/x/atlas_sdk@v1.1.2/mod.ts';
import { getDb } from '../helpers/db_todos.ts';

const router = new Router();

interface TodoSchema {
  _id: ObjectId;
  text: string;
}

router.get('/todos', async (ctx) => {
  const todos = getDb().collection<TodoSchema>('todos');
  const allTodos = await todos.find().toArray();
  ctx.response.body = { todos: allTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const todos = getDb().collection<TodoSchema>('todos');
  const newTodo = await todos.insertOne({
    text: data.text,
  });

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;
  const todos = getDb().collection<TodoSchema>('todos');
  const { modifiedCount } = await todos.updateOne(
    { _id: { $eq: new ObjectId(tid) } },
    { $set: { text: data.text } }
  );
  ctx.response.body = { message: `Updated todos: ${modifiedCount}` };
});

router.delete('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const todos = getDb().collection<TodoSchema>('todos');
  const deleteCount = await todos.deleteOne({ _id: new ObjectId(tid) });
  ctx.response.body = { message: `Deleted ${deleteCount} todo` };
});

export default router;
