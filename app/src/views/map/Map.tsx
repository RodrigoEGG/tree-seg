import { MapContainer, TileLayer, Marker, Popup , Rectangle} from 'react-leaflet';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css"

const position: LatLngExpression = [51.505, -0.09];

export default function Map() {
	const bounds: LatLngBoundsExpression = [
		[51.49, -0.1],
		[51.5, -0.08],
	];
	return (
		<MapContainer center={position} zoom={13} style={{ height: '90vh', width:'100vw' }}>
		<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&copy; OpenStreetMap contributors'
		/>
		<Marker position={position}>
			<Popup>Hola desde TypeScript y Leaflet 🚀</Popup>
		</Marker>

		<Rectangle bounds={bounds} pathOptions={{ color: 'red' }}>
			<Popup>Este es un rectángulo rojo</Popup>
		</Rectangle>
		</MapContainer>
	);
}
