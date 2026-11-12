// The example trips shown on "My trips" (New York City, San Francisco, Miami). Dates are
// relative to today, so there is always an upcoming trip, a later one and a past one.
// Amounts are in cents (USD).

import { addDays, todayIso } from '../utils/dates'
import { splitEqual, splitPercent } from '../utils/money'
import { POI_CATALOG } from './poiCatalog'

const MAIN_TRAVELLER_ID = 'u1'

const USERS = [
  { id: 'u1', name: 'Maya Brooks', email: 'demo@tagalong.app', color: 'bg-ocean-600' },
  { id: 'u2', name: 'Aman Verma', email: 'aman@tagalong.app', color: 'bg-coral-500' },
  { id: 'u3', name: 'Priya Nair', email: 'priya@tagalong.app', color: 'bg-violet-500' },
  { id: 'u4', name: 'Rahul Mehta', email: 'rahul@tagalong.app', color: 'bg-amber-500' },
  { id: 'u5', name: 'Riya Kapoor', email: 'riya@tagalong.app', color: 'bg-emerald-600' },
]

function hoursAgo(h) {
  return new Date(Date.now() - h * 3_600_000).toISOString()
}

function poi(destination, name) {
  const found = POI_CATALOG[destination].find((p) => p.name === name)
  if (!found) throw new Error(`Unknown POI ${name}`)
  return found
}

function makePlaces(tripId, destination, specs) {
  return specs.map(([id, name, addedBy, notes = '', hours = 48], index) => ({
    id,
    tripId,
    addedBy,
    ...poi(destination, name),
    notes,
    isLocked: false,
    createdAt: hoursAgo(hours + index),
  }))
}

function makeDays(tripId, prefix, startDate, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-d${i + 1}`,
    tripId,
    dayNumber: i + 1,
    date: addDays(startDate, i),
  }))
}

function makeItems(dayId, specs) {
  return specs.map(([id, placeId, startTime, durationMinutes, extra = {}], position) => ({
    id,
    dayId,
    placeId,
    position,
    startTime,
    durationMinutes,
    isLocked: false,
    source: 'MANUAL',
    notes: '',
    costMinor: 0,
    version: 1,
    ...extra,
  }))
}

function expense(id, tripId, { title, amountMinor, paidBy, splitType, category, splits, hours }) {
  return {
    id,
    tripId,
    title,
    amountMinor,
    currency: 'USD',
    paidBy,
    splitType,
    category,
    splits,
    idempotencyKey: `seed-${id}`,
    createdAt: hoursAgo(hours),
  }
}

/** Replaces every exact `from` string value in a nested structure. */
function rebindId(value, from, to) {
  if (value === from) return to
  if (Array.isArray(value)) return value.map((v) => rebindId(v, from, to))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rebindId(v, from, to)]))
  return value
}

/**
 * Example trips with `sessionUser` ({ id, name, email }) as the main traveller,
 * so the logged-in account owns the New York trip and is a member of the others.
 */
export function createExampleData(sessionUser) {
  const data = buildExamples()
  if (!sessionUser) return data
  const rebound = rebindId(data, MAIN_TRAVELLER_ID, sessionUser.id)
  rebound.users = rebound.users.map((u) => (u.id === sessionUser.id ? { ...u, name: sessionUser.name, email: sessionUser.email, avatarUrl: sessionUser.avatarUrl ?? null } : u))
  return rebound
}

function buildExamples() {
  const today = todayIso()

  // Trip 1: New York City (upcoming, rich data)
  const nycStart = addDays(today, 21)
  const nyc = {
    id: 't-nyc',
    name: 'NYC Long Weekend',
    destination: 'New York City, New York',
    destinationId: 'nyc',
    startDate: nycStart,
    endDate: addDays(nycStart, 3),
    currency: 'USD',
    budgetMinor: 480000,
    groupType: 'friends',
    ownerId: 'u1',
    votingDeadline: addDays(today, 10) + 'T21:00:00',
    shareToken: 'nyc-weekend-7f3k',
    createdAt: hoursAgo(24 * 9),
  }

  const nycPlaces = makePlaces('t-nyc', 'nyc', [
    ['p-airport', 'JFK International Airport', 'u1', 'Delta DL 418 lands 10:45'],
    ['p-ludlow', 'The Ludlow Hotel', 'u2', 'Booked 2 rooms, late checkout on Sunday', 200],
    ['p-katz', 'Katz’s Delicatessen', 'u3', 'Get the pastrami on rye, and keep your ticket'],
    ['p-bridge', 'Brooklyn Bridge', 'u1', 'Walk it from the Brooklyn side for the skyline'],
    ['p-highline', 'The High Line', 'u3', 'Start at Gansevoort St and walk north'],
    ['p-keens', 'Keens Steakhouse', 'u2', 'Reserve a table in the pub room'],
    ['p-liberty', 'Statue of Liberty', 'u1', 'Go early, the lines build by 11'],
    ['p-dumbo', 'DUMBO waterfront', 'u4'],
    ['p-joes', 'Joe’s Pizza', 'u4', 'Classic slice, cash is quicker'],
    ['p-met', 'The Metropolitan Museum of Art', 'u3'],
    ['p-rock', 'Top of the Rock', 'u1', 'Book the sunset time slot'],
    ['p-park', 'Central Park', 'u2', 'Bethesda Terrace, then row boats on the lake'],
    ['p-911', '9/11 Memorial & Museum', 'u3', 'Timed tickets, allow a quiet hour after'],
    ['p-empire', 'Empire State Building', 'u4', 'Lit up beautifully at night'],
    ['p-broadway', 'Broadway show', 'u2', 'Orchestra seats, row M'],
    ['p-times', 'Times Square', 'u3', 'Quick look in the morning before the crowds'],
    ['p-levain', 'Levain Bakery', 'u4', 'Chocolate chip walnut cookies for the flight'],
    ['p-grand', 'Grand Central Terminal', 'u2', '', 20],
    ['p-sail', 'Sunset sail on the Hudson', 'u4', 'Pricey — vote if you’re in!', 12],
    ['p-russ', 'Russ & Daughters Cafe', 'u1', 'Fancy last-morning brunch?', 6],
  ])

  const nycDays = makeDays('t-nyc', 'nyc', nycStart, 4)
  const [d1, d2, d3, d4] = nycDays.map((d) => d.id)
  const nycItems = [
    ...makeItems(d1, [
      ['i-1', 'p-airport', '10:45', 45, { isLocked: true, notes: 'Flight lands, cab to hotel', costMinor: 9000 }],
      ['i-2', 'p-ludlow', '12:00', 60, { notes: 'Check-in + freshen up' }],
      ['i-3', 'p-katz', '13:30', 60, { costMinor: 12000 }],
      ['i-4', 'p-bridge', '15:00', 60],
      ['i-5', 'p-highline', '16:15', 90, { notes: 'Coffee stop at Chelsea Market', costMinor: 4000 }],
      ['i-6', 'p-keens', '19:30', 120, { notes: 'Table booked for 4', costMinor: 48000 }],
    ]),
    ...makeItems(d2, [
      ['i-7', 'p-liberty', '08:30', 180, { isLocked: true, source: 'AI', notes: 'First ferry from Battery Park', costMinor: 18000 }],
      ['i-8', 'p-dumbo', '12:00', 45, { source: 'AI' }],
      ['i-9', 'p-joes', '13:15', 60, { source: 'AI', costMinor: 4000 }],
      ['i-10', 'p-met', '15:00', 120, { source: 'AI', costMinor: 12000 }],
      ['i-11', 'p-rock', '17:15', 60, { source: 'AI', costMinor: 16000 }],
    ]),
    ...makeItems(d3, [
      ['i-12', 'p-park', '09:00', 120, { costMinor: 4000 }],
      ['i-13', 'p-911', '12:00', 90, { costMinor: 13200 }],
      ['i-14', 'p-empire', '15:00', 90, { costMinor: 17600 }],
      ['i-15', 'p-broadway', '18:30', 180, { notes: 'Booked — curtain at 19:00', costMinor: 52000 }],
    ]),
    ...makeItems(d4, [
      ['i-16', 'p-times', '09:30', 45],
      ['i-17', 'p-levain', '10:45', 60, { costMinor: 3000 }],
      ['i-18', 'p-airport', '13:30', 60, { isLocked: true, notes: 'Flight DL 421 departs 15:10', costMinor: 9000 }],
    ]),
  ]

  const nycVotes = [
    ['p-liberty', ['u1', 'u2', 'u3', 'u4'], []],
    ['p-bridge', ['u1', 'u2', 'u3', 'u4'], []],
    ['p-met', ['u1', 'u3', 'u4'], []],
    ['p-park', ['u1', 'u2', 'u3'], []],
    ['p-broadway', ['u2', 'u3', 'u4'], ['u1']],
    ['p-katz', ['u1', 'u3'], []],
    ['p-highline', ['u3', 'u1'], ['u4']],
    ['p-keens', ['u2', 'u1', 'u3'], []],
    ['p-dumbo', ['u4', 'u2'], []],
    ['p-rock', ['u1'], ['u2']],
    ['p-911', ['u3', 'u2'], []],
    ['p-empire', ['u4'], []],
    ['p-times', ['u3', 'u1', 'u4'], []],
    ['p-levain', ['u4', 'u2'], []],
    ['p-joes', ['u4', 'u1'], []],
    ['p-sail', ['u4', 'u2'], ['u1', 'u3']],
    ['p-grand', ['u2'], []],
    ['p-russ', ['u1', 'u3'], ['u4']],
  ].flatMap(([placeId, ups, downs]) => [
    ...ups.map((userId) => ({ id: `v-${placeId}-${userId}`, placeId, userId, value: 1 })),
    ...downs.map((userId) => ({ id: `v-${placeId}-${userId}`, placeId, userId, value: -1 })),
  ])

  const crew = ['u1', 'u2', 'u3', 'u4']
  const nycExpenses = [
    expense('e-1', 't-nyc', {
      title: 'Flights ORD ⇄ JFK (4 pax)', amountMinor: 124000, paidBy: 'u1', splitType: 'EQUAL', category: 'transit',
      splits: splitEqual(124000, crew), hours: 24 * 8,
    }),
    expense('e-2', 't-nyc', {
      title: 'The Ludlow Hotel · 3 nights', amountMinor: 240000, paidBy: 'u2', splitType: 'EQUAL', category: 'stay',
      splits: splitEqual(240000, crew), hours: 24 * 7,
    }),
    expense('e-3', 't-nyc', {
      title: 'Statue of Liberty ferry + crown tickets', amountMinor: 18000, paidBy: 'u3', splitType: 'EQUAL', category: 'activity',
      splits: splitEqual(18000, crew), hours: 24 * 5,
    }),
    expense('e-4', 't-nyc', {
      title: 'Broadway tickets', amountMinor: 52000, paidBy: 'u4', splitType: 'EXACT', category: 'activity',
      splits: [
        { userId: 'u1', shareMinor: 16000 },
        { userId: 'u2', shareMinor: 12000 },
        { userId: 'u3', shareMinor: 12000 },
        { userId: 'u4', shareMinor: 12000 },
      ],
      hours: 24 * 3,
    }),
    expense('e-5', 't-nyc', {
      title: 'Airport car service (SUV)', amountMinor: 14000, paidBy: 'u1', splitType: 'PERCENT', category: 'transit',
      splits: splitPercent(14000, [
        { userId: 'u1', percent: 25 },
        { userId: 'u2', percent: 25 },
        { userId: 'u3', percent: 30 },
        { userId: 'u4', percent: 20 },
      ]),
      hours: 30,
    }),
    expense('e-6', 't-nyc', {
      title: 'Deli gift box (shared gift)', amountMinor: 9600, paidBy: 'u3', splitType: 'EQUAL', category: 'shopping',
      splits: splitEqual(9600, ['u1', 'u3']), hours: 10,
    }),
  ]

  const nycSettlements = [
    { id: 's-1', tripId: 't-nyc', fromUser: 'u4', toUser: 'u1', amountMinor: 8000, settledAt: hoursAgo(20) },
  ]

  const nycPacking = [
    ['documents', 'Driver’s license / photo ID', true],
    ['documents', 'Flight tickets (PDF)', true],
    ['documents', 'Hotel booking confirmation', false],
    ['clothing', 'Layers for the evenings', true],
    ['clothing', 'Comfortable walking shoes', false],
    ['clothing', 'Light rain jacket', false],
    ['clothing', 'Sunglasses + cap', true],
    ['toiletries', 'Sunscreen SPF 50', false],
    ['toiletries', 'Toothbrush & toiletries kit', false],
    ['electronics', 'Power bank', true],
    ['electronics', 'Phone + camera chargers', false],
    ['health', 'Blister bandages', false],
    ['health', 'Basic medicines', false],
    ['gear', 'Reusable water bottle', true],
    ['gear', 'Tote bag for shopping', false],
  ].map(([category, label, packed], i) => ({ id: `pk-n-${i}`, tripId: 't-nyc', category, label, packed, ownerId: null }))

  // Trip 2: San Francisco (later, early-stage planning)
  const sfStart = addDays(today, 54)
  const sf = {
    id: 't-sf',
    name: 'San Francisco in the Fall',
    destination: 'San Francisco, California',
    destinationId: 'sf',
    startDate: sfStart,
    endDate: addDays(sfStart, 4),
    currency: 'USD',
    budgetMinor: 640000,
    groupType: 'friends',
    ownerId: 'u5',
    votingDeadline: null,
    shareToken: 'sf-fall-2m9q',
    createdAt: hoursAgo(24 * 3),
  }
  const sfPlaces = makePlaces('t-sf', 'sf', [
    ['s-bridge', 'Golden Gate Bridge', 'u5', 'Walk across early, before the fog lifts'],
    ['s-alcatraz', 'Alcatraz Island', 'u1'],
    ['s-lands', 'Lands End Trail', 'u3', 'Before 9am for no crowds'],
    ['s-painted', 'Painted Ladies', 'u5'],
    ['s-ferry', 'Ferry Building Marketplace', 'u1', 'Farmers market food crawl'],
    ['s-mission', 'Mission District murals', 'u3', 'Evening walk + burritos'],
    ['s-park', 'Golden Gate Park', 'u1', 'Rent bikes!'],
  ])
  const sfDays = makeDays('t-sf', 'sf', sfStart, 5)
  const sfItems = makeItems(sfDays[0].id, [
    ['si-1', 's-bridge', '07:30', 150, { costMinor: 0 }],
    ['si-2', 's-ferry', '12:00', 75, { costMinor: 9000 }],
  ])
  const sfVotes = [
    ['s-bridge', ['u1', 'u3', 'u5']],
    ['s-lands', ['u3', 'u5']],
    ['s-alcatraz', ['u1']],
    ['s-ferry', ['u1', 'u5']],
    ['s-park', ['u1', 'u3']],
  ].flatMap(([placeId, ups]) => ups.map((userId) => ({ id: `v-${placeId}-${userId}`, placeId, userId, value: 1 })))
  const sfExpenses = [
    expense('e-s1', 't-sf', {
      title: 'Alcatraz night tour deposit', amountMinor: 18000, paidBy: 'u5', splitType: 'EQUAL', category: 'activity',
      splits: splitEqual(18000, ['u1', 'u3', 'u5']), hours: 50,
    }),
  ]
  const sfPacking = [
    ['documents', 'Driver’s license / photo ID', false],
    ['documents', 'Travel insurance', false],
    ['clothing', 'Warm layers (the fog is cold)', false],
    ['electronics', 'Portable charger', false],
    ['gear', 'Clipper card for transit', false],
  ].map(([category, label, packed], i) => ({ id: `pk-s-${i}`, tripId: 't-sf', category, label, packed, ownerId: null }))

  // Trip 3: Miami (past)
  const miamiStart = addDays(today, -160)
  const miami = {
    id: 't-miami',
    name: 'Miami with the Crew',
    destination: 'Miami Beach, Florida',
    destinationId: 'miami',
    startDate: miamiStart,
    endDate: addDays(miamiStart, 2),
    currency: 'USD',
    budgetMinor: 300000,
    groupType: 'friends',
    ownerId: 'u2',
    votingDeadline: null,
    shareToken: 'miami-crew-x81p',
    createdAt: hoursAgo(24 * 190),
  }
  const miamiPlaces = makePlaces('t-miami', 'miami', [
    ['m-beach', 'South Beach', 'u2', '', 24 * 185],
    ['m-vizcaya', 'Vizcaya Museum & Gardens', 'u1', '', 24 * 185],
    ['m-joes', 'Joe’s Stone Crab', 'u4', 'Sunset dinner', 24 * 185],
  ])
  const miamiDays = makeDays('t-miami', 'mia', miamiStart, 3)
  const miamiItems = [
    ...makeItems(miamiDays[0].id, [['mi-1', 'm-beach', '11:00', 180]]),
    ...makeItems(miamiDays[1].id, [
      ['mi-2', 'm-vizcaya', '10:00', 60],
      ['mi-3', 'm-joes', '18:00', 120, { costMinor: 36000 }],
    ]),
  ]
  const miamiExpenses = [
    expense('e-m1', 't-miami', {
      title: 'Beach house in South Beach', amountMinor: 180000, paidBy: 'u2', splitType: 'EQUAL', category: 'stay',
      splits: splitEqual(180000, ['u1', 'u2', 'u4']), hours: 24 * 170,
    }),
  ]
  const miamiSettlements = [
    { id: 's-m1', tripId: 't-miami', fromUser: 'u1', toUser: 'u2', amountMinor: 60000, settledAt: hoursAgo(24 * 150) },
    { id: 's-m2', tripId: 't-miami', fromUser: 'u4', toUser: 'u2', amountMinor: 60000, settledAt: hoursAgo(24 * 150) },
  ]

  const members = [
    ...crew.map((userId, i) => ({ tripId: 't-nyc', userId, role: userId === 'u1' ? 'LEADER' : 'MEMBER', joinedAt: hoursAgo(24 * 9 - i) })),
    ...['u5', 'u1', 'u3'].map((userId, i) => ({ tripId: 't-sf', userId, role: userId === 'u5' ? 'LEADER' : 'MEMBER', joinedAt: hoursAgo(24 * 3 - i) })),
    ...['u2', 'u1', 'u4'].map((userId, i) => ({ tripId: 't-miami', userId, role: userId === 'u2' ? 'LEADER' : 'MEMBER', joinedAt: hoursAgo(24 * 190 - i) })),
  ]

  const activity = [
    ['a-1', 't-nyc', 'u4', 'PLACE_ADDED', { name: 'Sunset sail on the Hudson' }, 12],
    ['a-2', 't-nyc', 'u3', 'EXPENSE_ADDED', { title: 'Deli gift box (shared gift)', amountMinor: 9600 }, 10],
    ['a-3', 't-nyc', 'u1', 'PLACE_ADDED', { name: 'Russ & Daughters Cafe' }, 6],
    ['a-4', 't-nyc', 'u2', 'VOTED', { name: 'Broadway show', value: 1 }, 4],
    ['a-5', 't-nyc', 'u3', 'ITINERARY_UPDATED', { name: 'Empire State Building', day: 3 }, 2],
    ['a-6', 't-nyc', 'u4', 'SETTLED', { to: 'u1', amountMinor: 8000 }, 20],
    ['a-7', 't-sf', 'u5', 'EXPENSE_ADDED', { title: 'Alcatraz night tour deposit', amountMinor: 18000 }, 50],
    ['a-8', 't-sf', 'u3', 'PLACE_ADDED', { name: 'Lands End Trail' }, 40],
  ].map(([id, tripId, actorId, type, payload, hours]) => ({ id, tripId, actorId, type, payload, createdAt: hoursAgo(hours) }))

  return {
    users: USERS,
    trips: [nyc, sf, miami],
    members,
    places: [...nycPlaces, ...sfPlaces, ...miamiPlaces],
    votes: [...nycVotes, ...sfVotes],
    itineraryDays: [...nycDays, ...sfDays, ...miamiDays],
    itineraryItems: [...nycItems, ...sfItems, ...miamiItems],
    expenses: [...nycExpenses, ...sfExpenses, ...miamiExpenses],
    settlements: [...nycSettlements, ...miamiSettlements],
    packingItems: [...nycPacking, ...sfPacking],
    activity,
    // Who appears "online" in each example trip.
    presence: { 't-nyc': ['u2', 'u3'], 't-sf': ['u5'] },
  }
}
