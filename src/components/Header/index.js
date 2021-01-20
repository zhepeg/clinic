import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux';
import { createStringFromDate } from '../../utils/create-string-from-date';
import { dateCalculator } from '../../utils/date-calculator';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: '',
      availableDays: [],
      availableTime: [],
    };
  }

  componentDidMount() {
    const date = new Date();
    const currentDate = createStringFromDate(
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    );

    this.setState({ currentDate: currentDate });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.days !== this.props.days) {
      const { week } = dateCalculator();

      const uniqueDays = week.filter(
        (date) =>
          !this.props.days.some(
            (appointment) => Number(appointment.day.split('.')[0]) === date.day
          )
      );
      store.dispatch({ type: 'SET_FREE_DAYS', payload: uniqueDays });
    }
  }

  handleMenuClick = async (day) => {
    const { week } = dateCalculator();

    const newDay = week.find((item) => item.day === Number(day.key));

    const responce = await fetch('http://localhost:3000/days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: `${newDay.year}-${newDay.month + 1}-${newDay.day + 1}`,
      }),
    });

    await responce.json();

    window.location.reload();
  };

  render() {
    return (
      <div className="header">
        <div>
          <h1 className="header__title">
            Городская поликлиника <em>№172</em>.
          </h1>
          <h2 className="header__time">{this.state.currentDate}</h2>
        </div>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu onClick={this.handleMenuClick}>
              {this.props.availableDays.map((day) => (
                <Menu.Item key={day.day}>
                  {createStringFromDate(day.day, day.month, day.year)}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <button className="header__button">
            Добавить день <DownOutlined />
          </button>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    days: state.days,
    availableDays: state.freeDays,
  };
};

export default connect(mapStateToProps)(Header);
