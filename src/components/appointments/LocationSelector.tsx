
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  // Get the currently selected location (if any)
  const currentLocation = React.useMemo(() => {
    return locations.find(location => location.id === selectedLocation);
  }, [locations, selectedLocation]);

  // Handle text input change
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // If the input matches a location name, select it
    const matchedLocation = locations.find(loc => 
      loc.name.toLowerCase() === inputValue.toLowerCase()
    );
    
    if (matchedLocation) {
      onSelectLocation(matchedLocation.id);
    } else if (inputValue.trim() === "") {
      // Clear selection if input is empty
      onSelectLocation("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <MapPin className="mr-2 h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter location..."
          value={currentLocation?.name || ""}
          onChange={handleLocationInputChange}
          className="w-full"
        />
      </div>
      {currentLocation?.address && (
        <p className="text-xs text-muted-foreground ml-6">{currentLocation.address}</p>
      )}
    </div>
  );
};

export default LocationSelector;
