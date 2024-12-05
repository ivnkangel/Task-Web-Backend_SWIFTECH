const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/notes', notesRoutes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
