
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

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  availableDays: number[];
  location?: string;
}

interface ProviderSelectorProps {
  providers: Provider[];
  selectedProvider: string;
  onSelectProvider: (providerId: string) => void;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({
  providers = [], // Default to empty array if undefined
  selectedProvider,
  onSelectProvider,
}) => {
  const [open, setOpen] = React.useState(false);
  
  // Ensure providers is always an array
  const safeProviders = Array.isArray(providers) ? providers : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProvider
            ? safeProviders.find((provider) => provider.id === selectedProvider)?.name || "Unknown provider"
            : "Select provider..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search providers..." className="h-9" />
          <CommandEmpty>No provider found.</CommandEmpty>
          <CommandGroup>
            {safeProviders.map((provider) => (
              <CommandItem
                key={provider.id}
                onSelect={() => {
                  onSelectProvider(provider.id);
                  setOpen(false);
                }}
                className="flex flex-col items-start"
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
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProviderSelector;
