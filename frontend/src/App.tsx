import React, { useState, useContext } from 'react';
import axios from 'axios';

import Home from './components/Home';
import { UserContext } from "./context/UserContext";
import Loader from "./components/Loader";
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useCallback } from 'react';

function App() {

  const [formToDisplay, setFormToDisplay] = useState<string>('register');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { token, updateToken } = useContext(UserContext)

  const verifyUser: any = useCallback(() => {
    fetch("http://localhost:4000/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json"},
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        updateToken(data.token)
      } else {
        updateToken('null')
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(() => verifyUser, 5 * 60 * 1000)
    })
  }, [updateToken]);

  useEffect(() => {
    verifyUser()
  }, [verifyUser])


  const logoutHandler = () => {
    fetch("http://localhost:4000/users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      updateToken('null')
    })
    window.localStorage.setItem("logout", String(Date.now()))
  }



const registerClicked = async () => {
  const genericErrorMessage = "Something went wrong! Please try again later."
  fetch("http://localhost:4000/users/signup", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName: 'chris', lastName: 'dog', username: userName, password: password }),
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 400) {
          alert("Please fill all the fields correctly!")
        } else if (response.status === 401) {
          alert("Invalid email and password combination.")
        } else if (response.status === 500) {
          console.log(response)
          const data = await response.json()
          if (data.message) alert(data.message || genericErrorMessage)
        } else {
          alert(genericErrorMessage)
        }
      } else {
        const data = await response.json()
        updateToken(data.token)
      }
    })
    .catch(error => {
      alert(genericErrorMessage)
    })
}


const loginClicked = async () => {
  try {
    const genericErrorMessage = "Something went wrong! Please try again later."
    fetch("http://localhost:4000/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, password: password }),
    })
      .then(async response => {
        if (!response.ok) {
          if (response.status === 400) {
            alert("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            alert("Invalid email and password combination.")
          } else {
            alert(genericErrorMessage)
          }
        } else {
          const data = await response.json()
          updateToken(data.token)
        }
      })
      .catch(error => {
        alert(genericErrorMessage)
      })


  } catch (error) {
    console.error(error.response);
  }
}

return (
  <div className="App">
    <p>Exchange Name</p>
    {token === 'null' ?
      (
        <div className='formSelect'>
          <input type='button' value={'Login'} onClick={() => setFormToDisplay('login')} />
          <input type='button' value={'Register'} onClick={() => setFormToDisplay('register')} />
          {/* Need to separate into components for private state later but right now they are the same fields*/}
          {formToDisplay === 'register' ?
            (
              <div className='register'>
                <p>Register</p>

                <p>Username</p><input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
                <p>Password</p><input type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="button" value='Register' onClick={registerClicked} />
              </div>
            )
            :
            (
              <div className='login'>
                <p>Login</p>

                <p>Username</p><input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
                <p>Password</p><input type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="button" value='Login' onClick={loginClicked} />
              </div>
            )
          }

        </div>
      )
      : token !== '' ? (
        <>
          <input type='button' value='Logout' onClick={() => (logoutHandler())} />
          <Home />
        </>
      ) : (
        <Loader />
      )
    }
  </div>
);
}

export default App;

