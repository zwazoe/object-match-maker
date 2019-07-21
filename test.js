const {ObjectMatchMaker} = require('./index');

let a = {
    aa: {
        aaa: 1,
        aab: 2, 
        aac: 3
    }, 
    ab: {
        aaa: 4,
        aab: 5, 
        aac: 6
    }, 
    ac: {
        aaa: 7,
        aab: 8, 
        aac: 9
    }, 
}
let b = {
    ba: {
        aaa: 10,
        aab: 11, 
        aac: 12
    }, 
    ab: {
        aaa: 13,
        aab: 14, 
        aac: 15
    }, 
    bc: {
        aaa: 16,
        aab: 17, 
        aac: 18
    }, 
}


let test_51 =[ [a, b], 0,0, 1, ['aaa', 'aac']]
let test_1 =[ [a, b]]
let test_2 =[ [a, b], 0]
let test_3 =[ [a, b], 1]
let test_4 =[ [a, b], 1,1]
let test_5 =[ [a, b], 0,0]
let test_6 =[ [a, b], 1,0, 0]
let test_7 =[ [a, b], 1,0, 1]
let test_8 =[ [a, b], 1,0, 1, ['aaa', 'aac']]

let object = {
    test_1, test_2, test_3, test_4, test_5, test_6, test_7, test_8, test_51
}



let arg = process.argv.slice(2)[0]

if(!arg){
    arg = 'test_51'
    console.log('you must include test detail from test_1 to test_8. Do not forget the underscores. Therefore, I am outputing a test file but it is not the exact one you are looking for')
}

ObjectMatchMaker(...object[arg]).then(res => {
    console.log(res, ' from ', arg)

})

