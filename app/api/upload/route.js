"use server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import short from "short-uuid";
import { path } from "@/config.json";

export async function POST(req) {
    try {
        // Mengambil FormData dari request
        const formData = await req.formData();
        const files = formData.getAll("file");

        // Periksa apakah ada file yang diunggah
        if (files.length === 0) {
            console.log('No files uploaded.');
            return NextResponse.json({ status: "fail", error: "No files uploaded" });
        }

        // Generate UUID untuk nama direktori baru
        const generateID = short.generate();
        const baseDir = process.env.NODE_ENV === 'development' ? 'tmp/' : `${path}/`;
        const uploadDir = baseDir + generateID;

        try {
            await fs.access(baseDir);
        } catch (err) {
            if (err.code === 'ENOENT') {
                // Buat direktori html jika belum ada
                await fs.mkdir(baseDir, { recursive: true });
                console.log(`Directory created: ${baseDir}`);
            } else {
                throw err; // Lempar kesalahan lain
            }
        }

        await fs.mkdir(uploadDir, { recursive: true });
        const urls = [];

        for (const file of files) {
            if (file.type === "text/html") {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const filePath = `${uploadDir}/${file.name}`;
                await fs.writeFile(filePath, buffer);
                urls.push(`${generateID}/${file.name}`);
                console.log(`File written: ${filePath}`);
            } else {
                console.log(`Skipped file (not HTML): ${file.name}`);
            }
        }

        revalidatePath("/");

        return NextResponse.json({ status: "success", directory: "onk/"+generateID, urls });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}