export interface Card {
    value: string;
    suit: string;
    numericValue: number[];
  }
  
  export function createDeck(): Card[] {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = [
      { value: "2", numericValue: [2] },
      { value: "3", numericValue: [3] },
      { value: "4", numericValue: [4] },
      { value: "5", numericValue: [5] },
      { value: "6", numericValue: [6] },
      { value: "7", numericValue: [7] },
      { value: "8", numericValue: [8] },
      { value: "9", numericValue: [9] },
      { value: "10", numericValue: [10] },
      { value: "Jack", numericValue: [10] },
      { value: "Queen", numericValue: [10] },
      { value: "King", numericValue: [10] },
      { value: "Ace", numericValue: [1, 11] },
    ];
  
    const deck: Card[] = [];
    suits.forEach((suit) =>
      values.forEach((value) =>
        deck.push({ value: value.value, suit, numericValue: value.numericValue })
      )
    );
    return deck;
  }
  
  export function shuffleDeck(deck: Card[]): Card[] {
    return deck.sort(() => Math.random() - 0.5);
  }
  