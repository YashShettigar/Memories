import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

// for image
app.use(bodyParser.json({ limit: "30mb", extended: "true"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true"}));

app.use(cors());

const CONNECTION_URL = "mongodb+srv://memories_webdb_admin:Memories_Web0.1@cluster0.jodfl.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));
