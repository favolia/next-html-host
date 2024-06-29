"use server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import short from "short-uuid";

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
        const baseDir = '/public/html/';
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

        console.log(`process.cwd(): ${process.cwd()}`);
        console.log(`baseDir: ${baseDir}`);
        console.log(`uploadDir: ${uploadDir}`);

        await fs.mkdir(uploadDir, { recursive: true });
        console.log(`Directory created: ${uploadDir}`);
        const urls = [];

        for (const file of files) {
            if (file.type === "text/html") {
                urls.push(`${generateID}/${file.name}`);
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const filePath = `/${uploadDir}/${file.name}`;
                await fs.writeFile(filePath, buffer);
                console.log(`File written: ${filePath}`);
            } else {
                console.log(`Skipped file (not HTML): ${file.name}`);
            }
        }

        revalidatePath("/");

        return NextResponse.json({ status: "success", directory: baseDir, uploadDir, urls });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}