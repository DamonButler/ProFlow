import { useContext } from 'react';
import { UserContext } from '../../User';

function MyAccount() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user?.username}</h2>
      <p>{user?.email}</p>
      <img src={user?.image} alt='Profile Pic'/>
    </div>
  );
}

export default MyAccount;

