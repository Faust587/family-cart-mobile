import {useAppSelector} from './reduxHooks';
import {useHistory} from 'react-router';
import {useEffect} from 'react';

export const useAuth = () => {
  const isAuth = useAppSelector(state => state.auth.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    console.log('isAuth', isAuth)
    if (isAuth) {
      try {

      history.push('/home');
      } catch (error) {
        alert("error");
      }
    }
  }, [isAuth, history]);
}


