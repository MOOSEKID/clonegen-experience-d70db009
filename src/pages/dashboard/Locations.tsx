
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Info } from 'lucide-react';

const Locations = () => {
  const gymLocations = [
    {
      id: 1,
      name: "Uptown Gym - Downtown",
      address: "123 Main Street, Downtown, Kigali",
      phone: "+250 78 123 4567",
      hours: "Mon-Fri: 5:00 AM - 11:00 PM\nSat-Sun: 6:00 AM - 10:00 PM",
      facilities: ["Swimming Pool", "Sauna", "Basketball Court", "Personal Training", "Group Classes"],
      image: "/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png"
    },
    {
      id: 2,
      name: "Uptown Gym - Nyarutarama",
      address: "456 Park Avenue, Nyarutarama, Kigali",
      phone: "+250 78 234 5678",
      hours: "Mon-Fri: 6:00 AM - 10:00 PM\nSat-Sun: 7:00 AM - 9:00 PM",
      facilities: ["Spa Services", "Olympic Pool", "Tennis Courts", "Yoga Studio"],
      image: "/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png"
    },
    {
      id: 3,
      name: "Uptown Gym - Kimihurura",
      address: "789 Green View Road, Kimihurura, Kigali",
      phone: "+250 78 345 6789",
      hours: "Mon-Sun: 24 Hours",
      facilities: ["Boxing Ring", "CrossFit Area", "Recovery Center", "Juice Bar"],
      image: "/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png"
    }
  ];

  const currentLocation = gymLocations[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gym Locations</h1>
      </div>
      
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={currentLocation.image} 
              alt={currentLocation.name} 
              className="w-full h-64 md:h-full object-cover" 
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold">{currentLocation.name}</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-gym-orange flex-shrink-0" />
                <span>{currentLocation.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-gym-orange flex-shrink-0" />
                <span>{currentLocation.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-gym-orange flex-shrink-0" />
                <div className="whitespace-pre-line">{currentLocation.hours}</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-gym-orange" />
                <span>Available Facilities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentLocation.facilities.map((facility, index) => (
                  <span key={index} className="bg-gym-dark px-3 py-1 rounded-full text-sm">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="bg-gym-orange text-white px-4 py-2 rounded hover:bg-gym-orange/90">
                Get Directions
              </button>
              <button className="border border-white/20 px-4 py-2 rounded hover:bg-white/5">
                Contact
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gymLocations.slice(1).map(location => (
          <Card key={location.id} className="overflow-hidden">
            <img 
              src={location.image} 
              alt={location.name} 
              className="w-full h-48 object-cover" 
            />
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-gym-orange flex-shrink-0" />
                <span className="text-sm">{location.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-gym-orange flex-shrink-0" />
                <div className="text-sm whitespace-pre-line">{location.hours}</div>
              </div>
              
              <button className="mt-2 w-full bg-gym-dark text-white px-4 py-2 rounded hover:bg-gym-dark/80">
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Find Other Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter your location..." 
              className="flex-grow px-4 py-2 bg-gym-dark border border-r-0 border-white/20 rounded-l focus:outline-none focus:border-gym-orange"
            />
            <button className="bg-gym-orange text-white px-4 py-2 rounded-r hover:bg-gym-orange/90">
              Search
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Locations;
