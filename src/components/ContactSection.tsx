
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import HeaderWithCircle from './HeaderWithCircle';
import { LuInstagram } from "react-icons/lu";


const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

 

  return (
    <section id="contact" className="max-w-7xl mx-auto" >
      <div className='" flex flex-col items-center justify-center  p- '>

        <div className="grid grid-cols-1 lg:grid-cols-2  h-full ">
            <ContactForm />
            <ContactDetails />
        </div>
         <Map />
      </div>
    </section>
  );
};

export default ContactSection;



const ContactDetails = () => {

  return (
     <div className=" bg-urok-gray-50 p-4 md:p-16 h-full w-full ">
        <HeaderWithCircle title="Contact Us" className="text-urok-gray-800"  circlePostion={"start"}/>
        
        <p className="text-urok-gray-600 leading-relaxed mb-8 text-left md:mt-4  font-Montserrat ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae tempor nibh. Praesent vel dui a eros tincidunt efficitur quis egestas Mauris ligula lectus, dignissim eu egestas congue, lacinia at velit.
        </p>

        <div className="space-y-4 text-left   font-Montserrat font-medium">
          <div className="flex items-center justify-start space-x-4 ">
            <MapPin className="w-6 h-6 text-blue" />
            
            <span className="text-urok-gray-600 text-sm md:text-l">11 rue Abou Rayane Attaouhidi,5ème Etg, B10 Maarif, Casablanca Maroc</span>
          </div>
          <div className="flex items-center justify-start space-x-4 text-left">
            <Mail className="w-5 h-5 text-blue" />
            <span className="text-urok-gray-600 text-sm md:text-l">contact@revo.ma</span>
          </div>
        </div>
      </div>
  );

}


const Map = () => {
 const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
     <div ref={ref} className={`${inView ? 'animate-slide-left' : 'opacity-0'} relative  w-full h-[600px]  mb-16`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d830.9405442305914!2d-7.636603042664856!3d33.58552361256985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3b7ff69eb25%3A0x28b898f50d357390!2sRevo%20Advertising!5e0!3m2!1sfr!2sma!4v1750767315044!5m2!1sfr!2sma"
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></iframe>
      <a
        href="https://www.google.com/maps?q=5 eme etg, Espace majorelles, 11 Rue Abou Hayane Attaouhidi، Casablanca 20000"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 left-0 w-full h-full z-10"
        aria-label="Open map in Google Maps">
      </a>
  </div>
  );

}



const ContactForm = () => {

   const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
     <div className="bg-urok-gray-600 p-4 md:p-20 text-white   h-full">
        <h3 className="text-2xl  mb-6">Contact form</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-urok-teal transition-colors"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-urok-teal transition-colors"
              required
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-4 bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-urok-teal transition-colors resize-none"
              required
            />
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-6">
          
           <LuInstagram className='md:w-10 md:h-10 w-8 h-8 text-white cursor-pointer hover:text-blue' />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue text-white py-4 px-6 font-medium hover:bg-blue-dark transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>SEND MESSAGE</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
  );

}