import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function ShowMapBox({ coordinates }) {
  const mapContainer = useRef(null);
  console.log(coordinates);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 10
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({
      color: "#154c79"
    })
      .setLngLat(coordinates)
      .addTo(map)

    // Clean up
    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainer} style={{ width: '200', height: '200px' }} className='rounded-xl' />
  )
}

export default ShowMapBox