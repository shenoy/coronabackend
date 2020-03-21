

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmFqZXNodHNoZW5veSIsImEiOiJjazU4djNkY3owaHRhM2ptdWp2NmpjajllIn0.skg6fNzb5t_Xwy5xGCRfGg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rajeshtshenoy/ck7pd54vm00k81iph1656owhq',
    maxZoom: 10
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.address}:${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });
};
