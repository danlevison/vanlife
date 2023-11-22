type UserDetailItemProps = {
	label: string
	value: string | undefined
}

export default function UserDetailItem({ label, value }: UserDetailItemProps) {
	return (
		<li className="flex flex-col sm:flex-row justify-between items-baseline border-b py-4 w-full">
			<div className="w-full pb-1">
				<p className="font-light">{label}</p>
			</div>
			<div className="w-full">
				<p className="sm:text-lg">{value}</p>
			</div>
		</li>
	)
}
