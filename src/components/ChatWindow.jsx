import { useState, useEffect, useRef } from "react";
import {
	query,
	addDoc,
	collection,
	serverTimestamp,
	orderBy,
	onSnapshot,
	limit,
} from "firebase/firestore";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";
import { PromptInput } from "./PromptInput";
import { db } from "../firebase";

export function ChatWindow() {
	const [messages, setMessages] = useState([]);
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

	const handleSendPrompt = async (inputText) => {
		if (inputText.trim() === "") return;

		await addDoc(collection(db, "discussions"), {
			prompt: inputText,
			createTime: serverTimestamp(),
		});
	};

	return (
		<main className="flex flex-col flex-grow w-5/6">
			<div className="flex-grow overflow-y-auto p-4 space-y-4">
				{messages
					.map((message) => (
						<>
							<UserMessage message={message} />
							<BotMessage message={message} />
						</>
					))
					.reverse()}
				<div ref={messagesEndRef} />
			</div>

			<PromptInput sendPrompt={handleSendPrompt} />
		</main>
	);
}
