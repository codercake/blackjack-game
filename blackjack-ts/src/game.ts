import { Card } from "./deck";

export function calculateHandValue(hand: Card[]): number {
  const possibleValues = hand.flatMap((card) => card.numericValue);
  const uniqueValues = new Set<number>();

  function calculate(total: number[], cardValue: number[]) {
    return total.flatMap((t) => cardValue.map((cv) => t + cv));
  }

  const totals = hand.reduce(
    (acc, card) => calculate(acc, card.numericValue),
    [0]
  );
  totals.forEach((t) => uniqueValues.add(t <= 21 ? t : Infinity));
  return Math.min(...uniqueValues);
}

export function isBust(hand: Card[]): boolean {
  return calculateHandValue(hand) > 21;
}

export function displayHand(hand: Card[], isDealer = false): void {
  if (isDealer) {
    console.log(
      `Dealer's hand: [${hand[0].value} of ${hand[0].suit}, Hidden Card]`
    );
  } else {
    console.log(
      `Your hand: ${hand.map((card) => `${card.value} of ${card.suit}`).join(", ")}`
    );
  }
}
