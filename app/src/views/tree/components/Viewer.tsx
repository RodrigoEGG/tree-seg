// @ts-nocheck

import { useTree } from "@/context/TreeProvider";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 90vh;
  position: relative;
`;

export default function Viewer(){
	const { viewer, setViewer, potreeContainerRef } = useTree();

	return (
		<>
			<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">

				<Wrapper ref={potreeContainerRef} className="potree_container" >
					<div id="potree_render_area"></div>

				</Wrapper>

			</div>

		
		</>
	)
}