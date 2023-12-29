import React from 'react';
import { projects } from '../constants/index';
import { Link } from 'react-router-dom';
import arrow from '../assets/icon/arrow.svg';
import ContentsAbout from '../components/ContentsAbout';

const Projects = () => {
    return (
        <section className="max-container">
            <h1 className="head-text">
                My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
            </h1>
            <div className="mt-5 flex flex-col gap-3 text-slate-500">
                <p>
                    While constantly developing and developing, I am working on various individual projects and company
                    team projects. I am very interested in growth. So, I am trying to develop without stopping and not
                    just focusing on development functions, but developing while contemplating better code and data
                    usage as an engineer.
                </p>
            </div>
            <div className="flex flex-wrap my-20 gap-16">
                {projects.map((project) => (
                    <div className="lg:w-[400px] w-full " key={project.name}>
                        <div className="block-container w-12 h-12">
                            <div className={`btn-back rounded-xl ${project.theme}`} />
                            <div className="btn-front rounded-xl flex justify-center items-center">
                                <img src={project.iconUrl} alt={project.name} className="w-1/2 h-1/2 object-contain" />
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col">
                            <h4 className="text-2xl font-poppins font-semibold">{project.name}</h4>
                            <p className="mt-2 text-slate-500">{project.description}</p>
                            <div className="mt-5 flex items-center gap-2 font-poppins">
                                <Link
                                    to={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='"font-semibold text-blue-600'
                                >
                                    Project Link
                                </Link>
                                <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="border-slate-200" />
            <ContentsAbout />
        </section>
    );
};

export default Projects;
