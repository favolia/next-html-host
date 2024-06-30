import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { path } from "@/config.json";

/**@param {NextRequest} req */
export const GET = async req => {
    try {
        const html = await fs.readFile(process.env.NODE_ENV === 'development' 
        ? `tmp${req.url.split("/onk")[1]}` 
        : `${path}${req.url.split("vercel.app/onk")[1]}`, 
        "utf8")

        return new NextResponse(html,
            {
                status: 200, headers: { 'content-type': 'text/html' }
            }
        )
    } catch (error) {
        return NextResponse.json(`File not found`, { status: 404 })
    }
}