import { Link } from 'react-router-dom';
import imgBuscaFacil from '../assets/busca hotel.svg';
import imgprecoHotel from '../assets/SaveDesktop.svg';
import imgCompareHoteis from '../assets/CompareDesktop.svg';
import Styles from './styles/home.module.css'


function Home() {
    return (<div className={Styles.container}>
        <h1 className={Styles.titulo}>Hoteis.com</h1>
        <h3 className={Styles.subtitulo}>Sua proxima hospodegem mais facil e barata com o Hoteis.com</h3>
        <ul className={Styles.list}>
            <li className={Styles.listItem}>
                <img className={Styles.imgList} src={imgBuscaFacil} alt="Busca Facilitada" />
                <p>Busca Facilidada
                    acha mais facilmente hoteis do seugosto</p>
            </li>
            <li className={Styles.listItem}>
                <img className={Styles.imgList} src={imgprecoHotel} alt="Busca Facilitada" />
                <p>Acha hoteis que cabem no seu bolso </p>
            </li>
            <li className={Styles.listItem}>
                <img className={Styles.imgList} src={imgCompareHoteis} alt="Busca Facilitada" />
                <p>compare hoteis para saber qual se adequa ao seu gosto </p>
            </li>
        </ul>
        <Link to="/hotelPage">
                <button className={Styles.button}>Ver Hotéis</button>
            </Link>
    </div>)
}

export default Home