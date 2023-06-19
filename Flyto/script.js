mapboxgl.accessToken = 'pk.eyJ1IjoiaWFyYWtpc3RhaW4iLCJhIjoiY2podnY0cWs5MTAyaTNrbnY3MnR5OHJ0bSJ9.aOqeUPZkBISqt1UKpmmX7g';
    // These options control the camera position after animation
    const start = {
        center: [80, 36],
        zoom: 1,
        pitch: 0,
        bearing: 0
    };
    const end = {
        center: [8.11862, 46.58842],
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        ...start
    });

    map.on('style.load', () => {
        // Custom atmosphere styling
        map.setFog({
            'color': 'rgb(220, 159, 159)', // Pink fog / lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
            'horizon-blend': 0.4 // Exaggerate atmosphere (default is .1)
        });

        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.terrain-rgb'
        });

        map.setTerrain({
            'source': 'mapbox-dem',
            'exaggeration': 1.5
        });
    });

    let isAtStart = true;

    document.getElementById('fly').addEventListener('click', () => {
        // depending on whether we're currently at point a or b,
        // aim for point a or b
        const target = isAtStart ? end : start;
        isAtStart = !isAtStart;

        map.flyTo({
            ...target, // Fly to the selected target
            duration: 12000, // Animate over 12 seconds
            essential: true // This animation is considered essential with
            //respect to prefers-reduced-motion
        });
    });