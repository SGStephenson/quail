const { Router } = require("express");
const advancement = require("../../data/advancement.json");
const xpRewards = require("../../data/xp-rewards.json");
const monsters = require("../../data/monsters.json");
const npcs = require("../../data/npcs.json");
const beasts = require("../../data/beasts.json");

const renderCreature = (creature) => {
    return `
<html>
    <head><title>${creature.name}</title></head>
    <body>
        <h1>${creature.url ? `<a target="_blank" href="${creature.url}">${creature.name}</a>` : creature.name}</h1>
        ${creature.description ? `<p>${creature.description}</p>` : ""}
        ${creature.harvestUrl && `<p><a target="_blank" href="${creature.harvestUrl}">harvest</a></p>`}
    </body>
</html>
    `;
};

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

const DataRouter = Router();

DataRouter.get("/", (req, res) => {
    res.send(`
<html>
    <head></head>
    <body>
        <h1>Data</h1>
        <a href="/data/advancement">advancement</a>
        <a href="/data/exp-rewards">xp rewards</a>
    </body>        
</html>
    `);
});

DataRouter.get("/advancement", (req, res) => {
    res.json(advancement);
});

DataRouter.get("/beast", (req, res) => {
    res.send(renderCreature(beasts[randomNumber(beasts.length)]));
});

DataRouter.get("/exp-rewards", (req, res) => {
    res.json(xpRewards);
});

DataRouter.get("/monster", (req, res) => {
    res.send(renderCreature(monsters[randomNumber(monsters.length)]));
});

DataRouter.get("/npc", (req, res) => {
    res.send(renderCreature(npcs[randomNumber(npcs.length)]));
});

exports = module.exports = DataRouter;
