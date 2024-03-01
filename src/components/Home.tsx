import { Link } from 'react-router-dom';
import { useLoggedIn } from '../contexts/LoggedInContext';

const Home = () => {
  const user = useLoggedIn();

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ marginBottom: '16px', fontSize: '1.6rem' }}>
        Welcome{user && `, ${user.username}`}!
      </h1>
      {!user && <Link to="/login">Login</Link>}
    </div>
  );
};

export default Home;
