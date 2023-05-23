import { Component } from "react";

class Login extends Component{
    constructor(props){
        super(props)
    }

    handleClick(){
        console.log("class method working")
        console.log(this)

    }
    handleMyclick=(e)=>{
        alert('clicked')
        console.log(e)
    }
    render(){
        return(
            <div>
                <button onClick={this.handleMyclick}>Click Me</button>
            </div>
        )
    }
}
export default Login

