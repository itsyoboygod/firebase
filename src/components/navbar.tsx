import {Link} from "react-router-dom"
import { auth  } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from "firebase/auth"
import "./style.css"

export const Navbar = () => {
    const [user] = useAuthState(auth)

    const signUserOut = async () => {
        await signOut(auth)
    }


    return (
        <>
            <div className="Navbar">
                <div className="nav-links">
                    <p><Link to="/">Home</Link></p>
                    {!user ? (
                               <p><Link to="/login">Login</Link></p>
                             ) : (
                               <p><Link to="/createpost">Create Post</Link></p>
                             )}
                </div>
                <div className="conf-links">
                    {user && (
                        <>    
                            <img src={auth.currentUser?.photoURL || ""} alt="Guser" />
                            <p>{auth.currentUser?.displayName}</p>
                            <button onClick={signUserOut}>Logout</button>
                        </>
                    )
                    }
                </div>
            </div>
        </>
    )
}