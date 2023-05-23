import { Component } from "react";

class ButtonBind extends Component{
    constructor(props){
        super()
        this.state={count:0}
        this.handleClick=this.handleClick.bind(this)
    }
   // if we use arrow function means we dont use bind
    handleClick(){
        this.setState({
            count:this.state.count+1
        },function(){
            console.log("job is done")
        })
    }
    render(){
        return(
            <div>
                <h3>Button Pressed:{this.state.count}</h3>
                <button onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}
export default ButtonBind
