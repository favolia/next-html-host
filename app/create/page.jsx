"use client";
import React from 'react'

const page = () => {

    const createFolder = async () => {
        try {
            const response = await fetch("/api/create")
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log({ error: error.message })
        }
    }

  return (
    <button onClick={createFolder}>Create Folder</button>
  )
}

export default page