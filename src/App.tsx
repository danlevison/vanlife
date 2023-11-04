import { BrowserRouter, Routes, Route } from "react-router-dom"
import { VansDataProvider } from "./context/VansDataContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import ScrollToTop from "./utils/ScrollToTop"

function App() {
	return (
		<BrowserRouter>
			<VansDataProvider>
				<ScrollToTop />
				<Routes>
					<Route
						path="/"
						element={<Layout />}
					>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path="about"
							element={<About />}
						/>
						<Route
							path="vans"
							element={<Vans />}
						/>
						<Route
							path="vans/:id"
							element={<VanDetail />}
						/>
					</Route>
				</Routes>
			</VansDataProvider>
		</BrowserRouter>
	)
}

export default App
