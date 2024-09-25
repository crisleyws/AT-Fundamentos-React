import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from './styles/HotelList.module.css';
import { getHotels, initializeHotels } from '../services/LocalStorage';

const HotelList = () => {
    const [hotels, setHotelsState] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('price');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        initializeHotels();
        const storedHotels = getHotels();
        sortHotels(storedHotels, sortCriterion);
    }, [sortCriterion]);

    const sortHotels = (hotelsArray, criterion) => {
        const sortedHotels = [...hotelsArray].sort((a, b) => {
            if (criterion === 'price') {
                return a.price - b.price;
            } else if (criterion === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });
        setHotelsState(sortedHotels);
    };

    const handleSortChange = (e) => {
        setSortCriterion(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleFavorite = (hotel) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(hotel)) {
                return prevFavorites.filter(fav => fav !== hotel);
            } else {
                return [...prevFavorites, hotel];
            }
        });
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const favoriteHotels = favorites.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={Styles.HotelList_container}>
            <div className={Styles.HotelList_sort}>
                <label htmlFor="sort">Ordenar por:</label>
                <select id="sort" onChange={handleSortChange} value={sortCriterion}>
                    <option value="price">Preço</option>
                    <option value="rating">Classificação</option>
                </select>
            </div>

            <div className={Styles.HotelList_search}>
                <input
                    type="text"
                    placeholder="Pesquisar por nome do hotel..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={Styles.HotelList_searchInput}
                />
            </div>

            <h2>Hotéis</h2>
            <div className={Styles.HotelList_cards}>
                {filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel, index) => (
                        <div key={index} className={Styles.HotelList_card}>
                            <img src={hotel.image} alt={hotel.name} className={Styles.HotelList_img} />
                            <div className={Styles.HotelList_info}>
                                <h2 className={Styles.HotelList_name}>{hotel.name}</h2>
                                <p className={Styles.HotelList_Rating}>{'⭐'.repeat(Math.round(hotel.rating))}</p>
                                <p className={Styles.HotelList_location}>{hotel.city}, {hotel.state}</p>
                                <p className={Styles.HotelList_price}>
                                    Preço: R${typeof hotel.price === 'number' ? hotel.price.toFixed(2) : 0.0} / diária
                                </p>
                            </div>
                            <span 
                                onClick={() => toggleFavorite(hotel)} 
                                className={`${Styles.HotelList_favoriteIcon} ${favorites.includes(hotel) ? Styles.active : ''}`}
                            >
                                ★
                            </span>
                            <Link to={`/hotel/${index}`} className={Styles.HotelList_button}>Detalhes</Link>
                        </div>
                    ))
                ) : (
                    <p>Nenhum hotel encontrado.</p>
                )}
            </div>

            <h2>Favoritos</h2>
            <div className={Styles.HotelList_cards}>
                {favoriteHotels.length > 0 ? (
                    favoriteHotels.map((hotel, index) => (
                        <div key={index} className={Styles.HotelList_card}>
                            <img src={hotel.image} alt={hotel.name} className={Styles.HotelList_img} />
                            <div className={Styles.HotelList_info}>
                                <h2 className={Styles.HotelList_name}>{hotel.name}</h2>
                                <p className={Styles.HotelList_Rating}>{'⭐'.repeat(Math.round(hotel.rating))}</p>
                                <p className={Styles.HotelList_location}>{hotel.city}, {hotel.state}</p>
                                <p className={Styles.HotelList_price}>
                                    Preço: R${typeof hotel.price === 'number' ? hotel.price.toFixed(2) : 0.0} / diária
                                </p>
                            </div>
                            <span 
                                onClick={() => toggleFavorite(hotel)} 
                                className={`${Styles.HotelList_favoriteIcon} ${Styles.active}`}
                            >
                                ★
                            </span>
                            <Link to={`/hotel/${index}`} className={Styles.HotelList_button}>Detalhes</Link>
                        </div>
                    ))
                ) : (
                    <p>Nenhum favorito encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default HotelList;
