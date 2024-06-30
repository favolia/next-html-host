"use server";
import { NextResponse } from "next/server";
import fs from "fs/promises";

export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param);
    const id = params("id") || null;
    const custom = params("custom") || null;

    try {

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
            status: true
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
