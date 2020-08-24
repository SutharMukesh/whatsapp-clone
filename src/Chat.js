import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
	const [input, setinput] = useState("");
	const [seed, setSeed] = useState("");
	const [messages, setmessages] = useState([]);
	const { roomId } = useParams();
	const [roomName, setroomName] = useState("");

	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snap) => {
					setroomName(snap.data().name);
				});

			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snap) => {
					setmessages(snap.docs.map((doc) => doc.data()));
				});
		}
	}, [roomId]);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setinput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			<div className="chat__body">
				{messages.map((msg) => (
					<p className={`chat__message ${msg.name === user.displayName && "chat__reciever"}`}>
						<span className="chat__name">{msg.name}</span>
						{msg.message}
						<span className="chat__timestamp">{new Date(msg.timestamp?.toDate()).toUTCString()}</span>
					</p>
				))}
			</div>

			<div className="chat__footer">
				<IconButton>
					<InsertEmoticon />
				</IconButton>
				<form>
					<input value={input} onChange={(e) => setinput(e.target.value)} placeholder="Type a message" type="text" />
					<button onClick={sendMessage} type="submit">
						Send a message
					</button>
				</form>
				<IconButton>
					<Mic />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
