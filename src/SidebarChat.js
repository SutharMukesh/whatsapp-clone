import React, { useEffect, useState, useParams } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
	const [seed, setSeed] = useState("");
	const [messages, setmessages] = useState([]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snap) => {
					setmessages(snap.docs.map((doc) => doc.data()));
				});
		}
	}, [id]);

	const createChat = () => {
		const roomName = prompt(`Please enter name for chat`);

		if (roomName) {
			db.collection("rooms").add({
				name: roomName,
			});
		}
	};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="sidebarChat">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="sidebarChat__info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
		</div>
	);
}

export default SidebarChat;