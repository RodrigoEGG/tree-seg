import { MapContainer, TileLayer, Popup , Rectangle} from 'react-leaflet';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css"
import { Button } from '@/components/ui/button';

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

			<Rectangle bounds={bounds} pathOptions={{ color: 'red' }}>
				<Popup>
					test2.las 
					<br/>
					<Button className='pt-2'>Go to file</Button>

				</Popup>
			</Rectangle>
		</MapContainer>
	);
}
