interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
  imgUrl: string;
}

const allPosts: Record<string, BlogPost[]> = {
  en: [
    {
      id: 1,
      slug: "welding-steel-railings",
      title: "Welding Steel Railings",
      content:
        "Welding steel railings is a crucial part of creating secure and durable barriers for balconies and gardens. Steel is a popular material due to its strength and resistance to weathering. Proper welding techniques ensure that the railings are firmly attached, providing safety while enhancing the aesthetic appeal of the structure. Whether for a residential balcony or an industrial fence, welding steel railings requires precision and skill to ensure longevity and stability. In this post, we’ll cover the best practices for welding steel railings.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 2,
      slug: "welding-steel-garden-fences",
      title: "Welding Steel Garden Fences",
      content:
        "Garden fences made from welded steel are an excellent choice for homeowners looking to enhance both the security and appearance of their outdoor spaces. Steel fences offer superior durability compared to wood or plastic alternatives, standing up well against the elements and wear. The welding process ensures that the fence is securely anchored and can withstand forceful impacts. In this blog post, we discuss the benefits of welding steel for garden fences, the tools required, and some tips for maintaining steel fences.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 3,
      slug: "welding-steel-balconies",
      title: "Welding Steel Balconies",
      content:
        "Welding steel for balconies requires a high level of expertise to ensure safety, strength, and durability. Steel is commonly used for balcony structures because of its ability to support heavy loads and withstand harsh weather conditions. A well-welded steel balcony not only provides a functional outdoor space but also adds an industrial-chic design element to a home or building. In this post, we’ll dive into the techniques used to weld steel balconies and the steps to ensure they meet safety standards.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 4,
      slug: "steel-welding-for-fencing",
      title: "Steel Welding for Fencing",
      content:
        "Steel welding plays a vital role in the construction of durable fences that provide security and aesthetic appeal. Whether you're building a fence around a garden, pool, or property, the welding process ensures that each joint is strong and reliable. Steel is an ideal material for fencing due to its ability to resist corrosion, providing long-lasting protection. In this post, we explore the key factors in welding steel for fencing projects, such as selecting the right materials and ensuring a high-quality weld.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 5,
      slug: "balcony-guardrail-welding",
      title: "Balcony Guardrail Welding",
      content:
        "Welding balcony guardrails ensures the safety of the structure while adding a stylish element to the design. Steel is often chosen for guardrails because of its strength and resilience. When welding steel guardrails, precision is key to creating a secure and visually pleasing barrier. This post explores the best techniques for welding balcony guardrails, common mistakes to avoid, and how to ensure that your welded guardrails meet safety codes and standards.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 6,
      slug: "welding-custom-fences",
      title: "Welding Custom Fences",
      content:
        "Custom welded fences are a great option for homeowners looking to add a personalized touch to their property. Whether you need a decorative fence for your garden or a functional one for added security, welding steel offers unmatched strength and durability. In this post, we discuss how to design and weld custom fences, from choosing the right materials to ensuring the final product is both secure and stylish.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 7,
      slug: "welding-structural-steel-railings",
      title: "Welding Structural Steel Railings",
      content:
        "Structural steel railings are commonly used in both residential and commercial buildings for their strength and versatility. Welding these railings requires knowledge of load-bearing structures and welding techniques to ensure safety. This blog post explains the process of welding structural steel railings, from selecting the appropriate steel grades to performing the welds and checking the integrity of the finished product.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 8,
      slug: "steel-balkon-construction",
      title: "Steel Balcony Construction",
      content:
        "The construction of steel balconies is a popular choice for both modern and traditional buildings due to the material's flexibility and strength. Steel balconies not only provide functional outdoor space but can also serve as a design feature. Welding plays a key role in the construction process, ensuring that the balcony is securely attached to the building and is able to support the necessary load. This post will cover the steps involved in welding a steel balcony from start to finish.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 9,
      slug: "welding-wrought-iron-railings",
      title: "Welding Wrought Iron Railings",
      content:
        "Wrought iron railings are a classic choice for adding elegance and security to your property. The process of welding wrought iron requires special techniques to ensure that the material is not weakened by the high temperatures of the welding process. This post will guide you through the process of welding wrought iron railings, from preparing the iron to ensuring the welds are strong and durable.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 10,
      slug: "welding-stainless-steel-railings",
      title: "Welding Stainless Steel Railings",
      content:
        "Stainless steel railings are an excellent choice for modern buildings and high-end properties due to their durability and aesthetic appeal. Welding stainless steel requires specialized knowledge and tools to avoid discoloration and ensure a strong bond. In this post, we discuss the benefits of welding stainless steel railings and the best practices to follow to achieve the desired results.",
      lang: "en",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
  ],
  pl: [
    {
      id: 1,
      slug: "spawanie-balustrad-ze-stali",
      title: "Spawanie Balustrad ze Stali",
      content:
        "Spawanie balustrad ze stali jest kluczowym elementem tworzenia bezpiecznych i trwałych barier na balkonach i w ogrodzeniach. Stal to popularny materiał, który charakteryzuje się dużą wytrzymałością i odpornością na warunki atmosferyczne. Właściwe techniki spawania zapewniają trwałe połączenie, zapewniając bezpieczeństwo i estetykę konstrukcji. W tym poście omówimy najlepsze praktyki spawania balustrad stalowych.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 2,
      slug: "spawanie-ogrodzen-ze-stali",
      title: "Spawanie Ogrodzeń ze Stali",
      content:
        "Ogrodzenia ze spawanej stali to doskonały wybór dla właścicieli domów, którzy szukają trwałego i estetycznego rozwiązania do swojego ogrodu. Stal jest odpornym materiałem, który nie tylko dobrze znosi warunki atmosferyczne, ale także wpływa na bezpieczeństwo ogrodzenia. Proces spawania zapewnia trwałość i stabilność ogrodzenia. W tym artykule omawiamy zalety spawania stali w kontekście budowy ogrodzeń, narzędzia potrzebne do spawania oraz porady dotyczące utrzymania ogrodzeń stalowych.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 3,
      slug: "spawanie-balustrad-balkonowych",
      title: "Spawanie Balustrad Balkonowych",
      content:
        "Spawanie balustrad balkonowych wymaga wysokich umiejętności, aby zapewnić ich bezpieczeństwo, trwałość i stabilność. Stal jest powszechnie stosowanym materiałem na balustrady, ponieważ charakteryzuje się dużą wytrzymałością i odpornością na niekorzystne warunki atmosferyczne. Właściwie spawana balustrada balkonowa nie tylko zapewnia bezpieczeństwo, ale również pełni funkcję dekoracyjną w budynku. W tym artykule omówimy techniki spawania balustrad balkonowych ze stali oraz kroki, które zapewnią spełnienie norm bezpieczeństwa.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 4,
      slug: "spawanie-ogrodzen-ze-stali-warszawa",
      title: "Spawanie Ogrodzeń ze Stali Warszawa",
      content:
        "W Warszawie, spawanie ogrodzeń stalowych jest jednym z najczęściej wybieranych rozwiązań do ochrony posesji i zapewnienia prywatności. Dzięki właściwym technikom spawania, ogrodzenia stalowe stają się stabilne i wytrzymałe na warunki atmosferyczne. Stal jest odpornym materiałem, który świetnie sprawdza się w ogrodzeniach zewnętrznych. W tym poście omawiamy najlepsze techniki spawania ogrodzeń stalowych, które gwarantują trwałość i stabilność.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 5,
      slug: "spawanie-niestandardowych-ogrodzen",
      title: "Spawanie Niestandardowych Ogrodzeń",
      content:
        "Niestandardowe ogrodzenia spawane to doskonała opcja dla właścicieli nieruchomości, którzy chcą wprowadzić unikalny akcent do swojej posesji. Spawanie stali pozwala na tworzenie ogrodzeń o nietypowych kształtach, które pasują do indywidualnych potrzeb właścicieli. W tym artykule omawiamy projektowanie i spawanie niestandardowych ogrodzeń, dobór odpowiednich materiałów oraz wskazówki dotyczące dbania o stalowe ogrodzenia.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 6,
      slug: "spawanie-balustrad-konstrukcyjnych",
      title: "Spawanie Balustrad Konstrukcyjnych",
      content:
        "Balustrady konstrukcyjne ze stali wykorzystywane są w budynkach mieszkalnych i przemysłowych ze względu na swoją wytrzymałość i wszechstronność. Spawanie takich balustrad wymaga znajomości konstrukcji nośnych oraz technik spawania, które zapewnią bezpieczeństwo. W tym poście omawiamy proces spawania balustrad konstrukcyjnych ze stali, dobór odpowiednich gatunków stali, wykonanie spoin oraz sprawdzenie integralności gotowego produktu.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 7,
      slug: "budowa-balustrad-ze-stali",
      title: "Budowa Balustrad ze Stali",
      content:
        "Budowa balustrad ze stali to popularny wybór zarówno w nowoczesnych, jak i tradycyjnych budynkach, ze względu na jej elastyczność i wytrzymałość. Stalowe balustrady nie tylko zapewniają funkcjonalną przestrzeń na zewnątrz, ale mogą również stanowić element designu. Spawanie odgrywa kluczową rolę w procesie budowy balustrady, zapewniając jej pewne przytwierdzenie do konstrukcji budynku. W tym artykule omawiamy proces spawania balustrad stalowych krok po kroku.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 8,
      slug: "spawanie-ogrodzen-warszawa",
      title: "Spawanie Ogrodzeń Warszawa",
      content:
        "Spawanie ogrodzeń w Warszawie jest popularnym wyborem dla osób chcących wzmocnić bezpieczeństwo swojej nieruchomości. Ogrodzenia stalowe zapewniają solidną ochronę przed intruzami i wpływami atmosferycznymi. W tym artykule omawiamy korzyści wynikające ze spawania ogrodzeń stalowych, jak również przydatne wskazówki dotyczące wyboru odpowiednich materiałów oraz technik spawania.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 9,
      slug: "spawanie-stali-w-ogrodzeniu",
      title: "Spawanie Stali w Ogrodzeniu",
      content:
        "Spawanie stali w ogrodzeniu to proces, który zapewnia wytrzymałość ogrodzenia na długie lata. Stal jest jednym z najtrwalszych materiałów, odpornym na działanie niekorzystnych warunków atmosferycznych. Spawanie stali w ogrodzeniach to również możliwość dostosowania kształtu i wielkości ogrodzenia do indywidualnych potrzeb. W tym artykule przyjrzymy się najczęściej stosowanym technikom spawania ogrodzeń ze stali.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 10,
      slug: "spawanie-balustrad-ze-stali-kwasoodpornej",
      title: "Spawanie Balustrad ze Stali Kwasoodpornej",
      content:
        "Balustrady ze stali kwasoodpornej są doskonałym wyborem do zastosowań w trudnych warunkach, takich jak w pobliżu morza czy przemysłowych środowiskach. Spawanie stali kwasoodpornej wymaga specjalnych technik, aby uniknąć przebarwień i zapewnić mocne połączenie. W tym artykule omawiamy zalety spawania balustrad ze stali kwasoodpornej oraz najlepsze praktyki wykonania spawów.",
      lang: "pl",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
  ],
  de: [
    {
      id: 1,
      slug: "schweissen-von-stahlgeländern",
      title: "Schweißen von Stahlgeländern",
      content:
        "Das Schweißen von Stahlgeländern ist ein wichtiger Bestandteil der Herstellung von sicheren und langlebigen Barrieren für Balkone und Zäune. Stahl ist aufgrund seiner Festigkeit und Wetterbeständigkeit ein beliebtes Material. Mit den richtigen Schweißtechniken wird gewährleistet, dass die Geländer fest angebracht sind und sowohl Sicherheit als auch ästhetischen Wert bieten. In diesem Beitrag gehen wir auf die besten Praktiken beim Schweißen von Stahlgeländern ein.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 2,
      slug: "schweissen-von-stahlzäunen",
      title: "Schweißen von Stahlzäunen",
      content:
        "Stahlzäune sind eine ausgezeichnete Wahl für Hausbesitzer, die sowohl Sicherheit als auch ein ansprechendes Design für ihren Garten suchen. Stahlzäune bieten im Vergleich zu Holz- oder Kunststoffalternativen eine überlegene Haltbarkeit. Der Schweißprozess sorgt dafür, dass der Zaun sicher verankert ist und auch intensiven Belastungen standhält. In diesem Artikel besprechen wir die Vorteile des Schweißens von Stahlzäunen und geben nützliche Tipps zur Pflege und Wartung.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 3,
      slug: "schweissen-von-balkongeländern",
      title: "Schweißen von Balkongeländern",
      content:
        "Das Schweißen von Balkongeländern aus Stahl erfordert Fachwissen, um Sicherheit, Stabilität und Haltbarkeit zu gewährleisten. Stahl wird aufgrund seiner Tragfähigkeit und Beständigkeit gegen Umwelteinflüsse häufig für Balkongeländer verwendet. Ein gut geschweißtes Geländer bietet nicht nur Sicherheit, sondern fügt sich auch harmonisch in das Design des Gebäudes ein. In diesem Beitrag gehen wir auf die besten Techniken und Sicherheitsstandards beim Schweißen von Balkongeländern ein.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 4,
      slug: "schweissen-von-industriellen-zäunen",
      title: "Schweißen von Industriellen Zäunen",
      content:
        "Das Schweißen von Stahlzäunen für industrielle Anwendungen ist eine wichtige Technik, um robustere Zäune zu bauen, die für den Einsatz in herausfordernden Umgebungen geeignet sind. Der Schweißprozess gewährleistet die langfristige Haltbarkeit der Zäune. In diesem Beitrag erläutern wir die besten Techniken zum Schweißen von industriellen Stahlzäunen und geben wertvolle Tipps zur Auswahl des richtigen Materials und zur Qualitätssicherung.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 5,
      slug: "schweissen-von-schmiedeeisernen-geländern",
      title: "Schweißen von Schmiedeeisernen Geländern",
      content:
        "Schmiedeeiserne Geländer haben einen klassischen Charme und bieten gleichzeitig hohe Sicherheit. Das Schweißen von Schmiedeeisen erfordert spezielle Techniken, um zu vermeiden, dass das Material durch die hohen Temperaturen geschwächt wird. In diesem Beitrag erklären wir den Prozess des Schweißens von schmiedeeisernen Geländern und geben Tipps zur Handhabung und Pflege dieser langlebigen Elemente.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 6,
      slug: "schweissen-von-gartenzaeunen",
      title: "Schweißen von Gartenzäunen",
      content:
        "Gartenzäune aus geschweißtem Stahl sind eine großartige Wahl, um sowohl Sicherheit als auch ästhetische Werte in Ihrem Garten zu gewährleisten. Stahlzäune bieten eine hohe Beständigkeit gegen Witterungseinflüsse und sind ideal für den Außeneinsatz. Dieser Artikel gibt einen Einblick in die Vorteile des Schweißens von Gartenzäunen, den richtigen Werkzeugeinsatz und die langfristige Pflege.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 7,
      slug: "stahlgelander-fuer-balkone",
      title: "Stahlgeländer für Balkone",
      content:
        "Das Schweißen von Stahlgeländern für Balkone bietet nicht nur Sicherheit, sondern auch eine moderne und ästhetische Ergänzung zu Ihrem Gebäude. Stahl ist ein idealer Werkstoff für Balkonbrüstungen aufgrund seiner Festigkeit und Langlebigkeit. In diesem Beitrag erklären wir den Schweißprozess von Stahlgeländern, von der Auswahl des richtigen Materials bis zur Durchführung der Schweißnähte.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 8,
      slug: "schweissen-von-balkongeländern",
      title: "Schweißen von Balkongeländern",
      content:
        "Das Schweißen von Balkongeländern erfordert Fachkenntnisse und Erfahrung, um die nötige Festigkeit und Sicherheit zu gewährleisten. In diesem Beitrag gehen wir auf die besten Techniken des Schweißens von Balkongeländern ein und zeigen, wie man Fehler vermeidet, die die Sicherheit des Geländers beeinträchtigen könnten.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 9,
      slug: "stahl-wand-gelander",
      title: "Stahl-Wand-Geländer",
      content:
        "Stahl-Wand-Geländer bieten Sicherheit und Schutz und sind gleichzeitig ein Designelement, das das äußere Erscheinungsbild eines Gebäudes verändert. Schweißverfahren werden verwendet, um sicherzustellen, dass das Geländer fest an der Wand befestigt ist und keine Unsicherheit entsteht. In diesem Artikel behandeln wir, wie man stabile Stahl-Wand-Geländer schweißt.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
    {
      id: 10,
      slug: "stahlzaeune-fuer-garten-und-balkon",
      title: "Stahlzäune für Garten und Balkon",
      content:
        "Stahlzäune bieten sowohl ästhetische Vorteile als auch eine hohe Sicherheit. Durch das Schweißen wird der Zaun stabil und langlebig. Stahlzäune sind witterungsbeständig und können individuell gestaltet werden. In diesem Beitrag sprechen wir über den Schweißprozess von Stahlzäunen und geben wertvolle Hinweise zur Auswahl des besten Materials.",
      lang: "de",
      imgUrl: "/assets/images/spawanie1.jpg",
    },
  ],
};
export default allPosts;
