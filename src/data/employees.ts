export interface Employee {
  id: number
  name: string
  email: string
  department: string
  salary: number
  hired: Date
  active: boolean
}

const departments = ['Engineering', 'Design', 'Sales', 'Support', 'Finance']
const names = [
  'Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Linus Torvalds', 'Margaret Hamilton',
  'Dennis Ritchie', 'Barbara Liskov', 'Ken Thompson', 'Radia Perlman', 'Tim Berners-Lee',
  'Katherine Johnson', 'Donald Knuth',
]

export const employees: Employee[] = Array.from({ length: 48 }, (_, i) => {
  const name = `${names[i % names.length]}${i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''}`
  return {
    id: i + 1,
    name,
    email: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@example.com`,
    department: departments[i % departments.length],
    salary: 52000 + ((i * 7919) % 48000),
    hired: new Date(2015 + (i % 10), (i * 5) % 12, 1 + ((i * 3) % 28)),
    active: i % 5 !== 0,
  }
})
