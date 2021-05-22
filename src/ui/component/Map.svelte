<script>
  import { geoPath } from "d3-geo";
  import { feature } from "topojson";
  import { maps, COUNTRIES_110M } from "../../data/maps.js";
  import { projections } from "../../data/projections.js";
  import { spring } from "svelte/motion";

  const width = "960";
  const height = "500";

  let data = [];
  let mapName = COUNTRIES_110M;
  let mapObjects = {};
  let mapObjectNames = [];
  let mapObjectName = Object.keys(maps[mapName].objects)[0];

  $: {
    mapObjects = maps[mapName].objects;
    mapObjectNames = Object.keys(mapObjects);
    mapObjectName = mapObjectNames.includes(mapObjectName)
      ? mapObjectName
      : mapObjectNames[0];
    data = feature(maps[mapName], mapObjects[mapObjectName]).features;
  }

  let currentProj = null;
  let path = null;
  let projectionName = "geoAlbers";
  $: {
    currentProj = projections[projectionName]();
    path = geoPath().projection(currentProj);
  }

  let currentAreaName;
  let coords = spring({ x: 0, y: 0 });
</script>

<select bind:value={mapName}>
  {#each Object.keys(maps) as name}
    <option>{name}</option>
  {/each}
</select>

<select bind:value={mapObjectName}>
  {#each mapObjectNames as name}
    <option>{name}</option>
  {/each}
</select>

<select bind:value={projectionName}>
  {#each Object.keys(projections) as name}
    <option>{name}</option>
  {/each}
</select>

<svg width="100%" height="100%">
  <g>
    {#each data as feature}
      <path
        d={path(feature)}
        class="border"
        on:mouseenter={() => {}}
        on:mousemove={(e) => {
          coords.set({ x: e.offsetX, y: e.offsetY });
          currentAreaName = feature.properties.name;
        }}
        on:mouseout={() => {
          currentAreaName = undefined;
        }}
        on:click={()=>{console.log(`${feature.properties.name} clicked!`)}}
      />
    {/each}
  </g>

  <g
    id="tooltip"
    opacity={currentAreaName ? 70 : 0}
    transform={`translate(${$coords.x},${$coords.y})`}
  >
    <rect width={`${currentAreaName?.length * 0.75 || 10}em`} height="2.5em" fill="white" />
    <text transform="translate(5,25)">
      {currentAreaName}
    </text>
  </g>
</svg>

<style>
  .border {
    stroke: #444444;
    fill: #cccccc;
    border: 10px solid red;
  }

  #tooltip {
    /* opacity: 50%; */
    pointer-events: none;
    background-color: whitesmoke;
  }
</style>
