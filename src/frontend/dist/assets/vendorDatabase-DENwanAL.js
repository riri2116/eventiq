const DEHRADUN_LOCALITIES = [
  "Ballupur",
  "Clement Town",
  "Dalanwala",
  "ISBT Area",
  "Prem Nagar",
  "Rajpur Road",
  "Sahastradhara",
  "Paltan Bazaar",
  "Raipur Road",
  "Dehradun Cantt"
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
const VENDOR_CATEGORIES_16 = [
  "banquetHall",
  "caterer",
  "djService",
  "eventDecorator",
  "eventPlanner",
  "florist",
  "hotelBanquetHall",
  "lightingService",
  "makeupArtist",
  "mehendiArtist",
  "partyHall",
  "tentHouse",
  "weddingBand",
  "weddingLawn",
  "weddingPhotographer",
  "weddingResort"
];
const VENDOR_LABELS_16 = {
  banquetHall: "🏛️ Banquet Hall",
  caterer: "🍽️ Caterer",
  djService: "🎧 DJ Service",
  eventDecorator: "🎨 Event Decorator",
  eventPlanner: "📋 Event Planner",
  florist: "💐 Florist",
  hotelBanquetHall: "🏨 Hotel Banquet Hall",
  lightingService: "💡 Lighting Service",
  makeupArtist: "💄 Makeup Artist",
  mehendiArtist: "🌿 Mehendi Artist",
  partyHall: "🏢 Party Hall",
  tentHouse: "⛺ Tent House",
  weddingBand: "🎺 Wedding Band",
  weddingLawn: "🌳 Wedding Lawn",
  weddingPhotographer: "📸 Wedding Photographer",
  weddingResort: "🏰 Wedding Resort"
};
const VENDOR_EMOJI_16 = {
  banquetHall: "🏛️",
  caterer: "🍽️",
  djService: "🎧",
  eventDecorator: "🎨",
  eventPlanner: "📋",
  florist: "💐",
  hotelBanquetHall: "🏨",
  lightingService: "💡",
  makeupArtist: "💄",
  mehendiArtist: "🌿",
  partyHall: "🏢",
  tentHouse: "⛺",
  weddingBand: "🎺",
  weddingLawn: "🌳",
  weddingPhotographer: "📸",
  weddingResort: "🏰"
};
const vendorDatabase16 = {
  banquetHall: {
    dehradun: [
      {
        id: "bh-001",
        name: "Shivalik Grand Banquet",
        location: "Rajpur Road",
        rating: 4.8,
        reviews: 312,
        phone: "+91 9412345601",
        email: "info@shivalikgrand.in",
        description: "Shivalik Grand Banquet is Dehradun's premier luxury hall featuring Italian marble flooring, a state-of-the-art sound system, and dedicated event management staff. Situated on Rajpur Road, it offers stunning views of the Shivalik hills and accommodates up to 800 guests in air-conditioned comfort.",
        amenities: [
          "AC Hall",
          "Valet Parking",
          "Bridal Suite",
          "Stage",
          "LED Wall",
          "Backup Power"
        ],
        tier: "$$$",
        cost: 25e4,
        capacity: 800,
        parking: true
      },
      {
        id: "bh-002",
        name: "Doon Celebration Hall",
        location: "GMS Road",
        rating: 4.4,
        reviews: 186,
        phone: "+91 9412345602",
        email: "bookings@dooncelebration.in",
        description: "Doon Celebration Hall offers a versatile banquet space on GMS Road with customisable décor packages and an in-house catering team. The hall comfortably seats 400 guests and includes a dedicated kids' play area for family events.",
        amenities: [
          "AC Hall",
          "In-house Catering",
          "Kids Area",
          "Parking",
          "Stage"
        ],
        tier: "$$",
        cost: 12e4,
        capacity: 400,
        parking: true
      },
      {
        id: "bh-003",
        name: "Kalyanam Banquet",
        location: "Prem Nagar",
        rating: 3.9,
        reviews: 74,
        phone: "+91 9412345603",
        email: "contact@kalyanambanquet.in",
        description: "Kalyanam Banquet is an affordable, well-maintained hall in Prem Nagar suited for small to mid-sized celebrations. Basic décor assistance is provided and the hall can be arranged in classroom, theatre, or dinner layout.",
        amenities: ["AC Hall", "Basic Décor", "Parking", "Generator Backup"],
        tier: "$",
        cost: 45e3,
        capacity: 200,
        parking: true
      }
    ]
  },
  caterer: {
    dehradun: [
      {
        id: "cat-001",
        name: "Spice & Saffron Caterers",
        location: "Rajpur Road",
        rating: 4.7,
        reviews: 428,
        phone: "+91 9456781201",
        email: "orders@spicesaffron.in",
        description: "Spice & Saffron is Dehradun's leading premium caterer, offering multi-cuisine live counters including North Indian, South Indian, Chinese, and Continental. Their experienced chefs use locally sourced produce and deliver immaculate presentation for weddings and corporate events.",
        amenities: [
          "Live Counters",
          "Tasting Session",
          "Dedicated Staff",
          "Biodegradable Crockery",
          "Dessert Station"
        ],
        tier: "$$$",
        cost: 1800,
        specialty: "Multi-cuisine with live counters",
        pricePerPlate: 1800
      },
      {
        id: "cat-002",
        name: "Dehradun Dawat",
        location: "Haridwar Road",
        rating: 4.3,
        reviews: 251,
        phone: "+91 9456781202",
        email: "info@dehradundawat.in",
        description: "Dehradun Dawat specialises in authentic Kumaoni and North Indian cuisine for social gatherings. They offer curated buffet menus with hygienic preparation, timely service, and flexible customisation for dietary preferences.",
        amenities: [
          "Buffet Setup",
          "Hygienic Kitchen",
          "Flexible Menu",
          "Serving Staff"
        ],
        tier: "$$",
        cost: 950,
        specialty: "Kumaoni & North Indian cuisine",
        pricePerPlate: 950
      },
      {
        id: "cat-003",
        name: "Shree Bhojan Sewa",
        location: "Clement Town",
        rating: 3.8,
        reviews: 98,
        phone: "+91 9456781203",
        email: "shreebhojansewa@gmail.com",
        description: "Shree Bhojan Sewa provides wholesome vegetarian catering for budget-conscious families and communities. Simple, home-style thalis are their specialty, ensuring all guests are well-fed at an affordable price.",
        amenities: [
          "Veg Menu",
          "Thali Service",
          "Serving Staff",
          "Bulk Discounts"
        ],
        tier: "$",
        cost: 400,
        specialty: "Vegetarian thali catering",
        pricePerPlate: 400
      }
    ]
  },
  djService: {
    dehradun: [
      {
        id: "dj-001",
        name: "DJ Nexus Dehradun",
        location: "Mussoorie Road",
        rating: 4.9,
        reviews: 347,
        phone: "+91 9876541101",
        email: "bookings@djnexus.in",
        description: "DJ Nexus is Dehradun's most sought-after DJ service, bringing concert-grade sound systems, intelligent LED lighting arrays, and a curated library spanning Bollywood, EDM, and regional folk music. Available for weddings, corporate parties, and college events.",
        amenities: [
          "Concert Sound System",
          "LED Lighting Rig",
          "MC Services",
          "Fog Machine",
          "Laser Show"
        ],
        tier: "$$$",
        cost: 85e3
      },
      {
        id: "dj-002",
        name: "Beat Riders Entertainment",
        location: "Balliwala",
        rating: 4.3,
        reviews: 189,
        phone: "+91 9876541102",
        email: "beatriders@gmail.com",
        description: "Beat Riders Entertainment offers professional DJ services with a 10kW sound system and dynamic LED lighting. They specialise in Bollywood hits and regional Garhwali music, making them a favourite for weddings and sangeet ceremonies.",
        amenities: [
          "10kW Sound System",
          "LED Lighting",
          "Bollywood Playlist",
          "Garhwali Folk Sets"
        ],
        tier: "$$",
        cost: 4e4
      },
      {
        id: "dj-003",
        name: "Party Pulse DJ",
        location: "Raipur Road",
        rating: 3.7,
        reviews: 63,
        phone: "+91 9876541103",
        email: "partypulsedj@gmail.com",
        description: "Party Pulse DJ is an energetic local DJ service ideal for birthday parties, small receptions, and community events. Basic PA system and coloured lights are included in the package.",
        amenities: ["PA System", "Coloured Lights", "Playlist Customisation"],
        tier: "$",
        cost: 15e3
      }
    ]
  },
  eventDecorator: {
    dehradun: [
      {
        id: "ed-001",
        name: "Aura Event Designs",
        location: "Rajpur Road",
        rating: 4.8,
        reviews: 295,
        phone: "+91 9634521401",
        email: "design@auraeventdehradun.in",
        description: "Aura Event Designs transforms venues with bespoke thematic décor using imported fabric draping, custom floral installations, and ambient LED lighting. Their design team creates immersive experiences for high-end weddings and corporate galas.",
        amenities: [
          "Custom Themes",
          "Imported Draping",
          "Floral Installations",
          "Ambient Lighting",
          "3D Mockup Preview"
        ],
        tier: "$$$",
        cost: 18e4
      },
      {
        id: "ed-002",
        name: "Décor Dreams Studio",
        location: "GMS Road",
        rating: 4.2,
        reviews: 154,
        phone: "+91 9634521402",
        email: "info@decordreams.in",
        description: "Décor Dreams Studio offers stylish and contemporary event decoration at mid-range prices. From balloon arches to centrepiece flowers and backdrop setups, they cover all décor essentials with a personal touch.",
        amenities: [
          "Balloon Décor",
          "Backdrop Setup",
          "Centrepiece Flowers",
          "Table Settings"
        ],
        tier: "$$",
        cost: 75e3
      },
      {
        id: "ed-003",
        name: "Happy Décor Wale",
        location: "Karanpur",
        rating: 3.6,
        reviews: 58,
        phone: "+91 9634521403",
        email: "happydecorwale@gmail.com",
        description: "Happy Décor Wale provides budget-friendly basic decoration for small birthday parties, house parties, and simple receptions. Standard balloon decorations, simple flower arrangements, and printed banners are included.",
        amenities: [
          "Balloon Décor",
          "Flower Bunches",
          "Printed Banners",
          "Ribbon Setup"
        ],
        tier: "$",
        cost: 18e3
      }
    ]
  },
  eventPlanner: {
    dehradun: [
      {
        id: "ep-001",
        name: "Celebrations Unlimited",
        location: "Rajpur Road",
        rating: 4.9,
        reviews: 412,
        phone: "+91 9512340501",
        email: "hello@celebrationsunlimited.in",
        description: "Celebrations Unlimited is Dehradun's top full-service event planning company with over 12 years of experience orchestrating weddings, corporate events, and destination celebrations. Their 360° management covers vendor coordination, logistics, on-site execution, and post-event reporting.",
        amenities: [
          "End-to-End Planning",
          "Vendor Network",
          "On-site Coordinator",
          "Budget Management",
          "Post-event Report",
          "Emergency Backup"
        ],
        tier: "$$$",
        cost: 2e5
      },
      {
        id: "ep-002",
        name: "EventCraft Dehradun",
        location: "Sahastradhara Road",
        rating: 4.4,
        reviews: 198,
        phone: "+91 9512340502",
        email: "plan@eventcraft.in",
        description: "EventCraft Dehradun offers comprehensive event planning services for mid-budget clients, from engagement ceremonies to corporate team outings. They handle vendor booking, timeline creation, and on-day coordination efficiently.",
        amenities: [
          "Vendor Booking",
          "Timeline Planning",
          "Day-of Coordination",
          "Budget Tracking"
        ],
        tier: "$$",
        cost: 8e4
      },
      {
        id: "ep-003",
        name: "Doon Events Co.",
        location: "Prem Nagar",
        rating: 3.9,
        reviews: 82,
        phone: "+91 9512340503",
        email: "dooneventsco@gmail.com",
        description: "Doon Events Co. is a nimble two-person planning team ideal for small family functions and intimate birthday parties. They assist with vendor shortlisting, basic décor planning, and managing the day's schedule.",
        amenities: [
          "Vendor Shortlisting",
          "Day Schedule",
          "Basic Décor Advice"
        ],
        tier: "$",
        cost: 25e3
      }
    ]
  },
  florist: {
    dehradun: [
      {
        id: "fl-001",
        name: "Petals & Peony",
        location: "Rajpur Road",
        rating: 4.7,
        reviews: 267,
        phone: "+91 9823456601",
        email: "orders@petalsandpeony.in",
        description: "Petals & Peony is Dehradun's premium florist, sourcing exotic blooms from Bangalore and Holland for bespoke wedding florals. Their signature work includes grand mandap arrangements, car decorations, and cascading bridal bouquets.",
        amenities: [
          "Exotic Blooms",
          "Mandap Arrangement",
          "Bridal Bouquet",
          "Car Decoration",
          "Centrepieces",
          "Flower Shower"
        ],
        tier: "$$$",
        cost: 12e4
      },
      {
        id: "fl-002",
        name: "Bloom & Blossom",
        location: "Haridwar Road",
        rating: 4.2,
        reviews: 143,
        phone: "+91 9823456602",
        email: "info@bloomblossom.in",
        description: "Bloom & Blossom creates elegant seasonal floral decorations using fresh local flowers. They specialise in table centrepieces, entrance arches, and stage backdrops, offering a good balance of quality and cost.",
        amenities: [
          "Entrance Arch",
          "Stage Backdrop",
          "Table Centrepieces",
          "Seasonal Flowers"
        ],
        tier: "$$",
        cost: 55e3
      },
      {
        id: "fl-003",
        name: "Phoolon Ki Dukaan",
        location: "Paltan Bazaar",
        rating: 3.8,
        reviews: 72,
        phone: "+91 9823456603",
        email: "phoolonkidukaan@gmail.com",
        description: "Phoolon Ki Dukaan is a trusted local florist in Paltan Bazaar providing fresh marigold and rose decorations for pujas, birthdays, and small receptions at very affordable rates.",
        amenities: [
          "Marigold Garlands",
          "Rose Bunches",
          "Puja Décor",
          "Affordable Rates"
        ],
        tier: "$",
        cost: 12e3
      }
    ]
  },
  hotelBanquetHall: {
    dehradun: [
      {
        id: "hbh-001",
        name: "Radisson Blu Dehradun — Banquets",
        location: "Haridwar Road",
        rating: 4.9,
        reviews: 489,
        phone: "+91 9412670701",
        email: "banquets@radissonbludehradun.in",
        description: "The Radisson Blu Dehradun offers world-class hotel banquet facilities with three customisable event spaces, an experienced events team, and seamless integration with hotel accommodation for outstation guests. A preferred choice for luxury weddings and high-profile corporate events.",
        amenities: [
          "Multiple Event Spaces",
          "5-Star Catering",
          "AV Equipment",
          "Accommodation",
          "Valet Parking",
          "Bridal Suite"
        ],
        tier: "$$$",
        cost: 5e5,
        capacity: 1e3,
        parking: true
      },
      {
        id: "hbh-002",
        name: "Hotel Pacific Grand — Banquet Wing",
        location: "Rajpur Road",
        rating: 4.4,
        reviews: 221,
        phone: "+91 9412670702",
        email: "events@hotelpacificgrand.in",
        description: "Hotel Pacific Grand offers a well-appointed banquet wing with in-house catering, flexible seating arrangements, and a dedicated event coordinator. Located on the prestigious Rajpur Road corridor, it is a popular choice for wedding receptions and corporate dinners.",
        amenities: [
          "In-house Catering",
          "Event Coordinator",
          "Flexible Seating",
          "AV Setup",
          "Parking"
        ],
        tier: "$$",
        cost: 2e5,
        capacity: 500,
        parking: true
      },
      {
        id: "hbh-003",
        name: "Hotel Drona Palace — Banquet Hall",
        location: "Raipur Road",
        rating: 3.8,
        reviews: 91,
        phone: "+91 9412670703",
        email: "banquet@hoteldrona.in",
        description: "Hotel Drona Palace provides a comfortable mid-size banquet hall suitable for birthday celebrations, small wedding receptions, and corporate meetings. The hotel's kitchen staff can arrange standard buffet menus on request.",
        amenities: [
          "Buffet Catering",
          "Basic AV",
          "Parking",
          "Generator Backup"
        ],
        tier: "$",
        cost: 7e4,
        capacity: 250,
        parking: true
      }
    ]
  },
  lightingService: {
    dehradun: [
      {
        id: "ls-001",
        name: "LumiCraft Event Lighting",
        location: "GMS Road",
        rating: 4.8,
        reviews: 276,
        phone: "+91 9761230801",
        email: "lumis@lumicraft.in",
        description: "LumiCraft Event Lighting specialises in architectural and mood lighting for luxury weddings and corporate galas. Their repertoire includes dynamic LED pixel walls, fairy light canopies, uplighting, gobos, and spotlight programming by certified lighting designers.",
        amenities: [
          "LED Pixel Wall",
          "Fairy Light Canopy",
          "Uplighting",
          "Gobo Projections",
          "Certified Designer",
          "Truss Setup"
        ],
        tier: "$$$",
        cost: 12e4
      },
      {
        id: "ls-002",
        name: "Bright Night Decorators",
        location: "Clement Town",
        rating: 4.2,
        reviews: 148,
        phone: "+91 9761230802",
        email: "info@brightnightdec.in",
        description: "Bright Night Decorators offers versatile event lighting packages including LED par cans, fairy lights, and colour-wash effects. They cater to weddings, sangeet ceremonies, and birthday parties with reliable installation teams.",
        amenities: [
          "LED Par Cans",
          "Fairy Lights",
          "Colour Wash",
          "Reliable Team"
        ],
        tier: "$$",
        cost: 5e4
      },
      {
        id: "ls-003",
        name: "Chamak Batti Services",
        location: "Doiwala",
        rating: 3.7,
        reviews: 55,
        phone: "+91 9761230803",
        email: "chamakbatti@gmail.com",
        description: "Chamak Batti Services provides basic string lights, serial bulb arrangements, and coloured LED strips for budget events. Reliable for small functions, pujas, and outdoor birthday parties.",
        amenities: [
          "String Lights",
          "Serial Bulbs",
          "LED Strips",
          "Affordable Setup"
        ],
        tier: "$",
        cost: 12e3
      }
    ]
  },
  makeupArtist: {
    dehradun: [
      {
        id: "mua-001",
        name: "Glamour Studio by Priya",
        location: "Rajpur Road",
        rating: 4.9,
        reviews: 384,
        phone: "+91 9876549001",
        email: "priya@glamourstudio.in",
        description: "Glamour Studio by Priya is Dehradun's most acclaimed bridal makeup studio, known for airbrush HD makeup, international skincare preparation, and personalised bridal looks. Priya has trained with top Mumbai artists and uses MAC, NARS, and Charlotte Tilbury products exclusively.",
        amenities: [
          "Airbrush HD Makeup",
          "Trial Session",
          "Skincare Prep",
          "Premium Brands",
          "Hairstyling",
          "On-location Service"
        ],
        tier: "$$$",
        cost: 35e3
      },
      {
        id: "mua-002",
        name: "Blush & Bloom Makeovers",
        location: "Haridwar Road",
        rating: 4.4,
        reviews: 213,
        phone: "+91 9876549002",
        email: "blushbloom@gmail.com",
        description: "Blush & Bloom Makeovers offers beautiful bridal and party makeup using quality professional products. Services include pre-bridal facials, eye makeup, and hairstyling, with packages designed for all skin tones.",
        amenities: [
          "Bridal Makeup",
          "Party Makeup",
          "Pre-bridal Facial",
          "Hairstyling",
          "All Skin Tones"
        ],
        tier: "$$",
        cost: 15e3
      },
      {
        id: "mua-003",
        name: "Sunita Beauty Care",
        location: "Sewla Kalan",
        rating: 3.8,
        reviews: 67,
        phone: "+91 9876549003",
        email: "sunitabeautycare@gmail.com",
        description: "Sunita Beauty Care is an experienced neighbourhood beautician providing classic makeup and hair services for small functions and local weddings at very affordable rates.",
        amenities: [
          "Classic Makeup",
          "Hair Styling",
          "Affordable Rates",
          "Home Visits"
        ],
        tier: "$",
        cost: 5e3
      }
    ]
  },
  mehendiArtist: {
    dehradun: [
      {
        id: "ma-001",
        name: "Henna Royale Studio",
        location: "Rajpur Road",
        rating: 4.8,
        reviews: 319,
        phone: "+91 9719321001",
        email: "bookings@hennaroyale.in",
        description: "Henna Royale Studio is led by an award-winning mehendi artist who creates intricate Rajasthani, Arabic, and fusion mehendi designs for brides and bridal party members. They also offer dulha mehendi and host mehendi ceremony setups.",
        amenities: [
          "Bridal Mehendi",
          "Dulha Mehendi",
          "Rajasthani & Arabic Designs",
          "Ceremony Setup",
          "Team of Artists"
        ],
        tier: "$$$",
        cost: 25e3
      },
      {
        id: "ma-002",
        name: "Mehndi Manzil",
        location: "Dalanwala",
        rating: 4.3,
        reviews: 172,
        phone: "+91 9719321002",
        email: "mehandimanzil@gmail.com",
        description: "Mehndi Manzil offers skilled mehendi application for bridal ceremonies, festivals, and family gatherings. Their artists are adept at bridal, floral, and peacock motif patterns.",
        amenities: [
          "Bridal Mehendi",
          "Floral Patterns",
          "Peacock Motifs",
          "Home Visits"
        ],
        tier: "$$",
        cost: 1e4
      },
      {
        id: "ma-003",
        name: "Asha Mehendi Art",
        location: "Niranjanpur",
        rating: 3.7,
        reviews: 54,
        phone: "+91 9719321003",
        email: "ashamehendiart@gmail.com",
        description: "Asha Mehendi Art provides classic Arabic and floral mehendi designs for small functions and pujas at affordable rates. Individual or group sessions available on-location.",
        amenities: [
          "Arabic Designs",
          "Floral Patterns",
          "Group Sessions",
          "Affordable"
        ],
        tier: "$",
        cost: 3e3
      }
    ]
  },
  partyHall: {
    dehradun: [
      {
        id: "ph-001",
        name: "Elysium Party Hall",
        location: "Sahastradhara Road",
        rating: 4.7,
        reviews: 258,
        phone: "+91 9456781101",
        email: "events@elysiumhall.in",
        description: "Elysium Party Hall is a premium indoor event space with climate control, a built-in sound system, full kitchen, and dedicated parking for 150 vehicles. Its versatile layout can be configured for cocktail parties, birthday bashes, and corporate off-sites.",
        amenities: [
          "Climate Control",
          "Built-in Sound",
          "Full Kitchen",
          "Bar Counter",
          "Parking",
          "Outdoor Lawn"
        ],
        tier: "$$$",
        cost: 15e4,
        capacity: 600,
        parking: true
      },
      {
        id: "ph-002",
        name: "Fiesta Party Hall",
        location: "GMS Road",
        rating: 4.2,
        reviews: 134,
        phone: "+91 9456781102",
        email: "fiesta@gmshall.in",
        description: "Fiesta Party Hall offers a bright, air-conditioned space popular for birthday parties, anniversary dinners, and kitty parties. Basic sound setup and a small stage are included in the rental.",
        amenities: [
          "AC Hall",
          "Basic Sound",
          "Small Stage",
          "Parking",
          "Catering Tie-up"
        ],
        tier: "$$",
        cost: 6e4,
        capacity: 300,
        parking: true
      },
      {
        id: "ph-003",
        name: "Rang Mahal Community Hall",
        location: "Dharampur",
        rating: 3.7,
        reviews: 61,
        phone: "+91 9456781103",
        email: "rangmahal@gmail.com",
        description: "Rang Mahal Community Hall is a clean, well-lit space suitable for family get-togethers, school events, and small birthday parties. The hall is available at flexible timings and affordable daily rates.",
        amenities: [
          "Fans & Lights",
          "Flexible Timing",
          "Basic Furniture",
          "Affordable"
        ],
        tier: "$",
        cost: 2e4,
        capacity: 150,
        parking: false
      }
    ]
  },
  tentHouse: {
    dehradun: [
      {
        id: "th-001",
        name: "Royal Tent & Decor",
        location: "Haridwar Road",
        rating: 4.7,
        reviews: 302,
        phone: "+91 9837561201",
        email: "info@royaltentdehradun.in",
        description: "Royal Tent & Decor is Dehradun's most experienced tent house operator, providing luxurious Mughal-style and contemporary shamianas, premium seating, chandeliers, carpeting, and full venue setup for outdoor weddings and large social gatherings.",
        amenities: [
          "Mughal Shamiana",
          "Chandeliers",
          "Premium Seating",
          "Red Carpet",
          "Generator",
          "Lighting Setup"
        ],
        tier: "$$$",
        cost: 18e4,
        capacity: 1e3,
        parking: true
      },
      {
        id: "th-002",
        name: "Shubh Tent House",
        location: "Balliwala",
        rating: 4.2,
        reviews: 165,
        phone: "+91 9837561202",
        email: "shubhtent@gmail.com",
        description: "Shubh Tent House provides reliable tent and canopy solutions for medium-sized outdoor events. Their packages include standard shamiana, plastic chairs and tables, basic lighting, and a sound system.",
        amenities: [
          "Standard Shamiana",
          "Chairs & Tables",
          "Basic Lighting",
          "Sound System"
        ],
        tier: "$$",
        cost: 65e3,
        capacity: 500,
        parking: true
      },
      {
        id: "th-003",
        name: "Doon Canopy Services",
        location: "Sewla Kalan",
        rating: 3.6,
        reviews: 48,
        phone: "+91 9837561203",
        email: "dooncanopy@gmail.com",
        description: "Doon Canopy Services provides economy tarps, bamboo canopies, and basic plastic seating for small community events and intimate family functions at very low rates.",
        amenities: ["Tarp Canopy", "Plastic Seating", "Economy Rates"],
        tier: "$",
        cost: 18e3,
        capacity: 200,
        parking: false
      }
    ]
  },
  weddingBand: {
    dehradun: [
      {
        id: "wb-001",
        name: "Shahi Brass Band Dehradun",
        location: "Dalanwala",
        rating: 4.7,
        reviews: 285,
        phone: "+91 9897651301",
        email: "bookings@shahiband.in",
        description: "Shahi Brass Band Dehradun is the region's most celebrated wedding band, famous for their powerful brass ensemble, colourful uniforms, and high-energy baraat performances. They perform a repertoire spanning Hindi film hits, Garhwali folk, and classical march music.",
        amenities: [
          "Full Brass Ensemble",
          "Colourful Uniforms",
          "Flower Floats",
          "LED Lights",
          "Baraat Specialist"
        ],
        tier: "$$$",
        cost: 6e4
      },
      {
        id: "wb-002",
        name: "Shubham Wedding Band",
        location: "Karanpur",
        rating: 4.2,
        reviews: 147,
        phone: "+91 9897651302",
        email: "shubhamband@gmail.com",
        description: "Shubham Wedding Band offers a well-coordinated troupe of 15 musicians for baraats and processions. Their standard package includes 4 hours of live performance with traditional uniforms and electronic lights.",
        amenities: [
          "15-member Troupe",
          "Traditional Uniforms",
          "Electronic Lights",
          "4-hour Performance"
        ],
        tier: "$$",
        cost: 28e3
      },
      {
        id: "wb-003",
        name: "Garhwal Dhol Party",
        location: "Doiwala",
        rating: 3.8,
        reviews: 62,
        phone: "+91 9897651303",
        email: "garhwaldhol@gmail.com",
        description: "Garhwal Dhol Party provides traditional dhol-nagada players and a small brass section for informal baraats and folk-style wedding processions. Budget-friendly and full of authentic local energy.",
        amenities: [
          "Dhol-Nagada",
          "Small Brass Section",
          "Folk Music",
          "Budget Friendly"
        ],
        tier: "$",
        cost: 1e4
      }
    ]
  },
  weddingLawn: {
    dehradun: [
      {
        id: "wl-001",
        name: "Verdure Wedding Lawn",
        location: "Mussoorie Road",
        rating: 4.8,
        reviews: 334,
        phone: "+91 9456780601",
        email: "events@verdurelaw.in",
        description: "Verdure Wedding Lawn is a sprawling 2-acre estate on the Mussoorie Road with manicured gardens, a poolside ceremony area, and a permanent canopy structure. The stunning Himalayan backdrop makes it the most photographed wedding venue in Dehradun.",
        amenities: [
          "2-Acre Garden",
          "Poolside Area",
          "Permanent Canopy",
          "Bridal Suite",
          "Ample Parking",
          "Catering Partner"
        ],
        tier: "$$$",
        cost: 3e5,
        capacity: 1200,
        parking: true
      },
      {
        id: "wl-002",
        name: "Garden Bliss Lawns",
        location: "Raipur Road",
        rating: 4.3,
        reviews: 197,
        phone: "+91 9456780602",
        email: "gardenbliss@gmail.in",
        description: "Garden Bliss Lawns is a well-kept one-acre venue on Raipur Road ideal for medium-sized weddings and receptions. The venue includes a permanent stage, basic restrooms, and easy access from the city centre.",
        amenities: [
          "1-Acre Lawn",
          "Permanent Stage",
          "Basic Restrooms",
          "Parking",
          "Catering Allowed"
        ],
        tier: "$$",
        cost: 12e4,
        capacity: 600,
        parking: true
      },
      {
        id: "wl-003",
        name: "Doon Greens Lawn",
        location: "Niranjanpur",
        rating: 3.7,
        reviews: 69,
        phone: "+91 9456780603",
        email: "doongreens@gmail.com",
        description: "Doon Greens Lawn is a modest open-air venue in a quiet residential area suitable for simple family weddings and mehndi ceremonies. Tent house setup is required and can be arranged through tie-up vendors.",
        amenities: [
          "Open-air Ground",
          "Accessible Location",
          "Tent Setup Allowed",
          "Affordable"
        ],
        tier: "$",
        cost: 4e4,
        capacity: 300,
        parking: false
      }
    ]
  },
  weddingPhotographer: {
    dehradun: [
      {
        id: "wp-001",
        name: "Frosted Frames Photography",
        location: "Rajpur Road",
        rating: 4.9,
        reviews: 461,
        phone: "+91 9411560201",
        email: "hello@frostedframes.in",
        description: "Frosted Frames Photography is Dehradun's most awarded wedding photography studio, known for their cinematic films, fine-art prints, and drone aerial coverage. Their team of 6 photographers ensures every moment—from pre-wedding portraits to reception dances—is captured with artistic mastery.",
        amenities: [
          "Cinematic Film",
          "Drone Coverage",
          "Fine-art Albums",
          "Pre-wedding Shoot",
          "6-photographer Team",
          "Online Gallery"
        ],
        tier: "$$$",
        cost: 15e4,
        style: "Cinematic fine-art",
        deliverables: [
          "Edited 4K film (30 min)",
          "500+ edited photos",
          "Fine-art album",
          "Drone footage",
          "Online private gallery"
        ]
      },
      {
        id: "wp-002",
        name: "Candid Chronicles",
        location: "GMS Road",
        rating: 4.4,
        reviews: 234,
        phone: "+91 9411560202",
        email: "candid@chroniclesddn.in",
        description: "Candid Chronicles specialises in natural, storytelling wedding photography that captures genuine emotions without staged poses. Their two-photographer team covers both venue and candid moments, delivering a complete digital album within 30 days.",
        amenities: [
          "Candid Photography",
          "Videography Option",
          "Digital Album",
          "30-day Delivery"
        ],
        tier: "$$",
        cost: 65e3,
        style: "Candid documentary",
        deliverables: [
          "300+ edited photos",
          "Digital album",
          "30-day delivery",
          "Optional cinematic video"
        ]
      },
      {
        id: "wp-003",
        name: "Clicks & Memories",
        location: "Prem Nagar",
        rating: 3.9,
        reviews: 88,
        phone: "+91 9411560203",
        email: "clicksmemories@gmail.com",
        description: "Clicks & Memories is a reliable solo photographer offering basic wedding coverage for small and intimate ceremonies. All edited photos are delivered via Google Drive within 2 weeks of the event.",
        amenities: [
          "Solo Photographer",
          "Basic Editing",
          "Digital Delivery",
          "Affordable Package"
        ],
        tier: "$",
        cost: 18e3,
        style: "Traditional coverage",
        deliverables: [
          "150+ edited photos",
          "Digital delivery via Google Drive",
          "2-week turnaround"
        ]
      }
    ]
  },
  weddingResort: {
    dehradun: [
      {
        id: "wr-001",
        name: "The Naini Retreat Resort",
        location: "Mussoorie Road",
        rating: 4.9,
        reviews: 502,
        phone: "+91 9412780401",
        email: "weddings@nainiretreeat.in",
        description: "The Naini Retreat Resort is an exclusive luxury resort nestled in the Himalayan foothills, offering a complete destination wedding experience. The property includes a grand lawn for 1,200 guests, a luxury spa, 80 boutique rooms, a gourmet restaurant, and a dedicated wedding planning team.",
        amenities: [
          "Grand Lawn (1200 capacity)",
          "80 Boutique Rooms",
          "Luxury Spa",
          "Gourmet Restaurant",
          "Wedding Planner",
          "Helipad Access"
        ],
        tier: "$$$",
        cost: 8e5,
        capacity: 1200,
        parking: true
      },
      {
        id: "wr-002",
        name: "Himalayan Heritage Resort",
        location: "Sahastradhara Road",
        rating: 4.5,
        reviews: 278,
        phone: "+91 9412780402",
        email: "events@himalayanheritage.in",
        description: "Himalayan Heritage Resort blends colonial architecture with modern amenities, offering a picturesque setting for weddings and receptions. With 45 well-appointed rooms, a banquet hall for 400, a garden lawn, and in-house catering, it is a complete one-stop wedding venue.",
        amenities: [
          "45 Rooms",
          "Banquet Hall (400)",
          "Garden Lawn",
          "In-house Catering",
          "Event Coordinator",
          "Parking"
        ],
        tier: "$$",
        cost: 35e4,
        capacity: 400,
        parking: true
      },
      {
        id: "wr-003",
        name: "Doon Valley Inn & Resort",
        location: "Chakrata Road",
        rating: 3.9,
        reviews: 112,
        phone: "+91 9412780403",
        email: "info@doonvalleyinn.in",
        description: "Doon Valley Inn & Resort is a budget-friendly resort option suitable for small destination weddings and family get-togethers. The property has a compact garden area, basic banquet hall, 20 rooms, and a simple in-house kitchen.",
        amenities: [
          "Garden Area",
          "Basic Banquet Hall",
          "20 Rooms",
          "In-house Kitchen",
          "Parking"
        ],
        tier: "$",
        cost: 1e5,
        capacity: 200,
        parking: true
      }
    ]
  }
};
export {
  AUDIENCE_SCALES as A,
  DEHRADUN_LOCALITIES as D,
  EVENT_TYPES as E,
  TARGET_AUDIENCES as T,
  VENDOR_CATEGORIES_16 as V,
  EVENT_MONTHS as a,
  VENDOR_EMOJI_16 as b,
  VENDOR_LABELS_16 as c,
  vendorDatabase16 as v
};
