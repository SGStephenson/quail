const {Router} = require("express");
const advancement = require("../../data/advancement.json");
const xpRewards = require("../../data/xp-rewards.json");
const monsters = require("../../data/monsters.json");
const npcs = require("../../data/npcs.json");
const beasts = require("../../data/beasts.json");

const refreshButton = '<button onClick="window.location.reload();">Next</button>'
const renderCreature = (creature) => {
    return `
<html>
    <head><title>${creature.name}</title></head>
    <body>
        <h1>${creature.url ? `<a target="_blank" href="${creature.url}">${creature.name} ${creature.cr} ${200 * parseInt(creature.cr)} xp</a>` : `${creature.name} ${creature.cr} ${200 * parseInt(creature.cr)}`}</h1>
        ${creature.description ? `<p>${creature.description}</p>` : ""}
        ${creature.harvestUrl && `<p><a target="_blank" href="${creature.harvestUrl}">harvest</a></p>`}
        ${refreshButton}
    </body>
</html>
    `;
};

const renderMessage = (msg) => {
    return `
<html>
    <head><title>Nothing happened</title></head>
    <body>
        <h1>${msg}</h1>
        ${refreshButton}
    </body>        
</html>
    `;
};

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

const roll4 = () => {
    return randomNumber(4) + 1;
};
const roll20 = () => {
    return randomNumber(20) + 1;
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
    const roll = roll20() + 7 + roll4();
    console.log(`roll: ${roll}`);
    if (roll >= 15) {
        res.send(renderCreature(beasts[randomNumber(beasts.length)]));
    } else {
        res.send(renderMessage("You didn't find any beasts"));
    }
});

DataRouter.get("/exp-rewards", (req, res) => {
    res.json(xpRewards);
});

DataRouter.get("/monster", (req, res) => {
    const roll = roll20();
    console.log(`roll: ${roll}`);
    if (roll >= 15) {
        res.send(renderCreature(monsters[randomNumber(monsters.length)]));
    } else {
        res.send(renderMessage("No monsters attacked"));
    }
});

DataRouter.get("/npc", (req, res) => {
    const roll = roll20();
    console.log(`roll: ${roll}`);
    if (roll > 10) {
        res.send(renderCreature(npcs[randomNumber(npcs.length)]));
    } else {
        res.send(renderMessage("No attacks on the streets"));
    }
});

exports = module.exports = DataRouter;

