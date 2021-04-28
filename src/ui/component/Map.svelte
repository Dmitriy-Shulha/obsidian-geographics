 <script>

    import { geoPath } from "d3-geo";
    import { feature } from "topojson";
    import { maps, COUNTRIES_110M } from "../../data/maps.js"
    import { projections } from "../../data/projections.js"
  
    const width = "960";
    const height = "500";

    let data = [];
    let mapName = COUNTRIES_110M;
    let mapObjects = {};
    let mapObjectNames = [];
    let mapObjectName = Object.keys(maps[mapName].objects)[0];

    $: { 
        console.log(mapName)
        console.log(data)

        mapObjects = maps[mapName].objects
        mapObjectNames = Object.keys(mapObjects);
        mapObjectName = mapObjectNames.includes(mapObjectName) 
          ? mapObjectName 
          : mapObjectNames[0]; 
        data = feature(maps[mapName], mapObjects[mapObjectName]).features
        console.log(data)
    }

    let currentProj = null;
    let path = null;
    let projectionName = "geoAlbers";
    $: {
      currentProj = projections[projectionName]();
      path = geoPath().projection(currentProj);
    }

  </script>

  <select bind:value={mapName}>
      {#each Object.keys(maps) as name }
        <option>{name}</option>
      {/each}
  </select>
  
  <select bind:value={mapObjectName}>
    {#each mapObjectNames as name }
      <option>{name}</option>
    {/each}
  </select>

  <select bind:value={projectionName}>
    {#each Object.keys(projections) as name }
      <option>{name}</option>
    {/each}
  </select>

  <svg width="960" height="500">
    {#each data as feature}
    <path 
      d={path(feature)} 
      class="border"
    />
    {/each}
  </svg>
  
  <style>
    .border {
      stroke: #444444;
      fill: #cccccc;
      border: 10px solid red;
    }
  </style>
  