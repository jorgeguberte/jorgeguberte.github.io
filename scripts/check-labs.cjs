// Dependency-free structural and syntax checks for the static Labs collection.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public/labs');
let pages = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (file.endsWith('.js')) new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file });
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');
    pages++;
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/\bsrc\s*=/.test(match[1])) new vm.Script(match[2], { filename: file });
    }
    for (const match of html.matchAll(/(?:href|src)="(\.[^"#?]*)(?:[?#][^"]*)?"/g)) {
      assert(fs.existsSync(path.resolve(path.dirname(file), match[1])), `Broken local link in ${file}: ${match[1]}`);
    }
  }
}
walk(root);
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.equal([...index.matchAll(/class="experiment"/g)].length, 12);
assert.equal(pages, 14);
console.log(`Labs: ${pages} pages checked; 12 catalog entries; scripts parse; local links resolve.`);
