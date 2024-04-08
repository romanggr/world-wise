import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

const Map = () => {
    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition()

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (
        < div className={styles.mapContainer} >
            {!geolocationPosition && <Button type={"position"} onClick={() => getPosition()}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker position={city.position} key={city.id}><Popup>
                    <span>{city.cityName}</span>
                </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div >
    )
}

const ChangeCenter = ({ position }) => {
    const map = useMap()
    map.setView(position)
    return null
}

const DetectClick = () => {
    const navigate = useNavigate()

    useMapEvents({
        click: e => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map