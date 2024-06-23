#[starknet::interface]
trait IGameProgress<TContractState> {
    fn updateMaxScore(ref self: TContractState, gameId: int, user: address, newMaxScore: int);
    fn getMaxScore(self: @TContractState, gameId: int, user: address) -> int;
}

// Define the contract
#[starknet::contract]
mod GameProgressTracker {
    // Storage for maximum scores per user per game
    #[storage]
    struct GameProgressStorage {
        max_scores: map(int, map(address, int))
    }

    // Implementations
    #[external]
    impl GameProgressStorage {
        #[event]
        #[derive(Drop, starknet::Event)]
        enum Event {
            MaxScoreUpdated(MaxScoreUpdated)
        }

        #[event]
        #[derive(Drop, starknet::Event)]
        struct MaxScoreUpdated {
            gameId: int,
            user: address,
            maxScore: int
        }

        // Implement the IGameProgress trait
        #[abi(embed_v0)]
        impl GameProgressTracker of super::IGameProgress<GameProgressStorage> {
            fn updateMaxScore(ref self: GameProgressStorage, gameId: int, user: address, newMaxScore: int) {
                self.max_scores[gameId][user] := newMaxScore;

                // Emit event
                self.emit(MaxScoreUpdated {
                    gameId: gameId,
                    user: user,
                    maxScore: newMaxScore
                });
            }

            fn getMaxScore(self: @GameProgressStorage, gameId: int, user: address) -> int {
                if self.max_scores[gameId].has_key(user) {
                    return self.max_scores[gameId][user];
                } else {
                    return 0; // Default value if no max score found
                }
            }
        }
    }
}
