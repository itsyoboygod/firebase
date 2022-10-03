import { Post as IPost } from "./Home"
import { auth  } from "../../config/firebase"
import {db} from '../../config/firebase'

import './userpost.css'
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"


interface Props {
    post: IPost
}


interface Like {
    likeId: string
    userId: string
}

export const Post = (props: Props) => {

    const {post} = props
    const[user] = useAuthState(auth)

    const[likes, setLikes] = useState<Like[] | null>(null)

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const data  = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})))
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id})
            if (user){
                setLikes((prev) => 
                prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] :
                 [{ userId: user.uid, likeId: newDoc.id}]
                );
            }
        } catch (err){
            console.log(err)
        }
    }


    const removeLike = async () => {
        try {
            const liketoDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            )

            const liketoDeleteData = await getDocs(liketoDeleteQuery)
            const likeId = liketoDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete)
            if(user){
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
            }  
        } catch(err){
            console.log(err)
        }
    }


    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(()=>{
        getLikes()
    }, [])





    return (
        <div className="UserPost">
            <div className="post-header">
                <div className="post-user-pic">
                    <div className="online-stats">
                        {/* <img  src={auth.currentUser?.photoURL || ""} alt="Guser" /> */}
                        {/* <span data-count=""></span> */}
                    </div>
                </div>
                <div className="post-user-info">
                    <div className="user-title">
                        <div className="footer">
                            <p>@{post.username}</p>
                        </div>
                        <div className="title">
                            <p>{post.title}</p>
                        </div>
                    </div>
                </div>
                <div className="user-options">
                        <div>
                            <span>…</span>
                        </div>
                        <div className="like-btn">
                            <button onClick={hasUserLiked ? removeLike : addLike }>{hasUserLiked ?
                             <span style={{color:"red", margin: "0",padding: "0", lineHeight: "25px", height: "30px", fontSize:"2rem"}}>
                                ♥</span> :
                             <span style={{color:"", margin: "0",padding: "0", lineHeight: "25px", height: "30px", fontSize:"1.5rem"}}>
                                ♡</span>}</button>
                            {likes && <p style={{padding:"1px", margin:"1px"}}>{likes?.length}</p>}
                        </div>
                    </div>
            </div>

            <div className="body">
                <p>{post.description}</p>
            </div>

        </div>)
}