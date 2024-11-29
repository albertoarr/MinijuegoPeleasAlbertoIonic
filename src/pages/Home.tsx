import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import Fighter from '../components/Fighter';

const Home: React.FC = () => {
  return (
    <IonPage >
      <IonContent fullscreen className="ion-page">
        <Fighter />
      </IonContent>
    </IonPage>
  );
};

export default Home;
