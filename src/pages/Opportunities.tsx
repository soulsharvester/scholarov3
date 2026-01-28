import React from 'react';
import { Clock } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function Opportunities() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-500 dark:text-gray-400">
            Opportunities
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Coming Soon
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder cards for future opportunities */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 opacity-50 cursor-not-allowed"
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We're working hard to bring you exciting opportunities including
            internships, work experience placements, summer schools,
            residentials, volunteering opportunities and more. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}
