import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userServices } from "@/services/user-api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUid, setUsername } from "@/redux/slices/useSlice";
import { TreePine } from "lucide-react";
import { ArrowLeft } from "lucide-react"; 


export default function CreateAccount() {

    const dispatch = useDispatch();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const username = usernameRef.current?.value.trim();
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value.trim();

        if (!username || !password || !email) {
            setError("Email, username and password are required.");
            setIsLoading(false);
            return;
        }

        try {

            const data = await userServices.createUser({ name: username, password, email });
            navigate("/auth");

        } catch (err: any) {

            setError("Failed to create account. Please try again.");

        } finally {

            setIsLoading(false);

        }

    };

    return (
        /* Form for creating a new account */
        <form onSubmit={handleSubmit} className="flex items-center justify-center min-h-screen">

            <div className="absolute top-4 left-4">
                <Button variant="link" onClick={() => navigate("/auth")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
            </div>


            <div className="mx-auto grid w-[350px] gap-6">

                <div className="grid gap-2 text-center">

                    <div className="flex justify-center items-center">
                        <TreePine className={"h-8 w-8"} />
                    </div>
                    <h1 className="text-3xl font-bold">ForestMap</h1>
                    <p className="text-muted-foreground">
                        Create an account to get started
                    </p>

                </div>

                <div className="grid gap-4">

                    <div className="grid gap-2">

                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            ref={emailRef}
                            placeholder="user@example.com"
                            required
                        />

                    </div>

                    <div className="grid gap-2">

                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            ref={usernameRef}
                            placeholder="Enter your username"
                            required
                        />

                    </div>

                    <div className="grid gap-2">

                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {error && (
                        <div className="text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                </div>

            </div>

        </form>
    );
}