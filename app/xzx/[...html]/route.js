import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';


/**@param {NextRequest} req */
export const GET = async req => {
    try {
        const html = await fs.readFile(process.cwd() + `/html${req.url.split("xzx")[1]}`, "utf8")

        return new NextResponse(html,
            {
                status: 200, headers: { 'content-type': 'text/html' }
            }
        )
    } catch (error) {
        return NextResponse.json("File not found", { status: 404 })
    }
}