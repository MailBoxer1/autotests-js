import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', (_req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
      { id: 3, name: 'Charlie', role: 'moderator' }
    ]
  });
});

app.get('/api/posts', (_req, res) => {
  res.json({
    data: [
      { id: 1, user_id: 1, title: 'Post 1' },
      { id: 2, user_id: 2, title: 'Post 2' },
      { id: 3, user_id: 1, title: 'Post 3' }
    ]
  });
});

app.get('/api/comments', (_req, res) => {
  res.json({
    data: [
      { id: 1, post_id: 1, content: 'Comment 1' },
      { id: 2, post_id: 2, content: 'Comment 2' },
      { id: 3, post_id: 1, content: 'Comment 3' }
    ]
  });
});

app.get('/api/messages', (_req, res) => {
  res.json({
    data: [
      { id: 1, sender_id: 1, content: 'Hello' },
      { id: 2, sender_id: 2, content: 'Hi' },
      { id: 3, sender_id: 1, content: 'How are you?' }
    ]
  });
});

app.get('/api/profile', (_req, res) => {
  res.json({
    message: 'Доступ разрешён',
    userId: 1,
    email: 'test@example.com'
  });
});

app.listen(PORT, () => {
  console.log(`Mock backend API запущен на порту ${PORT}`);
});
