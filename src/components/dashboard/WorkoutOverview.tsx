
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WorkoutOverview = () => {
  return (
    <div className="relative bg-gym-orange/20 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:p-8 md:w-3/5">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase">
            Don't give up on your dreams
          </h2>
          <h3 className="text-xl md:text-2xl font-bold mt-1">
            <span className="text-white">Being fit</span>{' '}
            <span className="text-gym-orange">burn calories, loss weight</span>
          </h3>
          <div className="mt-6">
            <Button 
              variant="default" 
              className="bg-gym-orange hover:bg-gym-orange/90 text-white"
            >
              View all workouts <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
        <div className="md:w-2/5 h-48 md:h-auto">
          <img 
            src="/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png" 
            alt="Fitness motivation" 
            className="w-full h-full object-cover object-center opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutOverview;
