import logo from './logo.svg';
import './App.css';

const clientId = ``
const redirectUri = 'http://localhost:3000/oauth'



function App() {

  const handleOnclick = () => {
    const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`

    const queryParams = new URLSearchParams()
    queryParams.append('client_id', clientId)
    queryParams.append('redirect_uri', redirectUri)
    queryParams.append('response_type', 'token')
    // queryParams.append('include_granted_scopes', 'true')
    queryParams.append('scope', 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')


    window.location.href = `${baseUrl}?${queryParams.toString()}`
  }

  return (
    <div className="App">
      

      <button onClick={handleOnclick}>Google Auth</button>
    </div>
  );
}

export default App;
