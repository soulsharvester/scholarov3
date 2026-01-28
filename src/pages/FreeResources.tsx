import React, { useState, useEffect } from 'react';
import { Search, Filter, Bookmark } from 'lucide-react';
import NavBar from '../components/NavBar';
import { TEAM_MEMBER_NAMES } from '../components/TeamMember';

interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  examboard: string;
  type: string;
  downloadUrl: string;
  author: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'ESL GCSE English Language Full Guide',
    description:
      'A comprehensive GCSE Language Paper 1 guide tailored to ESL students, with exact details on how to approach every question on the paper, as well as useful insights and revision tips specifically for ESL students',
    subject: 'English Language',
    examboard: 'AQA',
    type: 'Guide',
    downloadUrl: '#',
    author: TEAM_MEMBER_NAMES[0],
  },
  {
    id: '2',
    title: 'ESL GCSE English Language Full Guide',
    description:
      'A comprehensive GCSE Language Paper 2 guide tailored to ESL students, with exact details on how to approach every question on the paper, as well as useful insights and revision tips specifically for ESL students',
    subject: 'English Language',
    examboard: 'AQA',
    type: 'Guide',
    downloadUrl: '#',
    author: TEAM_MEMBER_NAMES[3],
  },
  {
    id: '3',
    title: 'ESL GCSE Biology Full Guide',
    description:
      'An extensive yet easy-to-understand guide for GCSE Biology, designed for ESL students',
    subject: 'Biology',
    examboard: 'AQA',
    type: 'Guide',
    downloadUrl: '#',
    author: TEAM_MEMBER_NAMES[6],
  },
];

const subjects = [
  'All',
  'Mathematics',
  'English Language',
  'English Literature',
  'Biology',
  'Chemistry',
  'Physics',
];
const examboard = ['All', 'AQA', 'Edexcel', 'OCR', 'WJEC/Eduqas', 'CCEA'];
const types = [
  'All',
  'Guide',
  'Mindmap',
  'Worksheet',
  'Model Essay',
  'Flashcards',
];

export default function FreeResources() {
  const [filters, setFilters] = useState({
    subject: 'All',
    examboard: 'All',
    type: 'All',
    bookmarked: false,
    downloaded: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>(
    () => {
      const saved = localStorage.getItem('bookmarkedResources');
      return saved ? JSON.parse(saved) : [];
    }
  );
  const [downloadedResources, setDownloadedResources] = useState<string[]>(
    () => {
      const saved = localStorage.getItem('downloadedResources');
      return saved ? JSON.parse(saved) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem(
      'bookmarkedResources',
      JSON.stringify(bookmarkedResources)
    );
  }, [bookmarkedResources]);

  useEffect(() => {
    localStorage.setItem(
      'downloadedResources',
      JSON.stringify(downloadedResources)
    );
  }, [downloadedResources]);

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleDownload = (resourceId: string) => {
    if (!downloadedResources.includes(resourceId)) {
      setDownloadedResources((prev) => [...prev, resourceId]);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      filters.subject === 'All' || resource.subject === filters.subject;
    const matchesExamboard =
      filters.examboard === 'All' || resource.examboard === filters.examboard;
    const matchesType =
      filters.type === 'All' || resource.type === filters.type;
    const matchesBookmarked =
      !filters.bookmarked || bookmarkedResources.includes(resource.id);
    const matchesDownloaded =
      !filters.downloaded || downloadedResources.includes(resource.id);

    return (
      matchesSearch &&
      matchesSubject &&
      matchesExamboard &&
      matchesType &&
      matchesBookmarked &&
      matchesDownloaded
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          Free Resources
        </h1>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4 min-w-0">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-w-0 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-cornflower-blue focus:ring focus:ring-cornflower-blue focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.subject}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-cornflower-blue focus:ring focus:ring-cornflower-blue focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                value={filters.examboard}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, examboard: e.target.value }))
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-cornflower-blue focus:ring focus:ring-cornflower-blue focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {examboard.map((examboard) => (
                  <option key={examboard} value={examboard}>
                    {examboard}
                  </option>
                ))}
              </select>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-cornflower-blue focus:ring focus:ring-cornflower-blue focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bookmarked: !prev.bookmarked,
                  }))
                }
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  filters.bookmarked
                    ? 'bg-cornflower-blue text-white border-cornflower-blue'
                    : 'border-gray-300 dark:border-gray-700 dark:text-white'
                }`}
              >
                Bookmarked
              </button>
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    downloaded: !prev.downloaded,
                  }))
                }
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  filters.downloaded
                    ? 'bg-cornflower-blue text-white border-cornflower-blue'
                    : 'border-gray-300 dark:border-gray-700 dark:text-white'
                }`}
              >
                Downloaded
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-cornflower-blue">
                  {resource.title}
                </h3>
                <button
                  onClick={() => toggleBookmark(resource.id)}
                  className="p-2 rounded-full transition-colors duration-200"
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      bookmarkedResources.includes(resource.id)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {resource.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {resource.subject}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  {resource.examboard}
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  {resource.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Made by {resource.author}
              </p>
              <a
                href={resource.downloadUrl}
                onClick={() => handleDownload(resource.id)}
                className="inline-block w-full text-center bg-cornflower-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
