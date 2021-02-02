import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react"

const Login = () => {
    const [values, setValues] = useState({username: '', password: ''})
    const [username, setUsername] = useState("")
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()


    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            console.log("hgere")
            const accessToken = await getAccessTokenSilently({
                audience: 'http://localhost:9000',
                scope: "read:user",
            })
            console.log(accessToken)
            fetch('/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(res => setUsername(res.username))

        } catch(e) {
            console.log(e.message)
        }        
    }
    
    return (
        <div>
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleInputChange} value={values.name} />
                <input type="password" name="password" onChange={handleInputChange} value={values.password} />
                <button type="submit">Login</button>
            </form>
            <p>Username: {username}</p>
        </div>
    )
}

export default Login