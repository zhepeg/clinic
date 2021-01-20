import { Button, Tag, Select, Input } from 'antd';
import React from 'react';
import './Day.css';

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableTimes: [],
      selectedTime: '',
      selectedPatient: '',
    };
  }

  deleteDay = async () => {
    await fetch(`http://localhost:3000/days/${this.props._id}`, {
      method: 'DELETE',
    });

    window.location.reload();
  };

  addAppointment = () => {
    const allTimes = [
      '08:00',
      '08:20',
      '08:40',
      '09:00',
      '09:20',
      '09:40',
      '10:00',
      '10:20',
      '10:40',
      '11:00',
      '11:20',
      '11:40',
      '12:00',
      '12:20',
      '12:40',
      '13:00',
      '13:20',
      '13:40',
      '14:00',
      '14:20',
      '14:40',
      '15:00',
      '15:20',
      '15:40',
      '16:00',
      '16:20',
      '16:40',
      '17:00',
      '17:20',
      '17:40',
    ];

    const busyTime = [
      ...this.props.appointments.first.map((item) => item.time),
      ...this.props.appointments.second.map((item) => item.time),
    ];

    const availableTimes = allTimes.filter((item) => !busyTime.includes(item));

    this.setState({ availableTimes });
  };

  handleAddClick = async () => {
    const half = this.state.selectedTime.split(':')[0] < 14 ? 1 : 2;

    await fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: this.state.selectedTime,
        half: half,
        dayId: this.props._id,
        patient: this.state.selectedPatient,
      }),
    });

    window.location.reload();
  };

  deleteTime = async (e, time) => {
    e.preventDefault();

    await fetch('http://localhost:3000/appointments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: time._id,
      }),
    });

    window.location.reload();
  };

  render() {
    return (
      <div className="day">
        <div className="day__info">
          <p className="day__date">{this.props.date}</p>
          <form className="day__form">
            <Select
              className="day__select"
              onClick={this.addAppointment}
              placeholder="Время"
              onSelect={(time) =>
                this.setState({ ...this.state, selectedTime: time })
              }
              options={this.state.availableTimes.map((time) => ({
                label: time,
                value: time,
              }))}
            />
            <Input
              className="day__input"
              placeholder="Пациент"
              onChange={({ target: { value } }) =>
                this.setState({ ...this.state, selectedPatient: value })
              }
            />
            <button className="day__button" onClick={this.handleAddClick}>
              Добавить
            </button>
          </form>
        </div>
        <div className="day__shift">
          {this.props.appointments.first.map((time) => (
            <Tag
              key={time._id}
              closable
              onClose={(e) => this.deleteTime(e, time)}
              className="day__time"
            >
              {time.time} {time.patient}
            </Tag>
          ))}
        </div>
        <div className="day__shift">
          {this.props.appointments.second.map((time) => (
            <Tag
              key={time._id}
              closable
              onClose={(e) => this.deleteTime(e, time)}
              className="day__time"
            >
              {time.time} {time.patient}
            </Tag>
          ))}
        </div>
        <Button
          danger
          className="day__delete-button"
          onClick={this.deleteDay}
          disabled={
            this.props.appointments.first.length ||
            this.props.appointments.second.length
          }
        >
          Удалить день
        </Button>
      </div>
    );
  }
}

export default Day;
