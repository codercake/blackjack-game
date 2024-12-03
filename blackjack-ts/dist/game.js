"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHandValue = calculateHandValue;
exports.isBust = isBust;
exports.displayHand = displayHand;
function calculateHandValue(hand) {
    const possibleValues = hand.flatMap((card) => card.numericValue);
    const uniqueValues = new Set();
    function calculate(total, cardValue) {
        return total.flatMap((t) => cardValue.map((cv) => t + cv));
    }
    const totals = hand.reduce((acc, card) => calculate(acc, card.numericValue), [0]);
    totals.forEach((t) => uniqueValues.add(t <= 21 ? t : Infinity));
    return Math.min(...uniqueValues);
}
function isBust(hand) {
    return calculateHandValue(hand) > 21;
}
function displayHand(hand, isDealer = false) {
    if (isDealer) {
        console.log(`Dealer's hand: [${hand[0].value} of ${hand[0].suit}, Hidden Card]`);
    }
    else {
        console.log(`Your hand: ${hand.map((card) => `${card.value} of ${card.suit}`).join(", ")}`);
    }
}
