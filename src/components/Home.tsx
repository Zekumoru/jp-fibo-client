import { Link } from 'react-router-dom';
import { useLoggedIn } from '../contexts/LoggedInContext';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const [logout] = useLogout();
  const user = useLoggedIn();

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '1.6rem' }}>
        Welcome{user && `, ${user.username}`}!
      </h1>
      {!user && <Link to="/login">Login</Link>}
      {user && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};

export default Home;
