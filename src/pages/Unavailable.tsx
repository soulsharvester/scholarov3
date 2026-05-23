import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const messages: Record<string, { title: string; body: string }> = {
  resource: {
    title: 'Resource is currently being produced.',
    body: 'Show us support to encourage us, through spreading the word!',
  },
  contact: {
    title: 'This part of the website is not currently available.',
    body: 'We are working on it. Please check back later, and support and encourage us by spreading the word.',
  },
};

export default function Unavailable() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reason = searchParams.get('reason') || 'resource';
  const message = messages[reason] || messages.resource;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 text-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-cornflower-blue">{message.title}</h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">{message.body}</p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex justify-center items-center px-6 py-3 bg-cornflower-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            In the meantime, please support Scholaro by sharing us on social media.
          </div>
        </div>
      </div>
    </div>
  );
}
