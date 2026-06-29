const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
