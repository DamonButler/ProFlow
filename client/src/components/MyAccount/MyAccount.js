import { useContext } from 'react';
import { UserContext } from '../../User';

function MyAccount() {
  const { user } = useContext(UserContext);

  return (
    <div className="my-account-container">
      <div className="my-account-image-container">
        <img src={user?.image} alt='Profile Pic'/>
      </div>
      <div className="my-account-info-container">
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

export default MyAccount;