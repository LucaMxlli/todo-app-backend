import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/todos', async (req, res) => {
  const todos = await prisma.toDo.findMany({
    where: {
      userId: 1,
    },
  });
  res.json(todos);
});

router.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  const todo = await prisma.toDo.create({
    data: {
      title,
      description,
      userId: 1,
    },
  });
  res.json(todo);
});

router.delete('/todos/', async (req, res) => {
  const todos = await prisma.toDo.deleteMany({
    where: {
      userId: 1,
      done: true,
    },
  });
  res.json(todos);
});

router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.toDo.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const newtodo = await prisma.toDo.update({
    where: {
      id: parseInt(id),
    },
    data: {
      done: !todo.done,
    },
  });
  res.json(todo);
});

export default router;
