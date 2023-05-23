import React, { Component } from "react";
const TableHeader=()=>{
    return  (
        <thead>
                <tr>
                    <th>Name</th>
                    <th>Course</th>
                </tr>
            </thead>
    )
    }
    const TableBody=()=>{
        return(
        <tbody>
      
        </tbody>
        )
    }

class Table extends Component{

    render(){
        return(
        <table>
            <TableHeader/>
            <TableBody/>
           
        </table>
        )
    }
}
export default Table