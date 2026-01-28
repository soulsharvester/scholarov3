import React from 'react';
import { Type, Palette, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityMenu({ isOpen, onClose }: AccessibilityMenuProps) {
  const {
    fontSize,
    setFontSize,
    isMonochrome,
    setIsMonochrome,
    isDyslexicFont,
    setIsDyslexicFont,
    resetSettings,
  } = useAccessibility();

  if (!isOpen) return null;

  const isAnyFeatureActive = fontSize !== 16 || isMonochrome || isDyslexicFont;

  return (
    <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">Font Size</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-white"
            >
              <Type className="w-4 h-4" />-
            </button>
            <span className="text-gray-700 dark:text-white">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-white"
            >
              <Type className="w-4 h-4" />+
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsMonochrome(prev => !prev)}
            className={`w-full p-2 rounded ${
              isMonochrome ? 'bg-cornflower-blue text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
            }`}
          >
            <Palette className="inline-block w-4 h-4 mr-2" />
            Monochrome
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsDyslexicFont(prev => !prev)}
            className={`w-full p-2 rounded ${
              isDyslexicFont ? 'bg-cornflower-blue text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
            }`}
          >
            <Type className="inline-block w-4 h-4 mr-2" />
            Dyslexic Font
          </button>
        </div>
        <div>
          <button
            onClick={resetSettings}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <RotateCcw className="inline-block w-4 h-4 mr-2" />
            Reset Settings
          </button>
        </div>
      </div>
    </div>
  );
}