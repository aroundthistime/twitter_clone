import { useState } from "react"
import { authService, firebaseInstance } from "../fbase";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const [username, setUsername] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const onChange = (event) => {
        const {
            target : {name, value}
        } = event;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
        // else{
        //     setUsername(value);
        // }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if (newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch(error){
            setErrorMessage(error.message);
        }
    }
    const onSocialClick = async(event) => {
        const {
            target : {name}
        } = event;
        let provider;
        if (name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                {/* {newAccount && (
                    <input 
                        name="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                )} */}
                <input
                    type="submit"
                    value={newAccount ? "Create Account" :"LOG IN"}
                />
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p onClick={()=>setNewAccount(!newAccount)}>{newAccount ? "Already have an account?" : "Don't have an account?"}</p>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
        </div>
    )
}