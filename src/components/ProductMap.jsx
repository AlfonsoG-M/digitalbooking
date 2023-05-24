import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import style from '../styles/productMap.module.css'

const ProductMap = ({ position }) => {

    const { state: { CiudadPE, ProductoE} } = useContext(ContextGlobal);


    return (
        <div className={style.productMapContainer}>
            <h2>¿Donde vas a estar?</h2>
            <hr />
            <div>
                <p>{CiudadPE.nombre}, {CiudadPE.pais}. </p>
                <MapContainer className={style.mapContainer} center={position} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup className={style.popup}>
                            {ProductoE.titulo} <br /> {CiudadPE.nombre}, {CiudadPE.pais}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default ProductMap