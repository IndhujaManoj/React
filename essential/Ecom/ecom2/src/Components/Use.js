import React, { useEffect, useState } from "react";

export const Use = () => {
  const sampledata = [
    { id: 1, name: "John", age: 20, city: "New York", country: "USA" },
    { id: 2, name: "Jane", age: 21, city: "London", country: "UK" },
    { id: 3, name: "Bob", age: 22, city: "Paris", country: "France" },
    { id: 4, name: "Alice", age: 23, city: "Berlin", country: "Germany" },
    { id: 5, name: "Tom", age: 24, city: "Tokyo", country: "Japan" },
    { id: 6, name: "Sara", age: 25, city: "Sydney", country: "Australia" },
  ];
  const [data,setData]=useState([])
  // useEffect(() => {
  //   setTimeout(()=>{
  //     document.title="useEffect"

  //     setData(sampledata)
  //   },3000)
  // },[]); 
  setTimeout(()=>{
    document.title="useEffect"
    setData(sampledata)
  },3000)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.length===0 && <tr><td>Loading...</td></tr>}
        {data.map((item,index) => (
          
          

          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.city}</td>
            <td>{item.country}</td>
          </tr>
        ))}
        <h2>{console.log("rend")}</h2>
      </tbody>
    </table>
  );
};
