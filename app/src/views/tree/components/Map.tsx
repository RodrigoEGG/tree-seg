import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";

const position: LatLngExpression = [51.505, -0.09];

export default function Map() {
	return (
		<fieldset className="grid gap-4 rounded-lg border p-4 h-64"> {/* h-64 o ajustable */}
			<legend className="-ml-1 px-1 text-sm font-medium">
				Ubicación
			</legend>

			<div className="w-full h-full rounded overflow-hidden">
				<MapContainer
					center={position}
					zoom={20}
					className="h-full w-full rounded z-0"
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; OpenStreetMap contributors'
					/>

					<Marker position={position}>
						<Popup>Hola desde TypeScript y Leaflet 🚀</Popup>
					</Marker>
				</MapContainer>
			</div>
		</fieldset>
	);
}
