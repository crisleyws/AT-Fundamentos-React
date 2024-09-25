import { Link } from 'react-router-dom';
import styles from './styles/admin.module.css'

function Admin (){
    return(
<div className={styles.admin_container}>
    <h1 className={styles.admin_titulo} >Administrador</h1>
    <Link to={`/cadastrar`} className={styles.admin_cadastro}>Cadastrar Hotel</Link>
    <Link to={`/EditList`} className={styles.admin_editar}>Editar Hotel</Link>
</div>
)}

export default Admin