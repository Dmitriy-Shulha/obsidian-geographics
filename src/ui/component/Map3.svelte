 <script>

    import { geoAlbers, geoPath } from "d3-geo";
    // import { onMount } from "svelte";
    import { feature } from "topojson";
    import { maps, COUNTRIES_110M } from "../../data/maps.js"
    import { projections } from "../../data/projections.js"
  
    const width = "960";
    const height = "500";

    let data = [];
    let mapName = COUNTRIES_110M;

    const projectionAlbers = geoAlbers()
    //   .rotate([4.4, 0.8])
    //   .center([0, 55.4])
    //   .parallels([50, 60])
      .scale(100)
      .translate([width / 2, (1.8 * height) / 2]);
    let currentProj = projectionAlbers;
    let path = geoPath().projection(currentProj);

    console.log("maps");
    console.log(maps); 
    $: { 
        console.log(mapName)
        console.log(data)
        data = feature(maps[mapName], maps[mapName].objects.land).features
        console.log(data)
    }

    let projectionName = "geoAlbers"
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
    svg {
      width: 960px;
      height: 500px;
    }
    .border {
      stroke: #444444;
      fill: #cccccc;
      border: 10px solid red;
    }
  </style>
  