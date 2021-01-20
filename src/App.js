import 'antd/dist/antd.css';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header/';
import Main from './components/Main/';
import store from './redux';
import { dateCalculator } from './utils/date-calculator';
import { parseDate } from './utils/parse-date';

class App extends React.Component {
  fetchAppointmentsByDay = async (days) => {
    const appointments = await Promise.all(
      days.map(async (day) => {
        const responce = await fetch(
          `http://localhost:3000/appointments/${day._id}`
        );

        const dayAppointments = await responce.json();

        const firstHalf = dayAppointments.filter((item) => item.half === 1);
        const secondHalf = dayAppointments.filter((item) => item.half === 2);

        return {
          _id: day._id,
          day: parseDate(day.date),
          appointments: {
            first: firstHalf,
            second: secondHalf,
          },
        };
      })
    );

    store.dispatch({ type: 'SET_DATA', payload: appointments });
    this.setState({ days: appointments });
  };

  componentDidMount() {
    const fetchData = async () => {
      const responce = await fetch('http://localhost:3000/days');

      const days = await responce.json();

      this.fetchAppointmentsByDay(days);
    };

    fetchData();
  }

  addNewDay = async (day) => {
    const { week } = dateCalculator();

    const newDay = week.find((item) => item.day === Number(day.key));

    const responce = await fetch('http://localhost:3000/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: `${newDay.year}-${newDay.month + 1}-${newDay.day}`,
      }),
    });

    const createdDay = await responce.json();

    const newData = [
      ...store.getState().days,
      {
        _id: createdDay._id,
        day: parseDate(createdDay.date),
        appointments: {
          first: [],
          second: [],
        },
      },
    ];

    store.dispatch({ type: 'SET_DATA', payload: newData });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
