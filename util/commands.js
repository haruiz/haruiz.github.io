const fs = require('fs');
const readline = require('readline');
const moment = require('moment');
const { stdin: input, stdout: output } = require('node:process');
const slugify = require('slugify')

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
const timestamp = moment().format("YYYY-MM-DD");
const slug = slugify(title, { lower: true });
const postFolderPath = `blog/${timestamp}-${slug}`;

fs.mkdirSync(postFolderPath);
let postMetadata = `
---
title: ${title}
slug: ${slug}
description: ${title}
authors: [haruiz]
tags: [python, data-science]
---
`.trim();
fs.writeFileSync(`${postFolderPath}/index.md`, postMetadata);
rl.close();
}
module.exports = {sayHi, createBlogEntry};