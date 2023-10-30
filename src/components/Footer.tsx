export default function Footer() {
	const currentYear = new Date().getFullYear()
	return (
		<footer className="flex justify-center items-center bg-[#252525] text-[#AAAAAA] font-medium h-20 flex-shrink-0">
			&copy; {currentYear} #VANLIFE{" "}
		</footer>
	)
}
