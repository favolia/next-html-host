"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises"

export const GET = async req => {
    try {
        // await fs.mkdir("_BROOO")
        // console.log("_BROOO folder has created")
        const files = await fs.readdir(process.cwd())
        return NextResponse.json(files, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}