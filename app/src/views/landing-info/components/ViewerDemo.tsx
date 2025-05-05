// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { useViewer, Demo } from "@/context/Demo";

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 70vh;
  position: relative;
`;

const ViewerDemo: React.FC = () => {

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

export default ViewerDemo;
