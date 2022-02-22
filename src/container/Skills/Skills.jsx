import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Skills.scss'

const Skills = () => {

    const [experiences, setExperiences] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const exps_query = '*[_type == "experiences"]'
        const skills_query = '*[_type == "skills"]'

        client.fetch(exps_query)
            .then((data) => {
                setExperiences(data)
            })

        client.fetch(skills_query)
            .then((data) => {
                setSkills(data)
            })
    }, [])
    
  return (
    <>
        <h2 className='head-text'>Skills & Experience</h2>

        <div className='app__skills-container'>
            <motion.div className="app__skills-list">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name + index}
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-item app__flex"
                    >
                        <div className='app__flex' style={{ backgroundColor: skill.bgColor}}>
                            <img src={urlFor(skill.icon)} alt={skill.name} />
                        </div>
                        <p className='p-text'>{skill.name}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div className='app__skills-exp'>
                {experiences.map((experience, index) => (
                    <motion.div
                        key={`${experience.name}_${index}`}
                        className="app__skills-exp-item"
                    >
                        <div className='app__skills-exp-year'>
                            <p className='bold-text'>{experience.year}</p>
                        </div>
                        <motion.div
                            className="app__skills-exp-works"
                        >
                            {experience.works.map((work, index) => (
                                <>
                                    <motion.div
                                    key={`${work.name}_${index}`}
                                    whileInView={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.5 }}
                                    data-tip
                                    data-for={`${work.name}_${index}`}
                                    className="app__skills-exp-work"
                                    >
                                        <h4 className="bold-text">{work.name}</h4>
                                        <p className='p-text'>{work.company}</p>
                                    </motion.div>
                                    <ReactTooltip
                                        id={`${work.name}_${index}`}
                                        effect="solid"
                                        arrowColor="#fff"
                                        className="skills-tooltip"
                                    >
                                        {work.description}
                                    </ReactTooltip>
                                </>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg')