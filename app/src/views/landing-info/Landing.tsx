import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bell, Tree, Upload, Eye } from "lucide-react";

export default function Landing() {

    return (
        
        <>

            <div className="flex-1 ml-8 mr-8">
                <section className="bg-gradient-to-b from-green-50 to-slate-50 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Forest Analysis Using LiDAR Files</h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                            Individual Tree Identification and Visualization in Forest Ecosystems Using LiDAR Files and Segmentation Algorithms for Forest Management Applications
                        </p>
                    </div>
                </section>

                <section id="features" className="py-16 container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="mb-4 p-2 bg-green-100 w-fit rounded-lg">
                                    <Eye className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">3D Visualization</h3>
                                <p className="text-slate-600">
                                    High-performance rendering of point cloud data with support for interactive tree selection, measurements, and layer management.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="mb-4 p-2 bg-green-100 w-fit rounded-lg">
                                    <Upload className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">LiDAR Processing</h3>
                                <p className="text-slate-600">
                                    Handles industry-standard LiDAR formats with automatic validation, metadata extraction, and batch processing capability.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="mb-4 p-2 bg-green-100 w-fit rounded-lg">
                                    <Bell className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Tree Segmentation</h3>
                                <p className="text-slate-600">
                                    Precise delineation of tree crowns, stems, and canopy structures with unique identifier assignment for tracking.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="about" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">About The Project</h2>
                        <div className="max-w-4xl mx-auto">
                            <Tabs defaultValue="overview">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="objectives">Objectives</TabsTrigger>
                                    <TabsTrigger value="impact">Impact</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="mt-6">
                                    <p className="text-slate-600 mb-4">
                                        TreeSeg is a computational system that enables the identification and visualization of individual trees in forest ecosystems using laser scanning data and advanced segmentation algorithms. The system integrates a web interface for interactive a 3D visualization, facilitating efficient forest management and enhancing monitoring and conservation capabilities.
                                    </p>
                                    <p className="text-slate-600">
                                        The platform features a user-friendly interface with responsive controls for exploring complex forest ecosystem data across diverse devices and screen sizes.
                                    </p>
                                </TabsContent>
                                <TabsContent value="objectives" className="mt-6">
                                    <ul className="space-y-2 text-slate-600">
                                        <li>• Design and develop a web interface for interactive 3D visualization of trees</li>
                                        <li>• Implement segmentation algorithms to identify and extract information about individual trees</li>
                                        <li>• Generate metadata associated with each tree, including coordinates and characteristics</li>
                                        <li>• Evaluate segmentation algorithm accuracy by comparing with field data</li>
                                        <li>• Implement functionalities for loading, processing, and exporting data in industry-standard formats</li>
                                    </ul>
                                </TabsContent>
                                <TabsContent value="impact" className="mt-6">
                                    <p className="text-slate-600 mb-4">
                                        This project optimizes forest management practices by collecting and analyzing precise data, reducing the environmental impact of manual processes, and improving data-driven decision-making. The implementation contributes to biodiversity conservation, climate change mitigation, and the efficient use of natural resources.
                                    </p>
                                    <p className="text-slate-600">
                                        The system has the potential to be adapted to other ecosystems or regions, providing versatile and scalable solutions to similar challenges in different environmental contexts.
                                    </p>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </section>

                <section id="demo" className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Try Our Demo</h2>
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl max-w-6xl mx-auto">
                            {/* Demo Viewer Space */}
                            <div className="aspect-video relative">
                                {/* Placeholder for the actual viewer component */}
                                
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                        <p className="text-slate-600 text-center mb-8">This project is the result of a collaborative effort between Linnaeus University (LNU) and Universidad de Monterrey (UDEM).</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-slate-600 font-medium">JC</span>
                                    </div>
                                    <h3 className="font-bold text-lg">Juan Manuel Cuevas Gaytan</h3>
                                    <p className="text-slate-600">Computer Science Student</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-slate-600 font-medium">NE</span>
                                    </div>
                                    <h3 className="font-bold text-lg">Norma Elizondo Hubbard</h3>
                                    <p className="text-slate-600">Computer Science Student</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-slate-600 font-medium">RE</span>
                                    </div>
                                    <h3 className="font-bold text-lg">Rodrigo Eguiluz Ortiz Duran</h3>
                                    <p className="text-slate-600">Computer Science Student</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
};
