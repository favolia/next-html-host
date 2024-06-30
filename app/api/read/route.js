"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "@/config.json";

export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param);
    const id = params("id") || null;
    const custom = params("custom") || null;

    try {
        const rootDir = await fs.readdir(process.cwd());

        let customDir;
        try {
            customDir = await fs.readdir(custom||process.cwd());
        } catch (err) {
            if (err.code === 'ENOENT') {
                customDir = null; // Directory does not exist
            } else {
                throw err; // Some other error occurred
            }
        }

        let inDir = null;
        try {
            inDir = await fs.readdir(process.env.NODE_ENV === 'development' ? `tmp${id}` : `${path}/` + id);
        } catch (err) {
            if (err.code === 'ENOENT') {
                inDir = null; // Subdirectory does not exist
            } else {
                throw err; // Some other error occurred
            }
        }

        return NextResponse.json({
            root: rootDir,
            inDir: inDir,
            customDir: customDir
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
