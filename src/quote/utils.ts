import { Quote } from './models';

// System for filtering quotes

export function filterCharacter(character: string) {
  return (quotes: Quote[]) =>
    quotes.filter((q) => q.character.toLowerCase() === character.toLowerCase());
}

export function filterText(quote: string) {
  return (quotes: Quote[]) =>
    quotes.filter((q) => q.quote.toLowerCase().includes(quote.toLowerCase()));
}
