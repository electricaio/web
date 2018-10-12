const enzym = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzym.configure({ adapter: new Adapter() });
