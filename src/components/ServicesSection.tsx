
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Palette, Camera, Monitor, Smartphone, Radio, Tv } from 'lucide-react';
import HeaderWithCircle from './HeaderWithCircle';

const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Strategie",
      description: "Analyse concurrentielle, définition des cibles, axes de communication, stratégie éditoriale, stratégie média ou encore ecosystème digital sont couverts par nos équipes."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Design & Expérience Utilisateur", 
      description: "Une fois les messages-clefs définis, nos équipes de création décrivent la meilleure expérience-client, et lui donnent vie en créant le concept visuel le plus impactant."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Web & Mobile",
      description: "Plateformes centrales dans nos stratégies, nous développons aussi bien en web qu’en applications mobiles. Notre méthodologie permet de maîtriser les budgets et plannings."
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Creation",
      description: "De la “big idea” aux délivrables multi-cannaux, notre équipe créa met en place et déroule des campagnes cohérentes et fortes."
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Marketing Digital",
      description: "Nous intégrons à nos stratégies l’optimisation des flux Google (SEO, SEA), le display (GDN), la génération des leads via des landings pages, l’emailing, le CRM et l’analyse poussée des résultats"
    },
    {
      icon: <Tv className="w-6 h-6" />,
      title: "TV, Radio, Publicité, Presse et Evénementiel",
      description: "Pour générer de la notoriété, les médias traditionnels sont toujours très utiles. Nous créons donc les scripts TV et radio puis produisons les contenus. De même pour l’affichage. annonces presse et événements."
    }
  ];

  return (
    <section id="services" ref={ref} className={` ${inView ? 'animate-slide-left' : 'opacity-0'}   bg-urok-gray-50  `}>
      
        
    </section>
  );
};

export default ServicesSection;


// bg-urok-gray-50