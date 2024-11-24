import React, {useEffect} from 'react';
import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter, IonLabel, IonInput, IonItemOptions, IonItemOption, IonItem, IonItemSliding,
} from '@ionic/react';
import {useAppDispatch} from '../../../hooks/reduxHooks';
import {createCart, editCart} from '../../../store/cart/cartThunk';
import {useSelector} from 'react-redux';
import {selectCartById} from '../../../store/cart/cartSelectors';

type EditCartModalProps = {
  open: boolean;
  title: string;
  value?: string;
  id?: number;
  yesBtnTitle: string;
  handleCancel: () => void;
}

const EditCartModal: React.FC<EditCartModalProps> = ({title, open, handleCancel, value, yesBtnTitle, id}) => {
  const dispatch = useAppDispatch();

  const [cartName, setCartName] = React.useState<string>(value ?? '');

  const cart = useSelector(selectCartById)(id);

  useEffect(() => {
    setCartName(value ?? '');
  }, [value]);

  const handleConfirm = async () => {
    if (id) {
      await dispatch(editCart({id, name: cartName}));
      handleCancel();
      return;
    }
    await dispatch(createCart({name: cartName}));
    handleCancel();
    setCartName('');
  }

  return (
    <>
      <IonModal isOpen={open} onDidDismiss={() => {}}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonLabel>Cart name:</IonLabel>
          <IonInput
            type="name"
            placeholder="type here..."
            value={cartName}
            onIonChange={(e) => setCartName(e.detail.value!)}
          />

          <div style={{marginTop: 10, display: 'flex', justifyContent: 'space-between'}}>
            <IonLabel>Members:</IonLabel>
          </div>
          {
            cart?.members.map(item => (
              <IonItemSliding key={item.id}>
                <IonItemOptions side="end">
                  <IonItemOption color="danger" onClick={() => {
                  }}>
                    Delete
                  </IonItemOption>
                </IonItemOptions>
                <IonItem>
                  <IonLabel>{item.name}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))
          }
        </IonContent>

        <IonFooter>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <IonButton color="danger" onClick={() => handleConfirm()}>
              {yesBtnTitle}
            </IonButton>
            <IonButton color="medium" onClick={handleCancel}>
              Cancel
            </IonButton>
          </div>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default EditCartModal;
