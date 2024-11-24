import {createSelector} from '@reduxjs/toolkit';
import {CartEntity} from '../../entities/CartEntity';

export const selectCartById = createSelector([(state) => state.cart.list],
  (carts: CartEntity[]) => (id: number) => {
    return carts.find((cart) => cart.id === id);
  });
