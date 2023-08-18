import React, { useReducer } from 'react'

const Counter = () => {
    const initialValue = { count: 0 }
    const reducerFunction = (state, action) => {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            case 'replaceByValue':
                return { count: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducerFunction, initialValue)
    return (
        <div>
            count:{state.count}
            <div>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            </div>
            <div>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </div>
            <div>
                <button onClick={() => dispatch({ type: 'replaceByValue' ,payload:7})}>replaceBy Value</button>
            </div>
        </div>
    )
}

export default Counter
