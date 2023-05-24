import React, { useState, useContext } from 'react'
import { ContextGlobal } from './utils/global.context';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import style from '../styles/popUpMap.module.css'


const PopUpMap = ({position}) => {

  return (
    <div className={style.productMapContainer}>
     <MapContainer
        className={style.mapContainer}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default PopUpMap