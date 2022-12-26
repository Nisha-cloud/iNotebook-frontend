// import React from 'react'
import NoteContext from './NoteContext'
import { useState } from 'react'
import axios from 'axios'


const NoteState = (props) => {

    const notesInitial = []


    const [notes, setNotes] = useState(notesInitial)

    //GET ALL NOTES
    const getNotes = async () => {
        const User_token = localStorage.getItem('token')

        const URL = 'https://inotebook-9s60.onrender.com/notes/get'

        const AuthString = `Bearer ${User_token}`
        axios.get(URL, { headers: { Authorization: AuthString } })
            .then(response => {

                console.log("dsnvdnr",response)
                setNotes(response.data.notes)
                console.log(response.data)
            })
            .catch((error) => {
                console.log('error ' + error)
            })
    }

    //ADD NOTES
    const addNote = async (title, description, tag) => {

        const User_token = localStorage.getItem('token')

        const URL = 'https://inotebook-9s60.onrender.com/notes'

        const AuthString = 'Bearer '.concat(User_token)
        axios.post(URL, {title, description, tag}, { headers: { Authorization: AuthString }})
        // body: JSON.stringify({ title, description, tag })
            .then((response) => {

                console.log("dsvbdv", response)
                setNotes(response.data.notes)
                console.log(response.data.notes)
            })
            .catch((error) => {
                console.log('error ' + error)
            })
    }



            

            

        

//DELETE NOTES
const deleteNote = (id) => {

    const User_token = localStorage.getItem('token')

    const URL = `https://inotebook-9s60.onrender.com/notes/delete/${id}`

    const AuthString = 'Bearer '.concat(User_token)
    axios.delete(URL, { headers: { Authorization: AuthString } })
        .then(response => {
            // setNotes(response.data)
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            console.log(response.data)
        })
        .catch((error) => {
            console.log('error ' + error)
        })

}

//EDIT NOTE
const editNote = async (id, title, description, tag) => {


    const User_token = localStorage.getItem('token')

    const URL = `https://inotebook-9s60.onrender.com/notes/update/${id}`

    const AuthString = 'Bearer '.concat(User_token)
    axios.patch(URL, {title, description, tag}, { headers: { Authorization: AuthString } })
        .then(response => {
            // setNotes(response.data)

            let newNotes = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index]
                if (element._id === id) {
        
        
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
                
            }


            // const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log('error ' + error)
        })

//     const response = await fetch(`${host}/notes/update/${id}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczOWQ4N2ZmMDNmZWZkYjIyMWRlY2IiLCJpYXQiOjE2Njg2Njc1OTZ9.tiXy9BLkX-T370eiUW8X69Xyq_5mmAnfyNRfNEmXLmM'
//         },
//         body: JSON.stringify({ title, description, tag })
//     })
//     const json = response.json()

//     for (let index = 0; index < notes.length; index++) {
//         const element = notes[index]
//         if (element._id === id) {


//             element.title = title;
//             element.description = description;
//             element.tag = tag;
//         }
//     }

    }





return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
        {props.children}

    </NoteContext.Provider>

)

}


export default NoteState