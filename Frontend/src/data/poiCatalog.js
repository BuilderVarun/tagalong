// Built-in place suggestions for the example destinations, shown instantly while
// typing. Everything else comes from the OpenStreetMap search (GET /api/geo/search).

export const POI_CATALOG = {
  nyc: [
    { name: 'Statue of Liberty', address: 'Liberty Island, New York, NY', lat: 40.6892, lng: -74.0445, category: 'sight', durationMinutes: 180 },
    { name: 'Empire State Building', address: '20 W 34th St, New York, NY', lat: 40.7484, lng: -73.9857, category: 'sight', durationMinutes: 90 },
    { name: 'The Metropolitan Museum of Art', address: '1000 5th Ave, New York, NY', lat: 40.7794, lng: -73.9632, category: 'sight', durationMinutes: 120 },
    { name: 'Brooklyn Bridge', address: 'Brooklyn Bridge Promenade, New York, NY', lat: 40.7061, lng: -73.9969, category: 'sight', durationMinutes: 60 },
    { name: 'Central Park', address: 'Central Park, Manhattan, New York, NY', lat: 40.7829, lng: -73.9654, category: 'sight', durationMinutes: 120 },
    { name: 'DUMBO waterfront', address: 'Washington St, Brooklyn, NY', lat: 40.7033, lng: -73.9894, category: 'sight', durationMinutes: 45 },
    { name: '9/11 Memorial & Museum', address: '180 Greenwich St, New York, NY', lat: 40.7115, lng: -74.0134, category: 'sight', durationMinutes: 90 },
    { name: 'Top of the Rock', address: '30 Rockefeller Plaza, New York, NY', lat: 40.7587, lng: -73.9787, category: 'sight', durationMinutes: 60 },
    { name: 'Grand Central Terminal', address: '89 E 42nd St, New York, NY', lat: 40.7527, lng: -73.9772, category: 'sight', durationMinutes: 45 },
    { name: 'Times Square', address: 'Broadway & 7th Ave, New York, NY', lat: 40.758, lng: -73.9855, category: 'sight', durationMinutes: 45 },
    { name: 'New York Public Library', address: '476 5th Ave, New York, NY', lat: 40.7532, lng: -73.9822, category: 'sight', durationMinutes: 30 },
    { name: 'Katz’s Delicatessen', address: '205 E Houston St, New York, NY', lat: 40.7223, lng: -73.9874, category: 'food', durationMinutes: 60 },
    { name: 'Joe’s Pizza', address: '7 Carmine St, New York, NY', lat: 40.7306, lng: -74.0021, category: 'food', durationMinutes: 45 },
    { name: 'Keens Steakhouse', address: '72 W 36th St, New York, NY', lat: 40.7508, lng: -73.9865, category: 'food', durationMinutes: 90 },
    { name: 'Levain Bakery', address: '167 W 74th St, New York, NY', lat: 40.7799, lng: -73.9803, category: 'food', durationMinutes: 60 },
    { name: 'Russ & Daughters Cafe', address: '127 Orchard St, New York, NY', lat: 40.7197, lng: -73.9896, category: 'food', durationMinutes: 120 },
    { name: 'The High Line', address: 'Gansevoort St to W 34th St, New York, NY', lat: 40.748, lng: -74.0048, category: 'activity', durationMinutes: 90 },
    { name: 'Broadway show', address: 'Theater District, New York, NY', lat: 40.759, lng: -73.9845, category: 'activity', durationMinutes: 180 },
    { name: 'Sunset sail on the Hudson', address: 'Chelsea Piers, Pier 62, New York, NY', lat: 40.7466, lng: -74.009, category: 'activity', durationMinutes: 150 },
    { name: 'The Ludlow Hotel', address: '180 Ludlow St, New York, NY', lat: 40.7218, lng: -73.9876, category: 'stay', durationMinutes: 30 },
    { name: 'JFK International Airport', address: 'Queens, New York, NY', lat: 40.6413, lng: -73.7781, category: 'transit', durationMinutes: 60 },
    { name: 'Penn Station', address: '8th Ave & W 31st St, New York, NY', lat: 40.7506, lng: -73.9935, category: 'transit', durationMinutes: 45 },
  ],
  sf: [
    { name: 'Golden Gate Bridge', address: 'Golden Gate Bridge Welcome Center, San Francisco, CA', lat: 37.8199, lng: -122.4783, category: 'sight', durationMinutes: 150 },
    { name: 'Alcatraz Island', address: 'Pier 33 Alcatraz Landing, San Francisco, CA', lat: 37.8267, lng: -122.423, category: 'sight', durationMinutes: 75 },
    { name: 'Lands End Trail', address: '680 Point Lobos Ave, San Francisco, CA', lat: 37.7878, lng: -122.5056, category: 'sight', durationMinutes: 90 },
    { name: 'Painted Ladies', address: 'Steiner St at Alamo Square, San Francisco, CA', lat: 37.7763, lng: -122.4328, category: 'sight', durationMinutes: 90 },
    { name: 'Palace of Fine Arts', address: '3601 Lyon St, San Francisco, CA', lat: 37.8029, lng: -122.4484, category: 'sight', durationMinutes: 60 },
    { name: 'Golden Gate Park', address: 'Golden Gate Park, San Francisco, CA', lat: 37.7694, lng: -122.4862, category: 'activity', durationMinutes: 60 },
    { name: 'Mission District murals', address: 'Clarion Alley, San Francisco, CA', lat: 37.7631, lng: -122.4215, category: 'activity', durationMinutes: 90 },
    { name: 'Ferry Building Marketplace', address: '1 Ferry Building, San Francisco, CA', lat: 37.7955, lng: -122.3937, category: 'food', durationMinutes: 75 },
    { name: 'Tartine Bakery', address: '600 Guerrero St, San Francisco, CA', lat: 37.7614, lng: -122.4241, category: 'food', durationMinutes: 45 },
    { name: 'San Francisco International Airport', address: 'San Mateo County, CA', lat: 37.6213, lng: -122.379, category: 'transit', durationMinutes: 30 },
    { name: 'Hotel Zephyr', address: '250 Beach St, Fisherman’s Wharf, San Francisco, CA', lat: 37.8077, lng: -122.4135, category: 'stay', durationMinutes: 30 },
  ],
  miami: [
    { name: 'South Beach', address: 'Ocean Dr, Miami Beach, FL', lat: 25.7826, lng: -80.1341, category: 'sight', durationMinutes: 180 },
    { name: 'Vizcaya Museum & Gardens', address: '3251 S Miami Ave, Miami, FL', lat: 25.7444, lng: -80.2105, category: 'sight', durationMinutes: 60 },
    { name: 'Wynwood Walls', address: '2516 NW 2nd Ave, Miami, FL', lat: 25.801, lng: -80.1994, category: 'sight', durationMinutes: 60 },
    { name: 'Little Havana', address: 'Calle Ocho (SW 8th St), Miami, FL', lat: 25.7654, lng: -80.2195, category: 'activity', durationMinutes: 90 },
    { name: 'Joe’s Stone Crab', address: '11 Washington Ave, Miami Beach, FL', lat: 25.7689, lng: -80.1353, category: 'food', durationMinutes: 120 },
    { name: 'Versailles Restaurant', address: '3555 SW 8th St, Miami, FL', lat: 25.765, lng: -80.2526, category: 'food', durationMinutes: 90 },
    { name: 'Lincoln Road Mall', address: 'Lincoln Rd, Miami Beach, FL', lat: 25.7907, lng: -80.139, category: 'activity', durationMinutes: 120 },
    { name: 'Everglades airboat tour', address: '26700 SW 8th St, Miami, FL', lat: 25.7614, lng: -80.623, category: 'activity', durationMinutes: 300 },
    { name: 'Miami International Airport', address: '2100 NW 42nd Ave, Miami, FL', lat: 25.7959, lng: -80.287, category: 'transit', durationMinutes: 60 },
  ],
}

/** Matches the built-in suggestions on name and address. */
export function searchPlaces(destinationId, query) {
  const needle = query.trim().toLowerCase()
  const pool = POI_CATALOG[destinationId] ?? Object.values(POI_CATALOG).flat()
  if (!needle) return pool.slice(0, 8)
  return pool.filter((p) => p.name.toLowerCase().includes(needle) || p.address.toLowerCase().includes(needle)).slice(0, 8)
}
