import userAvatar from "../assets/carlosazaustre_avatar.jpeg";

export function UserMessage({ message }) {
	return (
		<div className="flex space-x-2 border rounded-xl m-2 ml-36 p-4 bg-slate-300 align-middle">
			<div className="rounded-full overflow-hidden w-8 h-8">
				<img
					alt="Sender profile picture"
					height="32"
					src={userAvatar}
					style={{
						aspectRatio: "32/32",
						objectFit: "cover",
					}}
					width="32"
				/>
			</div>
			<div>
				<p className="font-bold">Yo</p>
				<p>{message?.prompt}</p>
			</div>
		</div>
	);
}
