const products = [
  {
    id: 1,
    name: "Amara Linen Dress",
    category: "Dress",
    price: 549000,
    originalPrice: 689000,
    rating: 4.8,
    reviews: 24,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    description: "Dress linen premium berpotongan santai dengan tali pinggang yang manis, cocok untuk hari-hari cerah Anda."
  },
  {
    id: 2,
    name: "Celeste Blouse",
    category: "Tops",
    price: 329000,
    rating: 4.9,
    reviews: 18,
    badge: "New",
    image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&auto=format&fit=crop&q=80",
    description: "Atasan blouse berpotongan modern dengan detail lengan puffed yang memberikan siluet feminin dan chic."
  },
  {
    id: 3,
    name: "Elara Knit Cardigan",
    category: "Outerwear",
    price: 429000,
    rating: 4.7,
    reviews: 15,
    badge: null,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    description: "Cardigan rajut lembut berkualitas tinggi yang hangat dan cocok dipadankan dengan pakaian favorit Anda."
  },
  {
    id: 4,
    name: "Vienna Midi Skirt",
    category: "Tops",
    price: 389000,
    rating: 4.6,
    reviews: 12,
    badge: "New",
    image: "/images/vienna-midi-skirt.png",
    description: "Rok midi berpotongan A-line dengan bahan jatuh yang anggun, memberikan kenyamanan sepanjang hari."
  },
  {
    id: 5,
    name: "Aurora Satin Dress",
    category: "Dress",
    price: 629000,
    originalPrice: 749000,
    rating: 5.0,
    reviews: 32,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
    description: "Dress berbahan satin premium dengan kilau mewah yang menawan, didesain khusus untuk acara malam formal Anda."
  },
  {
    id: 6,
    name: "Belle Classic Shirt",
    category: "Tops",
    price: 359000,
    rating: 4.8,
    reviews: 20,
    badge: null,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=80",
    description: "Kemeja katun berkerah klasik dengan potongan fit yang rapi, sangat cocok untuk gaya kasual maupun formal kantoran."
  },
  {
    id: 7,
    name: "Luna Shoulder Bag",
    category: "Accessories",
    price: 449000,
    rating: 4.9,
    reviews: 28,
    badge: "New",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    description: "Tas bahu berbahan kulit sintetis premium dengan desain minimalis elegan dan kompartemen fungsional."
  },
  {
    id: 8,
    name: "Rosalie Pearl Necklace",
    category: "Accessories",
    price: 219000,
    rating: 4.7,
    reviews: 14,
    badge: null,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
  }
];

const augmentedProducts = products.map((product) => {
  const stock = ((product.id * 11) % 30) + 2; // e.g. 2 to 31
  const status = stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock";
  const code = `PRD-00${product.id}`;
  
  let icon = "📦";
  if (product.category === "Dress") icon = "👗";
  else if (product.category === "Tops") icon = "👚";
  else if (product.category === "Outerwear") icon = "🧥";
  else if (product.category === "Accessories") {
    if (product.name.toLowerCase().includes("bag")) icon = "👜";
    else icon = "📿";
  }

  return {
    ...product,
    title: product.name,
    code,
    brand: "Aurelia",
    stock,
    status,
    icon,
    priceNum: product.price,
    price: `Rp ${product.price.toLocaleString("id-ID")}`,
  };
});

export default augmentedProducts;