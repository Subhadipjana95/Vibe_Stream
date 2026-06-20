import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import VideoModel, { VideoProps } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB();
        const videos = await VideoModel.find({}).sort({createdAt: -1}).lean();
        if(!videos || videos.length < 1){
            return NextResponse.json([], {status: 404})
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest){
    try {
        const session = getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error: "Unauthorised to upload"},
                {status: 401}
            )
        }

        await connectDB();
        const body: VideoProps = await request.json()
        if(body.title || body.description || body.videoUrl || body.thumbnailUrl){
            return NextResponse.json(
                {error: "Required data for missing fields"},
                {status: 400}
            )
        }

        const videoData = {
            ...body,
            control: body.control ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            } 
        }
        const newVideo = await VideoModel.create(videoData)
        return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to upload video"},
            {status: 500}
        )
    }
}