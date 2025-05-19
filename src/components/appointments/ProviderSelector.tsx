
import React from "react";
import { Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  availableDays: number[];
  location?: string;
}

interface ProviderSelectorProps {
  providers?: Provider[];
  selectedProvider: string;
  onSelectProvider: (providerId: string) => void;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({
  providers = [], // Default to empty array if undefined
  selectedProvider,
  onSelectProvider,
}) => {
  // Ensure providers is always an array
  const safeProviders = Array.isArray(providers) ? providers : [];

  // Find the currently selected provider
  const selectedProviderName = React.useMemo(() => {
    if (!selectedProvider) return "";
    const found = safeProviders.find((provider) => provider.id === selectedProvider);
    return found ? found.name : "Select provider...";
  }, [selectedProvider, safeProviders]);

  // Fallback UI when no providers are available
  if (safeProviders.length === 0) {
    return (
      <Button
        variant="outline"
        className="w-full justify-between opacity-70"
        disabled
      >
        <span className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          No providers available
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
          data-testid="provider-selector-button"
        >
          <span className="flex-1 text-left">
            {selectedProviderName || "Select provider..."}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full max-h-[300px] overflow-y-auto">
        {safeProviders.map((provider) => (
          <DropdownMenuItem
            key={provider.id}
            className={cn(
              "flex flex-col items-start py-2",
              selectedProvider === provider.id && "bg-accent"
            )}
            onClick={() => onSelectProvider(provider.id)}
          >
            <div className="flex w-full items-center justify-between">
              <span>{provider.name}</span>
              {selectedProvider === provider.id && (
                <Check className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>{provider.specialty}</span>
              {provider.location && <span>Location: {provider.location}</span>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProviderSelector;
