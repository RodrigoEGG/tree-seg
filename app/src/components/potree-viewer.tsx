"use client";

import { useEffect } from "react";

export default function PotreeViewer() {
    useEffect(() => {
        // Cargar dependencias de Potree en el DOM
        const scripts = [
            "/libs/jquery/jquery-3.1.1.min.js",
            "/libs/spectrum/spectrum.js",
            "/libs/jquery-ui/jquery-ui.min.js",
            "/libs/other/BinaryHeap.js",
            "/libs/tween/tween.min.js",
            "/libs/d3/d3.js",
            "/libs/proj4/proj4.js",
            "/libs/openlayers3/ol.js",
            "/libs/i18next/i18next.js",
            "/libs/jstree/jstree.js",
            "/build/potree/potree.js",
            "/libs/plasio/js/laslaz.js",
        ];

        scripts.forEach((src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });

        // Esperar a que Potree esté disponible
        const initPotree = () => {
            if (window.Potree) {
                window.viewer = new window.Potree.Viewer(
                    document.getElementById("potree_render_area")
                );

                window.viewer.setEDLEnabled(false);
                window.viewer.setFOV(60);
                window.viewer.setPointBudget(1_000_000);
                window.viewer.loadSettingsFromURL();
                window.viewer.setBackground("skybox");

                window.viewer.loadGUI(() => {
                    window.viewer.setLanguage("en");
                    document.getElementById("potree_sidebar_container").style.display =
                        "block";
                });

                const url = "/pointclouds/test/metadata.json";
                window.Potree.loadPointCloud(url).then((e) => {
                    let pointcloud = e.pointcloud;
                    let material = pointcloud.material;

                    material.activeAttributeName = "rgba";
                    material.minSize = 2;
                    material.pointSizeType = window.Potree.PointSizeType.ADAPTIVE;

                    window.viewer.scene.addPointCloud(pointcloud);
                    window.viewer.fitToScreen();
                });
            } else {
                setTimeout(initPotree, 500);
            }
        };

        initPotree();
    }, []);

    return (
        <div
            className="relative w-full h-screen"
            style={{
                backgroundImage: "url('/build/potree/resources/images/background.jpg')",
            }}
        >
            <div id="potree_render_area" className="absolute w-full h-full"></div>
            <div id="potree_sidebar_container" className="hidden"></div>
        </div>
    );
}
