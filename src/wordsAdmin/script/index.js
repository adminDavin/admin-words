// import _ from 'lodash';
import './../style/wordsAdmin.css';
import Icon from './../style/images/backgroup.png';
// import Data from './info.xml';
import printMe from './utils/utils.js';
import $ from 'jquery';
import {
  cube
} from './utils/math.js';

// import moment from 'moment';
// console.log(moment())


// import numRef from './config.json';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);
  element.innerHTML = [
    'Hello webpack!cv f dd',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');


  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  return element;
}

let element = component();



document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./utils/utils.js', function(utils) {
    console.log('Accepting the updated printMe module!');
    utils.printMe();
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  })
}