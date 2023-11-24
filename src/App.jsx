import { ChatWindow } from "./components/ChatWindow";
import { Aside } from "./components/Aside";

function App() {
	return (
		<div className="flex h-screen w-full">
			<Aside />
			<ChatWindow />;
		</div>
	);
}

export default App;
