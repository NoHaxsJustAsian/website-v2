import React from 'react';
import { Icon } from '@iconify/react';

const TechnicalSkills = ({ skills }: { skills: any[] }) => {
    return (
        <ul className="flex flex-wrap justify-center p-0 m-0">
            {skills.map((skill, index) => (
                <li key={index} className="list-none text-center relative m-5 group flex flex-col items-center">
                    <span className="inline-block transition-all duration-500 transform group-hover:-translate-y-2.5">
                        <Icon icon={skill.icon} className="text-7xl mb-2.5 pb-2.5" />
                    </span>
                    <span className="w-full opacity-0 transition-all duration-500 group-hover:opacity-100 text-xs text-center">{skill.label}</span>
                </li>
            ))}
        </ul>
    );
};

export default TechnicalSkills;