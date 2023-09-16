import mongoose from 'mongoose';

const resetPasswordSchema = mongoose.Schema({
  email: String,
  code: String,
  ExpireIn: Number

},{
    timestamps: true,
}

)

const ResetPassword= mongoose.model('ResetPassword', resetPasswordSchema)

export default ResetPassword;