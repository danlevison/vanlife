import { BrowserRouter, Routes, Route } from "react-router-dom"
import { VansDataProvider } from "./context/VansDataContext"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/layouts/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import ScrollToTop from "./utils/ScrollToTop"
import Contact from "./pages/Contact"
import AuthRequired from "./components/layouts/AuthRequired"
import UserDashboard from "./pages/user/UserDashboard"
import UserDetails from "./pages/user/UserDetails"
import DetailsLayout from "./components/layouts/DetailsLayout"
import UserSecurityLogin from "./pages/user/UserSecurityLogin"
import UpdatePassword from "./pages/UpdatePassword"

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
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
								path="contact-us"
								element={<Contact />}
							/>
							<Route
								path="vans"
								element={<Vans />}
							/>
							<Route
								path="vans/:id"
								element={<VanDetail />}
							/>
							<Route
								path="update-password"
								element={<UpdatePassword />}
							/>
						</Route>

						<Route element={<AuthRequired />}>
							<Route
								path="user"
								element={<UserDashboard />}
							/>
							<Route element={<DetailsLayout />}>
								<Route
									path="user/details"
									element={<UserDetails />}
								/>
								<Route
									path="user/security-login"
									element={<UserSecurityLogin />}
								/>
							</Route>
						</Route>
					</Routes>
				</VansDataProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
