import { auth , provider } from "../config/firebase"
import {signInWithPopup, GithubAuthProvider, getAuth} from "firebase/auth"
import {useNavigate} from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate("/")
    }


//     const result = await signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = GithubAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // ...
//     }).catch((error) => {
//         const errorMessage = error.message;
//         console.log(errorMessage)
//   });

//         navigate("/")


// }

    return (
        <>
            <div>
                <h1>Login Page</h1>
                <p>Sign in with Google</p>
                {/* <button onClick={signInWithGoogle}> Sign in with Google </button> */}
                <button onClick={signInWithGoogle}> Sign in with Google </button>
            </div>
        </>
    )
}