import palmLogo from "../assets/palm_logo.png";

export function Aside() {
	return (
		<aside className="flex flex-col w-1/6 border-r bg-slate-100">
			<div className="p-4">
				<div className="rounded-full overflow-hidden w-24 h-24 mb-4">
					<img
						alt="Profile picture"
						height="96"
						src={palmLogo}
						style={{
							aspectRatio: "96/96",
							objectFit: "cover",
						}}
						width="96"
					/>
				</div>
				<h2 className="text-2xl font-bold mb-2">PaLMChat</h2>
				<p className="text-gray-600">
					ChatBOT Demo con React + Firebase + PaLM API.
				</p>
			</div>
		</aside>
	);
}
