import { describe, expect, it } from 'vitest'
import { destinationLabel, suggestDestinations } from '../src/data/destinationSearch'
import { US_PLACES } from '../src/data/usPlaces'

const names = (query, limit) => suggestDestinations(query, limit).map((d) => d.name)

describe('suggestDestinations', () => {
  it('shows the hand-picked destinations before anything is typed', () => {
    expect(names('')).toContain('New York City')
    expect(names('   ')).toHaveLength(8)
  })

  it('finds US places beyond the hand-picked ones', () => {
    expect(names('aust')[0]).toBe('Austin')
    expect(names('seattle')[0]).toBe('Seattle')
    expect(names('yosemite')[0]).toBe('Yosemite National Park')
    expect(names('nashv')).toEqual(['Nashville'])
  })

  it('puts hand-picked destinations first when both match', () => {
    expect(names('miami').slice(0, 2)).toEqual(['Miami', 'Miami Beach'])
    expect(names('new')[0]).toBe('New York City')
  })

  it('matches a word inside the name, a state, and a state code', () => {
    expect(names('beach', 50)).toContain('Myrtle Beach')
    expect(names('montana', 50)).toEqual(expect.arrayContaining(['Bozeman', 'Glacier National Park']))
    expect(names('portland me')).toEqual(['Portland'])
    expect(suggestDestinations('portland me')[0].region).toBe('Maine, USA')
  })

  it('ignores case, punctuation and accents', () => {
    expect(names('ST LOUIS')[0]).toBe('St. Louis')
    expect(names('marthas')[0]).toBe('Martha’s Vineyard')
    expect(names('rincon')[0]).toBe('Rincón')
  })

  it('still matches the text a chosen suggestion puts in the field', () => {
    const [austin] = suggestDestinations('austin')
    expect(destinationLabel(austin)).toBe('Austin, Texas')
    expect(names(destinationLabel(austin))).toEqual(['Austin'])
  })

  it('returns nothing for a place it does not know, and respects the limit', () => {
    expect(names('zzzz')).toEqual([])
    expect(names('a', 5)).toHaveLength(5)
  })
})

describe('US_PLACES', () => {
  it('has unique ids and a state for every place', () => {
    expect(new Set(US_PLACES.map((p) => p.id)).size).toBe(US_PLACES.length)
    expect(US_PLACES.every((p) => /^[A-Z].*, USA$/.test(p.region))).toBe(true)
    expect(US_PLACES.length).toBeGreaterThan(500)
  })
})
