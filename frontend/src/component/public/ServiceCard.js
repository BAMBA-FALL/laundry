import React from 'react';
import './ServiceCard.css'



const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="icon">{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

export default ServiceCard;
