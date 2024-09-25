import HotelList from "../components/HotelList";
import Styles from './styles/hotelPage.module.css'

function HotelPage (){
    return ( <div className={Styles.HotelPage_container}>
        <h1  className={Styles.HotelPage_titulo} >Hoteis disponiveis</h1>
        <HotelList />
    </div>)
}
export default HotelPage