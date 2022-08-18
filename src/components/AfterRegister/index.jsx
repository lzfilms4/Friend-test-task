import styles from "./AfterRegister.module.scss";
import {useAuth } from '../../hooks/use-auth'
import { useNavigate} from 'react-router-dom'

// import {useDispatch} from "react-redux";
import {useEffect} from "react";



const AfterRegister = () => {
    const navigate = useNavigate()

    // const dispatch = useDispatch()
    const {isAuth, id} = useAuth()

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])


    return (
        <div className={styles.container}>
            <h1> Присвоен Идентификатор {id}</h1>
            <div className={[styles.input, styles.sub].join(' ')}>
                <div class={styles.nextPage} onClick={() => {
                    navigate('/profile')
                }}>
                    Перейти в профиль
                </div>
            </div>

        </div>
    )
}

export default AfterRegister
