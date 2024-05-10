import { Container, Col, Row } from "react-bootstrap";
import TechnicalSkills from './TechnicalSkills';

// Icons
import swiftIcon from '@iconify/icons-logos/swift';
import javaIcon from '@iconify/icons-logos/java';
import firebaseIcon from '@iconify/icons-logos/firebase';
import typescriptIcon from '@iconify/icons-logos/typescript-icon';
import javascriptIcon from '@iconify/icons-logos/javascript';
import reactIcon from '@iconify/icons-logos/react';
import nodejsIcon from '@iconify/icons-logos/nodejs-icon';
import htmlIcon from '@iconify/icons-vscode-icons/file-type-html';
import cssIcon from '@iconify/icons-vscode-icons/file-type-css';
import tailwindIcon from '@iconify/icons-vscode-icons/file-type-tailwind';
import bootstrapIcon from '@iconify/icons-logos/bootstrap';
import sqlIcon from '@iconify/icons-skill-icons/mysql-dark';
import drRacketIcon from '@iconify/icons-vscode-icons/file-type-racket';
import latexDark from '@iconify/icons-skill-icons/latex-dark';
import cIcon from '@iconify/icons-logos/c';
import cppIcon from '@iconify/icons-logos/c-plusplus';
import objcIcon from '@iconify/icons-devicon-plain/objectivec';
import dockerIcon from '@iconify/icons-logos/docker-icon';
import postgresqlIcon from '@iconify/icons-logos/postgresql';
import mongodbIcon from '@iconify/icons-vscode-icons/file-type-mongo';
import nextjsIcon from '@iconify/icons-logos/nextjs-icon';
import expressIcon from '@iconify/icons-simple-icons/express';
import supabaseIcon from '@iconify/icons-devicon/supabase';
import jestIcon from '@iconify/icons-logos/jest';
import tensorflowIcon from '@iconify/icons-logos/tensorflow';
import numpyIcon from '@iconify/icons-logos/numpy';
import pytorchIcon from '@iconify/icons-devicon/pytorch';
import pandasIcon from '@iconify/icons-devicon/pandas';
import sklearnIcon from '@iconify/icons-simple-icons/scikitlearn';
import matplotlibIcon from '@iconify/icons-devicon/matplotlib';
import kerasIcon from '@iconify/icons-devicon/keras';
import python from '@iconify/icons-logos/python';

export const Skills = () => {
    const programmingLanguages = [
        { icon: python, label: 'Python' },
        { icon: javaIcon, label: 'Java' },
        { icon: typescriptIcon, label: 'TypeScript' },
        { icon: javascriptIcon, label: 'JavaScript' },
        { icon: swiftIcon, label: 'Swift' },
        { icon: cIcon, label: 'C' },
        { icon: cppIcon, label: 'C++' },
        { icon: objcIcon, label: 'Objective-C' },
        { icon: drRacketIcon, label: 'DrRacket' },
    ];

    const webDevelopment = [
        { icon: reactIcon, label: 'React' },
        { icon: nodejsIcon, label: 'Node.js' },
        { icon: htmlIcon, label: 'HTML' },
        { icon: cssIcon, label: 'CSS' },
        { icon: tailwindIcon, label: 'Tailwind' },
        { icon: bootstrapIcon, label: 'Bootstrap' },
        { icon: nextjsIcon, label: 'Next.js' },
        { icon: expressIcon, label: 'Express' },
    ];

    const databases = [
        { icon: sqlIcon, label: 'SQL' },
        { icon: postgresqlIcon, label: 'PostgreSQL' },
        { icon: mongodbIcon, label: 'MongoDB' },
        { icon: firebaseIcon, label: 'Firebase' },
        { icon: supabaseIcon, label: 'Supabase' },
    ];

    const machineLearningAI = [
        { icon: tensorflowIcon, label: 'TensorFlow' },
        { icon: numpyIcon, label: 'NumPy' },
        { icon: pytorchIcon, label: 'PyTorch' },
        { icon: pandasIcon, label: 'Pandas' },
        { icon: sklearnIcon, label: 'SKlearn' },
        { icon: matplotlibIcon, label: 'Matplotlib' },
        { icon: kerasIcon, label: 'Keras' },
    ];

    const utilities = [
        { icon: dockerIcon, label: 'Docker' },
        { icon: jestIcon, label: 'Jest' },
        { icon: latexDark, label: 'LaTeX' },
    ];

    return (
        <section className="skill" id="skills">
            <Container>
                <Row>
                    <Col>
                        <div className="text-center">
                            <h2>Technical Skills</h2>
                            <h3>Programming Languages</h3>
                            <TechnicalSkills skills={programmingLanguages}/>
                            <h3>Web Frameworks</h3>
                            <TechnicalSkills skills={webDevelopment}/>
                            <h3>Databases</h3>
                            <TechnicalSkills skills={databases}/>
                            <h3>Machine Learning / AI</h3>
                            <TechnicalSkills skills={machineLearningAI}/>
                            <h3>Utilities</h3>
                            <TechnicalSkills skills={utilities}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Skills;
