"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const deck_1 = require("./deck");
const game_1 = require("./game");
const prompt = (0, prompt_sync_1.default)();
function playBlackjack() {
    let bankroll = 100;
    let deck = (0, deck_1.shuffleDeck)((0, deck_1.createDeck)());
    while (bankroll > 0) {
        console.log(`\nYour bankroll: $${bankroll}`);
        const bet = parseInt(prompt("Place your bet: "), 10);
        if (isNaN(bet) || bet <= 0 || bet > bankroll) {
            console.log("Invalid bet. Try again.");
            continue;
        }
        const playerHand = [deck.pop(), deck.pop()];
        const dealerHand = [deck.pop(), deck.pop()];
        (0, game_1.displayHand)(playerHand);
        (0, game_1.displayHand)(dealerHand, true);
        // Player's Turn
        let action;
        while ((action = prompt("Hit or Stand? ").toLowerCase()) === "hit") {
            playerHand.push(deck.pop());
            (0, game_1.displayHand)(playerHand);
            if ((0, game_1.isBust)(playerHand)) {
                console.log("You busted!");
                bankroll -= bet;
                break;
            }
        }
        if (!(0, game_1.isBust)(playerHand)) {
            // Dealer's Turn
            console.log("Dealer's Turn...");
            while ((0, game_1.calculateHandValue)(dealerHand) < 17) {
                dealerHand.push(deck.pop());
            }
            console.log(`Dealer's final hand: ${dealerHand
                .map((card) => `${card.value} of ${card.suit}`)
                .join(", ")}`);
            const playerTotal = (0, game_1.calculateHandValue)(playerHand);
            const dealerTotal = (0, game_1.calculateHandValue)(dealerHand);
            if ((0, game_1.isBust)(dealerHand) || playerTotal > dealerTotal) {
                console.log("You win!");
                bankroll += bet;
            }
            else if (playerTotal === dealerTotal) {
                console.log("It's a tie!");
            }
            else {
                console.log("You lose!");
                bankroll -= bet;
            }
        }
        if (bankroll > 0 && prompt("Play another round? (y/n) ").toLowerCase() === "n") {
            break;
        }
    }
    console.log("Game over! Final bankroll:", bankroll);
}
playBlackjack();
