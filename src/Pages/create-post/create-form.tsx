import {useForm} from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import './style.css'


    interface CreateFormData{
        title:   string,
        description: string
    }


export const CreateForm = () => {
    const [user] = useAuthState(auth)

        const schema = yup.object().shape({
            title: yup.string().required("You must add a title !!"),
            description: yup.string().required("You must add a description !!"),

        });


        const { register, handleSubmit, formState: {errors} }  = useForm<CreateFormData>({
            resolver: yupResolver(schema)
        })

        const postRef = collection(db, "posts")

        const onCretaePost = async (data: CreateFormData) => {
            await addDoc(postRef, {
                ...data,
                username: user?.displayName,
                userId  : user?.uid,
            })
        }

    return (
        <form onSubmit={handleSubmit(onCretaePost)}>
            <p>POST </p>
            <input placeholder='title..' {...register("title")}/>
            <p className={`noerror ${errors ? 'msngerror' : 'noerror'}`}>{errors.title?.message}</p>
            <textarea placeholder='description..' {...register("description")}/>
            <p className={`noerror ${errors ? 'msngerror' : 'noerror'}`}>{errors.description?.message}</p>
            <input type="password" placeholder='password..' {...register("title")}/>
            <input type="submit"/>
        </form>
        )
}