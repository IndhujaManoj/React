import { Component } from "react";
const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Course</th>
            </tr>
        </thead>
    )
}
const TableBody = (props) => {
    const {charactersData}=props
    const rows=charactersData.map((character,index)=>{
        return(<tr key={index }><td>{character.name}</td><td>{character.course}</td></tr>)
    })
    return (
        <tbody>
          {rows}  
        </tbody>
    )
}

class Table extends Component {

    render() {
        const {charactersData}=this.props
        return (
            <table>
                <TableHead />
                <TableBody charactersData={charactersData}/>

            </table>
        )
    }
}

export default Table