import React from 'react';
import { skills, experiences } from '../constants/index';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ContentsAbout from '../components/ContentsAbout';

const About = () => {
    return (
        <section className="max-container">
            <h1 className="head-text">
                Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Dowon</span>
            </h1>
            <div className="mt-5 flex flex-col gap-3 text-slate-500">
                <p>
                    I work as a Frontend engineer in Korea. And I'm someone who tries to have a better user experience
                    every day and communicates with my team members to be with them even for a small part. I'm a
                    developer who thinks growth and communication are the most important parts.
                </p>
            </div>
            <div className="py-10 flex flex-col">
                <h3 className="subhead-text">My Skills</h3>
                <div className="mt-16 flex flex-wrap gap-12">
                    {skills.map((skill) => (
                        <div className="block-container w-20 h-20" key={skill.name}>
                            <div className="btn-back rounded-xl" />
                            <div className="btn-front rounded-xl flex justify-center items-center">
                                <img src={skill.imageUrl} alt={skill.name} className="w-1/2 h-1/2 object-contain" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-16">
                <h3 className="subhead-text">Work Experience</h3>
                <div className="mt-5 flex flex-col gap-3 text-slate-500">
                    <p>
                        While communicating with a team that values teamwork, I learned a lot from a lot of experience
                        and development. It is still ongoing.
                    </p>
                    <div className="mt-12 flex">
                        <VerticalTimeline>
                            {experiences.map((data) => (
                                <VerticalTimelineElement
                                    key={data.company_name}
                                    date={data.date}
                                    icon={
                                        <div className="flex justify-center items-center w-full h-full">
                                            <img
                                                src={data.icon}
                                                alt={data.company_name}
                                                className="w-[85%] h-[85%] object-contain rounded-2xl"
                                            />
                                        </div>
                                    }
                                    iconStyle={{
                                        background: data.iconBg,
                                    }}
                                    contentStyle={{
                                        borderBottom: '8px',
                                        borderStyle: 'solid',
                                        borderBottomColor: data.iconBg,
                                        boxShadow: 'none',
                                    }}
                                >
                                    <div>
                                        <h3 className="text-black text-xl font-poppins font-semibold">{data.title}</h3>
                                        <p className="text-black-500 font-medium font-base" style={{ margin: 0 }}>
                                            {data.company_name}
                                        </p>
                                    </div>
                                    <ul className="my-5 list-disc ml-5 space-y-2">
                                        {data.points.map((point, index) => (
                                            <li
                                                key={`data-points-${index}`}
                                                className="text-black-500/50 font-normal pl-1 text-sm"
                                            >
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                </div>
            </div>
            <hr className="border-slate-200" />
            <ContentsAbout />
        </section>
    );
};

export default About;
