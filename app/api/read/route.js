"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises"

export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param)
    const id = params("id") || null

    try {
        // await fs.mkdir("_BROOO")
        // console.log("_BROOO folder has created")
        // const generateID = short.generate();
        // const uploadDir = path.join('html', generateID);
        // await fs.mkdir(uploadDir, { recursive: true });
        const rootDir = await fs.readdir(process.cwd())
        const htmlDir = await fs.readdir(process.cwd() + "/html")
        return NextResponse.json({
            root: rootDir,
            html: htmlDir,
            inDir: id ? await fs.readdir(process.cwd() + "/html/" + id) : null
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}