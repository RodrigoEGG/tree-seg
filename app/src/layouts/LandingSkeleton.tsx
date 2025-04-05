import { LoginHeader } from "@/components/login-header";
import {SidebarProvider } from "@/components/ui/sidebar";
import Landing from "@/views/landing-info/Landing";
import { Outlet } from "react-router-dom";

export default function LandingSkeleton() {

    return (

        <>

            <div className="[--header-height:calc(theme(spacing.14))]">

                    <LoginHeader />

                    <div className="flex flex-1">


                        <Landing/>


                    </div>

            </div>


        
        </>

    )

}