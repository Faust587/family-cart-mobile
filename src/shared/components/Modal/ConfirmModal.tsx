import React from 'react';
import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
} from '@ionic/react';

type ConfirmDeleteModalProps = {
  open: boolean;
  title: string;
  description: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmDeleteModalProps> = ({title, description, open, handleConfirm, handleCancel}) => {

  return (
    <>
      <IonModal isOpen={open} onDidDismiss={() => {}}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <p>{description}</p>
        </IonContent>

        <IonFooter>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <IonButton color="danger" onClick={() => handleConfirm()}>
              Yes
            </IonButton>
            <IonButton color="medium" onClick={handleCancel}>
              No
            </IonButton>
          </div>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default ConfirmModal;
