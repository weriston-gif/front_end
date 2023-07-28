import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../style/Forms.css';
import Swal from 'sweetalert2';



const Formulario = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    genero: 'Masculino'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const nomeCompleto = `${formData.nome} ${formData.sobrenome}`;

    const { cpf, nome, sobrenome, email, genero, dataNascimento } = formData;
    if (cpf && nome && sobrenome && email) {
      try {
        const dataFormatada = new Date(dataNascimento).toLocaleDateString('pt-BR');
        const response = await axios.post('http://127.0.0.1:8000/register', {
          cpf,
          email,
          name: nomeCompleto,
          gender: genero,
          data_nasc: dataFormatada,
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
      Swal.fire(
        'Atenção!',
        'Por favor, preencha todos os campos antes de enviar o formulário.',
        'warning'
      );
    }
  };




  const handleClear = () => {
    setFormData({
      cpf: '',
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      genero: 'Masculino',
    });
  };

  return (
    <div className="base-container mt-2">
      <form onSubmit={handleFormSubmit}>
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
              Sobrenome:
              <input
                className="w-100"
                type="text"
                name="sobrenome"
                value={formData.sobrenome}
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
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="col-6 py-4">
            <div className="form-floating">
              <select value={formData.genero} onChange={handleChange} name="genero" className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outros">Outros</option>
              </select>
              <label for="floatingSelectGrid">Gênero</label>
            </div>

          </div>
        </div>
        <div className='d-flex justify-content-between '>
          <button type="button" onClick={handleClear} className="btn btn-outline-warning">Limpar</button>
          <button type="submit" className="btn btn-outline-success">Enviar</button>
        </div>
      </form>
    </div>

  );
};

export default Formulario;
