import { LoginHeader } from "@/components/login-header";
import { SiteHeader } from "@/components/site-header";
import { UserState } from "@/interfaces/redux";
import Landing from "@/views/landing-info/Landing";
import { useSelector } from "react-redux";

export default function LandingSkeleton() {

    const token = useSelector(selectToken);
    const isLoggedIn = token !== "" && token !== undefined && token !== null;

    return (

        <>

            <div className="[--header-height:calc(theme(spacing.14))]">
                {isLoggedIn ? <SiteHeader /> : <LoginHeader />}

                <div className="flex flex-1">
                    <Landing/>
                </div>
            </div>


        
        </>

    )

}

export const selectToken = (state : {userState : UserState}) => state.userState.token;