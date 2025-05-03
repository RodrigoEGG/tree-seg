import { MapContainer, TileLayer, Popup, Marker, Polygon, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { fileServices } from '@/services/file-api';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/useSlice';
import { useState, useEffect } from 'react';
import MetadataTable from '@/components/metadata-table';

const ChangeView = ({ center }: { center: LatLngExpression }) => {
	const map = useMap();
	map.setView(center);
	return null;
}

interface LocationWithIndex {
	position: LatLngExpression;
	metadataIndex: number;
}

interface PolygonWithIndex {
	points: LatLngExpression[];
	metadataIndex: number;
}

export default function Map() {

	const { id } = useParams();
	const token = useSelector(selectToken);
	const [locations, setLocations] = useState<LocationWithIndex[]>([]);
	const [polygons, setPolygons] = useState<PolygonWithIndex[]>([]);
	const [position, setPosition] = useState<LatLngExpression>([51.49, -0.1]);

	const fetcher = async () => {
		const data = await fileServices.getFileMetadataByProject(parseInt(id ? id : "1"), token);
		return data;
	};

	const { data, error } = useSWR(id ? `/api/files/metadatas/${id}` : null, fetcher, { 
		revalidateOnFocus: false, 
		revalidateOnReconnect: false 
	});

	useEffect(() => {
		if (data) {
			const newLocations: any = data.metadatas
				.filter((metadata) => metadata.location && metadata.location.length >= 2)
				.map((metadata, index) => ({
					position: [metadata.location[0], metadata.location[1]],
					metadataIndex: index
				}));

			const newPolygons: any = data.metadatas
				.filter((metadata) => metadata.coordinates && metadata.coordinates.length >= 3)
				.map((metadata, index) => {
					const points = metadata.coordinates.map((point: number[]) => [point[0], point[1]]);
					if (points.length > 0 && (points[0][0] !== points[points.length - 1][0] || points[0][1] !== points[points.length - 1][1])) {
						points.push(points[0]);
					}
					return { points, metadataIndex: index };
				});

			setLocations(newLocations);
			setPolygons(newPolygons);

			if (newLocations.length > 0) {
				setPosition(newLocations[0].position);
			}
		}
	}, [data]);

	if (error) return (
		<div className="flex items-center justify-center h-screen font-bold text-xl">
			Failed to load data
		</div>
	);

	if (!data) return (
		<div className="flex items-center justify-center h-screen font-bold text-xl">
			Loading...
		</div>
	);

	return (
		<MapContainer center={position} zoom={17} style={{ height: '90vh', width: '100vw' }}>
			<ChangeView center={position} />
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; OpenStreetMap contributors'
			/>

			{locations.length > 0 && locations.map(({ position, metadataIndex }, index) => (

				<Marker key={index} position={position}>

					<Popup>

						<div className='my-3 text-lg'>

							<div>
								<MetadataTable fileMetadata={data.metadatas[metadataIndex]}/>
							</div>
						</div>

						<Link to={`/app/view/${id}/${data.metadatas[metadataIndex].file_id}`} >
							<Button className='w-full'>Go to file</Button>
						</Link>

					</Popup>

				</Marker>

			))}

			{polygons.length > 0 && polygons.map(({ points, metadataIndex }, index) => (

				<Polygon key={index} positions={points} pathOptions={{ color: 'blue' }}>

					<Popup>

						<div className='my-3 text-lg'>
							<div>
								<MetadataTable fileMetadata={data.metadatas[metadataIndex]}/>
							</div>
						</div>

						<Link to={`/app/view/${id}/${data.metadatas[metadataIndex].file_id}`} >
							<Button className='w-full'>Go to file</Button>
						</Link>

					</Popup>

				</Polygon>
				
			))}

		</MapContainer>
	);
}
