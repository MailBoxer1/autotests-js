import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/test', (req, res) => {
  res.json({ status: 'OK', message: 'Простой сервер работает!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 