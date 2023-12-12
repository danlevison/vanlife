import { BrowserRouter, Routes, Route } from "react-router-dom"
import { VansDataProvider } from "@/context/VansDataContext"
import { AuthProvider } from "@/context/AuthContext"
import Layout from "@/components/layouts/Layout"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Vans from "@/pages/Vans/Vans"
import VanDetail from "@/pages/Vans/VanDetail"
import ScrollToTop from "@/utils/ScrollToTop"
import Contact from "@/pages/Contact"
import AuthRequired from "@/components/layouts/AuthRequired"
import UserDashboard from "@/pages/user/UserDashboard"
import UserDetails from "@/pages/user/UserDetails"
import UserDetailsLayout from "@/components/layouts/UserDetailsLayout"
import UserSecurityLogin from "@/pages/user/UserSecurityLogin"
import UpdatePassword from "@/pages/UpdatePassword"
import HostLayout from "@/components/layouts/HostLayout"
import Dashboard from "@/pages/host/Dashboard"
import ListCampervan from "@/pages/ListCampervan"
import SignInPage from "@/pages/SignInPage"
import Income from "@/pages/host/Income"
import Reviews from "@/pages/host/Reviews"
import HostVans from "@/pages/host/HostVans"
import HostVanDetail from "@/pages/host/HostVanDetail"
import HostVanInfo from "@/pages/host/HostVanInfo"
import HostVanPricing from "@/pages/host/HostVanPricing"
import HostVanPhotos from "@/pages/host/HostVanPhotos"
import NotFound from "@/pages/NotFound"
import Checkout from "@/pages/Checkout"

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
								path="*"
								element={<NotFound />}
							/>
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

						<Route
							path="sign-in"
							element={<SignInPage />}
						/>

						<Route element={<AuthRequired />}>
							<Route
								path="host"
								element={<HostLayout />}
							>
								<Route
									index
									element={<Dashboard />}
								/>
								<Route
									path="income"
									element={<Income />}
								/>
								<Route
									path="vans"
									element={<HostVans />}
								/>

								<Route
									path="reviews"
									element={<Reviews />}
								/>
								<Route
									path="vans/:id"
									element={<HostVanDetail />}
								>
									<Route
										index
										element={<HostVanInfo />}
									/>
									<Route
										path="pricing"
										element={<HostVanPricing />}
									/>
									<Route
										path="photos"
										element={<HostVanPhotos />}
									/>
								</Route>
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
							<Route
								path="payment/:id"
								element={<Checkout />}
							/>
						</Route>
					</Routes>
				</VansDataProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
