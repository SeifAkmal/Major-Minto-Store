import { Product } from '../app/core/interfaces/product';

export const PRODUCTS: Product[] = [
  // Herbs
  {
    id: 1,
    title: 'Herbal Sleep Blend',
    price: 24.99,
    category: 'Herbs',
    image: 'Herbs/Herbal-Sleep-Blend.png',
    rating: 3.5,
  },
  {
    id: 2,
    title: 'Lavender Tea',
    price: 18.5,
    category: 'Herbs',
    image: 'Herbs/Lavender-Tea.png',
    rating: 2.6,
  },
  {
    id: 3,
    title: 'Matcha Powder Premium',
    price: 32.99,
    category: 'Herbs',
    image: 'Herbs/Matcha-Powder-Premium.png',
    rating: 2.8,
    badge: 'New',
  },
  {
    id: 4,
    title: 'Organic Green Tea',
    price: 21.25,
    category: 'Herbs',
    image: 'Herbs/Organic-Green-Tea.png',
    rating: 2.7,
  },

  // Nuts
  {
    id: 5,
    title: 'Almonds',
    price: 15.99,
    category: 'Nuts',
    image: 'Nuts/Almonds.png',
    rating: 4.4,
  },
  {
    id: 6,
    title: 'Cashews',
    price: 17.49,
    category: 'Nuts',
    image: 'Nuts/Cashews.png',
    rating: 4.5,
  },
  {
    id: 7,
    title: 'Pistachios',
    price: 22.99,
    category: 'Nuts',
    image: 'Nuts/Pistachios.png',
    rating: 4.7,
    badge: 'Trending',
  },

  // Supplements
  {
    id: 8,
    title: 'Magnesium Glycinate',
    price: 29.99,
    category: 'Supplements',
    image: 'Supplements/Magnesium-Glycinate.png',
    rating: 3.7,
  },
  {
    id: 9,
    title: 'Omega 3 Softgels',
    price: 34.5,
    category: 'Supplements',
    image: 'Supplements/Omega-3-Softgels.png',
    rating: 4.6,
    badge: 'BestSeller',
  },
  {
    id: 10,
    title: 'Vitamin C Chewables',
    price: 12.99,
    category: 'Supplements',
    image: 'Supplements/VitaminC-Chewables.png',
    rating: 4.4,
    badge: 'Popular',
  },
  {
    id: 11,
    title: 'Zinc Tablets',
    price: 14.75,
    category: 'Supplements',
    image: 'Supplements/Zinc-Tablets.png',
    rating: 3.5,
  },
];
