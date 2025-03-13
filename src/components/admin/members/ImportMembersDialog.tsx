
import * as React from "react";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Member } from "@/hooks/useMembers";
import { toast } from "sonner";

interface ImportMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImportMembers: (members: Omit<Member, "id">[]) => void;
}

const ImportMembersDialog = ({ isOpen, onClose, onImportMembers }: ImportMembersDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetState = () => {
    setFile(null);
    setError(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== "application/json" && selectedFile.type !== "text/csv") {
        setError("Only JSON and CSV files are supported");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    const droppedFile = e.dataTransfer.files?.[0];
    
    if (droppedFile) {
      if (droppedFile.type !== "application/json" && droppedFile.type !== "text/csv") {
        setError("Only JSON and CSV files are supported");
        return;
      }
      
      setFile(droppedFile);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    try {
      // For demonstration purposes, using a simplified import function
      const text = await file.text();
      let importedMembers: Omit<Member, "id">[] = [];
      
      if (file.type === "application/json") {
        // Parse JSON file
        importedMembers = JSON.parse(text);
      } else if (file.type === "text/csv") {
        // Simple CSV parsing - in a real app, use a more robust CSV parser
        const rows = text.split("\n");
        const headers = rows[0].split(",");
        
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;
          
          const values = rows[i].split(",");
          const member: any = {};
          
          headers.forEach((header, index) => {
            member[header.trim()] = values[index]?.trim() || "";
          });
          
          importedMembers.push(member);
        }
      }
      
      // Validate imported data - simplified validation
      if (importedMembers.length === 0) {
        setError("No valid member data found in the file");
        return;
      }

      onImportMembers(importedMembers);
      toast.success(`Imported ${importedMembers.length} members successfully`);
      handleClose();
    } catch (err) {
      setError("Failed to parse file. Please check the file format.");
      console.error("Import error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Members</DialogTitle>
          <DialogDescription>
            Upload a CSV or JSON file with member data.
          </DialogDescription>
        </DialogHeader>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
            isDragging ? "bg-gray-100 border-gym-orange" : "border-gray-300 hover:border-gym-orange/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".json,.csv"
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <FileText size={40} className="text-gym-orange" />
              <div className="font-medium">{file.name}</div>
              <div className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB • {file.type === "application/json" ? "JSON" : "CSV"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={40} className="text-gray-400" />
              <div className="font-medium">Click to upload or drag and drop</div>
              <div className="text-sm text-gray-500">
                CSV or JSON files only (max 5MB)
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            className="bg-gym-orange hover:bg-gym-orange/90"
            onClick={handleImport}
            disabled={!file}
          >
            Import Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportMembersDialog;
