import { GoogleMap, LoadScript } from '@react-google-maps/api';
import styles from '../../styles/mapComponent.module.css';

const center = {
    lat: 37.5665, // 서울의 위도
    lng: 126.9780 // 서울의 경도
  };

function MapComponent() {
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyAZcoy7MAPiw7R1zys5bWpQOuxmlP4PY60">
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
