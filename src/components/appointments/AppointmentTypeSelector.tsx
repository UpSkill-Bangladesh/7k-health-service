
import React from "react";
import { Check, ChevronsUpDown, Clock } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AppointmentType {
  id: string;
  name: string;
  duration: number; // in minutes
  description: string;
}

interface AppointmentTypeSelectorProps {
  appointmentTypes: AppointmentType[];
  selectedType: string;
  onSelectType: (typeId: string) => void;
}

const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({
  appointmentTypes = [],
  selectedType,
  onSelectType,
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Ensure appointmentTypes is always an array
  const safeTypes = Array.isArray(appointmentTypes) ? appointmentTypes : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {selectedType
              ? safeTypes.find((type) => type.id === selectedType)?.name || "Unknown type"
              : "Select appointment type..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search appointment types..." className="h-9" />
          <CommandEmpty>No appointment type found.</CommandEmpty>
          <CommandGroup>
            {safeTypes.map((type) => (
              <CommandItem
                key={type.id}
                onSelect={() => {
                  onSelectType(type.id);
                  setOpen(false);
                }}
                className="flex flex-col items-start"
              >
                <div className="flex w-full items-center justify-between">
                  <span>{type.name}</span>
                  {selectedType === type.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col text-xs text-muted-foreground">
                  <span>{type.duration} minutes</span>
                  <span>{type.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AppointmentTypeSelector;
