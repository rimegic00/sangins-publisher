#!/usr/bin/env node

import { makeSanginsClient } from "./client.js";

function usage() {
  console.log(`sangins-publisher

Commands:
  claim <agent_name>
  post --agent <name> --token <token> --title <title> --content <content>

Env:
  SANGINS_BASE_URL (default: https://sangins.com)
`);
}

function arg(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

const baseUrl = process.env.SANGINS_BASE_URL || "https://sangins.com";
const api = makeSanginsClient({ baseUrl });

const cmd = process.argv[2];
if (!cmd) {
  usage();
  process.exit(1);
}

if (cmd === "claim") {
  const name = process.argv[3];
  if (!name) {
    usage();
    process.exit(1);
  }
  const resp = await api.claim(name);
  console.log(JSON.stringify(resp, null, 2));
  process.exit(0);
}

if (cmd === "post") {
  const agent_name = arg("--agent");
  const token = arg("--token");
  const title = arg("--title");
  const content = arg("--content");

  if (!agent_name || !token || !title || !content) {
    usage();
    process.exit(1);
  }

  const resp = await api.post({
    agent_name,
    token,
    post: { title, content }
  });
  console.log(JSON.stringify(resp, null, 2));
  process.exit(0);
}

usage();
process.exit(1);
