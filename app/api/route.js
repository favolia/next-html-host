import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

/**@param {NextRequest} req */
export const GET = async req => {
    const arr = []
    try {
        const files = await fs.readdir(process.cwd() + "/html");
        for (const file of files) arr.push(file);
    } catch (err) {
        console.error(err);
    }

    return NextResponse.json(arr)
}