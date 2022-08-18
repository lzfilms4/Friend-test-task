import {useSelector} from 'react-redux';

export function useAuth() {
    const {phone, id} = useSelector(state => state.user);

    return {
        isAuth: !!phone,
        phone,
        id,
    };
}
