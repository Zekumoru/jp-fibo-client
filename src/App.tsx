import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login-form/LoginForm';
import Home from './components/Home';
import { LoggedInProvider } from './contexts/LoggedInContext';

const App = () => {
  return (
    <BrowserRouter>
      <LoggedInProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </LoggedInProvider>
    </BrowserRouter>
  );
};

export default App;
