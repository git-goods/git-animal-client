export function pickGreeting(greetings: readonly string[], random = Math.random): string {
  return greetings[Math.floor(random() * greetings.length)] ?? '';
}
