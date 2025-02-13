// function getGreetings(hours){
//     if(hours < 5 || hours > 19) return ' Good night';
//     if(hours < 9) return ' Good morning';
//     if(hours < 16) return ' Good afternoon';
//     return ' Good evening';
// }

// module.exports = getGreetings; // it is common js syntax but latestly we use ES6 syntax

// export default getGreetings; // it is ES6/ESM syntax
export function getGreetings(hours){//we may export multile packages in this single file by this
    if(hours < 5 || hours > 19) return ' Good night';
    if(hours < 9) return ' Good morning';
    if(hours < 16) return ' Good afternoon';
    return ' Good evening';
}