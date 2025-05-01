// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { useViewer, ViewerProvider } from "@/context/ViewerProvider";

const Wrapper = styled.div`
  background-color: black;
  height: 100vh;
  position: relative;
`;

const Viewer: React.FC = () => {

	const { viewer, setViewer, potreeContainerRef } = useViewer();
	const [attr, setAttr] = useState<string>("rgba");


	return (
		<>
		

			<div id="potree-root">

				<Wrapper ref={potreeContainerRef} className="potree_container">
					<div id="potree_render_area"></div>
				</Wrapper>


			</div>

		</>
  );
};

export default Viewer;
