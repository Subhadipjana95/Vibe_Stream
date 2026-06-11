import mongoose, { Schema, model, models } from 'mongoose';

export const VIDEO_DIMENTIONS = {
    height: 1920,
    width: 1080
} as const

export interface VideoProps {
    _id?: mongoose.Types.ObjectId
    title: string
    description: string
    videoUrl: string
    thumbnailUrl: string
    control?: boolean
    transformation?: {
        height: number
        width: number
        quality: number
    }
}

const videoSchema = new Schema<VideoProps>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    control: {
        type: Boolean,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            default: VIDEO_DIMENTIONS.height
        },
        width: {
            type: Number,
            default: VIDEO_DIMENTIONS.width
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    }
}, { timestamps: true })


const VideoModel = models?.VideoModel || model<VideoProps>("Video", videoSchema)

export default VideoModel;