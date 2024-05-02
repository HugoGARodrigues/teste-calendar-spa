import React from 'react';

const FirstPopup = ({ date, tasks, onAddTask, onClose }) => {
    // Função para editar uma tarefa
    const handleEditTask = (taskId) => {
        // Implementação para editar a tarefa com o taskId especificado
        console.log('Editar tarefa com o ID:', taskId);
    };

    // Função para deletar uma tarefa
    const handleDeleteTask = (taskId) => {
        // Implementação para deletar a tarefa com o taskId especificado
        console.log('Deletar tarefa com o ID:', taskId);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Tarefas do Dia</h2>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                {task.title}
                                <button onClick={() => handleEditTask(task.id)}>Editar</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Deletar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma tarefa para este dia.</p>
                )}
                <button onClick={onAddTask}>Adicionar Tarefa</button>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default FirstPopup;
