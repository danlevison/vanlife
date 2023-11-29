import { Link } from "react-router-dom"
import campervanImg from "../assets/about-img.jpg"

export default function About() {
	return (
		<div className="flex flex-col items-center min-h-screen">
			<div className="relative top-16 md:top-0 w-full">
				<div className="absolute inset-0 bg-black/40" />
				<h1 className="absolute w-full top-[50%] left-[50%] translate-x-[-50%] md:w-auto md:translate-x-0 md:left-40 text-white text-center text-4xl sm:text-5xl md:text-6xl">
					About us
				</h1>
				<img
					src={campervanImg}
					alt="Photo of a campervan next to a lake at sunset"
					className="max-h-[500px] w-full"
					style={{
						objectFit: "cover",
						objectPosition: "center"
					}}
				/>
			</div>

			<div className="pt-14 md:pt-0">
				<div className="max-w-[1240px] px-8">
					<div className="w-full max-w-[780px] mx-auto mb-12">
						<h2 className="text-3xl sm:text-4xl md:text-4xl font-bold pt-10 pb-6">
							Don’t squeeze in a sedan when you could relax in a van.
						</h2>
						<p className="mb-6 sm:text-lg leading-snug">
							Welcome to <span className="font-bold">#VANLIFE</span>, your
							one-stop destination for campervan adventures. Whether you're a
							seasoned campervan enthusiast or a curious newcomer, we're here to
							make your road trip dreams a reality.
						</p>
						<p className="sm:text-lg leading-snug">
							At Vanlife, we believe in the transformative power of van life.
							It's an opportunity to escape the ordinary, embrace the open road,
							and connect with nature on a deeper level. It's about forging new
							paths, discovering hidden gems, and creating memories that will
							last a lifetime.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<h3 className="text-lg">Rent a Campervan</h3>
							<p className="sm:text-lg leading-snug">
								Our comprehensive fleet of campervans caters to every need and
								budget. From compact pop-top vans to spacious motorhomes, we
								have the perfect vehicle to suit your adventure plans. Each
								campervan is meticulously maintained and equipped with all the
								essentials for a comfortable and enjoyable journey.
							</p>
						</div>

						<div>
							<h3 className="text-lg">Host Your Campervan</h3>
							<p className="sm:text-lg leading-snug">
								If you own a campervan that's not in constant use, why not share
								it with others and earn some extra income? With #VANLIFE, you
								can list your campervan for rent and reach a wide network of
								potential renters. We handle the booking process, payments, and
								insurance, so you can sit back and relax while earning passive
								income.
							</p>
						</div>

						<div>
							<h3 className="text-lg">Our Community</h3>
							<p className="sm:text-lg leading-snug">
								Join our vibrant community of campervan enthusiasts and connect
								with fellow adventurers. Share your experiences, exchange tips,
								and discover new destinations along the way. We're here to
								support you every step of your van life journey.
							</p>
						</div>

						<div>
							<h3 className="text-lg">Embrace the #VANLIFE Experience</h3>
							<p className="sm:text-lg leading-snug">
								#VANLIFE is more than just renting a campervan; it's a
								lifestyle. It's about embracing the freedom of the open road,
								exploring new horizons, and living life on your own terms. Let
								us be your guide as you embark on your unforgettable #VANLIFE
								adventure.
							</p>
						</div>
					</div>

					<div className="flex flex-col items-center gap-6 w-full max-w-[600px] mx-auto bg-[#FFCC8D] rounded-md p-6 mt-20 text-primaryText text-center sm:text-left font-bold">
						<h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
							Your destination is waiting.
							<br />
							Your van is ready.
						</h2>
						<Link
							className="w-full sm:w-44 bg-primaryText rounded-xl p-3 text-white text-center"
							to="/vans"
						>
							Explore our vans
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
