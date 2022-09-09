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
                    <i className="fa fa-home w3-xxxlarge"></i>
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
                            <div className="online-stats">
                                <img  src={auth.currentUser?.photoURL || ""} alt="Guser" />
                                <span data-count=""></span>
                            </div>
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