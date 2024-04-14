import express, { json } from 'express'
const app = express();
const port = 5003;

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(port, () => {
    console.log("Server running on server " + port);
})