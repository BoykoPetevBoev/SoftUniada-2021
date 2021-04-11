import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../react/Context';
import styles from './index.module.css';
import { socket } from '../../socket';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper';
import UserList from '../../components/user-list';
import ChatMessages from '../../components/chat-messages';
import { getChat } from '../../requester';


function ChatPage(props) {
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchData = async (id) => {
        if(!id || id == undefined) {
            return undefined;
        }
        console.log(id);

        const room = await getChat(id);
        const members = room.members.filter(u => u._id !== user._id);
        setUsers(members);
        setChat(room);
        setMessages([...room.messages]);
    }

    useEffect(() => {
        const chatId = props.match.params.id;
        fetchData(chatId);
        setUser(context.user);
        
        socket.on('message', async (updatedRoom) => {
            setChat(updatedRoom);
            setMessages([...updatedRoom.messages]);
        });
    }, [props.match.params.id, context.user]);
    
    const messageHandler = (message) => {
        const msgTemplate = {
            chat: chat,
            message: {
                sender: user,
                content: message.trim(),
                time: new Date().toLocaleString()
            }
        }
        socket.emit('chat-message', msgTemplate)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        messageHandler(message);
        setMessage('');
    }


    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>

                <div className={styles.container}>
                    <div className={styles['chat-header']}>
                        {users.map((member, index) => {
                            return (
                                <UserList user={member} key={index} />
                            )
                        })}
                        <p>{chat.name}</p>
                        <p>{chat?._id}</p>
                    </div>

                    <ChatMessages messages={messages} users={[user, ...users]}/>

                    <form className={styles.form} onSubmit={onSubmit}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Aa..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            value="Send"
                            className={styles['send-button']}
                        >
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </form>

                </div>

            </Wrapper>
        </div>
    );
}

export default ChatPage;