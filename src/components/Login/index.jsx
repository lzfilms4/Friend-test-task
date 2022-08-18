import axios from "axios";

import {useState} from "react";
import PhoneInput from 'react-phone-input-2'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { useNavigate} from 'react-router-dom'

import {setUser } from "../../store/slices/userSlice";

import 'react-phone-input-2/lib/style.css'
import styles from "./Login.module.scss";
import character from "../../img/character_main.png";

const Login = () => {
    const [telephone, setTelephone] = useState("+7 000 000 00 00");
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {isAuth, id} = useAuth()
    const handleLogin = async (phone, password) => {
        await axios.post('v1/auth/login', {
            "phone": phone,
            "password": password,
        }).then(({data}) => {
            dispatch(setUser({
                phone: phone,
                id: data.id
            }))
            navigate('/')
        })
            .catch(console.error)
    }
    const placeholder = '+7 000 000 00 00';
    // console.log(telephone, password)
    return (
        <div className={styles.main}>
            <img src={character} alt='character'/>
            <div className={styles.form}>
                <h1>Вход</h1>
                <h2>Продолжим работу с психологом? <br/>
                    Введи свой номер телефона и пароль</h2>
                <div className={[styles.input, styles.telephone].join(' ')}>
                    <PhoneInput
                        placeholder={placeholder}
                        containerClass={styles.dropdown}
                        buttonClass={styles.drop}
                        country={'ru'}
                        value={telephone}
                        onChange={phone => setTelephone(phone)}
                        onClick={() => setTelephone('+7 ')}
                    />
                </div>
                <div className={styles.input}>
                    <input
                        className={styles.pass}
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Пароль'/>
                </div>
                <div className={[styles.input, styles.sub].join(' ')}>
                    <div className={styles.nextPage} onClick={() => handleLogin('+' + telephone, password)}>
                        Перейти в профиль
                    </div>
                </div>
                <div className={styles.login}>Впервые у нас? Сначала <Link className={styles.link} to='/register'> зарегистрируйся</Link> </div>
            </div>
        </div>
    )
}

export default Login
