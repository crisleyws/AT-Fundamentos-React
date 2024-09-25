import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from './styles/editList.module.css';
import { getHotels, initializeHotels } from '../services/LocalStorage';

const EditList = () => {
    const [hotels, setHotelsState] = useState([]);

    useEffect(() => {
        initializeHotels();
        const storedHotels = getHotels();
        setHotelsState(storedHotels);
    }, []);

    return (
        <div className={Styles.EditList_container}>
            {hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                    <div key={index} className={Styles.EditList_card}>
                        <img src={hotel.image} alt={hotel.name} className={Styles.EditList_img} />
                        <div className={Styles.EditList_info}>
                            <h2 className={Styles.EditList_name}>{hotel.name}</h2>
                            <p className={Styles.EditList_Rating}>{'⭐'.repeat(Math.round(hotel.rating))}</p>
                            <p className={Styles.EditList_location}>{hotel.city}, {hotel.state}</p>
                            <p className={Styles.EditList_price}>
                                Preço: R${typeof hotel.price === 'number' ? hotel.price.toFixed(2) : 0.0} / diária
                            </p>
                        </div>
                        <Link to={`/editHotel/${index}`} className={Styles.EditList_button}>Editar</Link>
                    </div>
                ))
            ) : (
                <p>Nenhum hotel encontrado.</p>
            )}
        </div>
    );
};

export default EditList;
