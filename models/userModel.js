import mongoose from "mongoose"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    // age: {
    //     type: Number,
    //     required: true,
    // },
    // gender: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // phone: {
    //     type: String,
    //     required: true,
    // },
    category: {
        type: String,
        enum: ['Buyer', 'Seller'],
        required: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    // address: {
    //     type: String,
    //     required: true,
    // },
    // bank: {
    //     type: String,
    //     required: true,
    // },
    // company: {
    //     type: String,
    //     required: true,
    // },
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
})


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
}

export default mongoose.model('User', userSchema);