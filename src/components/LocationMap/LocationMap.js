import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './LocationMap.css';

const LocationMap = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoidGltaXR0cmEiLCJhIjoiY2ttaGFleWJyMDVjODJ2cWswZDA3cmVyMCJ9.MZg-p5Zs2nyOy7-vugkzDw';

  useEffect( () => {
   new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], 
        zoom: 9 
        });
  },[]);

    return (
        <div id='map' className='location-map'></div>
    );
};

export default LocationMap;