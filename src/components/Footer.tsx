export default function Footer() {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="flex justify-center items-center bg-[#252525] text-[#AAAAAA] font-medium h-20">
			<p>
				&copy; {currentYear} #VANLIFE | Website by{" "}
				<a
					href="https://danlevison.dev/"
					target="_blank"
					className="underline"
				>
					Dan Levison <span className="sr-only">Opens in a new tab</span>
				</a>
			</p>
		</footer>
	)
}
