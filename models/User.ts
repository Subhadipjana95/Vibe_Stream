import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserProps {
    email: string
    password: string
    _id?: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const UserModel = models?.UserModel || model<UserProps>("User", userSchema);
export default UserModel;
