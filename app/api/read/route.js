"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises";

export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param);
    const id = params("id") || null;

    try {
        const rootDir = await fs.readdir(process.cwd());

        // Check if the 'html' directory exists
        let htmlDir;
        try {
            htmlDir = await fs.readdir(process.cwd() + "/html");
        } catch (err) {
            if (err.code === 'ENOENT') {
                htmlDir = null; // Directory does not exist
            } else {
                throw err; // Some other error occurred
            }
        }

        let inDir = null;
        if (id && htmlDir) {
            try {
                inDir = await fs.readdir(process.cwd() + "/html/" + id);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    inDir = null; // Subdirectory does not exist
                } else {
                    throw err; // Some other error occurred
                }
            }
        }

        return NextResponse.json({
            root: rootDir,
            html: htmlDir,
            inDir: inDir
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
