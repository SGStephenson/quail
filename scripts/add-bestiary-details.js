const fs = require("fs");
const bestiary = require("../data/bestiary.json");

for (const bestiaryElement of bestiary) {
    const source = bestiaryElement.source === "ToB1'23" ? 'tob1-2023' : bestiaryElement.source;
    bestiaryElement.url = `https://5e.tools/bestiary.html#${bestiaryElement.name}_${source}`;
}

fs.writeFile('../data/bestiary-updated.json', JSON.stringify(bestiary, null, 2), 'utf8', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('bestiary-updated.json has been updated');
});
