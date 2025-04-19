import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userServices } from "@/services/user-api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUid, setUsername } from "@/redux/slices/useSlice";


export default function Login() {

	const dispatch = useDispatch();

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value;

		if (!username || !password) {
			setError("Username and password are required.");
			setIsLoading(false);
			return;
		}

		try {

			const data = await userServices.login({ username, password });
			dispatch(setToken({token : data.access_token}))
			dispatch(setUid({uid : data.user.user_id}));
			dispatch(setUsername({username : data.user.name}))
			navigate("/app/projects");

		} catch (err: any) {

			setError("Invalid username or password.");

		} finally {

			setIsLoading(false);

		}

	};

	return (

		<form onSubmit={handleSubmit}>

			<div className="mx-auto grid w-[350px] gap-6">

				<div className="grid gap-2 text-center">

					<h1 className="text-3xl font-bold">ForestMap</h1>
					<p className="text-muted-foreground">
						Enter your username below to login to your account
					</p>

				</div>

				<div className="grid gap-4">

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
							<a
								href="/forgot-password"
								className="ml-auto text-sm underline"
							>
								Forgot your password?
							</a>

						</div>

						<Input
							id="password"
							type="password"
							ref={passwordRef}
							required
						/>

					</div>

					{error && (
						<div className="text-sm text-red-600 text-center">
							{error}
						</div>
					)}

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</Button>

					<Button variant="outline" className="w-full" type="button">
						Login with Google
					</Button>

				</div>

			</div>

		</form>
	);
}
