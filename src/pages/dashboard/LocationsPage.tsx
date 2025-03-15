
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const LocationsPage = () => {
  // Mock gym locations data
  const gymLocations = [
    {
      id: 1,
      name: 'Uptown Gym - Downtown',
      address: '123 Main Street, Downtown',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm',
      amenities: ['Pool', 'Sauna', 'Group Classes', 'Personal Training']
    },
    {
      id: 2,
      name: 'Uptown Gym - Westside',
      address: '456 West Avenue, Westside',
      phone: '(555) 987-6543',
      hours: 'Mon-Fri: 5am-11pm, Sat-Sun: 7am-9pm',
      amenities: ['Basketball Court', 'Cardio Zone', 'Weights Area', 'Spa']
    },
    {
      id: 3,
      name: 'Uptown Gym - Eastside',
      address: '789 East Boulevard, Eastside',
      phone: '(555) 456-7890',
      hours: 'Open 24/7',
      amenities: ['Women\'s Only Area', 'Functional Training', 'Yoga Studio', 'Juice Bar']
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Gym Locations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymLocations.map(location => (
          <Card key={location.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gym-orange" />
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{location.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{location.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hours</p>
                  <p>{location.hours}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amenities</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {location.amenities.map((amenity, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gym-orange/10 text-gym-orange text-xs px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded mt-2">
                  Get Directions
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
