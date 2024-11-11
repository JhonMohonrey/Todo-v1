import React from 'react';

function Todo(props) {

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234".split("");

    let generatedIDs = new Set();
    let newID;
    
    const generateRandomID = (characters) => {
        do {
            newID = "";
            for (let i = 0; i < 8; i++) {
                newID += characters[Math.floor(Math.random() * characters.length)];
            }
        } while (generatedIDs.has(newID));
    
        generatedIDs.add(newID);
    }
    generateRandomID(characters)
    

    let [newTodo, setNewTodo] = React.useState("")
    let [todo, setTodo] = React.useState([
        {
            todo: "Read Books",
            id: newID,
        }
    ])

    let addTodo = (event) => {
        setNewTodo(event.target.value)
    }

    const addBtn = () => {

        setTodo(prev => {
            return [
                {
                    todo: `${newTodo}`,
                    id: newID, 
                },
                ...prev,
            ]
        })
    }

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

                <button className='bg-blue-500 text-white text-xs sm:text-base py-2  px-6 sm:px-10 rounded-full font-bold' onClick={addBtn}>Add</button>
            </div>

            {todo.map((data, i) => {
                return <div key={i} className='w-11/12 px-2 border-2 border-black my-2 rounded-md'>
                    <h1 className='text-xl sm:text-4xl font-bold'>{i += 1} {data.todo}</h1>
                    <h1 className='text-sm text-gray-400 font-bold'>id: {data.id}</h1>
                </div>
            })}
            {/* <h1 className='font-semibold text-2xl'>{newTodo}</h1> */}
        </div>
    );
}

export default Todo;