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
import UserDetailsLayout from "./components/layouts/UserDetailsLayout"
import UserSecurityLogin from "./pages/user/UserSecurityLogin"
import UpdatePassword from "./pages/UpdatePassword"
import HostLayout from "./components/layouts/HostLayout"
import Dashboard from "./pages/host/Dashboard"
import ListCampervan from "./pages/ListCampervan"
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
								path="list-my-campervan"
								element={<ListCampervan />}
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
								path="host"
								element={<HostLayout />}
							>
								<Route
									index
									element={<Dashboard />}
								/>
							</Route>

							<Route
								path="user"
								element={<UserDashboard />}
							/>
							<Route element={<UserDetailsLayout />}>
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
