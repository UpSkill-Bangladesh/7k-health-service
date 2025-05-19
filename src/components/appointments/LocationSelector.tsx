
import React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
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

export interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: string;
  onSelectLocation: (locationId: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations = [],
  selectedLocation,
  onSelectLocation,
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Ensure locations is always an array
  const safeLocations = Array.isArray(locations) ? locations : [];

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
            <MapPin className="mr-2 h-4 w-4" />
            {selectedLocation
              ? safeLocations.find((location) => location.id === selectedLocation)?.name || "Unknown location"
              : "Select location..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search locations..." className="h-9" />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {safeLocations.map((location) => (
              <CommandItem
                key={location.id}
                onSelect={() => {
                  onSelectLocation(location.id);
                  setOpen(false);
                }}
                className="flex flex-col items-start"
              >
                <div className="flex w-full items-center justify-between">
                  <span>{location.name}</span>
                  {selectedLocation === location.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{location.address}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
