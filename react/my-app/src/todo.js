import React from "react";

class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            items:["indhu","nandhu"],
            myTxt:''
        }
    }
    inputVal=(e)=>{
        this.setState({myTxt:e.target.value})

    }
    adding=(e)=>{
        let currentText=this.state.myTxt;
        let currentItem=this.state.items;
        currentItem.push(currentText)
        this.setState({items:currentItem})
        this.state.myTxt="";
       
        
    }
    delItem=(i)=>{
        let currentItem=this.state.items;
        currentItem.splice(i,1)
        this.setState({items:currentItem})
    }
    render(){
        return(
            <div>
                <input type="text" onChange={this.inputVal} value={this.state.myTxt}/><button onClick={this.adding}>Add</button>
                <ul>
                    {this.state.items.map((itm,key)=>
                <li>{itm}<button onClick={this.delItem}>Delete</button></li>
                    )}
                </ul>
                <p>{this.state.myTxt}</p>
            </div>
        )
    }
}
export default Todo