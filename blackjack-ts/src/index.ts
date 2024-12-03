import promptSync from "prompt-sync";
import { createDeck, shuffleDeck, Card } from "./deck";
import { calculateHandValue, isBust, displayHand } from "./game";

const prompt = promptSync();

function playBlackjack() {
  let bankroll = 100;
  let deck = shuffleDeck(createDeck());

  while (bankroll > 0) {
    console.log(`\nYour bankroll: $${bankroll}`);
    const bet = parseInt(prompt("Place your bet: "), 10);

    if (isNaN(bet) || bet <= 0 || bet > bankroll) {
      console.log("Invalid bet. Try again.");
      continue;
    }

    const playerHand: Card[] = [deck.pop()!, deck.pop()!];
    const dealerHand: Card[] = [deck.pop()!, deck.pop()!];

    displayHand(playerHand);
    displayHand(dealerHand, true);

    // Player's Turn
    let action: string;
    while ((action = prompt("Hit or Stand? ").toLowerCase()) === "hit") {
      playerHand.push(deck.pop()!);
      displayHand(playerHand);
      if (isBust(playerHand)) {
        console.log("You busted!");
        bankroll -= bet;
        break;
      }
    }

    if (!isBust(playerHand)) {
      // Dealer's Turn
      console.log("Dealer's Turn...");
      while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop()!);
      }
      console.log(
        `Dealer's final hand: ${dealerHand
          .map((card) => `${card.value} of ${card.suit}`)
          .join(", ")}`
      );

      const playerTotal = calculateHandValue(playerHand);
      const dealerTotal = calculateHandValue(dealerHand);

      if (isBust(dealerHand) || playerTotal > dealerTotal) {
        console.log("You win!");
        bankroll += bet;
      } else if (playerTotal === dealerTotal) {
        console.log("It's a tie!");
      } else {
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
