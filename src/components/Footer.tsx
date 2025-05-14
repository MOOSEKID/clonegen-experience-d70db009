import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Twitter, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gym-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo and Tagline */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
                alt="Uptown Gym Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 max-w-md">
              Fitness and Wellbeing is a journey, lifestyle, work life balance or an interest 
              that improves our lives.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gym-darkblue p-2 rounded-md hover:bg-gym-orange transition-colors durationMinutes-300"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gym-darkblue p-2 rounded-md hover:bg-gym-orange transition-colors durationMinutes-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gym-darkblue p-2 rounded-md hover:bg-gym-orange transition-colors durationMinutes-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gym-darkblue p-2 rounded-md hover:bg-gym-orange transition-colors durationMinutes-300"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gym-darkblue p-2 rounded-md hover:bg-gym-orange transition-colors durationMinutes-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div id="contact">
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-gym-orange mt-1 mr-3 flex-shrink-0" size={20} />
                <p>Uptown Gym, Musanze, Northern Province, 4308, Rwanda</p>
              </div>
              <div className="flex items-center">
                <Mail className="text-gym-orange mr-3 flex-shrink-0" size={20} />
                <a href="mailto:Support@uptowngym.rw" className="hover:text-gym-orange transition-colors">
                  Support@uptowngym.rw
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="text-gym-orange mr-3 flex-shrink-0" size={20} />
                <a href="tel:+250782281213" className="hover:text-gym-orange transition-colors">
                  +250782281213
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/about-us" className="hover:text-gym-orange transition-colors">
                About us
              </Link>
              <Link to="/classes" className="hover:text-gym-orange transition-colors">
                Classes
              </Link>
              <Link to="/opening-times" className="hover:text-gym-orange transition-colors">
                Opening Times
              </Link>
              <Link to="/contact-us" className="hover:text-gym-orange transition-colors">
                Contact us
              </Link>
              <Link to="/membership" className="hover:text-gym-orange transition-colors">
                Membership
              </Link>
              <Link to="/blogs" className="hover:text-gym-orange transition-colors">
                Blogs
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gym-darkblue text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Uptown Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
