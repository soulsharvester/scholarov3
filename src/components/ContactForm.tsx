import React, { useState } from 'react';
import { Send } from 'lucide-react';

type FormType = 'student' | 'teacher';

interface FormData {
  name: string;
  email: string;
  message: string;
  yearGroup?: string;
  school?: string;
  position?: string;
}

const ContactForm = () => {
  const [formType, setFormType] = useState<FormType>('student');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    yearGroup: '',
    school: '',
    position: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
      yearGroup: '',
      school: '',
      position: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-300 p-1 dark:border-gray-600">
          <button
            onClick={() => setFormType('student')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              formType === 'student'
                ? 'bg-cornflower-blue text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setFormType('teacher')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              formType === 'teacher'
                ? 'bg-cornflower-blue text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Teacher
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Your name"
            />
          </div>

          {formType === 'student' && (
            <>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your school name"
                />
              </div>
              <div>
                <label htmlFor="yearGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Year Group
                </label>
                <input
                  type="text"
                  id="yearGroup"
                  name="yearGroup"
                  value={formData.yearGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your year group"
                />
              </div>
            </>
          )}

          {formType === 'teacher' && (
            <>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your school name"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  placeholder="Your position"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cornflower-blue focus:border-cornflower-blue dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cornflower-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cornflower-blue transition-colors duration-200"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;