import mongoose from "mongoose";
const { Schema, model} = mongoose;

const gameSchema = new Schema({
    name:{type:String, required:true},
    key: { type: String, required: true, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{ timestamps: true });

const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 5; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
};

gameSchema.pre('validate', async function(next) {
    const game = this;

    // Function to generate and check for a unique private key
    const generateUniqueKey = async () => {
        game.key = generateRandomKey();
        const existingGame = await Game.findOne({ key: game.key });
        if (existingGame) {
            await generateUniqueKey(); // Recursively generate a new key if not unique
        }
    };

    if (!game.key) {
        await generateUniqueKey();
    }

    next();
});

export const Game = model('Game', gameSchema);