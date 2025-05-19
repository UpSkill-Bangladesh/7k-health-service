
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <MapPin className="mr-2 h-4 w-4" />
        <Select 
          value={selectedLocation} 
          onValueChange={onSelectLocation}
          data-testid="location-selector"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select location..." />
          </SelectTrigger>
          <SelectContent>
            {safeLocations.length > 0 ? (
              safeLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>No locations available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      {currentLocation?.address && (
        <p className="text-xs text-muted-foreground ml-6">{currentLocation.address}</p>
      )}
    </div>
  );
};

export default LocationSelector;
