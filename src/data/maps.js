import COUNTRIES_110M_TOPOJSON from 'world-atlas/countries-110m.json';
// import COUNTRIES_50M_TOPOJSON from 'world-atlas/countries-50m.json';
// import COUNTRIES_10M_TOPOJSON from 'world-atlas/countries-10m.json';
import LAND_110M_TOPOJSON from 'world-atlas/land-110m.json';
// import LAND_50M_TOPOJSON from 'world-atlas/land-50m.json';
// import LAND_10M_TOPOJSON from 'world-atlas/land-10m.json';

export const COUNTRIES_110M = "countries-110m";
export const COUNTRIES_50M = "countries-50m";
export const COUNTRIES_10M = "countries-10m";
export const LAND_110M = "land-110m";
export const LAND_50M = "land-50m";
export const LAND_10M = "land-10m";

export const maps = {
  [COUNTRIES_110M] : COUNTRIES_110M_TOPOJSON,
//   [COUNTRIES_50M]  : COUNTRIES_50M_TOPOJSON,
//   [COUNTRIES_10M]  : COUNTRIES_10M_TOPOJSON,
  [LAND_110M]      : LAND_110M_TOPOJSON,
//   [LAND_50M]       : LAND_50M_TOPOJSON,
//   [LAND_10M]       : LAND_10M_TOPOJSON,
}