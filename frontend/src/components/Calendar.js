import React, { useState, useEffect } from 'react';
import * as dateFns from 'date-fns';
import FirstPopup from './FirstPopup';
import SecondPopup from './SecondPopup';

const Calendar = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);

    const firstDay = dateFns.startOfMonth(currentDate);
    const lastDay = dateFns.lastDayOfMonth(currentDate);
    const startDate = dateFns.startOfWeek(firstDay);
    const endDate = dateFns.endOfWeek(lastDay);
    const totalDate = dateFns.eachDayOfInterval({ start: startDate, end: endDate });
    const weeks = totalDate.reduce((acc, curr, index) => {
        if (index % 7 === 0) acc.push([]);
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);

    const isToday = (day) => dateFns.isSameDay(day, today);

    const handleDayClick = (date) => {
        setSelectedDate(date);
    };

    const handleClosePopup = () => {
        setSelectedDate(null);
    };

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem 0' }}>
                <button onClick={() => setCurrentDate(dateFns.subMonths(currentDate, 1))}>Anterior</button>
                <span>{dateFns.format(currentDate, 'MMM yyyy')}</span>
                <button onClick={() => setCurrentDate(dateFns.addMonths(currentDate, 1))}>Próximo</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0px' }}>
                {weeks.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                        {week.map((date, index) => (
                            <span
                                key={index}
                                style={{
                                    color: !dateFns.isSameMonth(date, currentDate) ? (isToday(date) ? 'green' : '#ddd') : dateFns.isWeekend(date, currentDate) ? 'red' : '',
                                    border: 'solid black 1px',
                                    margin: '0px',
                                    padding: '0px',
                                    height: '50px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDayClick(date)}
                            >
                                {dateFns.format(date, 'd')}
                            </span>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {selectedDate && (
                tasks.find(task => dateFns.isSameDay(selectedDate, task.datetime)) ? (
                    <FirstPopup date={selectedDate} tasks={tasks.filter(task => dateFns.isSameDay(selectedDate, task.datetime))} onClose={handleClosePopup} />
                ) : (
                    <SecondPopup onClose={handleClosePopup} onAddTask={handleAddTask} />
                )
            )}
        </div>
    );
};

export default Calendar;

