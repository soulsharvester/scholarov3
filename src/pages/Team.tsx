import React from 'react';
import { TeamMember, teamMembers, TEAM_MEMBER_NAMES } from '../components/TeamMember';
import NavBar from '../components/NavBar';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-24">
        {/* Meet The Team Section */}
        <section>
          <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {teamMembers.map((member: { name: any; img: any; description: any; }) => (
              <TeamMember
                key={member.name}
                name={member.name}
                img={member.img}
                description={member.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}