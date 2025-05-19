
import React, { useState } from 'react';
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

interface PatientSelectorProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient) => void;
  className?: string;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const patientId = patient.id.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || patientId.includes(query);
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedPatient ? (
            <>
              {selectedPatient.firstName} {selectedPatient.lastName} <span className="text-gray-500 ml-1">({selectedPatient.id})</span>
            </>
          ) : (
            "Select patient..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search patients..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
          </div>
          <CommandEmpty>No patient found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {filteredPatients.map((patient) => (
              <CommandItem
                key={patient.id}
                value={`${patient.firstName} ${patient.lastName} ${patient.id}`}
                onSelect={() => {
                  setSelectedPatient(patient);
                  setOpen(false);
                }}
                className="flex justify-between"
              >
                <div>
                  {patient.firstName} {patient.lastName} 
                  <span className="ml-1 text-gray-500">({patient.id})</span>
                </div>
                {selectedPatient?.id === patient.id && (
                  <Check className="h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PatientSelector;
