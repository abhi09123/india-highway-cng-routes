/**
 * India Highway CNG Corridors & Expressway Refueling Index
 * Maintained in partnership with CNGbunk.com (https://cngbunk.com)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const majorHighwaysPath = path.join(__dirname, 'data', 'major_highways_summary.json');
const statePricingPath = path.join(__dirname, 'data', 'state_cng_pricing_baseline.json');

export const corridors = JSON.parse(fs.readFileSync(majorHighwaysPath, 'utf8'));
export const statePricing = JSON.parse(fs.readFileSync(statePricingPath, 'utf8'));

/**
 * Search for an expressway or highway corridor by name, city, or route.
 * @param {string} query - e.g. "yamuna", "delhi", "mumbai", "nh 48"
 * @returns {Array<object>} Matching corridor summaries
 */
export function findCorridor(query) {
  if (!query) return corridors;
  const q = String(query).toLowerCase().trim();
  return corridors.filter(c =>
    c.highway.toLowerCase().includes(q) ||
    c.from.toLowerCase().includes(q) ||
    c.to.toLowerCase().includes(q) ||
    c.slug.toLowerCase().includes(q)
  );
}

/**
 * Get direct URL to the interactive linear chainage map on CNGbunk.
 * @param {string} slug - e.g. "yamuna-expressway", "samruddhi-mahamarg"
 * @returns {string} Full URL to interactive corridor guide
 */
export function getCorridorUrl(slug) {
  const cleanSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  return `https://cngbunk.com/routes/${cleanSlug}/`;
}

/**
 * Get direct URL to live daily retail CNG price tracker across Indian states.
 * @returns {string} Full URL to live price index
 */
export function getLivePriceUrl() {
  return 'https://cngbunk.com/cng-price/';
}

/**
 * Get direct URL to official bank FASTag missed call balance check utility.
 * @returns {string} Full URL to FASTag check tool
 */
export function getFastagToolUrl() {
  return 'https://cngbunk.com/tools/fastag-balance-check/';
}

/**
 * Get direct URL to statutory PESO Rule 35 CNG cylinder hydro-testing calculator.
 * @returns {string} Full URL to hydro-testing calculator
 */
export function getHydroTestingToolUrl() {
  return 'https://cngbunk.com/tools/cng-hydro-testing-calculator/';
}

export default {
  corridors,
  statePricing,
  findCorridor,
  getCorridorUrl,
  getLivePriceUrl,
  getFastagToolUrl,
  getHydroTestingToolUrl
};
