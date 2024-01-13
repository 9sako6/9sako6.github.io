import { writeFileSync } from "fs";
import { v4 } from "uuid";

const template = `---
title: ""
description: ""
topics: []
category: "Random"
published: false
eyecatch: ""
date: "${new Date().toISOString()}"
---`;

const filename = `./posts/zzz${v4()}.md`;

writeFileSync(filename, template);

console.log(filename);
