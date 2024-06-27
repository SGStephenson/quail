const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const { DataRouter } = require('./routes');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/data", DataRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
