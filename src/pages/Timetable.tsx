
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const Timetable = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const [activeDay, setActiveDay] = useState('monday');

  const weekdays = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ];

  const scheduleData = {
    monday: [
      { time: '06:00 - 07:00', class: 'Morning Yoga', trainer: 'Sarah Miller', room: 'Studio 1' },
      { time: '08:00 - 09:30', class: 'CrossFit', trainer: 'Mike Johnson', room: 'Gym Floor' },
      { time: '10:00 - 11:00', class: 'Spinning', trainer: 'Jessica Taylor', room: 'Cycling Studio' },
      { time: '12:00 - 13:00', class: 'Pilates', trainer: 'Maria Rodriguez', room: 'Studio 2' },
      { time: '17:00 - 18:30', class: 'HIIT', trainer: 'David Park', room: 'Gym Floor' },
      { time: '19:00 - 20:00', class: 'Zumba', trainer: 'Sophia Lee', room: 'Studio 1' },
    ],
    tuesday: [
      { time: '07:00 - 08:00', class: 'Bootcamp', trainer: 'James Wilson', room: 'Outdoor Area' },
      { time: '09:00 - 10:00', class: 'Body Pump', trainer: 'Alex Johnson', room: 'Weights Area' },
      { time: '11:00 - 12:00', class: 'Senior Fitness', trainer: 'Nancy Clark', room: 'Studio 2' },
      { time: '13:00 - 14:00', class: 'Kickboxing', trainer: 'Robert Martinez', room: 'Martial Arts Room' },
      { time: '18:00 - 19:00', class: 'Power Yoga', trainer: 'Maya Patel', room: 'Studio 1' },
      { time: '20:00 - 21:00', class: 'Functional Training', trainer: 'Thomas Wilson', room: 'Gym Floor' },
    ],
    wednesday: [
      { time: '06:00 - 07:00', class: 'Morning Cardio', trainer: 'Lisa Brown', room: 'Gym Floor' },
      { time: '08:30 - 09:30', class: 'Core Conditioning', trainer: 'Mike Johnson', room: 'Studio 2' },
      { time: '10:00 - 11:00', class: 'Spinning', trainer: 'Jessica Taylor', room: 'Cycling Studio' },
      { time: '12:00 - 13:00', class: 'Yoga Flow', trainer: 'Sarah Miller', room: 'Studio 1' },
      { time: '17:30 - 18:30', class: 'Boxing', trainer: 'Robert Martinez', room: 'Martial Arts Room' },
      { time: '19:00 - 20:00', class: 'Zumba', trainer: 'Sophia Lee', room: 'Studio 1' },
    ],
    thursday: [
      { time: '07:00 - 08:00', class: 'HIIT', trainer: 'David Park', room: 'Gym Floor' },
      { time: '09:00 - 10:00', class: 'Body Sculpt', trainer: 'Alex Johnson', room: 'Weights Area' },
      { time: '11:00 - 12:00', class: 'Pilates', trainer: 'Maria Rodriguez', room: 'Studio 2' },
      { time: '13:00 - 14:00', class: 'Barre', trainer: 'Emily Thompson', room: 'Studio 1' },
      { time: '18:00 - 19:00', class: 'Kettlebell Training', trainer: 'Thomas Wilson', room: 'Gym Floor' },
      { time: '20:00 - 21:00', class: 'Meditation', trainer: 'Maya Patel', room: 'Wellness Room' },
    ],
    friday: [
      { time: '06:00 - 07:00', class: 'Morning Yoga', trainer: 'Sarah Miller', room: 'Studio 1' },
      { time: '08:00 - 09:30', class: 'CrossFit', trainer: 'Mike Johnson', room: 'Gym Floor' },
      { time: '10:00 - 11:00', class: 'Spinning', trainer: 'Jessica Taylor', room: 'Cycling Studio' },
      { time: '12:00 - 13:00', class: 'Tai Chi', trainer: 'Li Wei', room: 'Studio 2' },
      { time: '17:00 - 18:30', class: 'Circuit Training', trainer: 'David Park', room: 'Gym Floor' },
      { time: '19:00 - 20:00', class: 'Dance Fitness', trainer: 'Sophia Lee', room: 'Studio 1' },
    ],
    saturday: [
      { time: '08:00 - 09:00', class: 'Weekend Warrior', trainer: 'James Wilson', room: 'Gym Floor' },
      { time: '10:00 - 11:30', class: 'Yoga Fusion', trainer: 'Sarah Miller', room: 'Studio 1' },
      { time: '12:00 - 13:00', class: 'Family Fitness', trainer: 'Lisa Brown', room: 'Studio 2' },
      { time: '14:00 - 15:00', class: 'Spinning', trainer: 'Jessica Taylor', room: 'Cycling Studio' },
      { time: '16:00 - 17:00', class: 'Body Pump', trainer: 'Alex Johnson', room: 'Weights Area' },
    ],
    sunday: [
      { time: '09:00 - 10:30', class: 'Gentle Yoga', trainer: 'Maya Patel', room: 'Studio 1' },
      { time: '11:00 - 12:00', class: 'Pilates', trainer: 'Maria Rodriguez', room: 'Studio 2' },
      { time: '13:00 - 14:00', class: 'Stretch & Relax', trainer: 'Sarah Miller', room: 'Wellness Room' },
      { time: '15:00 - 16:00', class: 'Meditation', trainer: 'Li Wei', room: 'Studio 1' },
    ],
  };

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Class Timetable</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Day selector tabs */}
          <div className="flex overflow-x-auto bg-gray-100">
            {weekdays.map((day) => (
              <button
                key={day.id}
                className={`px-6 py-4 font-medium text-sm md:text-base whitespace-nowrap transition-colors ${
                  activeDay === day.id 
                    ? 'bg-gym-orange text-white' 
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveDay(day.id)}
              >
                {day.label}
              </button>
            ))}
          </div>
          
          {/* Timetable */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-gym-dark font-semibold">Time</th>
                    <th className="py-3 px-4 text-left text-gym-dark font-semibold">Class</th>
                    <th className="py-3 px-4 text-left text-gym-dark font-semibold">Trainer</th>
                    <th className="py-3 px-4 text-left text-gym-dark font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData[activeDay as keyof typeof scheduleData].map((session, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gym-orange mr-2" />
                          <span>{session.time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{session.class}</td>
                      <td className="py-4 px-4">{session.trainer}</td>
                      <td className="py-4 px-4">{session.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {scheduleData[activeDay as keyof typeof scheduleData].length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No classes scheduled for this day.
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Class Information</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-gym-orange text-white p-1 rounded mr-3 mt-1">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Class Duration</h3>
                <p className="text-gray-600">Most classes are 60 minutes long, with some specialty classes lasting up to 90 minutes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-gym-orange text-white p-1 rounded mr-3 mt-1">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Arrival Time</h3>
                <p className="text-gray-600">Please arrive 10-15 minutes before class starts, especially for your first session.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-gym-orange text-white p-1 rounded mr-3 mt-1">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Booking Policy</h3>
                <p className="text-gray-600">Members can book classes up to 7 days in advance. Non-members can book 48 hours before the class.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Timetable;
