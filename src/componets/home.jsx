import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeIndice = () => {
  return (
    <div className="base-container">
      <div className="text-center text-home">
        <h4>Bem-vindo ao Nosso Cadastro de Usuários!</h4>
        <p>
          Aqui você pode se divertir cadastrando novos usuários em nosso sistema e ver a lista dos usuários já cadastrados. Nossa plataforma é simples, intuitiva e cheia de recursos incríveis para facilitar a gestão dos usuários.
        </p>
        <p>
          Para começar, clique em <NavLink to="/register">"Cadastrar"</NavLink> para inserir os dados do novo usuário, como nome, sobrenome, CPF, e-mail, gênero e data de nascimento. Após preencher os campos, é só clicar em "Enviar" para salvar os dados.
        </p>
        <p>
          Depois de cadastrar, você pode navegar até a <NavLink to="/list">"Lista"</NavLink> para conferir todos os usuários cadastrados. Lá você encontrará todas as informações de cada usuário, e poderá filtrar e pesquisar os dados conforme sua preferência.
        </p>
        <p>
          Não se preocupe, nosso sistema é seguro e seus dados estarão protegidos. Além disso, estamos sempre trabalhando para melhorar e trazer novas funcionalidades para você.
        </p>
        <p>
          Boa diversão e até breve!
        </p>
      </div>
    </div>
  );
};

export default HomeIndice;
