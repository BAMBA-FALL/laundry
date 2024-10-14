import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAppointment } from './context/AppointmentContext';
import './LaundryStatus.css';

const LaundryStatus = () => {
  const { hasAppointment } = useAppointment();

  console.log('hasAppointment dans LaundryStatus:', hasAppointment);

  if (!hasAppointment) {
    return (
      <div className="empty-basket-animation">
        <DotLottieReact
          src="/assets/status/pas_de_linge.lottie"
          loop
          autoplay
          style={{ width: '300px', height: '300px' }}
        />
        <h3 className="animation-title">Vous n'avez pas de linge</h3>
      </div>
    );
  }

  return (
    <div className="laundry-status-container">
      <div className="card laundry-status-card">
        <DotLottieReact
          src="/assets/status/attente.lottie"
          loop
          autoplay
          style={{ width: '300px', height: '300px' }}
        />
        <h3 className="animation-title">En Attente</h3>
      </div>

      <div className="card laundry-status-card">
        <DotLottieReact
          src="/assets/status/encours.lottie"
          loop
          autoplay
          style={{ width: '300px', height: '300px' }}
        />
        <h3 className="animation-title">En Cours</h3>
      </div>

      <div className="card laundry-status-card">
        <DotLottieReact
          src="/assets/status/fini.lottie"
          loop
          autoplay
          style={{ width: '300px', height: '300px' }}
        />
        <h3 className="animation-title">Fini</h3>
      </div>
    </div>
  );
};

export default LaundryStatus;
