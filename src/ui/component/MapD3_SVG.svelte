<script>
    import * as d3 from 'd3';
    import topojson from "topojson";
    import {onMount} from "svelte";
    import zoom from '../../utils/zoom.js'

    // export let projections;
    export let maps;
    export let defaultMapName;
    export let width;
    export let height;

    const data = topojson.feature(
        maps[defaultMapName],
        maps[defaultMapName].objects.countries
    ).features

    let svg;
    let g;
    let projection;
    let path;

    onMount(() => {
        g = d3.select(svg)
            .attr("width", "100%")
            .attr("height", 500)
            .append("g");

        projection = d3.geoMercator()
            .center([0, 5])
            .scale(150)
            .precision(0.1)
            .rotate([-180, 0]);

        path = d3.geoPath().projection(projection)

        g.selectAll("path.country")
            .data(data)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path);
        g.selectAll("path.graticule")
            .data(d3.geoGraticule().lines())
            .enter()
            .append("path")
            .attr("class", "graticule")
            .attr("d", path)
            .exit().remove()


        // let zoom = d3.zoom()
        //     .scaleExtent([1, 8])
        //     .on('zoom', ({transform}) => {
        //         g.attr('transform', transform);
        //     });
        // d3.select(svg).call(zoom);

        const render = ()=>{g.selectAll('path').attr('d', path)};
        d3.select(svg).call(
            zoom(projection)
            .on("zoom.render", render)
        );
    });


</script>

<svg bind:this={svg} {width} {height} class="map"/>

<style>
    svg {
        align-self: center;
    }
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