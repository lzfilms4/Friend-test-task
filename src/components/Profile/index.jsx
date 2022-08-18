import styles from "../Profile/Profile.module.scss";
import {removeUser, setUser} from "../../store/slices/userSlice";
import {useAuth } from '../../hooks/use-auth'
import { useNavigate} from 'react-router-dom'

import {useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import axios from "axios";



const Profile = () => {
    const [info, setInfo] = useState({});
    let updatedValue = {};
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {isAuth, id} = useAuth()

    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [tg, setTg] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (isAuth) {
            axios.get('v1/user?id=' + id, {})
                .then(({data}) => {
                    setPhone(data.phone) // Need to make with Object.keys(data).forEach()
                    setName(data.name)
                    setBirth(data.birth)
                    setTg(data.tg)
                    setEmail(data.email)

                }).catch(console.error)
        } else {
            navigate('/')

        }
    }, [id, isAuth, navigate])


    return (
        <>
            <div className={styles.back} onClick={() => dispatch(removeUser())}>Главная / Профиль </div>
            <div className={styles.container}>
                <h1> Профиль</h1>
                <h3> Имя или псевдоним *</h3>
                <h2> {name}</h2>

                <h3> Дата рождения *</h3>
                <h2> {birth}</h2>

                <h3> E-mail</h3>
                <h2> {email}</h2>

                <h3> Ник в Телеграм</h3>
                <h2> {tg}</h2>

            </div>
        </>
    )
}

export default Profile
