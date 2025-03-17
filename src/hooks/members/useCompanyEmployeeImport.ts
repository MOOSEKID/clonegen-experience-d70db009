
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';
import { 
  generateUsername, 
  makeUsernameUnique, 
  generateTemporaryPassword,
  sendCredentialsByEmail,
  sendCredentialsBySMS
} from '@/utils/authUtils';

export const useCompanyEmployeeImport = (
  members: Member[], 
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  // Get all existing usernames for uniqueness checks
  const getAllUsernames = (): string[] => {
    return members
      .filter(m => m.username)
      .map(m => m.username as string);
  };

  const importCompanyEmployees = (companyId: string, employees: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">[]) => {
    const company = members.find(m => m.id === companyId);
    
    if (!company || company.membershipCategory !== "Company") {
      toast.error("Invalid company selected for employee import");
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Get company end date to apply to all employees
    const companyEndDate = company.endDate;
    
    const newEmployees = employees.map((employee) => {
      // Generate username and password for each employee
      let username = '';
      let tempPassword = '';
      
      if (employee.name) {
        const baseUsername = generateUsername(employee.name);
        username = makeUsernameUnique(baseUsername, getAllUsernames());
        tempPassword = generateTemporaryPassword();
        
        // Send credentials
        if (employee.email) {
          sendCredentialsByEmail(employee.email, username, tempPassword);
        }
        if (employee.phone) {
          sendCredentialsBySMS(employee.phone, username, tempPassword);
        }
      }
      
      return {
        id: crypto.randomUUID(), // Generate UUID for client-side
        ...employee,
        linkedToCompany: true,
        linkedCompanyName: company.companyName || company.name,
        startDate: today,
        endDate: companyEndDate,
        lastCheckin: today,
        status: "Active",
        username: username || undefined,
        passwordResetRequired: true,
        accountEnabled: true,
      };
    });
    
    setMembers([...members, ...newEmployees]);
    toast.success(`${newEmployees.length} employees added to ${company.companyName || company.name}`, {
      description: "Login credentials have been generated and sent to all employees."
    });
  };

  return { importCompanyEmployees };
};
