import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api';

interface User {
    id: number;
    login: string;
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.login}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;