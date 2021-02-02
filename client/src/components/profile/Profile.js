import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [userMetadata, setUserMetadata] = useState(null)
    const [response, setResponse] = useState("")
    const [values, setValues] = useState({username: ''})



    const handleInputChange = e => {
      const {name, value} = e.target
      setValues({...values, [name]: value})
    }

    const updateUser = e => {
      e.preventDefault()

      const domain = "localhost:9000"

      const getAccessToken = async () => {
        const accessToken = await getAccessTokenSilently({
            audience: `http://${domain}`
        });
        fetch('/api/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({username: values.username})
        })
            .then(res => res.text())
            .then(res => setResponse(res))
            .catch(err => {
              console.log(err)
              setResponse(err)
            })
      }
      getAccessToken()
    }

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "localhost:9000"

            try {
                const accessToken = await getAccessTokenSilently({
                  audience: `http://${domain}`,
                  scope: "read:user",
                });
                console.log(accessToken)
                console.log(user)
          
                const metadataResponse = await fetch("/api/user", {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                });
          
                const data = await metadataResponse.json();
          
                setUserMetadata(data._id);
              } catch (e) {
                console.log(e.message);
              }
        }

        getUserMetadata()
    }, [])

    console.log(user)

    return (
        isAuthenticated && (
            <div>
                <p>Yes</p>
                <form onSubmit={updateUser}>
                  <input type="text" name="username" value={values.username} onChange={handleInputChange} />
                  <button type="submit">Submit</button>
                </form>
            </div>
        )
        
    )
}

export default Profile