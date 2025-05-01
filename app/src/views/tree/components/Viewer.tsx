// @ts-nocheck

import { useTree } from "@/context/TreeProvider";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export default function Viewer(){
	const { viewer, setViewer, potreeContainerRef } = useTree();

	return (
		<>

				<Wrapper ref={potreeContainerRef} className="potree_container" >
					<div id="potree_render_area"></div>

				</Wrapper>


		
		</>
	)
}