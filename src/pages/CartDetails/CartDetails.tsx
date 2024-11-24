import React, {useState} from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption, IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage
} from '@ionic/react';
import './CartDetails.css';
import {arrowBack, create} from 'ionicons/icons';
import {useHistory, useLocation} from 'react-router';
import {useSelector} from 'react-redux';
import {selectCartById} from '../../store/cart/cartSelectors';
import {toggleCartItem} from '../../store/cart/cartSlice';
import {changeTaskStatus} from '../../store/cart/cartThunk';
import {useAppDispatch} from '../../hooks/reduxHooks';
import EditCartModal from '../../shared/components/Modal/EditCartModal';

export const CartDetails = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {goBack} = useHistory();

  const {id} = location.state as { id: number };
  const cart = useSelector(selectCartById)(id);

  const [cartEditData, setCartEditData] = useState<{id: number, name: string } | null>(null);

  const handleOpenEditCart = (data: {id: number, name: string}) => {
    setCartEditData(data);
  }

  const handleCloseModal = () => {
    setCartEditData(null);
  }

  const handleToggleItem = (cartId: number, itemId: number, value: boolean) => {
    dispatch(toggleCartItem({cartId, itemId, value}));
    dispatch(changeTaskStatus({taskId: itemId, status: value}));
  }

  return (
    <IonPage>
      <div className="page-container">
        <IonHeader>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
              onClick={goBack}
            >
              <IonIcon icon={arrowBack}/>
            </button>

            {cart?.name}

            {cart?.isOwner && <button
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
                handleOpenEditCart({name: cart?.name, id})
              }}
            >
              <IonIcon icon={create}/>
            </button>}
          </div>
        </IonHeader>

        <IonContent fullscreen>
          <IonList>
            <div style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginRight: 10,
              marginLeft: 10
            }}>
              {cart?.items.map((item) => {
                return (
                  <IonItemSliding key={item.id}>
                    <IonItemOptions side="end">
                      <IonItemOption color="danger" onClick={() => {
                      }}>
                        Delete
                      </IonItemOption>
                    </IonItemOptions>
                    <IonItem>
                      <label
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleItem(id, item.id, !item.isDone);
                        }}
                        style={{display: 'flex', alignItems: 'center', width: '100%', gap: 8}}
                      >
                        <input type="checkbox" onClick={(e) => e.stopPropagation()} checked={item.isDone}/>
                        <IonLabel>{item.name}</IonLabel>
                      </label>
                    </IonItem>
                  </IonItemSliding>
                )
              })}
              {/*{JSON.stringify(cart, null, 2)}*/}
            </div>
          </IonList>
        </IonContent>
      </div>
      <EditCartModal
        yesBtnTitle="Save Cart"
        value={cartEditData?.name}
        id={cartEditData?.id}
        open={!!cartEditData}
        title="Edit Cart"
        handleCancel={handleCloseModal}
      />
    </IonPage>
  );
}
