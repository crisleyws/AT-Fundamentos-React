import { useParams } from "react-router-dom";
import { getHotels } from "../services/LocalStorage";
import Styles from './styles/HotelDetails.module.css';
import { FaLocationDot } from "react-icons/fa6";

const HotelDetails = () => {
    const { id } = useParams();
    const index = parseInt(id);
    const hotels = getHotels();
    const hotel = hotels[index];

    if (!hotel) {
        return <div>Hotel não encontrado</div>;
    }

    const starCount = Math.round(hotel.Rating) || 0; 

    return (
        <div className={Styles.HotelDetails_container}>
            <h2>{hotel.name}</h2>
            <img src={hotel.image} alt={hotel.name} className={Styles.HotelDetails_img} />
            <p className={Styles.HotelDetails_discription}>{hotel.discription}</p>
            <p className={Styles.HotelDetails_Rating}>{'⭐'.repeat(Math.round(hotel.rating))} ({hotel.rating} estrelas)</p>

            <p className={Styles.HotelDetails_location}>
                <FaLocationDot className={Styles.HotelDetails_locationIcon} />
                {hotel.city}, {hotel.state}
            </p>
            <p>Preço: R${typeof hotel.price === 'number' ? hotel.price.toFixed(2) : 'Indisponível'}</p>

            <h3>Itens disponíveis:</h3>
            <ul className={Styles.HotelDetails_itens}>
                {Array.isArray(hotel.item) && hotel.item.length > 0 ? (
                    hotel.item.map((it, index) => (
                        <li key={index}>{it}</li>
                    ))
                ) : (
                    <li>Nenhum item disponível</li>
                )}
            </ul>

            <h3>Imagens Adicionais:</h3>
            <div className={Styles.HotelDetails_moreImages}>
                {Array.isArray(hotel.imagemore) && hotel.imagemore.length > 0 ? (
                    hotel.imagemore.map((img, index) => (
                        <img key={index} src={img} alt={`Imagem adicional ${index + 1}`} className={Styles.HotelDetails_moreImage} />
                    ))
                ) : (
                    <p>Não há imagens adicionais disponíveis</p>
                )}
            </div>
        </div>
    );
};

export default HotelDetails;
