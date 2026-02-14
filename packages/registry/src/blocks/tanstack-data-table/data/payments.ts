export interface Payment {
  id: string
  amount: number
  status: string
  email: string
}

const DATA_COUNT = 45

const statusOptions = ['succes', 'processingn', 'failed'] as const

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandom<T>(values: readonly T[]): T {
  return values[getRandomInt(0, values.length - 1)]!
}

function randomAlphanum(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length))

  return result
}

function randomEmail() {
  const providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']

  return `${randomAlphanum(8)}@${pickRandom(providers)}`
}

function randomStatus() {
  return pickRandom(statusOptions)
}

function createRandomPayment(): Payment {
  return {
    id: randomAlphanum(8),
    amount: getRandomInt(100, 999),
    status: randomStatus(),
    email: randomEmail(),
  }
}

export function generatePayments(count = 5): Payment[] {
  return Array.from({ length: count }, () => createRandomPayment())
}

export const data: Payment[] = generatePayments(DATA_COUNT)
