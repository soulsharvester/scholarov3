import React from 'react';

export type TeamMemberType = {
  name: string;
  img: string;
  description: string;
};

export const teamMembers: TeamMemberType[] = [
  {
    name: 'Kabeer',
    img: '/scholaro/kabeer.jpeg',
    description: 'Founder & CEO',
  },
  {
    name: 'Raj',
    img: '/scholaro/raj.jpeg',
    description: 'Co-Founder',
  },
  {
    name: 'Elliot',
    img: '#',
    description: 'Programmer',
  },
  {
    name: 'Shane',
    img: '#',
    description: 'Resource Proofreader',
  },
  {
    name: 'Salahuddin',
    img: '#',
    description: 'Cameraman',
  },
  {
    name: 'Hamza',
    img: '/scholaro/hamza.jpg',
    description: 'Biology Resource Creator',
  },
  {
    name: 'Daniel',
    img: 'daniel.jpeg',
    description: 'Outreach Coordinator',
  },
  {
    name: 'Juwon',
    img: '/scholaro/juwon.jpeg',
    description: 'Content Creator',
  },
  {
    name: 'Farhiya',
    img: '/scholaro/farhiya.jpeg',
    description: 'English and RE Resource Creator',
  },
  {
    name: 'Rohail',
    img: '#',
    description: 'Resource Creator',
  },
  
];

export const TEAM_MEMBER_NAMES = teamMembers.map(member => member.name);

export function TeamMember({ name, img, description }: TeamMemberType) {
  const PLACEHOLDER_IMG = '/scholaro/placeholder-profile.png'; // Make sure this image exists in your public folder
  const imageSrc = img && img !== '#' ? img : PLACEHOLDER_IMG;
  return (
    <div className="text-center">
      <img src={imageSrc} alt={name} className="mx-auto rounded-full w-24 h-24 mb-4 object-cover" />
      <h3 className="text-xl font-semibold dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}