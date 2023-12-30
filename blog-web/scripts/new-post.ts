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

writeFileSync(`./posts/zzz${v4()}.md`, template);
