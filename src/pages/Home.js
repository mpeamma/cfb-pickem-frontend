import logo from '../assets/logo.svg';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import CreateGroupModal from '../components/CreateGroupModal';
import AuthContext from '../context/AuthContext';

function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  const { setUser } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            localStorage.setItem("credentials", JSON.stringify(credentialResponse));
            setUser(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <Button onClick={() => setModalOpen(true)}>Create Group</Button>
        <CreateGroupModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      </header>
    </div>
  );
}

export default Home;
