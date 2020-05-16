export const shuffle = deck => {
  const result = deck.slice()

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [result[i], result[randomIndex]] = [result[randomIndex], result[i]]
  }

  return result
}

export const last = deck => deck[deck.length - 1]
