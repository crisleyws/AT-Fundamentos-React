import { useState } from "react";
import { setHotels, getHotels } from "../services/LocalStorage";
import Styles from './styles/CadastrarHotel.module.css';

function CadastrarHotel({ onAdd }) {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        rating: 1,
        city: "",
        state: "",
        price: 0,
        description: "",
        items: [],
        moreImages: [],
    });

    const [additionalImage, setAdditionalImage] = useState("");
    const [additionalItem, setAdditionalItem] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            setFormData({ ...formData, [name]: parseFloat(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddImage = () => {
        if (additionalImage) {
            setFormData((prevData) => ({
                ...prevData,
                moreImages: [...prevData.moreImages, additionalImage],
            }));
            setAdditionalImage("");
        } else {
            alert("Por favor, insira uma URL de imagem adicional.");
        }
    };

    const handleAddItem = () => {
        if (additionalItem) {
            setFormData((prevData) => ({
                ...prevData,
                items: [...prevData.items, additionalItem],
            }));
            setAdditionalItem("");
        } else {
            alert("Por favor, insira um item.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newHotel = {
            ...formData,
            item: formData.items,
            rating: Number(formData.rating),
            price: parseFloat(formData.price),
            imagemore: formData.moreImages,
        };

        const currentHotels = getHotels();
        setHotels([...currentHotels, newHotel]);

        if (onAdd) onAdd([...currentHotels, newHotel]);

        setFormData({
            name: "",
            image: "",
            rating: 1,
            city: "",
            state: "",
            price: 0,
            description: "",
            items: [],
            moreImages: [],
        });

        alert("Hotel cadastrado com sucesso!");
    };

    return (
        <div className={Styles.cadastrarHotel_container}>
            <h1 className={Styles.titulo}>Cadastrar Hotel</h1>
            <form className={Styles.cadastrarHotel_form} onSubmit={handleSubmit}>
                <div className={Styles.cadastrarHotel_input}>
                    <p>Nome Hotel</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome do Hotel"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Imagem do Hotel</p>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="URL da Imagem Principal"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Classificação do hotel</p>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        placeholder="Classificação (1 a 5)"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Cidade</p>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Cidade"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Estado</p>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Estado"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Preço da diaria</p>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Preço da Diária"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_input}>
                    <p>Descrição</p>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição"
                        required
                    /></div>

                <div className={Styles.cadastrarHotel_itens}>
                    <p>Adicionar itens</p>
                    <input
                        type="text"
                        value={additionalItem}
                        onChange={(e) => setAdditionalItem(e.target.value)}
                        placeholder="Adicionar Item"
                    />
                    <button type="button" onClick={handleAddItem}>Adicionar Item</button>


                    <p>Itens Disponíveis:</p>
                    <ul>
                        {formData.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={Styles.cadastrarHotel_itens}>
                    <p>Imagens Adicionais</p>
                    <input
                        type="text"
                        value={additionalImage}
                        onChange={(e) => setAdditionalImage(e.target.value)}
                        placeholder="URL de Imagem Adicional"
                    />
                    <button type="button" onClick={handleAddImage}>Adicionar Imagem Adicional</button>


                    <p>Imagens Adicionais:</p>
                    <ul>
                        {formData.moreImages.map((img, index) => (
                            <li key={index}>{img}</li>
                        ))}
                    </ul>
                </div>
                <button className={Styles.cadastrarHotel_button} type="submit">Cadastrar Hotel</button>
            </form>
        </div>
    );
}

export default CadastrarHotel;
