import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotels, saveHotels } from "../services/LocalStorage";
import Styles from './styles/editHotel.module.css';
import { FaLocationDot } from "react-icons/fa6";

const EditarHotel = () => {
    const { id } = useParams();
    const index = parseInt(id);
    const hotels = getHotels();
    const hotel = hotels[index];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: hotel?.name || "",
        image: hotel?.image || "",
        rating: hotel?.rating || 0,
        city: hotel?.city || "",
        state: hotel?.state || "",
        price: hotel?.price?.toString() || "",
        description: hotel?.discription || "",
        items: hotel?.item || [""],
        moreImages: hotel?.imagemore || [""]
    });

    const [feedbackMessage, setFeedbackMessage] = useState(null);  // Para armazenar a mensagem de feedback
    const [feedbackType, setFeedbackType] = useState("");  // Para definir o tipo de feedback (sucesso ou erro)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, ""]
        });
    };

    const handleItemChange = (e, index) => {
        const updatedItems = [...formData.items];
        updatedItems[index] = e.target.value;
        setFormData({
            ...formData,
            items: updatedItems
        });
    };

    const handleAddImage = () => {
        setFormData({
            ...formData,
            moreImages: [...formData.moreImages, ""]
        });
    };

    const handleImageChange = (e, index) => {
        const updatedImages = [...formData.moreImages];
        updatedImages[index] = e.target.value;
        setFormData({
            ...formData,
            moreImages: updatedImages
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const updatedHotels = [...hotels];
            updatedHotels[index] = {
                ...hotel,
                name: formData.name,
                image: formData.image,
                rating: parseFloat(formData.rating),
                city: formData.city,
                state: formData.state,
                price: parseFloat(formData.price),
                discription: formData.description,
                item: formData.items.filter(item => item !== ""),
                imagemore: formData.moreImages.filter(img => img !== "")
            };
            saveHotels(updatedHotels);

            // Mostrar mensagem de sucesso
            setFeedbackMessage("As alterações foram salvas com sucesso.");
            setFeedbackType("success");

            // Limpar a mensagem após 3 segundos
            setTimeout(() => {
                setFeedbackMessage(null);
                navigate("/hoteis"); // Redireciona para a página de hotéis após salvar
            }, 3000);
        } catch (error) {
            // Mostrar mensagem de erro
            setFeedbackMessage("Ocorreu um erro ao salvar as alterações.");
            setFeedbackType("error");

            setTimeout(() => setFeedbackMessage(null), 3000);
        }
    };

    // Função para excluir o hotel
    const handleDelete = () => {
        try {
            const updatedHotels = hotels.filter((_, hotelIndex) => hotelIndex !== index);
            saveHotels(updatedHotels);  // Salva a nova lista sem o hotel excluído

            // Mostrar mensagem de sucesso
            setFeedbackMessage("O hotel foi excluído com sucesso.");
            setFeedbackType("success");

            // Limpar a mensagem após 3 segundos
            setTimeout(() => {
                setFeedbackMessage(null);
                navigate("/hoteis");  // Redireciona para a lista de hotéis
            }, 3000);
        } catch (error) {
            // Mostrar mensagem de erro
            setFeedbackMessage("Ocorreu um erro ao excluir o hotel.");
            setFeedbackType("error");

            setTimeout(() => setFeedbackMessage(null), 3000);
        }
    };

    return (
        <div className={Styles.EditarHotel_container}>
            <h2>Editar Hotel: {formData.name}</h2>

            {feedbackMessage && (
                <div className={`${Styles.feedback} ${Styles[feedbackType]}`}>
                    {feedbackMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className={Styles.EditarHotel_form}>
                {/* Campos de edição */}
                <div className={Styles.EditarHotel_group}>
                    <label htmlFor="name">Nome do Hotel:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Outros campos como imagem, rating, cidade, estado, etc... */}
                <div className={Styles.EditarHotel_group}>
                    <label htmlFor="price">Preço da diária (R$):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className={Styles.EditarHotel_group}>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Itens e imagens adicionais */}
                <div className={Styles.EditarHotel_group}>
                    <label>Itens Disponíveis:</label>
                    {formData.items.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            value={item}
                            onChange={(e) => handleItemChange(e, index)}
                            placeholder={`Item ${index + 1}`}
                        />
                    ))}
                    <button type="button" onClick={handleAddItem}>Adicionar Item</button>
                </div>

                <div className={Styles.EditarHotel_group}>
                    <label>Imagens Adicionais:</label>
                    {formData.moreImages.map((image, index) => (
                        <input
                            key={index}
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                            placeholder={`URL da Imagem ${index + 1}`}
                        />
                    ))}
                    <button type="button" onClick={handleAddImage}>Adicionar Imagem</button>
                </div>

                {/* Botão de salvar */}
                <button type="submit" className={Styles.EditarHotel_button}>Salvar Alterações</button>

                {/* Botão de excluir */}
                <button
                    type="button"
                    className={Styles.EditarHotel_deleteButton}
                    onClick={handleDelete}
                >
                    Excluir Hotel
                </button>
            </form>
        </div>
    );
};

export default EditarHotel;
