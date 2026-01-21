import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Capitalized function
export function capitalizeWords(sentence: string): string {
  return sentence
    .split(' ')  // Split the sentence into words
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),  // Capitalize the first letter, lowercase the rest
    )
    .join(' ');  // Join the words back into a sentence
}


