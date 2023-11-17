import { datetime } from "https://deno.land/x/ptera/mod.ts";

async function run() {
  const template = `---
title: ""
description: ""
topics: []
category: "Random"
published: false
eyecatch: ""
date: "${datetime(new Date()).toISO()}"
---`;
  await Deno.writeTextFile(`./posts/zzz${crypto.randomUUID()}.md`, template);
}

run();
