import React, {useState} from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButton,
} from '@ionic/react';
import {trash, create, personCircleOutline} from 'ionicons/icons';
import './Home.css';
import {useData} from './hooks/useData';
import {CartItem} from '../../entities/CartEntity';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {toggleCartItem} from '../../store/cart/cartSlice';
import {changeTaskStatus, deleteCart} from '../../store/cart/cartThunk';
import ConfirmModal from '../../shared/components/Modal/ConfirmModal';
import EditCartModal from '../../shared/components/Modal/EditCartModal';
import {useHistory} from 'react-router';
import {SecureStoragePlugin} from 'capacitor-secure-storage-plugin';
import {setUnauthenticated} from '../../store/auth/authSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [cartDeleteData, setCartDeleteData] = useState<number | null>(null);
  const [cartEditData, setCartEditData] = useState<{id: number, name: string } | null>(null);
  const [createCartData, setCreateCartData] = useState<boolean>(false);

  const {list, isLoading, error} = useData();

  const handleToggleItem = (cartId: number, itemId: number, value: boolean) => {
    dispatch(toggleCartItem({cartId, itemId, value}));
    dispatch(changeTaskStatus({taskId: itemId, status: value}));
  }

  const handleDeleteCart = () => {
    if (!cartDeleteData) return;
    dispatch(deleteCart(cartDeleteData));
    setCartDeleteData(null);
  }

  const handleOpenCreateCart = () => {
    setCreateCartData(true);
  }

  const handleCloseModal = () => {
    setCartEditData(null);
    setCreateCartData(false);
  }

  const handleOpenEditCart = (data: {id: number, name: string}) => {
    setCartEditData(data);
  }

  const renderCart = (name: string, items: CartItem[], id: number, isOwner: boolean, members: any[]) => {
    return (
      <div className="cart-container" onClick={() => {
        history.push('/cart-details', {id});
      }}>
        <IonAvatar slot="start">
          <img src="/assets/cart.svg" alt="cart" />
        </IonAvatar>
        <div className="cart-details">
          <h2>{name}</h2>
          <div className="cart-members">
            {members.map((_, index) => {
              if (index > 2) return null;
              return '👤';
            })}
            {members.length > 3 && `+${members.length - 3}`}
          </div>
          <IonList>
            <div style={{marginTop: 12}}>
            {items.map((item, index) => {
              if (index > 1) return null
              return (
                <label
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleItem(id, item.id, !item.isDone);
                  }}
                  style={{display: 'flex', alignItems: 'center', width: '100%', gap: 4}}
                >
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} checked={item.isDone}/>
                  <IonLabel>{item.name}</IonLabel>
                </label>
              )
            })}
            {items.length > 2 && (
              <IonItem lines="none">
                <IonLabel>+{items.length - 2} items more</IonLabel>
              </IonItem>
            )}
            {items.length === 0 && (
              <IonItem lines="none">
                <IonLabel>No items</IonLabel>
              </IonItem>
            )}
            </div>
          </IonList>
        </div>
        {isOwner && (<div className="cart-actions">
          <IonButton onClick={(e) => {
            e.stopPropagation();
            setCartDeleteData(id)
          }} fill="clear" color="medium">
            <IonIcon icon={trash}/>
          </IonButton>
          <IonButton onClick={(e) => {
            e.stopPropagation();
            handleOpenEditCart({id, name})
          }} fill="clear" color="medium">
            <IonIcon icon={create}/>
          </IonButton>
        </div>)}
      </div>
    );
  };

  return (
    <>
    <IonPage>
      <div style={
          {
            paddingTop: 'var(--ion-safe-area-top)',
            paddingBottom: 'var(--ion-safe-area-bottom)',
            paddingLeft: 'var(--ion-safe-area-left)',
            paddingRight: 'var(--ion-safe-area-right)'
          }
      }>
        <IonContent fullscreen className="ion-padding">
          <div style={{height: 60, display: 'flex', justifyContent: 'space-between'}}>
            <button
              style={{
                backgroundColor: '#F58B54',
                fontSize: 24,
                width: 32,
                height: 32,
                borderRadius: 4,
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleOpenCreateCart}
            >
              +
            </button>

            <button
              style={{
                backgroundColor: '#F58B54',
                fontSize: 24,
                width: 32,
                height: 32,
                borderRadius: 4,
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => {
                SecureStoragePlugin.remove({key: 'accessToken'})
                dispatch(setUnauthenticated())
              }}
            >
              <IonIcon icon={personCircleOutline}/>
            </button>
          </div>
          {list.map((cart) => (
            <div key={cart.id} className="cart-item">
              {renderCart(cart.name, cart.items, cart.id, cart.isOwner, cart.members)}
            </div>
          ))}
          {list?.length === 0 && !isLoading && (
            <div style={{display: "flex", justifyContent: 'center'}}>
              <h2>No carts found</h2>
            </div>
          )}
          <div className="wave-background"></div>
        </IonContent>

        <ConfirmModal
          title="Delete Cart"
        description="Are you sure you want to delete this Cart?"
        open={!!cartDeleteData}
        handleConfirm={handleDeleteCart}
        handleCancel={() => setCartDeleteData(null)}
      />

      </div>

      <EditCartModal
        yesBtnTitle={`${cartEditData ? "Save" : "Create"} Cart`}
        value={cartEditData?.name}
        id={cartEditData?.id}
        open={!!cartEditData || createCartData}
        title={`${cartEditData ? "Edit" : "Create"} Cart`}
        handleCancel={handleCloseModal}
      />
    </IonPage>
    </>
  );
};

