import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';

import Header from '../../components/header';
import Input from '../../components/user-input';
import SubmitButton from '../../components/user-submit-button';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';
import { sendFriendRequest, findUsers } from '../../utils/requester';

function AddFriendsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(context.user);


    const addUser = async (e) => {
        const id = e.target.value;
        const response = await sendFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/requests');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!username) return;
        sendRequest(username);
    }

    const sendRequest = async (username) => {
        const response = await findUsers(username);
        setUsers(response);
    }

    const renderUsers = () => {
        if (users.length === 0) return <p>Find Friends</p>;

        return (
            users.map((user, index) => {
                if (
                    context?.user?._id === user._id ||
                    context?.user?.sentRequests?.includes(user._id) ||
                    context?.user?.receivedRequests?.includes(user._id) ||
                    context?.user?.sentRequests?.some(u => u._id === user._id) ||
                    context?.user?.receivedRequests?.some(u => u._id === user._id)
                ) return null;
                return (<UserBadge user={user} addUser={addUser} key={user._id}/>)
            })
        )
    }

    return (
        <div className={styles["container"]}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <h3>Add Friend</h3>

                <div className={styles['form-holder']}>
                    <form onSubmit={onSubmit}>
                        <Input
                            name="username"
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <SubmitButton value='Search' />
                    </form>
                </div>

                <div className={styles['result-holder']}>
                    {renderUsers()}
                </div>

            </Wrapper>
        </div>
    );
}

export default AddFriendsPage;