<script>
    import * as d3 from 'd3';
    import topojson from "topojson";
    import { onMount } from "svelte";
    import d3GeoZoom from 'd3-geo-zoom'

    // export let projections;
    export let maps;
    export let defaultMapName;

    const width = 940;
    const height = 540;

    let canvas;
    let ctx;
    let g;
    let projection;
    let path;

    onMount(() => {
        const data = topojson.feature(
            maps[defaultMapName],
            maps[defaultMapName].objects.countries
        )

        console.log(canvas)

        ctx = canvas.getContext('2d');

        projection = d3.geoMercator()
            .center([0, 5])
            .scale(150)
            .precision(0.1)
            .rotate([-180, 0]);

        // const projection = d3.geoOrthographic()
        //     .scale((Math.min(width, height)) / 2 - 5)
        //     .translate([width / 2, height / 2]);

        path = d3.geoPath()
            .context(ctx)
            .projection(projection)

        const render = () => {
            console.log("render")
            ctx.clearRect(0, 0, d3.select(canvas).attr('width'), d3.select(canvas).attr('height'));

            ctx.beginPath();
            path({ type: 'Sphere' });
            ctx.fillStyle = 'aqua';
            ctx.fill();

            ctx.beginPath();
            path(data);
            ctx.fillStyle = 'maroon';
            ctx.fill();
        };
        render();
        d3GeoZoom()
            .projection(projection)
            .onMove(render)(canvas);
        render();

    });


</script>

<canvas bind:this={canvas} {width} {height} class="map"/>

<style>
    :global(path.country) {
        stroke: green;
        fill: white;
    }

    :global(path.graticule) {
        fill: none;
        stroke: cyan;
        stroke-width: 1px;
    }
</style>