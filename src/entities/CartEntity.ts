export type CartItem = {
  id: number;
  name: string;
  isDone: boolean;
  cartId: number;
};

export type CartMember = {
  id: number;
  name: string;
  email: string;
  role: 'OWNER' | 'MEMBER'
}

export type CartEntity = {
  name: string;
  id: number;
  isOwner: boolean;
  items: CartItem[];
  members: CartMember[];
};

