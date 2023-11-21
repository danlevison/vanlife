import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import contactImg from "@/assets/contact-img.jpg"

export default function Contact() {
	return (
		<div className="flex flex-col items-center min-h-screen">
			<div className="relative top-16 md:top-0 w-full">
				<div className="absolute inset-0 bg-black/60" />
				<h1 className="absolute w-full top-[50%] left-[50%] translate-x-[-50%] md:w-auto md:translate-x-0 md:left-40 text-white text-center text-4xl sm:text-5xl md:text-6xl">
					Get in contact
				</h1>
				<img
					src={contactImg}
					alt="/"
					className="max-h-[500px] w-full"
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="max-w-[1240px] w-full px-8 pt-20 md:pt-10">
				<h2 className="text-center w-full max-w-[800px] text-lg sm:text-xl md:text-2xl pb-6 mx-auto">
					Please don’t hesitate to get in touch with any queries by filling in
					the contact form below.
				</h2>
				<form className="w-full max-w-[800px] mx-auto">
					<Label htmlFor="email">Your email address</Label>
					<Input
						type="email"
						name="email"
						id="email"
						required
						className="mt-1 mb-6 py-5"
					/>
					<Label htmlFor="subject">Subject</Label>
					<Input
						type="text"
						name="subject"
						id="subject"
						required
						className="mt-1 mb-6 py-5"
					/>
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						rows={10}
						required
						className="mt-1 mb-6 py-5"
					/>
					<Button className="w-full sm:w-[150px]">Submit</Button>
				</form>
			</div>
		</div>
	)
}
