import {useAppSelector} from '../hooks/reduxHooks';
import {FC, PropsWithChildren, useEffect} from 'react';
import {useHistory} from 'react-router';
import {getAccessToken} from '../utils/getToken';

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const isAuth = useAppSelector(state => state.auth.isLoggedIn);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const token = await getAccessToken()

      if (!isAuth && !token) {
        history.push('/login');
        return;
      }
      history.push('/home');
    })();
  }, [isAuth]);

  return children;
}
