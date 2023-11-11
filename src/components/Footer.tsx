import { Link } from "react-router-dom"
import { CiLock } from "react-icons/ci"
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai"
import { RiTwitterXLine } from "react-icons/ri"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import visa from "@/assets/visa.png"
import mastercard from "@/assets/mastercard.png"
import amex from "@/assets/amex.png"
import paypal from "@/assets/paypal.png"

export default function Footer() {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="bg-background w-full">
			<div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8">
				<div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 pt-16 md:pt-28 pb-10">
					<div className="text-primaryText">
						<h3 className="text-2xl font-bold uppercase">#Vanlife</h3>
						<ul className="flex flex-col gap-4 mt-7">
							<li>
								<Link
									to={"about"}
									className="tracking-wide hover:text-accent cursor-pointer duration-300"
								>
									About us
								</Link>
							</li>
							<li>
								<Link
									to={"vans"}
									className="tracking-wide hover:text-accent cursor-pointer duration-300"
								>
									Campervan hire
								</Link>
							</li>
							<li>
								<Link
									to={"host"}
									className="tracking-wide hover:text-accent cursor-pointer duration-300"
								>
									List my camper
								</Link>
							</li>
							<li>
								<Link
									to={"contact-us"}
									className="tracking-wide hover:text-accent cursor-pointer duration-300"
								>
									Contact us
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full">
						<h3 className="text-2xl font-bold">FAQ's</h3>
						<Accordion
							type="single"
							collapsible
							className="w-full"
						>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-left">
									Can I get a discount for last-minute hire?
								</AccordionTrigger>
								<AccordionContent>
									Absolutely! We're all about spontaneous adventures. While we
									can't promise last-minute discounts, we do have some great
									deals for those who embrace the unexpected. Check out our
									current promotions and hit the road with a smile!
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger className="text-left">
									What if I need to cancel?
								</AccordionTrigger>
								<AccordionContent>
									Change of plans? No worries! If you cancel 20 or more days
									before your pick-up, you get a full refund. For cancellations
									72 hours to 20 days prior, choose between a 50% refund or a
									travel voucher (full value with a 15% fee). Unfortunately,
									within 72 hours, no refunds or vouchers. We appreciate your
									understanding and flexibility!
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger className="text-left">
									Can I return my campervan to a different location?
								</AccordionTrigger>
								<AccordionContent>
									Yes, we offer one-way rentals for those who like to mix up
									their journey. Just let us know in advance, and we'll make
									sure your road trip ends right where you want it to.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
					<div className="max-w-[600px]">
						<h3 className="text-primaryText text-2xl font-bold">Vanlife</h3>
						<p className="py-4">
							We offer high-quality campervans for rental or purchase in various
							destinations throughout North America, Oceania, and Europe,
							delivered through a user-friendly and tailor-made online platform.
						</p>
						<h3 className="text-primaryText text-2xl font-bold">
							Subscribe to our newsletter
						</h3>
						<p className="pt-4">
							Stay informed by subscribing to receive periodic notifications
							about the latest campervan rental promotions, exclusive deals, and
							informative news!
						</p>
						<form className="flex flex-col gap-2 py-5">
							<label
								htmlFor="email"
								className="sr-only"
							>
								Email
							</label>
							<div className="flex flex-col md:flex-row items-center gap-4">
								<Input
									type="email"
									id="email"
									placeholder="E-mail"
									aria-required
									required
								/>
								<Button
									variant={"outline"}
									className="w-full md:w-[250px] text-accent uppercase font-bold tracking-widest"
								>
									Subscribe
								</Button>
							</div>
						</form>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-10 px-8 w-full border-t border-gray-300">
					<h4 className="uppercase font-bold text-xl">#Vanlife</h4>
					<div>
						<h4 className="flex items-center gap-1">
							<span>
								<CiLock size={20} />
							</span>
							Secure payment
						</h4>
						<ul className="flex items-center gap-1">
							<li>
								<img
									src={visa}
									alt="Visa logo"
									loading="lazy"
									className="w-[35px]"
								/>
							</li>
							<li>
								<img
									src={mastercard}
									alt="Mastercard logo"
									loading="lazy"
									className="w-[35px]"
								/>
							</li>
							<li>
								<img
									src={amex}
									alt="American Express logo"
									loading="lazy"
									className="w-[35px]"
								/>
							</li>
							<li>
								<img
									src={paypal}
									alt="PayPal logo"
									loading="lazy"
									className="w-[40px]"
								/>
							</li>
						</ul>
					</div>
					<ul className="flex items-center gap-2">
						<li>
							<a className="cursor-pointer">
								<AiOutlineFacebook size={25} />
							</a>
						</li>
						<li>
							<a className="cursor-pointer">
								<AiOutlineInstagram size={25} />
							</a>
						</li>
						<li>
							<a className="cursor-pointer">
								<RiTwitterXLine size={25} />
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="bg-[#202020] text-[#AAAAAA] py-6 px-10 w-full text-center">
				<p>
					Copyright &copy; #VANLIFE <span>{currentYear}</span> All rights
					reserved | Website developed by{" "}
					<a
						href={"https://danlevison.dev/"}
						target="_blank"
						className="font-bold hover:text-white duration-300"
					>
						Dan Levison <span className="sr-only">Opens in a new tab</span>
					</a>
				</p>
			</div>
		</footer>
	)
}
