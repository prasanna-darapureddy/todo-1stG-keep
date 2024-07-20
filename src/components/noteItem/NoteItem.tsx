import React, { useState } from 'react'
import './NoteItem.css'

interface InputProps{
    eachNote: {
    id: string;
    title: string,
    description: string
   }   
   handleDelete: (id:string) => void;
}

interface Istate{
    isEditable: boolean;
    editTitle: string;
    editDescription: string;
}

const NoteItem = (props: InputProps) => {
    const [isEditable, setIsEditable] = useState<Istate['isEditable']>(false)
    const [editedTitle, setEditedTitle] = useState<Istate['editTitle']>(props.eachNote.title)
    const [editedDescription, setEditedDescription] = useState<Istate['editDescription']>(props.eachNote.description)

    const onClickDeleteButton = () => {
        props.handleDelete(props.eachNote.id)
    }; 
   
    const onClickEditButton = () => {
           setIsEditable(!isEditable)
    };     

    const onClickSaveButton = () => {       
        setIsEditable(!isEditable)
        props.eachNote.title = editedTitle
        props.eachNote.description = editedDescription
    }
    

    return(
        <li className="note-container">
            <div>
            {isEditable ? <input type="text" className= 'input-fields' onChange={(e)=>setEditedTitle(e.target.value)} value={editedTitle}/> : <p className='title'>{props.eachNote.title}</p>}
            {isEditable ? <textarea className= 'input-fields' onChange={(e)=>setEditedDescription(e.target.value)} value={editedDescription}/> : <p className='description'>{props.eachNote.description}</p>}
            </div>
            <div className='buttons-container'>
                <button type="button" onClick={onClickDeleteButton} className='buttons'>Delete</button>
                {isEditable ? null : <button type="button" onClick={onClickEditButton} className='buttons'>Edit</button>}
                {isEditable ? <button type='button' onClick={onClickSaveButton} className='buttons'>Save</button> : null}
            </div>
        </li>
    )
}
export default NoteItem