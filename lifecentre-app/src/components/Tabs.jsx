import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              py-4 px-2 font-semibold text-lg whitespace-nowrap transition-all
              ${activeTab === tab.id
                ? 'border-b-4 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-4 hover:border-gray-300'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
