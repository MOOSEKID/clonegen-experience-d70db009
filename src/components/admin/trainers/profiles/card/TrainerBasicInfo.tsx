
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MailIcon, PhoneIcon } from "lucide-react";

interface TrainerBasicInfoProps {
  name: string;
  email?: string;
  phone?: string;
  profilePicture?: string | null;
}

const TrainerBasicInfo: React.FC<TrainerBasicInfoProps> = ({ 
  name,
  email,
  phone,
  profilePicture
}) => {
  // Extract initials for avatar fallback
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 border">
        {profilePicture ? (
          <AvatarImage src={profilePicture} />
        ) : null}
        <AvatarFallback className="text-lg font-medium">
          {getInitials(name || '')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex flex-col text-sm text-muted-foreground gap-1">
          {email && (
            <div className="flex items-center gap-1">
              <MailIcon className="h-3.5 w-3.5" />
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <PhoneIcon className="h-3.5 w-3.5" />
              <span>{phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerBasicInfo;
