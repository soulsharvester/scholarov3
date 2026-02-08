import React, { useState, useEffect } from 'react';
import { Search, Filter, Bookmark, ArrowLeft, BookOpen, User, GraduationCap } from 'lucide-react';
import NavBar from '../components/NavBar';
import { TEAM_MEMBER_NAMES } from '../components/TeamMember';

// --- Types ---
type View = 'LANDING' | 'TEACHERS' | 'STUDENTS' | 'ENGLISH_CHOICE' | 'TOPICS';

interface Topic {
  name: string;
  pdf: string;
}

// --- Constants / Mock Data ---
const SUBJECTS = ['English', 'Maths', 'Biology', 'Chemistry', 'Physics', 'Religious Studies'];

const TOPIC_PLACEHOLDERS: Record<string, Topic[]> = {
  'English Language': [
    { name: 'Paper 1', pdf: '/englan1.pdf' },
    { name: 'Paper 2', pdf: '/englan2.pdf' }, // Your specific file
  ],
  'English Literature': [
    { name: 'Shakespeare', pdf: '/temp.pdf' },
    { name: '19th Century Novel', pdf: '/temp.pdf' },
    { name: 'Poetry Anthology', pdf: '/temp.pdf' },
  ],
  'Maths': [
    { name: 'Numbers', pdf: '/math1.pdf' },
    { name: 'Algebra', pdf: '/math2.pdf' },
    { name: 'Geometry', pdf: '/math3.pdf' },
    { name: 'Trigonometry', pdf: '/math4.pdf' },
    { name: 'Probability', pdf: '/math5.pdf' },
  ],
  'Biology': [
    { name: 'Cell Biology', pdf: '/biocel.pdf' },
    { name: 'Organisation', pdf: '/bioorg.pdf' },
    { name: 'Infection and Response', pdf: '/bioinf.pdf' },
    { name: 'Bioenergetics', pdf: '/biobio.pdf' }, // Your specific file
    { name: 'Homeostasis', pdf: '/temp.pdf' },
    { name: 'Ecology', pdf: '/temp.pdf' },
  ],
  'Chemistry': [
    { name: 'Atomic Structure', pdf: '/chem1.pdf' },
    { name: 'Organic Chemistry', pdf: '/chem2.pdf' },
    { name: 'Chemical Analysis', pdf: '/chem3.pdf' },
    { name: 'Earths Resources', pdf: '/chem4.pdf' },
  ],
  'Physics': [
    { name: 'Energy', pdf: '/phys1.pdf' },
    { name: 'Electricity', pdf: '/phys2.pdf' },
    { name: 'Particle Model', pdf: '/phys3.pdf' },
    { name: 'Forces', pdf: '/phys4.pdf' },
    { name: 'Waves', pdf: '/phys5.pdf' },
    { name: 'Magnetism and Electromagnetism', pdf: '/phys6.pdf' },
  ],
  'Religious Studies': [
    { name: 'Christianity', pdf: '/rs1.pdf' },
    { name: 'Islam', pdf: '/rs2.pdf' },
  ],
};

const SUBJECT_EMOJIS: Record<string, string> = {
  'English': '📖',
  'English Language': '✍️',
  'English Literature': '📚',
  'Maths': '📐',
  'Biology': '🧬',
  'Chemistry': '🧪',
  'Physics': '⚛️',
  'Religious Studies': '🛐',
};

export default function FreeResources() {
  // Navigation State
  const [view, setView] = useState<View>('LANDING');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Existing Logic for Bookmarks/Downloads
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarkedResources');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Render Helpers ---

  // 1. Initial Landing: Students vs Teachers
  const renderLanding = () => (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-20">
      <button 
        onClick={() => setView('STUDENTS')}
        className="group p-8 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-cornflower-blue/20 transition-all border-2 border-transparent hover:border-cornflower-blue"
      >
        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-cornflower-blue group-hover:scale-110 transition-transform" />
        <h2 className="text-2xl font-bold dark:text-white">Students</h2>
      </button>

      <button 
        onClick={() => setView('TEACHERS')}
        className="group p-8 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-red-500/20 transition-all border-2 border-transparent hover:border-red-500"
      >
        <User className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-red-500 transition-colors" />
        <h2 className="text-2xl font-bold dark:text-white">Teachers</h2>
      </button>
    </div>
  );

  // 2. Teachers Page
  const renderTeachers = () => (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Come back later</h2>
      <button onClick={() => setView('LANDING')} className="text-cornflower-blue flex items-center justify-center mx-auto hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
      </button>
    </div>
  );

  // 3. Students Subject Grid
  const renderStudents = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {SUBJECTS.map((sub) => (
        <button
          key={sub}
          onClick={() => {
            if (sub === 'English') {
              setView('ENGLISH_CHOICE');
            } else {
              setSelectedSubject(sub);
              setView('TOPICS');
            }
          }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:bg-cornflower-blue group transition-colors text-left"
        >
         <h3 className="text-xl font-bold group-hover:text-white dark:text-white flex items-center gap-2">
            <span>{SUBJECT_EMOJIS[sub] || '📝'}</span> {sub}
         </h3>          <p className="text-sm text-gray-500 group-hover:text-blue-100">Click to view topics</p>
        </button>
      ))}
      <button onClick={() => setView('LANDING')} className="col-span-full text-gray-500 mt-4 flex items-center hover:text-cornflower-blue transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
    </div>
  );

  // 4. English Selection (Lang vs Lit)
  const renderEnglishChoice = () => (
    <div className="flex flex-col gap-4 max-w-md mx-auto py-20">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Select one of the following:</h2>
      <button 
        onClick={() => { setSelectedSubject('English Language'); setView('TOPICS'); }}
        className="p-6 bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700 rounded-xl hover:border-cornflower-blue transition-all dark:text-white font-bold"
      >
        ✍️ English Language
      </button>
      <button 
        onClick={() => { setSelectedSubject('English Literature'); setView('TOPICS'); }}
        className="p-6 bg-purple-50 dark:bg-gray-800 border-2 border-purple-200 dark:border-gray-700 rounded-xl hover:border-cornflower-blue transition-all dark:text-white font-bold"
      >
        📚 English Literature
      </button>
      <button onClick={() => setView('STUDENTS')} className="mt-4 text-center text-gray-500 hover:underline">Back to Subjects</button>
    </div>
  );

  // 5. Topics/PDF Placeholder Page
  const renderTopics = () => (
    <div className="py-10">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('STUDENTS')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full dark:text-white">
          <ArrowLeft />
        </button>
        <h2 className="text-3xl font-bold dark:text-white">{selectedSubject} Topics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* We use topic.name and topic.pdf now */}
        {(TOPIC_PLACEHOLDERS[selectedSubject || ''] || []).map((topic) => (
          <div key={topic.name} className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 border-cornflower-blue">
            <span className="font-medium dark:text-white">{topic.name}</span>
            
            {/* Standard HTML anchor tag styled as a button */}
            <a
              href={topic.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cornflower-blue text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Resources</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Empowering ESL students with structured revision materials.
        </p>

        {view === 'LANDING' && renderLanding()}
        {view === 'TEACHERS' && renderTeachers()}
        {view === 'STUDENTS' && renderStudents()}
        {view === 'ENGLISH_CHOICE' && renderEnglishChoice()}
        {view === 'TOPICS' && renderTopics()}
      </div>
    </div>
  );
}