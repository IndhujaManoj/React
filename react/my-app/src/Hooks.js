import React from "react";

class Hooks extends React.Component{
    constructor(props){
        super(props)
        this.state={
            counter:0
        }
        console.log("constructor Trigerred")//1
    }
    componentWillUnmount(){
        console.log('inside component will mount')//2
    }
    increment=()=>{
        this.setState((pre,prop)=>({counter:pre.counter+1}))
    }

    render(){
        console.log("inside render method")//3
        return(
            <div>Hooks
                <button onClick={this.increment}>Increment</button>
                <p>you have clicked {this.state.counter} times</p>
            </div>
        )
    }
    componentDidUpdate(){
        console.log('inside component did mount')//4
    }
    shouldComponentUpdate(){
        return true
    }
    componentWillUpdate(){
        console.log("inside component will update")
    }
    componentDidUpdate(){
        console.log("inside component did update")
    }
}
export default Hooks