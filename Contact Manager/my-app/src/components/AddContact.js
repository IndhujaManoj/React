import React, { PureComponent } from 'react'

class AddContact extends PureComponent {
    state={
        name:"",
        email:"",
    }
   

    add=(e)=>{
        e.preventDefault()
        this.props.AddContactHandler(this.state)
        this.setState({name:"",email:""})
    }
    

    render() {
        console.log(this.props.AddContactHandler,"p")
        return (
            <div className='ui main'>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.add}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text'
                        name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={(e)=>this.setState({name:e.target.value})}/>
                    </div>
                    <div className='field'>
                        <label>Mail</label>
                        <input type='text'
                        name='email'
                        placeholder='email'
                        value={this.state.email}
                        onChange={(e)=>this.setState({email:e.target.value})}/>
                    </div>
                    <button className='ui button blue'>Add</button>
                </form>
            </div>
        )
    }
}

export default AddContact