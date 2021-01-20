import React from 'react';
import Day from '../Day/';
import './Main.css';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        {this.props.days.map((item) => (
          <Day
            key={item.day}
            _id={item._id}
            date={item.day}
            appointments={item.appointments}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { days: state.days };
};

export default connect(mapStateToProps)(Main);
