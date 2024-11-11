import React from 'react';

function Todo(props) {
    let [newTodo, setNewTodo] = React.useState("")
    
    let addTodo = (event) => {
        setNewTodo(event.target.value)
    }
    console.log(newTodo)
    return (
        <div className='border-4 border-black w-11/12 sm:w-4/5 max-w-screen-2xl flex flex-col items-center rounded-xl'>

            <h1 className='text-center my-4 font-bold text-lg sm:text-3xl'>Todo app!</h1>

            <div className='w-full max-w-screen-md px-5 flex items-center justify-center gap-4'>
                <input 
                className='border-2 border-gray-300 p-2  text-sm sm:text-lg my-4 w-full rounded-xl'
                placeholder='Enter your todo!'
                type="text" 
                onChange={addTodo}
                />

                <button className='bg-blue-500 text-white text-xs sm:text-base py-2  px-6 sm:px-10 rounded-full font-bold'>Add</button>
            </div>

            <h1 className='font-semibold text-2xl'>{newTodo}</h1>
        </div>
    );
}

export default Todo;