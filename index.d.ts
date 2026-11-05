/**
 * India Highway CNG Corridors & Expressway Refueling Index
 * Maintained in partnership with CNGbunk.com (https://cngbunk.com)
 */

export interface HighwayCorridor {
  highway: string;
  from: string;
  to: string;
  length_km: number;
  slug: string;
  description?: string;
}

export interface StatePricingSummary {
  state: string;
  avg_price_inr_kg: number;
  cgd_operators: string[];
}

/**
 * Complete list of verified major Indian highway CNG corridors
 */
export const corridors: HighwayCorridor[];

/**
 * Baseline state retail pricing across Indian states
 */
export const statePricing: StatePricingSummary[];

/**
 * Search for an expressway or highway corridor by name, city, or route.
 * @param query - e.g. "yamuna", "delhi", "mumbai", "nh 48"
 */
export function findCorridor(query?: string): HighwayCorridor[];

/**
 * Get direct URL to the interactive linear chainage map on CNGbunk.com.
 * @param slug - e.g. "yamuna-expressway", "samruddhi-mahamarg"
 */
export function getCorridorUrl(slug: string): string;

/**
 * Get direct URL to live daily retail CNG price tracker across Indian states.
 */
export function getLivePriceUrl(): string;

/**
 * Get direct URL to official bank FASTag missed call balance check utility.
 */
export function getFastagToolUrl(): string;

/**
 * Get direct URL to statutory PESO Rule 35 CNG cylinder hydro-testing calculator.
 */
export function getHydroTestingToolUrl(): string;

declare const _default: {
  corridors: HighwayCorridor[];
  statePricing: StatePricingSummary[];
  findCorridor: typeof findCorridor;
  getCorridorUrl: typeof getCorridorUrl;
  getLivePriceUrl: typeof getLivePriceUrl;
  getFastagToolUrl: typeof getFastagToolUrl;
  getHydroTestingToolUrl: typeof getHydroTestingToolUrl;
};

export default _default;
