import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../style/Forms.css';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';



const FormularioEdicao = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        cpf: '',
        nome: '',
        sobrenome: '',
        email: '',
        dataNascimento: '',
        genero: 'Masculino',
    });

    useEffect(() => {
        const fetchRegistro = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/register/${id}`);
                console.log(response.data.data)
                setFormData({
                    cpf: response.data.data.cpf,
                    nome: response.data.data.name,
                    email: response.data.data.email,
                    dataNascimento: response.data.data.data_nasc,
                    genero: response.data.data.gender,
                });

            } catch (error) {
                console.error('Erro ao obter registro:', error);
            }
        };

        fetchRegistro();
    }, [id]);

    const formatDate = (date) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth()).toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { cpf, nome, email, genero, dataNascimento } = formData;
        if (cpf && nome && email) {
            try {
                const response = await axios.patch(`http://127.0.0.1:8000/register/${id}`, {
                    cpf,
                    email,
                    name: nome,
                    gender: genero,
                    data_nasc: dataFormatada
                });
                console.log('Dados enviados:', response.data);
                Swal.fire('Sucesso!', 'Formulário enviado com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao enviar dados:', error.request.response);
                const errorData = JSON.parse(error.request.response).errors;
                const errorMessage = Object.values(errorData).join('\n');
                Swal.fire('Erro!', errorMessage, 'error');
            }
        } else {
            Swal.fire('Atenção!', 'Por favor, preencha todos os campos antes de enviar o formulário.', 'warning');
        }

    };

    const handleSend = async (event) => {
        event.preventDefault();
        const { cpf, nome, email, genero, dataNascimento } = formData;

        try {
            const response = await axios.post("https://api-teste.ip4y.com.br/cadastro", {
                cpf,
                email,
                name: nome,
                gender: genero,
                data_nasc: dataNascimento
            });
            console.log('Dados enviados:', response.data);
            Swal.fire('Sucesso!', 'Formulário enviado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao enviar dados:', error.request.response);
            const errorData = JSON.parse(error.request.response).errors;
            const errorMessage = Object.values(errorData).join('\n');
            Swal.fire('Erro!', errorMessage, 'error');
        }
    };


    const handleChangeDate = (e) => {
        const timestamp = e.target.value;
        const selectedDate = new Date(timestamp);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            Swal.fire('A data inserida não pode ser maior que a data atual.');
            setDate('');
            setFormData((prevFormData) => ({ ...prevFormData, dataNascimento: '' }));
        } else {
            setDate(timestamp);
            const dataFormatada = formatDate(timestamp);
            setFormData((prevFormData) => ({ ...prevFormData, dataNascimento: dataFormatada }));
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return (
        <div>
            {formData ? (
                <div className="base-container mt-2">
                    <form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="col-12">
                                <label className="w-100">
                                    CPF:
                                    <InputMask
                                        type="text"
                                        className="w-100"
                                        name="cpf"
                                        mask="999.999.999-99"
                                        value={formData.cpf}
                                        onChange={handleChange} 
                                        required
                                    />
                                </label></div>
                            <div className="col-12">
                                <label className="w-100">
                                    Nome:
                                    <input
                                        className="w-100"
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange} 
                                        required
                                    />
                                </label>
                            </div>

                            <div className="col-12">
                                <label className="w-100">
                                    E-mail:
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-100"
                                        value={formData.email}
                                        onChange={handleChange} 
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="col-12">
                                <label className="w-100">
                                    Data de Nascimento:
                                    <input
                                        type="date"
                                        className="w-100"
                                        name="dataNascimento"
                                        onChange={handleChangeDate} 
                                        required
                                    />
                                </label>
                            </div>
                            <div className="col-6 py-4">
                                <div className="form-floating">
                                    <select value={formData.genero} name="genero " onChange={handleChange} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                    <label for="floatingSelectGrid">Gênero</label>
                                </div>

                            </div>
                        </div>
                        <div className='d-flex justify-content-between '>
                            <button type="button" onClick={() => handleSend()} className="btn btn-outline-primary ml-3">Enviar </button>
                            <button type="submit" className="btn btn-outline-success">Atualizar</button>

                        </div>
                    </form>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>);
};

export default FormularioEdicao;
