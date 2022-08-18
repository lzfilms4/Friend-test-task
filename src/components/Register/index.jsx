import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import {setUser } from "../../store/slices/userSlice";
import DateTimePicker from 'react-datetime-picker';

import axios from "axios";

import styles from "./Register.module.scss";
import character from "../../img/character_main.png";
import PhoneInput from "react-phone-input-2";

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [maxLength, setMaxLength] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'maxLength':
                    value.length < validations[validation] ? setMaxLength(false) : setMaxLength(true)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    // eslint-disable-next-line
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
                default:

            }
        }
    }, [value, validations]);

    useEffect(() => {
        if (isEmpty || maxLength || emailError){
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLength, emailError, inputValid]);


    return {
        maxLength,
        isEmpty,
        setEmailError,
        setInputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const Register = () => {
    const [hasTelephone, setHasTelephone] = useState(false);
    const [telephone, setTelephone] = useState('+7 000 000 00 00');
    const placeholder = '+7 000 000 00 00';

    const password= useInput('', {isEmpty: true}); // TODO: Make with one useInput with Object
    const passwordRepeat = useInput('', {isEmpty: true});
    const name = useInput('', {isEmpty: true, maxLength: 20});
    const email = useInput('', {isEmail: true});
    const telegram = useInput('');

    const [date, setDate] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = async (phone, password, name, date, email, telegram) => {
        const data = {
            "phone":phone,
            "password":password,
            "name":name,
            "birth":date,
            "tg":telegram,
            "email":email
        }
        await axios.post('v1/auth/register', data).then(({data}) => {
            dispatch(setUser({
                phone: phone,
                id: data.id
            }))
            navigate('/afterreg')
        }).catch(e => alert(e.response.data['Текст']))
    }
    return !hasTelephone ? (
        <div className={styles.main}>
            <img src={character} alt='character'/>
            <div className={styles.form}>
                <h1>Регистрация</h1>
                <h2>Давай начнем подбор психолога.<br/>
                    Введи свой номер телефона</h2>
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
                <div className={[styles.input, styles.sub].join(' ')} onClick={() => {
                    setHasTelephone(true)
                }}>
                    <div className={styles.submitText}>Регистрация</div>
                </div>
                <div className={styles.login}>Уже есть личный кабинет? <Link className={styles.link} to='/login'> Войти</Link> </div>
            </div>
        </div>
        ) :(
        <div className={styles.container}>
            <h1> Укажи личные данные</h1>
            <h2> Придумай пароль </h2>
            <h3> Пароль <b>*</b></h3>
            <div className={styles.input}>
                <input
                    className={styles.pass}
                    value={password.value}
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                    type='password'
                    placeholder=''/>
            </div>
            <p>Пароль должен состоять из 8ми символов и включать заглавную букву, специальный символ и цифру</p>

            <h3> Повтори пароль <b>*</b></h3>
            <div className={styles.input}>
                <input
                    className={styles.pass}
                    value={passwordRepeat.value}
                    onChange={e => passwordRepeat.onChange(e)}
                    onBlur={e => passwordRepeat.onBlur(e)}
                    type='password'
                    placeholder=''/>
            </div>

            <h2> Расскажи о себе </h2>
            <h3> Имя и псевдоним <b>*</b></h3>
            <div className={styles.input}>
                <input
                    className={styles.pass}
                    value={name.value}
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    type='text'
                    placeholder=''/>
            </div>
            {(name.isDirty && name.isEmpty) && <div>Слишком много символов</div>}
            <p>Будет доступен только твоему психологу и личному помощнику</p>

            <h3> Дата рождения<b>*</b></h3>
            <div className={styles.input}>
                {/*<input className={styles.pass} type='text' placeholder=''/>*/}
                <DateTimePicker
                    className={styles.calendar}
                    onChange={setDate}
                    value={date}
                    disableClock={true}
                    format={'d.M.y'}
                />
                <p>Для получения услуг тебе должно быть 16 или больше лет</p>

                <h2> Укажи по желанию </h2>
                <h3> E-mail </h3>
                <div className={styles.input}>
                    <input
                        className={styles.pass}
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        type='text'
                        placeholder=''/>
                </div>
                <p>Присылаем только информацию, связанную с твоими сессиями</p>

                <h3> Ник в Телеграм </h3>
                <div className={styles.input}>
                    <input
                        className={styles.pass}
                        value={telegram.value}
                        onChange={e => telegram.onChange(e)}
                        onBlur={e => telegram.onBlur(e)}
                        type='text'
                        placeholder='@'/>
                </div>
                <p>Присылаем только информацию, связанную с твоими сессиями</p>

                <div className={[styles.input, styles.sub].join(' ')}>
                    <input
                        type='submit'
                        // disabled={!email.inputValid || !password.inputValid}
                        onClick={() => {
                            handleRegister('+' + telephone, password.value, name.value, createDate(date), email.value, telegram.value)
                        }}
                        placeholder='submit'/>
                </div>


            </div>
        </div>
    )
}

function createDate(date){
    let newDate = date.getFullYear() + '-'
    if ((date.getMonth()+1)/10 < 1){
        newDate += '0' + (date.getMonth()+1)
    } else{
        newDate += date.getDate()+1
    }
    newDate += '-'
    if (date.getDate()/10 < 1){
        newDate += '0' + (date.getDate())
    } else{
        newDate += date.getDate()
    }
    return newDate
}

export default Register
