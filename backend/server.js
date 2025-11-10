const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const messagesRoutes = require('./routes/messages');
const authRoutes = require('./routes/authRoutes');
const ordersRoutes = require('./routes/orders');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

app.use('/api/messages', messagesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.get('/', (req, res) => res.json({ message: 'SmallBiz backend running' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
