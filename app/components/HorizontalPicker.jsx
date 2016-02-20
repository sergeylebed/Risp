import React from 'react';

export default class HorizontalPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: -1
    };

    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(val, id) {
    this.props.onSelect(val, id);
    this.setState({
      activeId: id
    });
  }

  render() {
    var { begin, step, number } = this.props;

    var btns = [];
    for(var i = 0; i < number; i++) {
      var val = begin + step * i;
      var active = i === this.state.activeId;

      btns.push(
        <button
          className={'btn btn-default' + (active ? 'active' : '')}
          onClick={((val, id) => () => this.handleChoose(val, id))(val, i)}>
          <p>
            {
              val
            }
          </p>
        </button>
      );
    }

    var customButton;
    if(this.state.activeId >= this.props.number) {
      var val = this.props.begin + this.state.activeId * this.props.step;
      customButton = (
        <button className='btn btn-default'>
          <p>
            {val}
          </p>
        </button>
      );
    } else {
      customButton = (
        <button className='btn btn-default'>
          <span className='glyphicon glyphicon-cog' aria-hidden={true}></span>
        </button>
      );
    }

    return (

      <div className='btn-group'>
        {
          btns
        }
        {
          customButton
        }
      </div>
    );
  }
}
