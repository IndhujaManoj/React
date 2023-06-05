import React from 'react'
import './View.css';
function View({Viewinfo,deleteItems}) {
    function remove(index) {
        const update=Viewinfo.filter((item,i)=>i!==index)
        deleteItems(index)
  }
  return (
    <>
      <div className='head'>
        <h1>Resume</h1>
      </div>
      {Viewinfo.map((details, index) => (
        <div key={index} className='resume-container'>
          <h2>Resume for {details.Name}</h2>
          <table border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Skills</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.Name}</td>
                <td>{details.Mail}</td>
                <td>{details.Phone}</td>
                <td>{details.Gender}</td>
                <td>{details.Skills.join(', ')}</td>
                <td><button onClick={remove}>Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}


    </>
  )
}

export default View
