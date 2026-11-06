import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '..', 'data', 'major_highways_summary.json');
const csvPath = path.join(__dirname, '..', 'data', 'india_major_highways_cng_corridors.csv');

const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

const headers = ['corridor_name', 'origin_city', 'destination_city', 'distance_km', 'cng_refueling_guide_url'];
const rows = data.map(d => [
  `"${(d.highway || '').replace(/"/g, '""')}"`,
  `"${(d.from || '').replace(/"/g, '""')}"`,
  `"${(d.to || '').replace(/"/g, '""')}"`,
  d.distance_km || 0,
  `"${(d.interactive_map_url || '').replace(/"/g, '""')}"`
].join(','));

const csv = [headers.join(','), ...rows].join('\n');
fs.writeFileSync(csvPath, csv, 'utf8');
console.log(`Generated ${csvPath} with ${data.length} corridors.`);
