import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: ["apple", "banana", "orange", "graphs"],
            users: [
                { name: "indhu", age: 23 },
                { name: "nandhu", age: 24 },
                { name: "pavi", age: 25 }
            ]
        };
    }


    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((itm, k) => <li key={k}>{itm}</li>)}
                </ul>
                <table>
                    <tr>
                        <td>NAME</td>
                        <td>AGE</td>

                    </tr>
                        {
                            this.state.users.map((itm,k)=>{
                                return(<tr>
                                    <td>{itm.name}</td>
                                    <td>{itm.age}</td>
                                </tr>
                                )
                            })
                        }
                </table>
            </div>
        )
    }
}

export default List;