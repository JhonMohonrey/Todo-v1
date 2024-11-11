import React from 'react';

function Todo(props) {
    return (
        <div className='border-4 border-black w-11/12 sm:w-4/5 max-w-screen-2xl flex flex-col items-center'>
            <h1 className='text-center my-4 font-bold text-lg sm:text-3xl'>Todo app!</h1>

            <div className='w-full max-w-screen-md px-5 flex items-center justify-center gap-4'>
                <input 
                className='border-2 border-gray-300 p-2  text-sm sm:text-lg my-4 w-full rounded-xl'
                placeholder='Enter your todo!'
                type="text" />

                <button className='border-2 bg-blue-500 text-white text-xs sm:text-base py-2  px-6 sm:px-10 rounded-full font-bold'>Add</button>
            </div>
        </div>
    );
}

export default Todo;