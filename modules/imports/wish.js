// console.log(process)
// console.log(process.argv)
// console.log(process.argv[3])//node wish.js harry potter -> prints harry
// console.log(process.argv.slice(2))//prints ['harry', 'potter']


// const getGreetings = require('./greet'); //It is common js syntax
// import getGreetings from "./greet.js";// for export default
import { getGreetings } from "./greet.js";

const name = process.argv[2];
const hours = new Date().getHours();



const greeting = getGreetings(hours);
console.log(`Hi, ${name },${greeting}!`);
