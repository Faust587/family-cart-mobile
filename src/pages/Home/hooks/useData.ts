import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {getCarts} from '../../../store/cart/cartThunk';

export const useData = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.cart.isLoading);
  const list = useAppSelector(state => state.cart.list);
  const error = useAppSelector(state => state.cart.error)

  useEffect(() => {
    dispatch(getCarts());
  }, []);

  return {
    isLoading,
    list,
    error
  }
}
