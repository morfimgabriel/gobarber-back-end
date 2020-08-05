import { Router } from 'express';
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
