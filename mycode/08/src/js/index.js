var React = require('react');
var ReactDOM = require('react-dom');
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';


function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
	<DatePicker onChange={onChange} />,
	document.getElementById('root')
	);