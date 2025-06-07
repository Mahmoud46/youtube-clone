import { ReactNode, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
function App(): ReactNode {
	const [expandSidebar, setExpandSidebar] = useState(false);
	const [category, setCategory] = useState<number>(0);
	const locationPathname = useLocation().pathname;

	// Set the expandSidebar to false when moving to a new route
	useEffect(() => {
		if (category == -1 && !locationPathname.startsWith("/video")) {
			setExpandSidebar(false);
			setCategory(0);
		} else if (locationPathname.startsWith("/video")) {
			setCategory(-1);
			setExpandSidebar(false);
		}
	}, [locationPathname, category]);

	return (
		<main>
			<Navbar setExpandSidebar={setExpandSidebar} setCategoryId={setCategory} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							expandSidebar={expandSidebar}
							category={category}
							setCategory={setCategory}
							setExpandSidebar={setExpandSidebar}
						/>
					}
				/>
				<Route
					path="/video/:categoryId/:videoId"
					element={
						<Video
							expandSidebar={expandSidebar}
							setCategory={setCategory}
							category={category}
							setExpandSidebar={setExpandSidebar}
						/>
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
