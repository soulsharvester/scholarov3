import React from 'react';
import { Link } from 'react-router-dom';

type FeaturedResourceCardProps = {
  title: string;
  description: string;
  image: string;
  author: string;
  link: string;
};

export default function FeaturedResourceCard({ title, description, image, author, link }: FeaturedResourceCardProps) {
  const isPdfLink = link.toLowerCase().endsWith('.pdf');
  const assetBase = import.meta.env.BASE_URL || '/';
  const resolvedImage = image.startsWith('http') ? image : `${assetBase}${image.replace(/^\//, '')}`;
  const resolvedLink = isPdfLink ? `${assetBase}${link.replace(/^\//, '')}` : link;

  const cardContent = (
    <>
      <div className="relative h-48 overflow-hidden">
        <img
          src={resolvedImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-cornflower-blue bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Resource
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-cornflower-blue">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">By {author}</p>
      </div>
    </>
  );

  return isPdfLink ? (
    <a
      href={resolvedLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {cardContent}
    </a>
  ) : (
    <Link
      to={link}
      className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {cardContent}
    </Link>
  );
}
