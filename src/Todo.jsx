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
            todo: "Read Books",
            id: newID,
            editState: false,
            isDelete: false,
        },
        {
            todo: "Play Games",
            id: "92890828",
            editState: false,
            isDelete: false,
        },
    ])

    //Leet Feedback if its Not Change or Duplicate

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
                            isDelete: false,
                        },
                        ...prev,
                    ]
                })
            }
            setNewTodo("")
        }
    }

    //Function for edit
    let [newEditTodo, setNewEditTodo] = React.useState("")
    const newEdit = (event) => {
        setNewEditTodo(event.target.value)
    }
    
    const EditAndSave = (id) => {
        setTodo(data => {
            return data.map(prev => {
                let x = newEditTodo.trim() ? newEditTodo : null
                let data = x !== null ? newEditTodo : prev.todo
                let filter = !dataTodo.has(data) ? data : prev.todo
                
                return prev.id === id ?
                {
                    ...prev,
                    todo: `${filter}`,
                    editState: !prev.editState,
                } : prev
            })
        })
        setNewEditTodo("")
    }

    //Function for delete
    const deleteBtn = (id) => {
        setTodo(prev => {
            return prev.filter(data => {
                return data.id === id ? null : data
            })
        })
    }

    //Create a confirm delete function here!
    const feedBack = (data, id) => {
        if (data === true) {
            deleteBtn(id)
        } else {
            setTodo(prev => {
                return prev.map(data => {
                    return data.id === id ?
                    {
                        ...data,
                        isDelete: !data.isDelete,
                    } : data
                })
            })
        }
    }

    //Are you sure? Delete this Todo
    const ConfirmDelete = (id) => {
        setTodo(prev => {
            return prev.map(data => {
                return data.id === id ?
                {
                    ...data,
                    isDelete: !data.isDelete,
                } : data
            })
        })
    }

    const addBtn = (btnType, id) => {
        if (btnType === 1) {
            addingTodo()
        } else if (btnType === 2) {
            EditAndSave(id)
        } else {
            // deleteBtn(id) //Important for Delete Todo
            //If this click then confirm the confirm function 
            ConfirmDelete(id)
        }
    }

    //True is for Id False is For String
    duplicate(todo, generatedIDs, true)
    duplicate(todo, dataTodo, false)
    let btnDefault = ` text-xs sm:text-base py-2  px-6 sm:px-10 rounded-full font-bold mb-3`

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
                return <div key={i} className='w-11/12 px-2 border-2 border-black my-2 rounded-md relative'>
                    {
                        data.editState ?
                        <>
                            <input
                            className='border-2 border-gray-300 p-2  text-sm sm:text-lg my-4 w-full rounded-xl'
                            onChange={newEdit}
                            type="text" placeholder={`${data.todo}`} />

                            <button className={`${btnDefault} font-black bg-blue-400 text-white`} onClick={() => addBtn(2, data.id)} >Save</button>

                        
                        </> :
                        <>
                            <h1 className='text-xl sm:text-4xl font-bold'>{i += 1}.) {data.todo}</h1>
                            <h1 className='text-sm text-gray-400 font-bold'>id: {data.id}</h1>

                            <button className='bg-gray-600 text-white text-xs sm:text-base py-2  px-4 sm:px-8 rounded-xl font-bold sm:my-5' onClick={() => addBtn(2, data.id)}>Edit</button>

                            <button className='bg-red-600 ml-2 text-white text-xs sm:text-base py-2  px-4 sm:px-8 rounded-xl font-bold sm:my-5 my-2' onClick={() => addBtn(3, data.id)}>Delete</button>

                            {data.isDelete ? 
                                <div className='absolute border-2 border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex
                                flex-col py-2 px-8 bg-white rounded-2xl shadow-lg'>
                                    <p className='text-center text-base font-semibold sm:text-2xl'>Are you sure?</p>
    
                                    <div className='flex items-center justify-center gap-2 mt-2 sm:px-14'>
                                        <button className='bg-red-500 text-white px-4 rounded-lg sm:text-2xl' onClick={() => feedBack(true, data.id)} >Yes</button>
                                        <button className='bg-blue-500 text-white px-4 rounded-lg sm:text-2xl' onClick={() => feedBack(false, data.id)}>No</button>
                                    </div>
                                </div>
                            : null}
                           
                        </>
                    }
                </div>
            })}
        </div>
    );
}

export default Todo;

//Position absolute
// Center = [absolute border-2 border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2]