#!/usr/bin/env node

const { writeFileSync, mkdirSync } = require("fs");

// create mocked canvas
mkdirSync("node_modules/canvas", { recursive: true });
writeFileSync("node_modules/canvas/index.js", "");
writeFileSync("node_modules/canvas/package.json", '{"name": "canvas"}');

console.log("mock canvas successfully");
