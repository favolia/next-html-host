"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises";

export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param);
    const id = params("id") || null;
    const custom = params("custom") || null;

    try {
        const rootDir = await fs.readdir(process.cwd()+"/db/");

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
        if (id && htmlDir) { 
            try {
                inDir = await fs.readdir(process.cwd() + "/db/" + id);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    inDir = null; // Subdirectory does not exist
                } else {
                    throw err; // Some other error occurred
                }
            }
        }

        await fs.writeFile(process.cwd()+"/db/"+"example.html", "<p>HAI</p>", (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync(process.cwd()+"/db/"+"example.html", "utf8"));
            }
        })

        return NextResponse.json({
            root: rootDir,
            inDir: inDir,
            customDir: customDir
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
