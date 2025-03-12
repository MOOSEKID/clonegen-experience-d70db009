
import { useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const OpeningTimes = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const weekdayHours = [
    { day: 'Monday', hours: '6:00 AM - 10:00 PM' },
    { day: 'Tuesday', hours: '6:00 AM - 10:00 PM' },
    { day: 'Wednesday', hours: '6:00 AM - 10:00 PM' },
    { day: 'Thursday', hours: '6:00 AM - 10:00 PM' },
    { day: 'Friday', hours: '6:00 AM - 11:00 PM' },
    { day: 'Saturday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 8:00 PM' }
  ];

  const holidaySchedule = [
    { holiday: 'New Year\'s Day', hours: '8:00 AM - 6:00 PM' },
    { holiday: 'Liberation Day', hours: '8:00 AM - 6:00 PM' },
    { holiday: 'Christmas', hours: 'Closed' },
    { holiday: 'Independence Day', hours: '8:00 AM - 6:00 PM' }
  ];

  const facilitiesHours = [
    { facility: 'Main Gym Floor', hours: 'Open during all regular hours' },
    { facility: 'Swimming Pool', hours: '7:00 AM - 9:00 PM (Mon-Fri), 8:00 AM - 8:00 PM (Weekends)' },
    { facility: 'Spa & Sauna', hours: '9:00 AM - 9:00 PM (Daily)' },
    { facility: 'Group Classes', hours: 'See Timetable for schedule' },
    { facility: 'Personal Training', hours: 'By appointment' }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Opening Hours</h1>
        <p className="text-lg text-gray-600 mb-12">Plan your visit with our convenient operating hours</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Clock className="text-gym-orange mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gym-dark">Regular Hours</h2>
            </div>
            <div className="space-y-4">
              {weekdayHours.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center py-3 ${
                    index < weekdayHours.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="font-medium text-gym-dark">{item.day}</span>
                  <span className="text-gray-700">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Calendar className="text-gym-orange mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gym-dark">Holiday Hours</h2>
            </div>
            <div className="space-y-4">
              {holidaySchedule.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center py-3 ${
                    index < holidaySchedule.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="font-medium text-gym-dark">{item.holiday}</span>
                  <span className="text-gray-700">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Facility Hours</h2>
          <div className="space-y-4">
            {facilitiesHours.map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row md:justify-between md:items-center py-4 ${
                  index < facilitiesHours.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="font-medium text-gym-dark mb-2 md:mb-0">{item.facility}</span>
                <span className="text-gray-700">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gym-dark">Additional Information</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Last Entry:</span> 1 hour before closing time
            </p>
            <p>
              <span className="font-semibold">Locker Rooms:</span> Available until 30 minutes after facility closing
            </p>
            <p>
              <span className="font-semibold">Note:</span> Hours may vary during public holidays and special events. Please check our social media or contact us for the most up-to-date information.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OpeningTimes;
