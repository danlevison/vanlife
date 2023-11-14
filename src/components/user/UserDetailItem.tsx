type UserDetailItemProps = {
	label: string
	value: string | undefined
}

export default function UserDetailItem({ label, value }: UserDetailItemProps) {
	return (
		<li className="flex flex-col sm:flex-row justify-between items-baseline border-b py-4 w-full">
			<div className="w-full">
				<p>{label}</p>
			</div>
			<div className="w-full">
				<p className="sm:text-lg font-medium">{value}</p>
			</div>
		</li>
	)
}
