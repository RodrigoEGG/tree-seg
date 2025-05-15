import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useTree } from '@/context/TreeProvider';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const icon = new L.Icon({
	conUrl: '/icon.png',
	iconRetinaUrl: '/icon.png',
	iconSize: [50, 50],
});

interface MapUpdaterProps {
	position: LatLngExpression;
}

function MapUpdater({ position }: MapUpdaterProps) {
	
	const map = useMap();

	useEffect(() => {
		map.setView(position);
	}, [position, map]);

	return null;
}

export default function Map() {

	const {tree} = useTree();
	const [position, setPosition] = useState<LatLngExpression>([-38, 176]);
	const [marker, setMarker] = useState<LatLngExpression>([-38, 176]);

	useEffect(() => {
		if(tree){
			setPosition([tree.location.latitude, tree.location.longitude])
			setMarker([tree.location.latitude, tree.location.longitude])
		}
	}, [tree])

	return (
		<fieldset className="grid gap-4 rounded-lg border p-4 h-64">
			<legend className="-ml-1 px-1 text-sm font-medium">
				Ubicación
			</legend>

			<div className="w-full h-full rounded overflow-hidden">
				<MapContainer
					center={position}
					zoom={20}
					className="h-full w-full rounded z-0"
				>
					<MapUpdater position={position} />

					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; OpenStreetMap contributors'
					/>

					<Marker position={marker} icon={icon}>
						{
							tree ? (

								<Popup>
									{tree.location.latitude.toFixed(4)} , {tree.location.longitude.toFixed(4)}
								</Popup>

							) : 
							(

								<Popup>
									No data available
								</Popup>

							)
						}
					</Marker>
				</MapContainer>
			</div>
		</fieldset>
	);
}
