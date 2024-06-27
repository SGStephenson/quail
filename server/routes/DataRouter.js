const { Router } = require("express");
const advancement = require("../../data/advancement.json");

const DataRouter = Router();

DataRouter.get("/", (req, res) => {
    res.send(`
<html>
    <head></head>
    <body>
        <h1>Data</h1>
        <a href="/data/advancement">advancement</a>
    </body>        
</html>
    `);
});

DataRouter.get("/advancement", (req, res) => {
    res.json(advancement);
});

exports = module.exports = DataRouter;
