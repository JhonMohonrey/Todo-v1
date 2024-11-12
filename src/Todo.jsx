import { data } from 'autoprefixer';
import React from 'react';

function Todo(props) {

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234".split("");

    let generatedIDs = new Set();
    let dataTodo = new Set();
    let newID;
    
    const generateRandomID = (characters) => {
        let attempt = 0;
        let maxAttempt = 100;
        do {
            newID = "";
            for (let i = 0; i < 8; i++) {
                newID += characters[Math.floor(Math.random() * characters.length)];
            }
            attempt++

            if (attempt > maxAttempt) {
                //Throw error Here!
            }

        } while (generatedIDs.has(newID));
    }
    generateRandomID(characters)

    let [newTodo, setNewTodo] = React.useState("")
    let addTodo = (event) => {
        setNewTodo(event.target.value)
    }

    //Default Todo
    let [todo, setTodo] = React.useState([
        {
            todo: "Todo Testing!",
            id: newID,
            editState: false,
        }
    ])

    //Check if its duplicate
    const duplicate = (todo, Set, type) => {
        todo.map(data => {
            Set.add(type ? data.id : data.todo)
            return data
        })
        
    }

    //Functions for Add new Todo
    const addingTodo = () => {
        if (newTodo.trim()) {
            if (!dataTodo.has(newTodo)) {
                setTodo(prev => {
                    return [
                        {
                            todo: `${newTodo}`,
                            id: newID, 
                            editState: false,
                        },
                        ...prev,
                    ]
                })
            }
            setNewTodo("")
        }
    }

    //Function for edit
    const editTodo = (id) => {
        setTodo(data => {
            return data.map(prev => {
                return prev.id === id ?
                {
                    ...prev,
                    editState: !prev.editState,
                } : prev
            })
        })
    }

    console.log("state ", todo)
    
    const addBtn = (btnType, id) => {
        if (btnType === 1) {
            addingTodo()
        } else if (btnType === 2) {
            editTodo(id)
        }
    }

    //True is for Id False is For String
    duplicate(todo, generatedIDs, true)
    duplicate(todo, dataTodo, false)
    console.log("xxx", generatedIDs)
    console.log("yyy", dataTodo)

    return (
        <div className='border-4 border-black w-11/12 sm:w-4/5 max-w-screen-2xl flex flex-col items-center rounded-xl'>

            <h1 className='text-center my-4 font-bold text-lg sm:text-3xl'>Todo app!</h1>

            <div className='w-full max-w-screen-md px-5 flex items-center justify-center gap-4'>
                <input 
                className='border-2 border-gray-300 p-2  text-sm sm:text-lg my-4 w-full rounded-xl'
                placeholder='Enter your todo!'
                type="text" 
                onChange={addTodo}
                value={newTodo}
                />

                <button className='bg-blue-500 text-white text-xs sm:text-base py-2  px-6 sm:px-10 rounded-full font-bold' onClick={() => addBtn(1)}>Add</button>
            </div>

            {todo.map((data, i) => {
                return <div key={i} className='w-11/12 px-2 border-2 border-black my-2 rounded-md'>
                    <h1 className='text-xl sm:text-4xl font-bold'>{i += 1} {data.todo}</h1>
                    <h1 className='text-sm text-gray-400 font-bold'>id: {data.id}</h1>

                    <button className='bg-gray-600 text-white text-xs sm:text-base py-2  px-4 sm:px-8 rounded-xl font-bold my-5' onClick={() => addBtn(2, data.id)}>Edit</button>
                </div>
            })}
        </div>
    );
}

export default Todo;