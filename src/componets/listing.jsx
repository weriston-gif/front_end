import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const Listagem = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/register-list');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const handleEdit = (id) => {

        Swal.fire({
            title: 'Tem certeza?',
            text: 'Gostaria de viualizar esse registro e edita-lo',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d0dd1d',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, editar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                window.location.href = `/register/${id}`;
            }
        });
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Tem certeza?',
            text: 'O registro será deletado permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/register/${id}`);
                    const response = await axios.get('http://127.0.0.1:8000/register-list');
                    setUsers(response.data.data);
                    Swal.fire('Deletado!', 'O registro foi deletado com sucesso!', 'success');
                } catch (error) {
                    console.error('Erro ao deletar registro:', error);
                    Swal.fire('Erro!', 'Ocorreu um erro ao deletar o registro.', 'error');
                }
            }
        });
    };

    return (
        <div className='base-container'>
            {users && users.length > 0 ? (
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Data de Nascimento</th>
                            <th>Gênero</th>
                            <th>Visualizar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td><p> {user.cpf}</p></td>
                                <td><p>{user.name}</p></td>
                                <td><p>{user.email}</p></td>
                                <td><p>{formatDate(user.data_nasc)}</p></td>
                                <td><p>{user.gender}</p></td>
                                <td>
                                    <button className="btn btn-outline-warning" onClick={() => handleEdit(user.id)}>Visualizar</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(user.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nenhum usuário encontrado.</p>
            )}
        </div>
    );
};

export default Listagem;
