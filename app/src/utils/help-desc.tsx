import exp from "constants";


export const scalar_title: string = "How to use scalar fields?";
export const scalar_desc: string = `
	<p><strong>Scalar fields</strong> are attributes of a LAS file that describe characteristics of the scanned 3D points. These fields can be used to represent different properties such as color, classification, intensity, and elevation. Below are some common scalar fields:</p>
	<br/>
	<ul>
		<li><strong>RGBA</strong>:  
		This field stores the color values (red, green, blue, and alpha) of each scanned point, typically obtained from the LIDAR scanner. These values allow the points to be visually represented with the original scan colors, which is useful for creating more realistic 3D models.
		</li>
		<br/>

		<li><strong>Classification</strong>:  
		Classification is a label assigned to each point to describe what type of object it represents. For example, a point can be classified as part of the ground, a building, a tree, or a structure. This classification helps in processing and analyzing LIDAR data as it allows filtering and segmenting points based on their type.
		</li>
		<br/>

		<li><strong>Intensity</strong>:  
		Intensity refers to the strength of the return of the laser that is reflected from a particular point. This value can be related to the type of surface (e.g., water, trees, buildings) and provides additional information about the scanned surface characteristics. Intensity can also help improve the quality of generated models.
		</li>
		<br/>

		<li><strong>Elevation</strong>:  
		Elevation is the value that indicates the height of a point relative to sea level or a specific coordinate system. This field is essential for representing terrain relief, such as mountains, valleys, roads, and buildings. It is used in creating Digital Elevation Models (DEM) and other geospatial analysis applications.
		</li>
		<br/>
	</ul>

`;

export const tool_title : string = "How to use the tools?";
export const tool_desc : string = `
	<p>The tools allow you to interact with the LAS file in various ways to visualize and analyze its data. Below are some of the key tools and their functionalities:</p>
	<br/>

	<ul>
		<li><strong>Segmentation</strong>:  
		This tool allows you to view the results of the segmentation of each tree. Each tree is identified and highlighted in a different color, making it easier to distinguish between individual trees in the scan.
		</li>
		<br/>

		<li><strong>Marker</strong>:  
		This tool allows you to place a marker at a specific point in the 3D space. By marking a point, you can easily track its coordinates, helping you identify precise locations within the scan.
		</li>
		<br/>

		<li><strong>Distance</strong>:  
		The Distance tool enables you to measure the distance between two movable points. You can adjust the points in the 3D space and instantly see the result of the distance measurement between them in meters.
		</li>
		<br/>

		<li><strong>Volume</strong>:  
		This tool allows you to measure the volume of an object by creating a 3D cube. The cube can be adjusted and rotated to fit the object you're measuring, providing an accurate volume calculation.
		</li>
		<br/>

		<li><strong>Circumference</strong>:  
		The Circumference tool allows you to measure the circumference of an object by first selecting three points. These points can be repositioned to refine the measurement. Once the points are placed, the circumference is calculated, giving you the perimeter of the object.
		</li>
		<br/>
	</ul>
`;

export const tree_title : string = "How to use the indiviual tree?";

export const tree_desc: string = `
	<p>
		After performing the instance segmentation to detect each tree, an <strong>ID</strong> is assigned to every detected tree. 
		This ID is used to identify and differentiate individual trees.
	</p>
	<p>
		To visualize a specific tree, you need to <strong>select it</strong> and then click the <strong>"View"</strong> button.
	</p>
`;


export const metadata_title : string = "How to use metadata?";

export const metadata_desc: string = `
	<p>
		The <strong>Metadata</strong> menu provides three options:
	</p>
	<br/>
	<ul>
		<li>
			<strong>LAS Metadata</strong>: Displays information from the LAS file header, such as creation time, software used, and other technical details.
		</li>
		<br/>
		<li>
			<strong>Height</strong>: Shows the average height of the trees in the file, calculated from the segmented data.
		</li>
		<br/>
		<li>
			<strong>Circumference</strong>: Provides the average circumference per tree, useful for biomass or size estimations.
		</li>
		<br/>
	</ul>
`;



