import { useState, useEffect, useRef } from "react";
import palmLogo from "../assets/palm_logo.png";
import userAvatar from "../assets/carlosazaustre_avatar.jpeg";
import {
	query,
	addDoc,
	collection,
	serverTimestamp,
	orderBy,
	onSnapshot,
	limit,
} from "firebase/firestore";
import { db } from "../firebase";

export function ChatWindow() {
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");
	const messagesEndRef = useRef(null);

	useEffect(() => {
		const q = query(
			collection(db, "discussions"),
			orderBy("createTime", "desc"),
			limit(50)
		);

		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const fetchedMessages = [];
			QuerySnapshot.forEach((doc) => {
				fetchedMessages.push({ ...doc.data(), id: doc.id });
			});
			const sortedMessages = fetchedMessages.sort(
				(a, b) => a.createdAt - b.createdAt
			);
			setMessages(sortedMessages);
		});

		return () => unsubscribe;
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendPrompt = async (event) => {
		event.preventDefault();

		if (inputText.trim() === "") return;

		await addDoc(collection(db, "discussions"), {
			prompt: inputText,
			createTime: serverTimestamp(),
		});
		setInputText("");
	};

	return (
		<div className="flex h-screen w-full">
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

			<main className="flex flex-col flex-grow w-5/6">
				<div className="flex-grow overflow-y-auto p-4 space-y-4">
					{messages
						.map((message) => (
							<>
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
										<p>{message.prompt}</p>
									</div>
								</div>

								<div className="flex space-x-2 border rounded-xl m-2 mr-36 p-4 bg-blue-300">
									<p className="font-bold">PaLM-BOT</p>
									<p>{message.response ? message.response : "Pensando..."}</p>
								</div>
							</>
						))
						.reverse()}
					<div ref={messagesEndRef} />
				</div>
				<div className="flex items-center p-4 border-t">
					<input
						className="flex-grow px-4 py-2 rounded-lg border text-gray-800"
						placeholder="Escribe tu mensaje..."
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						type="text"
					/>
					<button
						className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white"
						onClick={handleSendPrompt}
					>
						Enviar
					</button>
				</div>
			</main>
		</div>
	);
}
