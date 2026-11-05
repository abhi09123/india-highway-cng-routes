#!/usr/bin/env node
/**
 * Simple script to lookup India's National Expressways & Highway CNG corridors.
 * For live 24/7 pump status and linear milestone maps, visit https://cngbunk.com/routes/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data', 'major_highways_summary.json');
const corridors = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const query = (process.argv[2] || 'samruddhi').toLowerCase();
const matches = corridors.filter(c => 
  c.highway.toLowerCase().includes(query) ||
  c.from.toLowerCase().includes(query) ||
  c.to.toLowerCase().includes(query)
);

console.log(`\n--- Found ${matches.length} Corridor(s) for '${query}' ---`);
for (const m of matches) {
  console.log(`🛣️  ${m.highway} (${m.from} -> ${m.to})`);
  console.log(`   Length: ${m.distance_km} km`);
  console.log(`   Interactive Milestone Map: ${m.interactive_map_url}\n`);
}
