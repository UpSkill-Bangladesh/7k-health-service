
import React from "react";
import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationSelectorProps {
  locations?: Location[];
  selectedLocation: string;
  onSelectLocation: (locationId: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations = [],
  selectedLocation,
  onSelectLocation,
}) => {
  // Ensure locations is always an array
  const safeLocations = Array.isArray(locations) ? locations : [];

  // Get the currently selected location (if any)
  const currentLocation = React.useMemo(() => {
    return safeLocations.find(location => location.id === selectedLocation);
  }, [safeLocations, selectedLocation]);

  // Fallback UI when no locations are available
  if (safeLocations.length === 0) {
    return (
      <Button
        variant="outline"
        className="w-full justify-between opacity-70"
        disabled
      >
        <span className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          No locations available
        </span>
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            data-testid="location-selector-button"
          >
            <span className="flex items-center flex-1 text-left">
              <MapPin className="mr-2 h-4 w-4" />
              {currentLocation?.name || "Select location..."}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full max-h-[300px] overflow-y-auto">
          {safeLocations.map((location) => (
            <DropdownMenuItem
              key={location.id}
              className={cn(
                "flex flex-col items-start py-2",
                selectedLocation === location.id && "bg-accent"
              )}
              onClick={() => onSelectLocation(location.id)}
            >
              <div className="flex w-full items-center justify-between">
                <span>{location.name}</span>
                {selectedLocation === location.id && (
                  <Check className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{location.address}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {currentLocation?.address && (
        <p className="text-xs text-muted-foreground ml-6">{currentLocation.address}</p>
      )}
    </div>
  );
};

export default LocationSelector;
