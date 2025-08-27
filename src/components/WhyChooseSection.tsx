
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Eye, Lightbulb, Award, Target } from 'lucide-react';
import HeaderWithCircle from './HeaderWithCircle';

const WhyChooseSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creativity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tempor nibh."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Engagement", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tempor nibh."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Professionalism",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tempor nibh."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Vision",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tempor nibh."
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden mt-24">
     
    </section>
  );
};

export default WhyChooseSection;
