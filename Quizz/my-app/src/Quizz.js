import React, { useState } from 'react'
import './Quizz.css'
function Quizz() {
   
  
    const [answer,setAnswer]=useState({
        rainbow: '',
        bird: '',
        weekend: '',
        kennel: '',
        shape: '',
    })
    const [mark, setMark] = useState('')
    const [errors,setErrors]=useState({})
    const handleChane=(event)=>{
        
        const { name, value } = event.target;
        setAnswer((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear the error message for the corresponding question
          }));
    }
    const submithandle=(e)=>{
        e.preventDefault()
        let mark=0;
        let errorMsg={}
       
        if(answer.rainbow==='7'){
            mark++
        }
        else{
            errorMsg.rainbow='7'
        }
       
        if(answer.bird==='Peacock'){
            mark++
        }
        else{
            errorMsg.bird='peacock'
        }
        if(answer.weekend==='Wednesday'){
            mark++
        }else{
            errorMsg.weekend='wednesday'
        }
        if(answer.kennel==='Dog'){
            mark++
        }else{
            errorMsg.kennel='kennel'
        }
        if(answer.shape==='Circle'){
            mark++
        }else{
            errorMsg.shape='Circle'
        }
        console.log(mark,'mark')
        setMark(mark)
        setErrors(errorMsg)
    }
   
    return (
        <form onSubmit={submithandle}>
            <h1>Quizz</h1>              
              <h3>1.How many colors in Rainbow.</h3>
                <input type='radio' name='rainbow' value='4' onChange={handleChane}/><label>4</label><br/>
                <input type='radio' name='rainbow' value='8' onChange={handleChane}/><label>8</label><br/>
                <input type='radio' name='rainbow' value='7' onChange={handleChane}/><label>7</label><br/>
                <input type='radio' name='rainbow' value='9' onChange={handleChane}/><label>9</label><br/>
                {errors.rainbow && <p className="error">{errors.rainbow}</p>}

                <h3>2.Which is our national bird.</h3>
                <input type='radio' name='bird' value='Hen' onChange={handleChane}/><label>Hen</label><br/>
                <input type='radio' name='bird' value='Crow' onChange={handleChane}/><label>Crow</label><br/>
                <input type='radio' name='bird' value='Peacock' onChange={handleChane}/><label>Peacock</label><br/>
                <input type='radio' name='bird' value='Dove' onChange={handleChane}/><label>Dove</label><br/>
                {errors.rainbow && <p className="error">{errors.bird}</p>}

                <h3>3. Name the day that comes after Tuesday?</h3>
                <input type='radio' name='weekend' value='Sunday' onChange={handleChane}/><label>Sunday</label><br/>
                <input type='radio' name='weekend' value='Saturday' onChange={handleChane}/><label>Saturday</label><br/>
                <input type='radio' name='weekend' value='Wednesday' onChange={handleChane}/><label>Wednesday</label><br/>
                <input type='radio' name='weekend' value='Friday' onChange={handleChane}/><label>Friday</label><br/>
                {errors.rainbow && <p className="error">{errors.weekend}</p>}

                <h3>4.Which animal wags its tail and lives in a kennel?</h3>
                <input type='radio' name='kennel' value='Tiger' onChange={handleChane}/><label>Tiger</label><br/>
                <input type='radio' name='kennel' value='Lion' onChange={handleChane}/><label>Lion</label><br/>
                <input type='radio' name='kennel' value='Cat' onChange={handleChane}/><label>Cat</label><br/>
                <input type='radio' name='kennel' value='Dog' onChange={handleChane}/><label>Dog</label><br/>
                {errors.rainbow && <p className="error">{errors.kennel}</p>}

                <h3>5. Which shape has no sides and corners?</h3>
                <input type='radio' name='shape' value='Circle' onChange={handleChane}/><label>Circle</label><br/>
                <input type='radio' name='shape' value='Triangle' onChange={handleChane}/><label>Triangle</label><br/>
                <input type='radio' name='shape' value='Square' onChange={handleChane}/><label>Square</label><br/>
                <input type='radio' name='shape' value='Rectangle' onChange={handleChane}/><label>Rectangle</label><br/>
                {errors.rainbow && <p className="error">{errors.shape}</p>}

                <div className='ok'>
                    <button>ok</button>
                </div><br/>
               <div>score : {mark}</div>
        </form>

        
      
    )
}

export default Quizz
