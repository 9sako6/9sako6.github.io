import { datetime } from "https://deno.land/x/ptera/mod.ts";

async function run() {
  const template = `---
title: ""
description: ""
topics: []
published: false
eyecatch: ""
date: "${datetime(new Date()).toISO()}"
---`;
  await Deno.writeTextFile(`./articles/zzz${crypto.randomUUID()}.md`, template);
}

run();
