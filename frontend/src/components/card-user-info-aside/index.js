import React from 'react';
import styles from './index.module.css';
import UserLogo from '../user-avatar';
import UserCardInfo from '../card-user-info';

function UserCardCompact({ user }) {
    if (!user) return null
    return (
        <div className={styles.container} >

            <div className={styles['img-holder']} style={user.image ? { backgroundImage: `url(${user?.image})` } : null}>
                <h3>{user.username}</h3>
            </div>
            
            <div className={styles['info-holder']}>
                <UserCardInfo data={user} />
            </div>
        </div>
    )
}

export default UserCardCompact;