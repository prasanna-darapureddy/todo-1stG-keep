import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Home.css'
import NoteItem from "../noteItem/NoteItem";


interface IState {
    isStarted: boolean;
    id: string;
    title: string;
    description: string;
    notesList: { id: string, title: string, description: string }[];
}

const Home: React.FC = () => {

    const [isStarted, setIsStarted] = useState<IState['isStarted']>(false)
    const [title, setTitle] = useState<IState['title']>('')
    const [description, setDescription] = useState<IState['description']>('')
    const [notesList, setNotesList] = useState<IState['notesList']>([])


    const onClickNoteInputButton = () => setIsStarted(true)

    const onClickCloseButton = () => {
        setIsStarted(false)
        setTitle('')
        setDescription('')
    }

    const onAddButton = () => {

        if (title === "" && description === "") {
            alert("Enter Required fields")

        } else if ((title !== "" || description === "") || (title === "" || description !== "")
            || (title !== "" && description !== "")) {

            const newNote = { id: uuidv4(), title, description }

            setNotesList([...notesList, newNote])
            setTitle('')
            setDescription('')
        }
        setIsStarted(false)
    }

    useEffect(() => {
        const storedList = localStorage.getItem('notesList')

        if (storedList) {
            setNotesList(JSON.parse(storedList))
            console.log(storedList)
        }
    }, [])

    useEffect(() => {
        if (notesList) {
            localStorage.setItem('notesList', JSON.stringify(notesList))
        }
    }, [notesList])



    const handleDelete = (id: string) => {
        const updatedList = notesList.filter(eachNote => (
            eachNote.id !== id
        ))
        setNotesList(updatedList)
    }


    const renderInputFields = () => (
        <>
            {
                isStarted ?
                    (
                        <div className='editable-container'>
                            <div className='title-input-container'>
                                <input type="text" placeholder='Title' className='title-input' value={title} onChange={(event) => setTitle(event.target.value)} />
                            </div>
                            <input type="text" className='description-input' autoFocus={true} placeholder='Take a note...' value={description} onChange={(event) => setDescription(event.target.value)} />
                            <div className='buttons-container'>
                                <button type="button" className='add-button' onClick={onAddButton}>Add</button>
                                <button className='close-button' type='button' onClick={onClickCloseButton}>Close</button>
                            </div>

                        </div>
                    ) :
                    (
                        <div className='note-input-contianer'>
                            <button className='note-input-button' type='button' onClick={onClickNoteInputButton}>
                                <input type="text" placeholder="Take a note..." className="note-input" />
                            </button>
                        </div>
                    )
            }
        </>
    )

    return (
        <div className='bg-container'>
            {renderInputFields()}
            <div className='content-container'>
                <p className='sub-title'>PINNED</p>
                <ul className='notes-list-container'>
                    {notesList.map(eachNote => (
                        <NoteItem eachNote={eachNote} key={eachNote.id} handleDelete={handleDelete} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Home