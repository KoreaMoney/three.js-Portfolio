import { infoin, kai } from '../assets/images';
import {
    contact,
    css,
    threejs,
    git,
    github,
    html,
    javascript,
    styled,
    query,
    jest,
    linkedin,
    reactrouter,
    nextjs,
    react,
    recoil,
    sass,
    tailwindcss,
    typescript,
    summiz,
} from '../assets/icon';

export const skills = [
    {
        imageUrl: css,
        name: 'CSS',
        type: 'Frontend',
    },
    {
        imageUrl: threejs,
        name: 'Threejs',
        type: 'Frontend',
    },
    {
        imageUrl: git,
        name: 'Git',
        type: 'Version Control',
    },
    {
        imageUrl: github,
        name: 'GitHub',
        type: 'Version Control',
    },
    {
        imageUrl: html,
        name: 'HTML',
        type: 'Frontend',
    },
    {
        imageUrl: javascript,
        name: 'JavaScript',
        type: 'Frontend',
    },
    {
        imageUrl: reactrouter,
        name: 'React-router-dom',
        type: 'Frontend',
    },
    {
        imageUrl: nextjs,
        name: 'Next.js',
        type: 'Frontend',
    },
    {
        imageUrl: react,
        name: 'React',
        type: 'Frontend',
    },
    {
        imageUrl: recoil,
        name: 'Recoil',
        type: 'State Management',
    },
    {
        imageUrl: sass,
        name: 'Sass',
        type: 'Frontend',
    },
    {
        imageUrl: styled,
        name: 'Styled-components',
        type: 'Frontend',
    },
    {
        imageUrl: tailwindcss,
        name: 'Tailwind CSS',
        type: 'Frontend',
    },
    {
        imageUrl: typescript,
        name: 'TypeScript',
        type: 'Frontend',
    },
    {
        imageUrl: jest,
        name: 'Jest',
        type: 'Testing',
    },
    {
        imageUrl: query,
        name: 'React-query',
        type: 'State Management',
    },
];

export const experiences = [
    {
        title: 'Frontend Developer',
        company_name: 'INFOIN',
        icon: infoin,
        iconBg: '#adffb0',
        date: 'April 2023 - Ongoing',
        points: [
            'Developing and maintaining web applications using React.js and other related technologies.',
            'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Participating in code reviews and providing constructive feedback to other developers.',
            'We created a digital twin platform for the first time and developed and maintained a web application that can perform from the start of the production process to 3D production at once.',
        ],
    },
    {
        title: 'Frontend Developer',
        company_name: 'KAI',
        icon: kai,
        iconBg: '#ade7ff',
        date: 'Oct 2023 - Dec 2023',
        points: [
            'Developing and maintaining web applications using React.js and other related technologies.',
            'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Participating in code reviews and providing constructive feedback to other developers.',
            'We created a web application comfortably to manage the a350 factory.',
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/KoreaMoney',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'www.linkedin.com/in/dowon-kim-415646237',
    },
];

export const projects = [
    {
        iconUrl: summiz,
        theme: 'btn-back-red',
        name: 'INFOIN BeyonD Platform',
        description:
            "In a company that makes digital twins, I'm applying 3D to the web using three.js together while acting as a front end and developing it from a user perspective And we are learning JavaScript and react together, and we are learning other publishers and new developers.",
        link: 'http://www.in4in.com/#digitaltwin',
    },
];
