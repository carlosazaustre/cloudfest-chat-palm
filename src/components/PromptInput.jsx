import { useState } from "react";

export function PromptInput({ sendPrompt }) {
	const [inputText, setInputText] = useState("");

	const handleOnClick = () => {
		sendPrompt(inputText);
		setInputText("");
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			sendPrompt(inputText);
			setInputText("");
		}
	};

	return (
		<div className="flex items-center p-4 border-t">
			<input
				className="flex-grow px-4 py-2 rounded-lg border text-gray-800"
				placeholder="Escribe tu mensaje..."
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyUp={handleKeyPress}
				type="text"
				o
			/>
			<button
				className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white"
				onClick={handleOnClick}
			>
				Enviar
			</button>
		</div>
	);
}
