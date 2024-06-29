"use server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import short from "short-uuid";
import path from 'path';

export async function POST(req) {
    try {
        /**
         * @type {FormData}
         */
        const formData = await req.formData();
        const files = formData.getAll("file");
        if (files.length === 0) {
            console.log('No files uploaded.');
            return NextResponse.json({ status: "fail", error: "No files uploaded" });
        }
        const generateID = short.generate();

        const uploadDir = path.join('html', generateID);

        // Debug: log path information
        console.log(`process.cwd(): ${process.cwd()}`);
        console.log(`uploadDir: ${uploadDir}`);

        // Buat direktori baru dengan nama UUID
        await fs.mkdir(uploadDir, { recursive: true });
        console.log(`Directory created: ${uploadDir}`);
        const urls = [];

        for (const file of files) {
            if (file.type === "text/html") {
                urls.push(`${generateID}/${file.name}`);
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const filePath = path.join(uploadDir, file.name);
                await fs.writeFile(filePath, buffer);
                console.log(`File written: ${filePath}`);
            } else {
                console.log(`Skipped file (not HTML): ${file.name}`);
            }
        }

        revalidatePath("/");

        return NextResponse.json({ status: "success", directory: uploadDir, urls });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}
