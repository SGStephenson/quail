const {Router} = require("express");
const advancement = require("../../data/advancement.json");
const xpRewards = require("../../data/xp-rewards.json");
const bestiary = require("../../data/bestiary-updated.json");

const CRs = ["0", "1/8", "1/4", "1/2", "1"];
const monsters = bestiary.filter(creature => creature.type !== "Beast" && !creature.type.includes("Humanoid") && CRs.includes(creature.CR));
const npcs = bestiary.filter(creature => creature.type.includes("Humanoid") && CRs.includes(creature.CR));
const beasts = bestiary.filter(creature => creature.type === "Beast" && CRs.includes(creature.CR));

const refreshButton = '<button onClick="window.location.reload();">Next day</button>'

const renderMessage = (msg) => {
    return `<p>${msg}</p>`
};

const creature = (creature) => {
    if (typeof creature === "string") {
        return `${creature}`;
    }
    return `
<h3>${creature.url ? `<a target="_blank" href="${creature.url}">${creature.name} ${creature.CR}</a>` : `${creature.name} ${creature.CR}`}</h3>
${creature.description ? `<p>${creature.description}</p>` : ""}
${creature.harvestUrl && `<p><a target="_blank" href="${creature.harvestUrl}">harvest</a></p>`}
    `;
};

const renderCreature = (creature, msg) => {
    return `
<html>
    <head><title>${creature.name}</title></head>
    <body>
        ${creature(creature)}
        ${refreshButton}
    </body>
</html>
    `;
};



const renderDay = (beast, monster, npc, beastRoll, monsterRoll, npcRoll) => {
    return `
<html>
    <head><title>Day in the life of Soren</title></head>
    <body>
        <h1>Day in the life of Soren</h1>
        <p>It's a beautiful day in the neighborhood</p>
        <h2>Hunt</h2>
        ${creature(beast)}
        <h2>Monster attack</h2>
        ${creature(monster)}
        <h2>Mugging</h2>
        ${creature(npc)}
    </body>
    <footer>${refreshButton}</footer>
    <script type="text/javascript">
        console.log("beastRoll = " + ${beastRoll})
        console.log("monsterRoll = " + ${monsterRoll})
        console.log("npcRoll = " + ${npcRoll})
    </script>
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
        <a href="/data/day">Day in the life of Soren</a>
    </body>        
</html>
    `);
});

DataRouter.get("/advancement", (req, res) => {
    res.json(advancement);
});

DataRouter.get("/day", (req, res) => {
    const beastRoll = roll20() + 7 + roll4();
    const monsterRoll = roll20();
    const npcRoll = roll20();

    const beast = beastRoll > 14 ? beasts[randomNumber(beasts.length)] : renderMessage("You didn't find any beasts");
    const monster = monsterRoll > 14 ? monsters[randomNumber(monsters.length)] : renderMessage("No monsters attacked");
    const npc = npcRoll > 9 ? npcs[randomNumber(npcs.length)] : renderMessage("The streets are safe");

    res.send(renderDay(beast, monster, npc, beastRoll, monsterRoll, npcRoll));
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

