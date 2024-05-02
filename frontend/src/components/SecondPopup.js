import React, { useState } from 'react';

const SecondPopup = ({ onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title,
            description,
            datetime: new Date(`${date}T${time}`),
            duration
        };

        try {
            const response = await fetch('http://localhost:8800/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            const data = await response.json();
            console.log('Tarefa adicionada com sucesso:', data);
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Adicionar Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Data:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                    <div>
                        <label>Duração:</label>
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <button type="submit">Adicionar Tarefa</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default SecondPopup;
