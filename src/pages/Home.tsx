import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Fighter from '../components/Fighter';

const Home: React.FC = () => {
  return (
    <IonPage className='ion-page'>
      <IonContent fullscreen className="ion-page">
        {/*<div className="container0">
          <IonImg
            src="/fondo.jpg"
          />
          <Fighter />
        </div>*/}
        <Fighter />
      </IonContent>
    </IonPage>
  );
};

export default Home;
