import { User } from '../models/user.js';
import { Game } from '../models/game.js';

export const createGame = async (req, res, next) => {
    try{
        let userId = req.body.userId;
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message:"User does not exist, Please do signup!"});
        }

        const newGame = new Game({
            name: req.body.name,
            users: [userId]
        })
        
        const game = await newGame.save();

        res.status(200).json({
            id: game._id,
            name: game.name,
            key: game.key,
            users: game.users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Technical Issue, Please try after sometime!"});
    }
}

export const joinGame = async (req, res, next) => {
    try{
        let userId = req.body.userId;
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message:"User does not exist, Please do signup!"});
        }

        let gameKey = req.body.gameKey;
        const game = await Game.findOne({key: gameKey});
        if(!game){
            res.status(404).json({message:"Group does not exist, Please create one!"});
        }
        
        game.users.push(userId);
        const updatedGame =  await game.save();

        res.status(200).json({
            id: updatedGame._id,
            name: updatedGame.name,
            key: updatedGame.key,
            users: updatedGame.users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Technical Issue, Please try after sometime!"});
    }
}