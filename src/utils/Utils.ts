export class Utils {
  // Generates a list of unique random numbers within the range [0, max)
  static getUniqueRandomNumbers(max: number, count: number): number[] {
    // Return empty array if input is invalid
    if (max <= 0 || count <= 0) return [];

    // Ensure we do not request more numbers than available
    count = Math.min(count, max);

    // Create an array with sequential numbers: [0, 1, 2, ..., max - 1]
    const numbers = Array.from({ length: max }, (_, i) => i);

    // Shuffle the array using Fisher-Yates algorithm for unbiased randomness
    for (let i = numbers.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap current element with the randomly selected one
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Return the first "count" elements from the shuffled array
    return numbers.slice(0, count);
  }

  static getRandomNumber(max: number): number {
    if (max <= 0) throw new Error('max must be greater than 0');
    return Math.floor(Math.random() * max) + 1;
  }

  static extractNumber(text: string): number {
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  static generateRandomString(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
}
