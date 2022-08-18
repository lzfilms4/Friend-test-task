import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";
import Login from "./Login";

import {useAuth } from '../hooks/use-auth'
import {removeUser} from '../store/slices/userSlice'

const HomePage = () => {
    const dispatch = useDispatch()
    const {isAuth, id} = useAuth()
    return isAuth ? (
        <>
            <Navigate to='/profile'/>
        </>

    ) : (
        <Navigate to='/login' />
    )
}
export default HomePage
