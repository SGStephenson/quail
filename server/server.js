const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const { DataRouter } = require('./routes');

app.get('/', (req, res) => {
    console.log(parseInt(null));
    const badStuff = "data:text/html,<script>alert('hi');</script>";
    res.send(`<a href="${badStuff}">This a text</a>`);
});

app.use("/data", DataRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
