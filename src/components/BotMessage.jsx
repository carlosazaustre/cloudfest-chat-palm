export function BotMessage({ message }) {
	return (
		<div className="flex space-x-2 border rounded-xl m-2 mr-36 p-4 bg-blue-300">
			<p className="font-bold">PaLM-BOT</p>
			<p>{message.response ? message.response : "Pensando..."}</p>
		</div>
	);
}
