import { useEffect, useState } from 'react';
import axios from '../utils/mockAxios';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // In actual production this points to the deployed backend link
        axios.get('http://localhost:5001/api/profile')
            .then(res => setProfile(res.data))
            .catch(err => console.error('Failed to load profile', err));
    }, []);

    return (
        <div className="flex flex-col gap-32">
            <Hero profile={profile} />
            <About profile={profile} />
            <Education />
            <Skills />
            <Projects />
            <Contact profile={profile} />
        </div>
    );
};

export default Home;
