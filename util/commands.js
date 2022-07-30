const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');

const sayHi = () => {
    console.log('hi');
}

const createBlogEntry = async() => {
const rl = readline.createInterface({ input, output });
const title = await new Promise((resolve) => {
    rl.question(`What's the post title? : `, (answer) => {
        resolve(answer);
    });
});
const timestamp = new Date().toISOString();
const fileName = `${timestamp}-${title.replace(/\s/g, '-')}.md`;
console.log(`Creating file ${fileName}`);

fs.writeFileSync("blog/" + fileName, `---\ntitle: ${title}\n---\n\n`);
rl.close();
}
module.exports = {sayHi, createBlogEntry};