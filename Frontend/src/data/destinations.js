// Destination catalogue used by the hero search and "Trending" section.
// `gradient` gives every card a distinct sky without relying on remote images.
// `avgDailyMinor` is a rough per-person daily spend in cents.

export const DESTINATIONS = [
  {
    id: 'nyc', name: 'New York City', region: 'New York, USA', lat: 40.7128, lng: -74.006,
    tagline: 'Skyline views, delis and Broadway nights', bestTime: 'Apr – Jun, Sep – Nov', avgDailyMinor: 26000,
    tags: ['City', 'Food', 'Culture'], trending: true,
    gradient: 'from-coral-400 via-coral-300 to-sand-200', emoji: '🗽',
  },
  {
    id: 'sf', name: 'San Francisco', region: 'California, USA', lat: 37.7749, lng: -122.4194,
    tagline: 'Golden Gate fog, cable cars and sourdough', bestTime: 'Sep – Nov', avgDailyMinor: 24000,
    tags: ['City', 'Nature', 'Food'], trending: true,
    gradient: 'from-rose-400 via-orange-300 to-amber-200', emoji: '🌉',
  },
  {
    id: 'miami', name: 'Miami', region: 'Florida, USA', lat: 25.7617, lng: -80.1918,
    tagline: 'Beaches, Cuban coffee and Art Deco nights', bestTime: 'Dec – Apr', avgDailyMinor: 22000,
    tags: ['Beach', 'Nightlife'], trending: true,
    gradient: 'from-ocean-500 via-ocean-300 to-sand-200', emoji: '🏖️',
  },
  {
    id: 'yellowstone', name: 'Yellowstone', region: 'Wyoming, USA', lat: 44.428, lng: -110.5885,
    tagline: 'Geysers, bison and big-sky road trips', bestTime: 'May – Sep', avgDailyMinor: 16000,
    tags: ['Adventure', 'Road trip'], trending: true,
    gradient: 'from-sky-600 via-sky-400 to-slate-200', emoji: '🏔️',
  },
  {
    id: 'honolulu', name: 'Honolulu', region: 'Oahu, Hawaii, USA', lat: 21.3069, lng: -157.8583,
    tagline: 'Surf breaks, poke bowls and crater hikes', bestTime: 'Apr – Oct', avgDailyMinor: 25000,
    tags: ['Beach', 'Wellness'], trending: true,
    gradient: 'from-emerald-500 via-teal-300 to-sand-200', emoji: '🌴',
  },
  {
    id: 'new-orleans', name: 'New Orleans', region: 'Louisiana, USA', lat: 29.9511, lng: -90.0715,
    tagline: 'Jazz clubs, streetcars and beignets', bestTime: 'Feb – May', avgDailyMinor: 18000,
    tags: ['City', 'Food'], trending: true,
    gradient: 'from-amber-400 via-yellow-200 to-ocean-200', emoji: '🎷',
  },
  {
    id: 'charleston', name: 'Charleston', region: 'South Carolina, USA', lat: 32.7765, lng: -79.9311,
    tagline: 'Pastel row houses and harbor-side dinners', bestTime: 'Mar – May, Sep – Nov', avgDailyMinor: 19000,
    tags: ['Romantic', 'Heritage'],
    gradient: 'from-indigo-400 via-sky-300 to-sand-200', emoji: '⛵',
  },
  {
    id: 'grand-canyon', name: 'Grand Canyon', region: 'Arizona, USA', lat: 36.0544, lng: -112.1401,
    tagline: 'Rim trails and mile-deep sunsets', bestTime: 'Mar – May, Sep – Nov', avgDailyMinor: 14000,
    tags: ['Nature', 'Backpacking'],
    gradient: 'from-orange-500 via-amber-300 to-sand-200', emoji: '🏜️',
  },
  {
    id: 'asheville', name: 'Asheville', region: 'North Carolina, USA', lat: 35.5951, lng: -82.5515,
    tagline: 'Blue Ridge views, waterfalls and breweries', bestTime: 'Apr – Oct', avgDailyMinor: 15000,
    tags: ['Nature', 'Family'],
    gradient: 'from-green-600 via-emerald-300 to-sand-100', emoji: '🍃',
  },
  {
    id: 'chicago', name: 'Chicago', region: 'Illinois, USA', lat: 41.8781, lng: -87.6298,
    tagline: 'Deep dish, river architecture and blues', bestTime: 'May – Oct', avgDailyMinor: 20000,
    tags: ['City', 'History'],
    gradient: 'from-red-500 via-coral-300 to-sand-200', emoji: '🏙️',
  },
  {
    id: 'orlando', name: 'Orlando', region: 'Florida, USA', lat: 28.5384, lng: -81.3789,
    tagline: 'Theme parks and springs for all ages', bestTime: 'Jan – Apr', avgDailyMinor: 23000,
    tags: ['City', 'Family'],
    gradient: 'from-fuchsia-500 via-pink-300 to-sand-200', emoji: '🎢',
  },
  {
    id: 'moab', name: 'Moab', region: 'Utah, USA', lat: 38.5733, lng: -109.5498,
    tagline: 'Red-rock arches, rafting and desert yoga', bestTime: 'Mar – May, Sep – Oct', avgDailyMinor: 13000,
    tags: ['Adventure', 'Wellness'],
    gradient: 'from-teal-600 via-ocean-300 to-sand-100', emoji: '🚣',
  },
]

export function findDestination(name) {
  if (!name) return null
  const needle = name.toLowerCase()
  return DESTINATIONS.find((d) => needle.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(needle)) ?? null
}
