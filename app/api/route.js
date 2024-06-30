import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';


/**@param {NextRequest} req */
export const GET = async req => {
    const params = param => req.nextUrl.searchParams.get(param);
    const custom = params("custom") || null;
    try {
        const html = await fs.readFile(custom, "utf8")

        return new NextResponse(html,
            {
                status: 200, headers: { 'content-type': 'text/html' }
            }
        )
    } catch (error) {
        return NextResponse.json("File not found", { status: 404 })
    }
}