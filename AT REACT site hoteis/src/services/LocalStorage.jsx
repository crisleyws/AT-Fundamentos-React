const hoteisPadrao = [
    {
        name: "Hotel Alto da Colina",
        image: "/assets/hotel1.jpeg",
        rating: 4,
        city: "Panambi",
        state: "RS",
        price: 200.0,
        discription: "hotel localizado no alto da colina com linda vista da cidade, hotel para quem busca uma boa vista e conforto.",
        item: ["Wi-Fi", "Estacionamento", "Café da manhã", "TV", "serviço de quarto"],
        imagemore: ["/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg"]
    },
    {
        name: "Hotel Baixo da Colina",
        image: "/assets/hotel4.jpeg",
        rating: 2,
        city: "Panambi",
        state: "RS",
        price: 100.0,
        discription: "hotel localizado no baixo da colina um hotel para quem quer pagar um baixo preço.",
        item: ["Estacionamento"],
        imagemore: ["/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg"]
    },
    {
        name: "Hotel La Exclusive",
        image: "/assets/hotel2.jpeg",
        rating: 5,
        city: "Panambi",
        state: "RS",
        price: 300.0,
        discription: "Hotel para quem busca extremo conforto e qualidade sem se preocupar com valores.",
        item: ["Wi-Fi", "Estacionamento", "Café da manhã", "Almoço e janta", "TV", "serviço de quarto", "Hidromasagem"],
        imagemore: ["/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg"]
    },
    {
        name: "Hotel Custo Benefício",
        image: "/assets/hotel3.jpeg",
        rating: 4,
        city: "Panambi",
        state: "RS",
        price: 180.0,
        discription: "Hotel que tenta combinar conforto, qualidade e bom preço para sua hospedagem.",
        item: ["Wi-Fi", "Estacionamento", "Café da manhã", "TV"],
        imagemore: ["/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg", "/assets/hotel dentro.jpeg"]
    },
];

export const getDefaultHotels = () => {
    return hoteisPadrao;
};

export const setHotels = (hotels) => {
    localStorage.setItem("hotels", JSON.stringify(hotels));
};

export const getHotels = () => {
    const hotels = localStorage.getItem("hotels");
    return hotels ? JSON.parse(hotels) : [];
};

export const saveHotels = (hotels) => {
    localStorage.setItem('hotels', JSON.stringify(hotels));
};

export const initializeHotels = () => {
    if (!localStorage.getItem('hotels')) {
        console.log('Setting default hotels');
        setHotels(hoteisPadrao);
    }
};