import React, { useState } from 'react';
import './Resume.css';
import { useNavigate } from 'react-router';

function Resume({ updateValues ,logInfo}) {
    console.log(logInfo,"l")
    let navigate = useNavigate()
    const [details, setDetails] = useState({
        Name: '',
        Mail: '',
        Phone: '',
        Gender: '',
        Skills: []
    });
    console.log(details.Name, "n")
    const handleSkillsChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            // Add the skill to the array
            setDetails((prevDetails) => ({
                ...prevDetails,
                Skills: [...prevDetails.Skills, value]
            }));
        } else {
            // Remove the skill from the array
            setDetails((prevDetails) => ({
                ...prevDetails,
                Skills: prevDetails.Skills.filter((skill) => skill !== value)
            }));
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(details);
        updateValues(details)
        setDetails({ ...details, Name: "", Mail: '', Phone: '', Gender: '', Skills: [] })

    };
    function view() {
        navigate('/view')
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', backgroundColor: 'orange', padding: '20px' }}>RESUME BUILDER</h1>
            <div className='resume'>

                <form className='inputs' onSubmit={handleSubmit}>
                   
                    <label>Name: </label>
                    <input type='text' onChange={(e) => setDetails({ ...details, Name: e.target.value })} value={details.Name} />
                    <label>Mail: </label>
                    <input type='text' onChange={(e) => setDetails({ ...details, Mail: e.target.value })} value={details.Mail} />
                    <label>Phone:</label>
                    <input type='text' onChange={(e) => setDetails({ ...details, Phone: e.target.value })} value={details.Phone} />
                    <label>Gender:</label>
                    <select onChange={(e) => setDetails({ ...details, Gender: e.target.value })} value={details.Gender}>
                        <option>--select--</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                    </select>
                    <label>Skills:</label>
                    <div><input
                        type='checkbox'
                        name='skills'
                        value='Html'
                        checked={details.Skills.includes('Html')}
                        onChange={handleSkillsChange} />
                        <label>HTML</label></div>
                    <div> <input
                        type='checkbox'
                        name='skills'
                        value='Css'
                        checked={details.Skills.includes('Css')}
                        onChange={handleSkillsChange}
                    />
                        <label>Css</label></div>
                    <div> <input
                        type='checkbox'
                        name='skills'
                        value='JS'
                        checked={details.Skills.includes('JS')}
                        onChange={handleSkillsChange}
                    />
                        <label>JS</label></div>
                    <div> <input
                        type='checkbox'
                        name='skills'
                        value='React'
                        checked={details.Skills.includes('React')}
                        onChange={handleSkillsChange}
                    />
                        <label>React</label></div>
                    <div> <input
                        type='checkbox'
                        name='skills'
                        value='Php'
                        checked={details.Skills.includes('Php')}
                        onChange={handleSkillsChange}
                    />
                        <label>Php</label></div>

                    <div className='buttonSub'>
                        <button type='submit'>Submit</button><br /><br />
                        
                    </div>
                </form>

            </div>
            {logInfo.map((details) => (
                    <button onClick={view}>{details.user}</button>
                
            ))}
        </>
    );
}

export default Resume;
