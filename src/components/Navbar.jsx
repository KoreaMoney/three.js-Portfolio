import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import linkedin from '../assets/icon/linkedin.svg';
import github from '../assets/icon/github.svg';

const Navbar = () => {
    return (
        <header className="header">
            <NavLink
                to="/"
                className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
            >
                <p className="blue-gradient_text">DOWON</p>
            </NavLink>
            <nav className="flex text-lg gap-7 font-medium items-center">
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}>
                    About
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}>
                    Projects
                </NavLink>
                <Link to={'https://github.com/KoreaMoney'} target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="깃헙" className="w-6 h-6 object-contain cursor-pointer shadow-md" />
                </Link>
                <Link to={'https://www.linkedin.com/in/dowon-kim-415646237/'} target="_blank" rel="noopener noreferrer">
                    <img
                        src={linkedin}
                        alt="링크드인"
                        className="w-6 h-6 object-contain cursor-pointer rounded-sm shadow-md bg-slate-100"
                    />
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
