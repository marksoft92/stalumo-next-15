interface BlogContent {
  slug: string;
  title: string;
  content: string;
  lang: string;
}

interface BlogPost {
  id: number;
  imgUrl: string;
  alt: string;
  pl: BlogContent;
  en: BlogContent;
  de: BlogContent;
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    imgUrl: "/assets/images/spawanie1.jpg",
    alt: "x",
    pl: {
      slug: "slug-polska",
      title: "Title po polsku",
      content: "Tekst po polskiu",
      lang: "pl",
    },
    en: {
      slug: "slug-angielsku",
      title: "Title po angielsku",
      content: "Tekst po angielsku",
      lang: "en",
    },
    de: {
      slug: "slug-niemiecku",
      title: "Title po niemiecku",
      content: "Tekst po niemiecku",
      lang: "de",
    },
  },
  {
    id: 2,
    imgUrl: "/assets/images/spawanie1.jpg",
    alt: "x",
    pl: {
      slug: "slug-polska",
      title: "Title po polsku",
      content: "Tekst po polskiu",
      lang: "pl",
    },
    en: {
      slug: "slug-angielsku",
      title: "Title po angielsku",
      content: "Tekst po angielsku",
      lang: "en",
    },
    de: {
      slug: "slug-niemiecku",
      title: "Title po niemiecku",
      content: "Tekst po niemiecku",
      lang: "de",
    },
  },
  // Dodaj więcej postów...
];

export default allPosts;
