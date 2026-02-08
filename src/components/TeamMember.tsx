import React from 'react';

export type TeamMemberType = {
  name: string;
  img: string;
  description: string;
};

export const teamMembers: TeamMemberType[] = [
  {
    name: 'Kabeer',
    img: '/kabeer.jpeg',
    description: 'Founder & CEO and English Resource Creator',
  },
  {
    name: 'Raj',
    img: '/raj.jpeg',
    description: 'Co-Founder and Maths Resource Creator',
  },
  {
    name: 'Elliot',
    img: '#',
    description: 'Programmer and Physics Resource Creator',
  },
  {
    name: 'Shane',
    img: '#',
    description: 'Resource Proofreader',
  },
  {
    name: 'Salahuddin',
    img: '#',
    description: 'Chemistry Resource Creator and Cameraman',
  },
  {
    name: 'Hamza',
    img: '/hamza.jpg',
    description: 'Biology Resource Creator',
  },
  {
    name: 'Daniel',
    img: '/daniel.jpeg',
    description: 'Outreach Coordinator',
  },
  {
    name: 'Juwon',
    img: '/juwon.jpeg',
    description: 'Content Creator',
  },
  {
    name: 'Farhiya',
    img: '#',
    description: 'English and RE Resource Creator',
  },
  {
    name: 'Sareena',
    img: '#',
    description: 'English Resource Creator',
  },
  {
    name: 'Anas',
    img: '#',
    description: 'Maths Resource Creator',
  },
  
  
];

export const TEAM_MEMBER_NAMES = teamMembers.map(member => member.name);

export function TeamMember({ name, img, description }: TeamMemberType) {
  const PLACEHOLDER_IMG = '/placeholder-profile.png'; // Make sure this image exists in your public folder
  const imageSrc = img && img !== '#' ? img : PLACEHOLDER_IMG;
  return (
    <div className="text-center">
      <img src={imageSrc} alt={name} className="mx-auto rounded-full w-24 h-24 mb-4 object-cover" />
      <h3 className="text-xl font-semibold dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}