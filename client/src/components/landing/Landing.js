import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react"

function Landing() {
    const { isAuthenticated, loginWithRedirect, logoutWithRedirect  } = useAuth0()

    // const [response, setResponse] = useState("")
    // const [name, setName] = useState("")
  
    // const callAPI = () => {
    //   fetch("/api")
    //     .then(res => res.text())
    //     .then(res => setResponse(res))
    // }
    // useEffect(() => {
    //   callAPI()
    // }, [])
  
    // const handleSubmit = event => {
    //   event.preventDefault()
    //   fetch("/api", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': "application/json"
    //     },
    //     body: JSON.stringify({name: name})
    //   })
    //     .then(res => res.text())
    //     .then(res => setResponse(res))
    // }
  
    return (
      <div className="App">
        <h1>Landing</h1>
        {/* <p>{response}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
          <button type="submit">Submit</button>
        </form> */}
        {!isAuthenticated ? 
          (<button onClick={() => loginWithRedirect({})} type="button">
            Log in
          </button>) 
          : 
          (<button onClick={() => logoutWithRedirect({})} type="button">
            Log out
          </button>)
        }
        <a href="/login">Login</a><br></br>
        <a href="/register">Register</a>
        {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}

      </div>
    );
}

export default Landing 