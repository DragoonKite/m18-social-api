const {Schema, model} = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Sorry, that username is not available. Please pick another name.',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter a valid, unique email address.',
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: ture
        },
        id: false
    }
);

// friendcount virtual to retrive length of the user's friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;