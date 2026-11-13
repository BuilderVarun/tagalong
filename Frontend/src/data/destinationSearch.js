// Suggestions for the "Destination" fields: the hand-picked destinations plus US cities,
// towns and parks. Runs in the browser, so it is instant and works before logging in.
// Anything not in the list can still be typed in: the API finds it on the map when saving.

import { DESTINATIONS } from './destinations'
import { US_PLACES, US_STATES } from './usPlaces'

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents: "Rincón" matches "rincon"
    .replace(/[’'.]/g, '') // "St. Louis" matches "st louis", "Martha’s" matches "marthas"
    .replace(/[\s,]+/g, ' ')
    .trim()

const ABBREVIATIONS = Object.fromEntries(Object.entries(US_STATES).map(([code, name]) => [code.toLowerCase(), normalize(name)]))

const entry = (option, featured) => {
  const state = option.region.split(',')[0]
  return { option, featured, name: normalize(option.name), state: normalize(state), full: normalize(`${option.name} ${state}`) }
}

const FEATURED = DESTINATIONS.map((d) => entry(d, true))
const featuredKeys = new Set(FEATURED.map((e) => e.full))
const INDEX = [...FEATURED, ...US_PLACES.map((p) => entry(p, false)).filter((e) => !featuredKeys.has(e.full))]

/** "austin tx" → "austin texas", so a state code after a place name works. */
function expandStateCode(query) {
  const words = query.split(' ')
  const last = words.at(-1)
  if (words.length < 2 || !ABBREVIATIONS[last]) return query
  return [...words.slice(0, -1), ABBREVIATIONS[last]].join(' ')
}

/** Lower is better; null means no match. */
function rank(item, q) {
  if (item.full.startsWith(q)) return 0 // "aus" → Austin, "austin texas" → Austin, Texas
  if (item.name.split(' ').some((word) => word.startsWith(q))) return 1 // "beach" → Miami Beach
  if (item.name.includes(q)) return 2
  if (item.state.startsWith(q)) return 3 // "texas" → places in Texas
  if (item.full.includes(q)) return 4
  return null
}

/**
 * Destination suggestions for what has been typed so far. With nothing typed it
 * returns the hand-picked destinations; otherwise the best matches across the US.
 */
export function suggestDestinations(query, limit = 8) {
  const q = expandStateCode(normalize(query ?? ''))
  if (!q) return DESTINATIONS.slice(0, limit)

  const matches = []
  INDEX.forEach((item, order) => {
    const score = rank(item, q)
    // Hand-picked destinations win ties; otherwise keep the list order (bigger places first).
    if (score !== null) matches.push({ option: item.option, score: score - (item.featured ? 0.5 : 0), order })
  })
  return matches
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .slice(0, limit)
    .map((m) => m.option)
}

/** The text put in the field when a suggestion is chosen: "Austin, Texas". */
export const destinationLabel = (option) => `${option.name}, ${option.region.split(',')[0]}`
