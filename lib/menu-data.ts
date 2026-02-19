export type RawMenuItem = {
  name: string
  description: string
  price: string
}

export type RawMenuCategory = {
  id: string
  name: string
  description: string
  items: RawMenuItem[]
}

export type POSMenuItem = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  priceLabel: string
  priceCents: number | null
  maxPriceCents: number | null
  modifiers: string[]
  tags: string[]
}

export const driftwoodsMenuSource: RawMenuCategory[] = [
  {
    id: 'starters',
    name: 'Shoreline Starters',
    description: 'Start your coastal journey',
    items: [
      { name: 'Surfside Ceviche', description: 'Fresh fish marinated in citrus, jalapeno, cilantro, red onion, served with tortilla chips', price: '$16' },
      { name: 'Steak Bites', description: 'Seasoned beef tips, sauteed peppers & onions, chimichurri', price: '$18' },
      { name: 'Coastal Calamari', description: 'Lightly breaded, fried golden, served with marinara & chipotle aioli', price: '$15' },
      { name: 'Beach Nachos', description: 'Tortilla chips, queso, jalapenos, pico de gallo, sour cream, guacamole. Add chicken $5, Add steak $7', price: '$14' },
      { name: 'Riptide Ribs', description: 'Slow-smoked baby back ribs, house BBQ glaze', price: '$16' },
      { name: 'Pier Pretzels', description: 'Warm soft pretzels, beer cheese, honey mustard', price: '$12' },
      { name: 'Tsunami Tots', description: 'Crispy tots loaded with cheese, bacon, green onion, ranch', price: '$11' },
      { name: 'Mahi Mahi Bites', description: 'Beer-battered mahi mahi, served with tartar sauce', price: '$15' },
      { name: 'Coconut Shrimp', description: 'Crispy coconut-crusted shrimp, sweet chili sauce', price: '$14' },
      { name: 'Driftwood Wings', description: 'Crispy chicken wings, choice of buffalo, BBQ, garlic parm, or mango habanero', price: '$15' },
      { name: 'Spinach & Artichoke Dip', description: 'Creamy blend of spinach, artichoke, parmesan, served with tortilla chips', price: '$13' },
    ],
  },
  {
    id: 'handhelds',
    name: 'High Tide Handhelds',
    description: 'Served with seaside fries',
    items: [
      { name: 'Driftwood Burger', description: 'Half-pound Angus beef, lettuce, tomato, onion, pickle, brioche bun. Add cheese $1, Add bacon $2', price: '$16' },
      { name: 'Fish Tacos', description: 'Grilled or blackened mahi, cabbage slaw, chipotle crema, flour tortillas (3)', price: '$17' },
      { name: "Shrimp Po'Boy", description: 'Crispy fried shrimp, lettuce, tomato, remoulade, hoagie roll', price: '$16' },
      { name: 'Mahi Mahi Sandwich', description: 'Grilled or blackened, lettuce, tomato, tartar, brioche bun', price: '$18' },
      { name: 'Chicken Sandwich', description: 'Grilled or crispy, lettuce, tomato, pickle, brioche bun', price: '$15' },
      { name: 'Philly Cheesesteak', description: 'Shaved ribeye, peppers, onions, provolone, hoagie roll', price: '$17' },
      { name: 'Club Wrap', description: 'Turkey, ham, bacon, lettuce, tomato, mayo, flour tortilla', price: '$15' },
      { name: 'BBQ Pulled Pork', description: 'Slow-smoked pulled pork, house BBQ, coleslaw, brioche bun', price: '$15' },
    ],
  },
  {
    id: 'salads',
    name: 'Surf Side Salads',
    description: 'Fresh & light',
    items: [
      { name: 'Coastal Cobb', description: 'Mixed greens, grilled chicken, bacon, egg, avocado, tomato, blue cheese crumbles, ranch', price: '$16' },
      { name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, caesar dressing. Add chicken $5, Add shrimp $7', price: '$12' },
      { name: 'Ahi Tuna Salad', description: 'Seared ahi tuna, mixed greens, mango, avocado, wonton strips, sesame ginger dressing', price: '$19' },
      { name: 'House Salad', description: 'Mixed greens, tomato, cucumber, red onion, croutons, choice of dressing', price: '$9' },
    ],
  },
  {
    id: 'entrees',
    name: 'Entrees',
    description: 'Coastal favorites',
    items: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon, lemon dill butter, seasonal vegetables, rice pilaf', price: '$26' },
      { name: 'Fish & Chips', description: 'Beer-battered cod, seaside fries, coleslaw, tartar sauce', price: '$18' },
      { name: 'Coconut Mahi Mahi', description: 'Pan-seared mahi, coconut curry sauce, jasmine rice, vegetables', price: '$24' },
      { name: 'NY Strip Steak', description: '12oz NY strip, garlic herb butter, mashed potatoes, seasonal vegetables', price: '$32' },
      { name: 'Surf & Turf', description: '8oz filet mignon, grilled shrimp skewer, mashed potatoes, vegetables', price: '$38' },
    ],
  },
  {
    id: 'pastas',
    name: 'Pastas',
    description: 'House favorites',
    items: [
      { name: 'Shrimp Scampi', description: 'Sauteed shrimp, garlic butter, white wine, lemon, linguine', price: '$22' },
      { name: 'Chicken Alfredo', description: 'Grilled chicken, creamy parmesan sauce, fettuccine', price: '$18' },
      { name: 'Seafood Pasta', description: 'Shrimp, mussels, calamari, marinara sauce, linguine', price: '$24' },
      { name: 'Penne Vodka', description: 'Penne pasta, creamy tomato vodka sauce, parmesan. Add chicken $5', price: '$16' },
    ],
  },
  {
    id: 'sides',
    name: 'Sun Kissed Sides',
    description: 'Perfect additions',
    items: [
      { name: 'Seaside Fries', description: 'Crispy golden fries', price: '$5' },
      { name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries', price: '$6' },
      { name: 'Onion Rings', description: 'Beer-battered onion rings', price: '$7' },
      { name: 'Coleslaw', description: 'Creamy house coleslaw', price: '$4' },
      { name: 'Rice Pilaf', description: 'Seasoned rice pilaf', price: '$5' },
      { name: 'Seasonal Vegetables', description: "Chef's seasonal selection", price: '$6' },
      { name: 'Mac & Cheese', description: 'Creamy four-cheese blend', price: '$7' },
      { name: 'Load Em Up!', description: 'Load up your fries! Add Pulled Pork, Cheese Fondue, Pico, & Guac to your side of Fries!', price: 'Ask Server' },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings',
    items: [
      { name: 'Key Lime Pie', description: 'Classic key lime pie, whipped cream, graham cracker crust', price: '$9' },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake, molten center, vanilla ice cream', price: '$10' },
    ],
  },
  {
    id: 'drinks',
    name: 'Seaside Sips',
    description: 'Refreshing beverages',
    items: [
      { name: 'Draft Beers', description: 'Rotating selection of local and domestic drafts', price: '$6-$9' },
      { name: 'Domestic Bottles', description: 'Bud Light, Budweiser, Coors Light, Miller Lite', price: '$5' },
      { name: 'Import/Craft Bottles', description: 'Corona, Modelo, Heineken, Blue Moon, and more', price: '$6-$8' },
      { name: 'House Wine', description: 'Chardonnay, Pinot Grigio, Cabernet, Merlot', price: '$8' },
      { name: 'Premium Wine', description: 'Ask your server for our premium selection', price: '$10-$14' },
      { name: 'Soft Drinks', description: 'Coke, Diet Coke, Sprite, Lemonade, Iced Tea', price: '$3' },
    ],
  },
  {
    id: 'cocktails',
    name: 'Coastal Cocktails',
    description: 'Handcrafted drinks',
    items: [
      { name: 'Driftwood Margarita', description: 'Tequila, triple sec, fresh lime, salt rim', price: '$12' },
      { name: 'Pier Punch', description: 'Rum, coconut, pineapple, orange juice, grenadine', price: '$13' },
      { name: 'Beach Cruiser', description: 'Vodka, peach schnapps, cranberry, orange juice', price: '$11' },
      { name: 'Mango Tango', description: 'Mango rum, lime, mango puree, tajin rim', price: '$12' },
      { name: 'Sunset Sangria', description: 'Red or white wine, brandy, fresh fruit', price: '$10' },
      { name: 'Mojito', description: 'White rum, fresh mint, lime, soda', price: '$11' },
      { name: 'Paloma', description: 'Tequila, grapefruit, lime, salt rim', price: '$11' },
      { name: 'Long Island', description: 'Vodka, gin, rum, tequila, triple sec, sour, cola', price: '$14' },
      { name: 'Miami Vice', description: 'Half pina colada, half strawberry daiquiri', price: '$13' },
      { name: 'Pina Colada', description: 'Rum, coconut cream, pineapple juice', price: '$12' },
      { name: 'Strawberry Daiquiri', description: 'Rum, strawberry, lime, blended', price: '$11' },
      { name: 'Blue Hawaiian', description: 'Rum, blue curacao, coconut, pineapple', price: '$12' },
      { name: 'Tequila Sunrise', description: 'Tequila, orange juice, grenadine', price: '$10' },
      { name: 'Bay Breeze', description: 'Vodka, cranberry, pineapple juice', price: '$10' },
    ],
  },
  {
    id: 'happyhour',
    name: 'Happy Hour',
    description: 'Mon-Fri 3pm-6pm',
    items: [
      { name: 'Draft Beer', description: 'All domestic drafts', price: '$4' },
      { name: 'House Wine', description: 'Glass of house red or white', price: '$5' },
      { name: 'Well Drinks', description: 'All well cocktails', price: '$5' },
      { name: 'House Margarita', description: 'Classic lime margarita', price: '$6' },
      { name: 'Driftwood Wings', description: 'Half-dozen wings, choice of sauce', price: '$8' },
      { name: 'Pier Pretzels', description: 'Warm pretzels, beer cheese', price: '$7' },
      { name: 'Tsunami Tots', description: 'Loaded tater tots', price: '$7' },
    ],
  },
  {
    id: 'specials',
    name: 'Daily Seaside Specials',
    description: 'Something special every day',
    items: [
      { name: 'Monday - Taco Night', description: '$3 tacos, $5 margaritas', price: '' },
      { name: 'Tuesday - Wing Night', description: '75c wings, $4 domestic drafts', price: '' },
      { name: 'Wednesday - Burger Day', description: 'Half-price burgers, $5 craft beers', price: '' },
      { name: 'Thursday - Steak Night', description: '$22 NY strip dinner, $6 wine', price: '' },
      { name: 'Friday - Fish Fry', description: '$14 fish & chips, $5 well drinks', price: '' },
      { name: 'Weekend - Brunch', description: 'Sat & Sun 10am-2pm, $6 mimosas & bloody marys', price: '' },
    ],
  },
  {
    id: 'brunch',
    name: 'Coastal Cravings Brunch',
    description: 'Sat & Sun 10am-2pm',
    items: [
      { name: 'Huevo Mexicana', description: 'Scrambled eggs, chorizo, peppers, onions, cheese, served with rice & beans, flour tortillas', price: '$14' },
      { name: 'Beach Benny', description: 'Poached eggs, Canadian bacon, hollandaise, English muffin, home fries', price: '$15' },
      { name: 'Crab Cake Benedict', description: 'Poached eggs, house crab cakes, hollandaise, English muffin, home fries', price: '$18' },
      { name: 'Coastal Omelet', description: 'Three eggs, choice of fillings: cheese, ham, bacon, peppers, onions, mushrooms, tomato', price: '$13' },
      { name: 'Steak & Eggs', description: '8oz sirloin, two eggs any style, home fries, toast', price: '$19' },
      { name: 'Chicken & Waffles', description: 'Crispy fried chicken, Belgian waffle, maple syrup, honey butter', price: '$16' },
      { name: 'Shrimp & Grits', description: 'Sauteed shrimp, creamy cheddar grits, andouille sausage, cajun cream', price: '$17' },
      { name: 'Breakfast Burrito', description: 'Scrambled eggs, bacon, cheese, potatoes, pico, wrapped in flour tortilla', price: '$13' },
      { name: 'Avocado Toast', description: 'Smashed avocado, poached eggs, everything seasoning, sourdough', price: '$12' },
      { name: 'Breakfast Tacos', description: 'Three tacos, scrambled eggs, bacon, cheese, pico de gallo', price: '$12' },
      { name: 'Belgian Waffle', description: 'Fresh Belgian waffle, whipped cream, fresh berries, maple syrup', price: '$11' },
      { name: 'Pancake Stack', description: 'Three fluffy buttermilk pancakes, butter, maple syrup', price: '$10' },
      { name: 'French Toast', description: 'Thick-cut brioche, cinnamon, vanilla, powdered sugar, maple syrup', price: '$12' },
      { name: 'Biscuits & Gravy', description: 'Buttermilk biscuits, house sausage gravy, two eggs any style', price: '$12' },
      { name: 'Breakfast Quesadilla', description: 'Scrambled eggs, bacon, cheese, peppers, onions, salsa, sour cream', price: '$13' },
      { name: 'Sunrise Salad', description: 'Mixed greens, grilled chicken, bacon, avocado, egg, honey mustard', price: '$14' },
    ],
  },
  {
    id: 'brunch-sides',
    name: 'A La Carte',
    description: 'Brunch additions',
    items: [
      { name: 'Two Eggs Any Style', description: '', price: '$4' },
      { name: 'Bacon or Sausage', description: '', price: '$5' },
      { name: 'Home Fries', description: '', price: '$4' },
      { name: 'Toast or English Muffin', description: '', price: '$3' },
      { name: 'Fresh Fruit', description: '', price: '$5' },
      { name: 'Side of Grits', description: '', price: '$4' },
      { name: 'Mimosa', description: 'Champagne, fresh OJ', price: '$6' },
      { name: 'Bloody Mary', description: 'House vodka, bloody mix, celery, olives', price: '$6' },
    ],
  },
]

const pricePattern = /\$(\d+(?:\.\d{1,2})?)/g

function toCents(value: string): number | null {
  const numeric = Number.parseFloat(value)
  if (Number.isNaN(numeric)) {
    return null
  }
  return Math.round(numeric * 100)
}

function parsePrice(price: string): { priceCents: number | null; maxPriceCents: number | null } {
  const matches = [...price.matchAll(pricePattern)].map((match) => match[1])
  if (matches.length === 0) {
    return { priceCents: null, maxPriceCents: null }
  }
  if (matches.length === 1) {
    return { priceCents: toCents(matches[0]), maxPriceCents: null }
  }
  return {
    priceCents: toCents(matches[0]),
    maxPriceCents: toCents(matches[matches.length - 1]),
  }
}

function extractModifiers(description: string): string[] {
  return description
    .split('.')
    .flatMap((sentence) => sentence.split(','))
    .map((segment) => segment.trim())
    .filter((segment) => /^(Add|choice of|served with)/i.test(segment))
}

function inferTags(categoryName: string, itemName: string, description: string): string[] {
  const tags = new Set<string>()
  const combined = `${categoryName} ${itemName} ${description}`.toLowerCase()

  if (categoryName.toLowerCase().includes('cocktail') || categoryName.toLowerCase().includes('sips')) tags.add('beverage')
  if (categoryName.toLowerCase().includes('happy hour')) tags.add('happy-hour')
  if (categoryName.toLowerCase().includes('brunch')) tags.add('brunch')
  if (combined.includes('salad')) tags.add('salad')
  if (combined.includes('shrimp') || combined.includes('fish') || combined.includes('mahi') || combined.includes('salmon') || combined.includes('tuna')) tags.add('seafood')
  if (combined.includes('chicken')) tags.add('chicken')
  if (combined.includes('steak') || combined.includes('ribeye') || combined.includes('beef')) tags.add('beef')
  if (combined.includes('wings')) tags.add('shareable')
  if (combined.includes('veggie') || combined.includes('avocado') || combined.includes('vegetables')) tags.add('fresh')

  return [...tags]
}

export const posMenuItems: POSMenuItem[] = driftwoodsMenuSource.flatMap((category) => {
  return category.items.map((item) => {
    const parsed = parsePrice(item.price)
    const slug = `${category.id}-${item.name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    return {
      id: slug,
      name: item.name,
      description: item.description,
      categoryId: category.id,
      categoryName: category.name,
      priceLabel: item.price || 'Market Price',
      priceCents: parsed.priceCents,
      maxPriceCents: parsed.maxPriceCents,
      modifiers: extractModifiers(item.description),
      tags: inferTags(category.name, item.name, item.description),
    }
  })
})

export const posMenuCategories = driftwoodsMenuSource.map((category) => ({
  id: category.id,
  name: category.name,
  description: category.description,
  itemCount: category.items.length,
}))

export function formatCurrency(cents: number | null): string {
  if (cents === null) return 'Market Price'
  return `$${(cents / 100).toFixed(2)}`
}
