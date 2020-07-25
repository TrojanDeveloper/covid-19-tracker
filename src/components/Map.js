import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import './map.css'
import { showDataOnMap } from '../utils/caseCircle';

function Map({ countries, caseType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {countries && showDataOnMap(countries, caseType)}
            </LeafletMap>


        </div>
    );
}

Map.propTypes = {

};

export default Map;