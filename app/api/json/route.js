import { NextResponse } from "next/server";
import { path } from "@/config.json";

export const GET = async () => {

    return NextResponse.json(path)
}