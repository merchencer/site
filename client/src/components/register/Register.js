import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react"

const Register = () => {
    const [values, setValues] = useState({username: '', password: ''})
    const [username, setUsername] = useState("")
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

  

    const handleSubmit = e => {
        e.preventDefault()

        const domain = "localhost:9000"

        const getAccessToken = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: `http://${domain}`,
                scope: "read:user",
            });
            fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(res => setUsername(res.username))
        }
        getAccessToken()
    }
    
    return (
        <div>
            <p>Register page</p>
            <p>Already have an account? <a href="/login">Login</a></p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleInputChange} value={values.name} />
                <input type="password" name="password" onChange={handleInputChange} value={values.password} />
                <button type="submit">Register</button>
            </form>
            <p>username: {username}</p>
        </div>
    )
}

export default Register 