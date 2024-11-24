import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCheckbox,
} from '@ionic/react';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {login} from '../../store/auth/authThunk';
import {SVGLoginBanner} from '../../assets/SVGLoginBanner';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState<string>();

  const validateEmailData = (emailArg?: string, passwordArg?: string) => {
    if (!emailArg || !passwordArg) {
      setError('required fields are empty');
      return true;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailArg)) {
      setError("Email is not valid")
      return true;
    }

    return false;
  }

  const handleLogin = async () => {
    const isError = validateEmailData(email, password);
    if (isError) return;

    setShowLoading(true);
    alert(JSON.stringify({email, password}))
    try {
      dispatch(login({email, password}));
    } catch (e) {
      setError('Invalid email or password.');
    }
    setShowLoading(false);
  };

  const gridStyle: React.CSSProperties = {
    paddingBottom: 'var(--ion-safe-area-bottom)',
    paddingLeft: 'var(--ion-safe-area-left)',
    paddingRight: 'var(--ion-safe-area-right)',
    margin: "0 10px"
  };

  const logoContainerStyle: React.CSSProperties = {
    justifyContent: 'center',
    width: '100%',
    marginLeft: -4
  };

  const loginButtonStyle: React.CSSProperties = {
    marginTop: 30,
    backgroundColor: '#F58B54',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    height: 40,
    width: 200,
  };

  const errorTextStyle: React.CSSProperties = {
    paddingLeft: '16px',
    color: 'var(--ion-color-danger)',
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={logoContainerStyle}>
          <SVGLoginBanner />
        </div>
        <IonGrid style={gridStyle}>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" size-md="6" size-lg="4">
              <div style={{textAlign: 'center', gap: 8, display: 'flex', flexDirection: 'column'}}>
                <div style={{fontSize: 24, fontWeight: 500}}>Family Cart</div>
                <div>
                  <span>Don’t have an account?</span>
                  <a href='/login' style={{color: "#F58B54"}}> Sign up.</a>
                </div>
              </div>
              {error && (
                <IonText style={errorTextStyle}>
                  <p>{error}</p>
                </IonText>
              )}
              <IonList>
                <IonItem>
                  <IonLabel>Email:</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Password: </IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                  <button
                    onClick={handleLogin}
                    style={loginButtonStyle}
                  >
                    Login
                  </button>
                </div>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading isOpen={showLoading} message={'Logging in...'}/>
      </IonContent>
    </IonPage>
  );
};

export default Register;
