import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import styles from "./chatbot.module.css";

const initialMessages = [
	{ sender: "bot", text: "Olá! Sou o assistente do portfólio. Como posso ajudar?" },
];

const options = [
	{ label: "Sobre", route: "/about" },
	{ label: "Formações", route: "/education" },
    { label: "Depoimentos", route: "/testimonials" },
    { label: "Experiências", route: "/experiences" },
    { label: "Habilidades", route: "/skills" },
	{ label: "Portfolio", route: "/portfolio" },
	{ label: "Contato", route: "/contact" },
];

const ChatBot: React.FC = () => {
	const [messages, setMessages] = useState(() => {
		const saved = localStorage.getItem("chatbot_history");
		return saved ? JSON.parse(saved) : initialMessages;
	});
	const [showOptions, setShowOptions] = useState(true);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleOptionClick = (option: typeof options[0]) => {
		setMessages((msgs: any) => {
			let updated = [...msgs, { sender: "user", text: option.label }];
			if (option.route) {
				updated = [...updated, { sender: "bot", text: `Navegando para ${option.label}...` }];
				localStorage.setItem("chatbot_history", JSON.stringify(updated));
				navigate(option.route);
			}
			return updated;
		});
		setShowOptions(false);
	};

    useEffect(() => {
		if (open) {
			const saved = localStorage.getItem("chatbot_history");
			if (saved) setMessages(JSON.parse(saved));
		}
	}, [open]);

	return (
		<>
			{!open && (
				<button
					className={styles.fab}
					onClick={() => setOpen(true)}
					aria-label="Abrir chat"
				>
					<FiMessageCircle size={32} />
				</button>
			)}
			{open && (
				<div className={styles.chatbotContainer}>
					<div className={styles.chatHeader}>
						Assistente do Portfólio
						<button
							className={styles.closeBtn}
							onClick={() => setOpen(false)}
							aria-label="Fechar chat"
						>
							<FiX size={22} />
						</button>
					</div>
					<div className={styles.chatBody}>
						{messages.map((msg: { sender: string; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, idx: React.Key | null | undefined) => (
							<div key={idx} className={msg.sender === "bot" ? styles.botMsg : styles.userMsg}>
								{msg.text}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
					{showOptions && (
						<div className={styles.options}>
							{options.map((opt) => (
								<button key={opt.label} className={styles.optionBtn} onClick={() => handleOptionClick(opt)}>
									{opt.label}
								</button>
							))}
						</div>
					)}
					{/* Campo de input removido, apenas opções disponíveis */}
				</div>
			)}
		</>
	);
};

export default ChatBot;
