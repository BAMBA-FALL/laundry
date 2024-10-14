import React from 'react';
import ServiceCard from '../../component/public/ServiceCard'; // Chemin d'importation mis à jour
import './Home.css'
const Home = () => {
  return (
    <main>
    {/* Hero Section */}
    <section className="hero-section">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4">Votre linge, notre passion</h2>
        <p className="mb-8">LingeExpress révolutionne votre expérience de blanchisserie avec un service rapide, efficace et éco-responsable.</p>
        <button className="cta-button">Commencer maintenant</button>
      </div>
    </section>
  
    {/* Services Section */}
    <section className="services-section">
      <h3>Nos Services</h3>
      <div className="service-card-grid">
        <ServiceCard
          icon="👕"
          title="Lavage Express"
          description="Votre linge propre et parfumé en un temps record."
        />
        <ServiceCard
          icon="🚚"
          title="Collecte & Livraison"
          description="Nous récupérons et livrons votre linge à domicile."
        />
        <ServiceCard
          icon="🌿"
          title="Éco-responsable"
          description="Des solutions de nettoyage respectueuses de l'environnement."
        />
        <ServiceCard
          icon="📱"
          title="Suivi en temps réel"
          description="Suivez l'état de votre linge depuis votre application mobile."
        />
      </div>
    </section>
  
{/* CTA Section */}
<section className="cta-section">
  <div className="container mx-auto">
    <h3>Prêt à simplifier votre routine de lessive ?</h3>
    <p>Rejoignez LingeExpress aujourd'hui et découvrez une nouvelle façon de prendre soin de votre linge.</p>
    <a href="/signupform" className="cta-button">Créer un compte</a>
  </div>
</section>


  </main>  
  );
};

export default Home;
