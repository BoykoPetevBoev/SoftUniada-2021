import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import UserContext from '../../react/Context';
import Wrapper from '../../components/wrapper';
import FriendsMenu from '../../components/menu-friends';
import UserBadge from '../../components/user-badge';
import { useHistory } from 'react-router-dom';
import { sendFriendRequest, removeFriendRequest } from '../../utils/requester';

function FriendRequestsPage() {
    const history = useHistory();
    const context = useContext(UserContext);
    const [user, setUser] = useState(context.user);


    const removeUser = async (e) => {
        const id = e.target.value;
        const response = await removeFriendRequest({ user, id });
        if (!response) return;

        setUser(response);
        context.updateUser(response);
        history.push('/friends/requests');
    }

    const RenderUsers = (props) => {
        const users = props.users
        const buttons = props.buttons
        if (!users || users.length === 0) return <p>There is no request in this section</p>;
        return (
            users.map((user) => {
                return (<UserBadge user={user} {...buttons} key={user._id}/>)
            })
        )
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <FriendsMenu />
                <div className={styles.holder}>
                    <h3>Friend Requests</h3>
                    <div>
                        <p>Your sent requests</p>
                        <div className={styles.requests}>
                            <RenderUsers users={user.sentRequests} buttons={{ delete: removeUser }} />
                        </div>
                        <p>Your received requests</p>
                        <div className={styles.requests}>
                            <RenderUsers users={user.receivedRequests} buttons={{ confirm: true, delete: removeUser }} />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default FriendRequestsPage;