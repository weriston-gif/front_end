import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../style/Forms.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '', // Adicionando o campo de dataNascimento
    email: '',
    genero: 'Masculino'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Unir o nome e sobrenome em um único campo antes de enviar o formulário
    const nomeCompleto = `${formData.nome} ${formData.sobrenome}`;

    // Verificar se todos os campos estão preenchidos
    const { cpf, nome, sobrenome, email, genero, dataNascimento } = formData;
    if (cpf && nome && sobrenome && email) {
      try {
        // Formatar a data de nascimento para "d/m/Y"
        const dataFormatada = new Date(dataNascimento).toLocaleDateString('pt-BR');

        // Enviar os dados do formulário para o servidor
        const response = await axios.post('http://127.0.0.1:8000/register', {
          cpf,
          email,
          name: nomeCompleto,
          gender: genero,
          data_nasc: dataFormatada
        });

        console.log('Dados enviados:', response.data);

        // Exibir mensagem de sucesso
        alert('Formulário enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      }
    } else {
      // Exibir mensagem de erro
      alert('Por favor, preencha todos os campos antes de enviar o formulário.');
    }
  };

  return (
    <div className="container">
      <div className="formulario-container">
        <form onSubmit={handleSubmit} className="">
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
              <div class="form-floating">
                <select value={formData.genero} onChange={handleChange} name="genero" className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outros">Outros</option>
                </select>
                <label for="floatingSelectGrid">Gênero</label>
              </div>

            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <button type="submit" class="btn btn-outline-primary">Enviar</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
