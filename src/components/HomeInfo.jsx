import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/icon/arrow.svg';

const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-left"> {text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} alt="화살표" className="w-4 h-4 object-contain" />
        </Link>
    </div>
);

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">Dowon Kim</span> 🤚
            <br />A Frontend Engineer from South Korea.
        </h1>
    ),
    2: (
        <InfoBox
            text="A person who goes through the process of identifying, looking for, and solving problems until the end."
            link="/about"
            btnText="Learn more"
        />
    ),
    3: (
        <InfoBox
            text="Instead of just focusing on functions, 
            we thought about how to use it and how to use it to give users a better experience and how to optimize their data, 
            and we worked on and developed various projects. Curious about the impact?"
            link="/projects"
            btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox
            text="If you have any questions or want to ask me, feel free to contact me!"
            link="/contact"
            btnText="Contact"
        />
    ),
};

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
};

export default HomeInfo;
