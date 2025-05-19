
import React from "react";
import { Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  // Ensure appointmentTypes is always an array
  const safeAppointmentTypes = Array.isArray(appointmentTypes) ? appointmentTypes : [];

  // Find the currently selected type
  const selectedTypeName = React.useMemo(() => {
    if (!selectedType) return "";
    const found = safeAppointmentTypes.find((type) => type.id === selectedType);
    return found ? found.name : "Select appointment type...";
  }, [selectedType, safeAppointmentTypes]);

  // Fallback UI when no appointment types are available
  if (safeAppointmentTypes.length === 0) {
    return (
      <Button
        variant="outline"
        className="w-full justify-between opacity-70"
        disabled
      >
        <span className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          No appointment types available
        </span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          data-testid="appointment-type-selector-button"
        >
          <span className="flex-1 text-left">
            {selectedTypeName || "Select appointment type..."}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full max-h-[300px] overflow-y-auto">
        {safeAppointmentTypes.map((type) => (
          <DropdownMenuItem
            key={type.id}
            className={cn(
              "flex flex-col items-start py-2",
              selectedType === type.id && "bg-accent"
            )}
            onClick={() => onSelectType(type.id)}
          >
            <div className="flex w-full items-center justify-between">
              <span>{type.name}</span>
              {selectedType === type.id && (
                <Check className="h-4 w-4" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{type.description}</span>
            <span className="text-xs text-muted-foreground">Duration: {type.duration} minutes</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentTypeSelector;
