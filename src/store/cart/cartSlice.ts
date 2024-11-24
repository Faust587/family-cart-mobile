import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartEntity} from '../../entities/CartEntity';
import {createCart, deleteCart, editCart, getCarts} from './cartThunk';

export type TInitialState = {
  isLoading: boolean;
  list: CartEntity[];
  error: any;
}

const initialState: TInitialState = {
  isLoading: false,
  list: [],
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItem: (state, action) => {
      const data = action.payload as {cartId: number, itemId: number, value: boolean};

      state.list = state.list.map(cart => {
        if (cart.id !== data.cartId) return cart;

        return {
          ...cart,
          items: cart.items.map(item => {
            if (item.id !== data.itemId) return item;
            return {...item, isDone: data.value}
          })
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(getCarts.pending, (state: TInitialState) => {
      state.isLoading = true
    });
    builder.addCase(getCarts.fulfilled, (state: TInitialState, action: PayloadAction<any>) => {
      state.list = action.payload;
    });
    builder.addCase(getCarts.rejected, (state: TInitialState, action: PayloadAction<any>) => {
      state.error = action.payload;
    });

    builder.addCase(deleteCart.pending, (state: TInitialState) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCart.fulfilled, (state: TInitialState, action: PayloadAction<any>) => {
      const {id} = action.payload;
      state.list = state.list.filter(cart => cart.id !== id);
    });
    builder.addCase(deleteCart.rejected, (state: TInitialState, action: PayloadAction<any>) => {
      state.error = action.payload;
    });

    builder.addCase(createCart.pending, (state: TInitialState) => {
      state.isLoading = true;
    });
    builder.addCase(createCart.fulfilled, (state: TInitialState, action: PayloadAction<any>) => {
      state.list = [...state.list, {...action.payload?.cart, isOwner: true, items: []}];
    });
    builder.addCase(createCart.rejected, (state: TInitialState, action: PayloadAction<any>) => {
      state.error = action.payload;
    });

    builder.addCase(editCart.pending, (state: TInitialState) => {
      state.isLoading = true;
    });
    builder.addCase(editCart.fulfilled, (state: TInitialState, action: PayloadAction<any>) => {
      state.list = state.list.map(cart => {
        if (action.payload.id !== cart.id) return cart;
        return {...cart, name: action.payload.name};
      })
    });
    builder.addCase(editCart.rejected, (state: TInitialState, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  }
});

export const {toggleCartItem} = cartSlice.actions;
export default cartSlice.reducer;
