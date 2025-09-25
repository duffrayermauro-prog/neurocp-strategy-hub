import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const TabsNavigation = ({ tabs, activeTab, onTabChange, className }: TabsNavigationProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-2xl", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200",
            activeTab === tab.id
              ? "tab-active"
              : "tab-inactive"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};