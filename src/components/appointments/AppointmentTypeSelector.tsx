
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
  description: string;
  duration: number;
}

interface AppointmentTypeSelectorProps {
  appointmentTypes?: AppointmentType[];
  selectedType: string;
  onSelectType: (typeId: string) => void;
}

const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({
  appointmentTypes = [], // Default to empty array if undefined
  selectedType,
  onSelectType,
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Ensure appointmentTypes is always an array
  const safeAppointmentTypes = appointmentTypes ? appointmentTypes : [];

  // Check if the component is properly initialized before rendering the Command component
  const renderContent = Array.isArray(safeAppointmentTypes) && safeAppointmentTypes.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedType
            ? safeAppointmentTypes.find((type) => type.id === selectedType)?.name || "Unknown type"
            : "Select appointment type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {renderContent ? (
          <Command>
            <CommandInput placeholder="Search appointment types..." className="h-9" />
            <CommandEmpty>No appointment type found.</CommandEmpty>
            <CommandGroup>
              {safeAppointmentTypes.map((type) => (
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
                  <span className="text-xs text-muted-foreground">{type.description}</span>
                  <span className="text-xs text-muted-foreground">Duration: {type.duration} minutes</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No appointment types available
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AppointmentTypeSelector;
