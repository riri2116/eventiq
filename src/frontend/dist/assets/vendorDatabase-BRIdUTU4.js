const vendorDatabase = {
  venues: [
    {
      name: "Grand Plaza",
      tier: "$$$",
      cost: 15e3,
      description: "Luxury ballroom with panoramic views, capacity 500+"
    },
    {
      name: "Skyline Loft",
      tier: "$$",
      cost: 8e3,
      description: "Modern rooftop venue with city skyline backdrop, capacity 200"
    },
    {
      name: "Community Center",
      tier: "$",
      cost: 3e3,
      description: "Affordable multi-purpose hall, capacity 150"
    }
  ],
  caterers: [
    {
      name: "Gourmet Eats",
      tier: "$$$",
      cost: 12e3,
      description: "Premium multi-cuisine catering with live counters"
    },
    {
      name: "Balanced Menu",
      tier: "$$",
      cost: 6e3,
      description: "Diverse menu options with quality ingredients"
    },
    {
      name: "Local Bites",
      tier: "$",
      cost: 2500,
      description: "Home-style meals with regional specialties"
    }
  ],
  florists: [
    {
      name: "Bloom Boutique",
      tier: "$$$",
      cost: 8e3,
      description: "Exotic floral arrangements with imported flowers"
    },
    {
      name: "Garden Fresh",
      tier: "$$",
      cost: 4e3,
      description: "Elegant seasonal floral decorations"
    },
    {
      name: "Simple Stems",
      tier: "$",
      cost: 1500,
      description: "Fresh local flowers, simple and tasteful"
    }
  ],
  photographers: [
    {
      name: "Elite Shots",
      tier: "$$$",
      cost: 1e4,
      description: "Award-winning team with cinematic videography included"
    },
    {
      name: "Candid Clicks",
      tier: "$$",
      cost: 5e3,
      description: "Professional candid and portrait photography"
    },
    {
      name: "Quick Snaps",
      tier: "$",
      cost: 2e3,
      description: "Basic event coverage with digital delivery"
    }
  ],
  djs: [
    {
      name: "SoundWave Pro",
      tier: "$$$",
      cost: 8e3,
      description: "Professional DJ with full sound system and lighting rig"
    },
    {
      name: "Beat Master",
      tier: "$$",
      cost: 4500,
      description: "Experienced DJ with curated playlists"
    },
    {
      name: "Local Mix",
      tier: "$",
      cost: 1800,
      description: "Energetic local DJ for casual events"
    }
  ],
  decorators: [
    {
      name: "Grand Décor",
      tier: "$$$",
      cost: 12e3,
      description: "Luxury thematic décor with custom props and draping"
    },
    {
      name: "Style Studio",
      tier: "$$",
      cost: 6e3,
      description: "Creative décor themes with modern aesthetics"
    },
    {
      name: "Basic Blooms",
      tier: "$",
      cost: 2200,
      description: "Simple, clean décor essentials for any event"
    }
  ]
};
const VENDOR_LABELS = {
  venues: "🏢 Venue",
  caterers: "🍽️ Caterer",
  florists: "💐 Florist",
  photographers: "📸 Photographer",
  djs: "🎧 DJ",
  decorators: "🎨 Decorator"
};
const DEHRADUN_LOCALITIES = [
  "Rajpur Road",
  "Chakrata Road",
  "Sahastradhara Road",
  "GMS Road",
  "Haridwar Road",
  "Mussoorie Road",
  "Clement Town",
  "Prem Nagar",
  "Ballupur",
  "Dalanwala",
  "Paltan Bazaar",
  "Raipur Road",
  "Karanpur",
  "Dharampur",
  "Niranjanpur",
  "Sewla Kalan",
  "Doiwala",
  "Rishikesh Road",
  "Dehradun Cantt",
  "Malsi"
];
const EVENT_TYPES = [
  "Wedding",
  "Corporate Conference",
  "Birthday Party",
  "Anniversary",
  "Product Launch",
  "Graduation Ceremony",
  "Engagement Party",
  "Charity Gala",
  "Musical Concert",
  "Award Ceremony"
];
const AUDIENCE_SCALES = [
  "Intimate (< 50 guests)",
  "Small (50–100 guests)",
  "Medium (100–250 guests)",
  "Large (250–500 guests)",
  "Grand (500+ guests)"
];
const TARGET_AUDIENCES = [
  "Family & Friends",
  "Corporate Professionals",
  "Young Adults (18–30)",
  "General Public",
  "VIP Guests",
  "Children & Families",
  "Seniors",
  "Mixed Audience"
];
const EVENT_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export {
  AUDIENCE_SCALES as A,
  DEHRADUN_LOCALITIES as D,
  EVENT_TYPES as E,
  TARGET_AUDIENCES as T,
  VENDOR_LABELS as V,
  EVENT_MONTHS as a,
  vendorDatabase as v
};
