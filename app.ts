import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import todosRoutes from './routes/todos.ts';
import { connectDb } from './helpers/db_todos.ts';

await connectDb();
const app = new Application();

app.use(async (ctx, next) => {
  console.log('Middleware!');
  await next();
});

app.use(
  oakCors({ allowedHeaders: 'Content-Type,Authorization', credentials: true })
); // Enable CORS for All Routes
app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
