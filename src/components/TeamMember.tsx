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
    name: 'Hamza',
    img: '/hamza.jpg',
    description: 'Lead Programmer and Biology Resource Creator',
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
  {
    name: 'Lamis',
    img: '#',
    description: 'Londons Ambassador and Resource Creator',
  },
  {
    name: 'Ashton',
    img: '#',
    description: 'Newcastle city Ambassador',
  },
  {
    name: 'Tina',
    img: '#',
    description: 'Bradford city Ambassador',
  },
  {
    name: 'Olivia',
    img: '#',
    description: 'Cardiff Ambassador',
  },
  
  
];

export const TEAM_MEMBER_NAMES = teamMembers.map(member => member.name);

export function TeamMember({ name, img, description }: TeamMemberType) {
  const assetBase = import.meta.env.BASE_URL || '/';
  const PLACEHOLDER_IMG = `${assetBase}placeholder-profile.png`;
  const imageSrc = img && img !== '#' ? (img.startsWith('http') ? img : `${assetBase}${img.replace(/^\//, '')}`) : PLACEHOLDER_IMG;
  return (
    <div className="text-center">
      <img src={imageSrc} alt={name} className="mx-auto rounded-full w-24 h-24 mb-4 object-cover" />
      <h3 className="text-xl font-semibold dark:text-white">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
