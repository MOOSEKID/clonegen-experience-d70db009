
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddElementDialog from './AddElementDialog';

interface EmptyContentStateProps {
  onAddElement: (type: string) => void;
}

const EmptyContentState = ({ onAddElement }: EmptyContentStateProps) => {
  return (
    <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
      <p className="text-gray-500 mb-4">No content elements yet</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Your First Element</Button>
        </DialogTrigger>
        <AddElementDialog onAddElement={onAddElement} />
      </Dialog>
    </div>
  );
};

export default EmptyContentState;
