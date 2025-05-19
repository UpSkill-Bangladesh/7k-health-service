
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  availableTabs: string[];
  children: React.ReactNode;
}

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  availableTabs,
  children 
}) => {
  // Map tab IDs to user-friendly names
  const getTabLabel = (tabId: string): string => {
    switch(tabId) {
      case 'calendar': return 'Calendar View';
      case 'list': return 'List View';
      case 'history': return 'Appointment History';
      default: return tabId.charAt(0).toUpperCase() + tabId.slice(1);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        {availableTabs.includes("calendar") && (
          <TabsTrigger value="calendar" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
            Calendar View
          </TabsTrigger>
        )}
        {availableTabs.includes("list") && (
          <TabsTrigger value="list" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
            List View
          </TabsTrigger>
        )}
        {availableTabs.includes("history") && (
          <TabsTrigger value="history" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
            Appointment History
          </TabsTrigger>
        )}
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default AppointmentTabs;
