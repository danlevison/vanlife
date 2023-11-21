import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"

export default function Questions() {
	return (
		<section className="max-w-[1240px] w-full mt-16 px-8">
			<h3 className="text-xl sm:text-2xl">Frequently asked questions</h3>
			<Accordion
				type="single"
				collapsible
				className="w-full"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-left">
						How does insurance work?
					</AccordionTrigger>
					<AccordionContent className="text-base">
						Every vehicle featured on our platform must have comprehensive
						insurance coverage for rentals. Collaborating with leading insurance
						companies, we craft specialised insurance products for our members,
						guaranteeing owners complete protection against any damages that may
						occur during the rental period.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="text-left">
						What if something gets broken?
					</AccordionTrigger>
					<AccordionContent className="text-base">
						At Vanlife, we acknowledge that accidents can occur. That's why
						we've partnered with the UK's leading insurers to ensure
						comprehensive coverage when someone else is using your campervan.
						Additionally, we secure a substantial £500 bond per booking to
						address other potential inconveniences, including extra mileage and
						cleaning. As part of your Camplify membership, if an incident occurs
						during the rental, our dedicated support team is here to assist you
						throughout the cost recovery process. Rest assured, we've got it
						covered.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="text-left">
						What if I’m not sure about the hirer?
					</AccordionTrigger>
					<AccordionContent className="text-base">
						As the van owner, you wield full control over the booking process. A
						hirer can only make a deposit payment once you've given your
						approval to their plans. If you feel uneasy about the hirer, their
						chosen route, or the distance they intend to cover, we advise
						against approving the booking. Your comfort and confidence are
						paramount in the decision-making process.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger className="text-left">
						What rate should I set for my van?
					</AccordionTrigger>
					<AccordionContent className="text-base">
						The pricing you establish is influenced by various factors, such as
						the van's location, sleeping capacity, age, and type. Connect with
						one of our team members to receive guidance on optimising your
						pricing strategy.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}
