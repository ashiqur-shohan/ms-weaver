// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: 1 | 2 | 3 | 4 | 5;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "test_01",
    quote:
      "I ordered the bridal veil for my daughter's nikah and it arrived folded in the most beautiful linen envelope I have ever received a package in. The veil itself was perfect — better than the photograph. We will keep it in the family.",
    author: "Rahela Chowdhury",
    role: "Dhaka, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true,
  },
  {
    id: "test_02",
    quote:
      "The Ivory Throw lives on our reading sofa. It has been washed many times now and only becomes more beautiful. My husband asked me to order a second one for his study. I call that the most reliable kind of compliment.",
    author: "Nazia Islam",
    role: "Sylhet, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true,
  },
  {
    id: "test_03",
    quote:
      "I commissioned a bespoke table runner for my parents' fortieth anniversary dinner. Ashfia asked more questions than I expected — about the table, the occasion, the light in the room. The finished piece showed that she had listened to every one of them.",
    author: "Tariq Hossain",
    role: "London, United Kingdom",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true,
  },
  {
    id: "test_04",
    quote:
      "The terracotta beret arrived two days early, which delighted me. It is exactly the right size and the colour is even richer in person. I have been stopped in the street twice. Worth every taka.",
    author: "Sumaiya Begum",
    role: "Chattogram, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
  },
  {
    id: "test_05",
    quote:
      "Gifted the sage market bag to my sister who insists she does not need another bag. She uses it every single day. The cotton-jute blend gets better with every outing — it has acquired a personality.",
    author: "Fariha Akter",
    role: "Dhaka, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: false,
  },
  {
    id: "test_06",
    quote:
      "I was nervous about ordering a christening gown online — it felt like too important a thing to leave to photographs. But Ashfia sent progress photos at each stage and the finished gown exceeded what I had imagined. My son wore it and now it is stored carefully for the next generation.",
    author: "Kamrun Nahar",
    role: "Rajshahi, Bangladesh",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true,
  },
];
