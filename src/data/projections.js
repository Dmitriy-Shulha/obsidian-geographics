import { 
    geoAzimuthalEqualArea,
    geoAzimuthalEquidistant,
    geoGnomonic,
    geoOrthographic,
    geoStereographic,
    geoEqualEarth,
    // geoAlbersUSA,
    geoAlbers,
    geoConicConformal,
    geoConicEqualArea,
    geoConicEquidistant,
    geoEquirectangular,
    geoMercator,
    geoTransverseMercator,
    geoNaturalEarth1
 } from "d3-geo";


export const projections = {
    "geoAzimuthalEqualArea" : geoAzimuthalEqualArea,
    "geoAzimuthalEquidistant" : geoAzimuthalEquidistant,
    "geoGnomonic" : geoGnomonic,
    "geoOrthographic" : geoOrthographic,
    "geoStereographic" : geoStereographic,
    "geoEqualEarth" : geoEqualEarth,
    // "geoAlbersUSA" : geoAlbersUSA,
    "geoAlbers" : geoAlbers,
    "geoConicConformal" : geoConicConformal,
    "geoConicEqualArea" : geoConicEqualArea,
    "geoConicEquidistant" : geoConicEquidistant,
    "geoEquirectangular" : geoEquirectangular,
    "geoMercator" : geoMercator,
    "geoTransverseMercator" : geoTransverseMercator,
    "geoNaturalEarth1" : geoNaturalEarth1,
}