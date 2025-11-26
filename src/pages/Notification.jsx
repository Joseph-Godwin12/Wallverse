import React from 'react';
import { Bell } from 'lucide-react'; 


export default function Notification() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Notifications
      </h1>
      <div className="flex items-center justify-center min-h-[400px] bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-8">
        <div className="flex items-center justify-center text-gray-500 flex-col text-center">
          <Bell 
            className="h-12 w-12 mb-4 text-gray-400" 
            strokeWidth={1.5} 
          />
          <p className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">
            No new notifications
          </p>
          <p className="text-sm sm:text-md text-gray-500">
            We'll let you know when something new comes up.
          </p>
        
        </div>
      </div>
    </div>
  );
}