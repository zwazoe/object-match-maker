const {ObjectMatchMaker} = require('./index');


let from_restaurants = {
    red_lobster: {
        item_1: 'apple', 
        item_2: 'green', 
        item_3: 'car', 
    },
    olive_garden: {
        item_1: 'read', 
        item_2: 'next', 
        item_3: 'blink', 
    }, long_horn_stakehouse_3: {
        item_1: 'roch', 
        item_2: 'bs', 
        item_3: 'gym', 
    }
}

let from_parent = {
    red_lobster: {
        item_1: 'black', 
        item_2: 'brick', 
        item_3: 'juice', 
    },
    long_horn_stakehouse: {
        item_1: 'read', 
        item_2: 'next', 
        item_3: 'blink', 
    },long_horn_stakehouse_2: {
        item_1: 'great', 
        item_2: 'fry', 
        item_3: 'key', 
    }
}
let test_51 =[ [from_restaurants, from_parent], 1,0, 1, ['item_1', 'item_3']]
let test_1 =[ [from_restaurants, from_parent]]
let test_2 =[ [from_restaurants, from_parent], 0]
let test_3 =[ [from_restaurants, from_parent], 1]
let test_4 =[ [from_restaurants, from_parent], 0,1]
let test_5 =[ [from_restaurants, from_parent], 0,0]
let test_6 =[ [from_restaurants, from_parent], 0,1, 0]
let test_7 =[ [from_restaurants, from_parent], 0,0, 0]
let test_8 =[ [from_restaurants, from_parent], 0,0, 0, ['item_1', 'item_3']]

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


let array_1 = {
    '5d32f17d264d6020bcd9939e':
    {
        profile_id: '5d32f17d264d6020bcd9939e',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'pending',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:48:29.985Z',
        field: 'attributes_place_association'
    },
    '5d32f167630d1b1ce40d064d':
    {
        profile_id: '5d32f167630d1b1ce40d064d',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'pending',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:48:07.700Z',
        field: 'attributes_place_association'
    },
    '5d32f0ea16436c15f40d1be0':
    {
        profile_id: '5d32f0ea16436c15f40d1be0',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'pending',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:46:02.582Z',
        field: 'attributes_place_association'
    },
    '5d32f0b8b349ef21d45771d7':
    {
        profile_id: '5d32f0b8b349ef21d45771d7',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'accepted',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:45:12.114Z',
        field: 'attributes_place_association'
    },
    '5d32f06f4bf5a026f8baddc4':
    {
        profile_id: '5d32f06f4bf5a026f8baddc4',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'declined',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:43:59.241Z',
        field: 'attributes_place_association'
    }
}

let array_2 = {
    '5d32f33ae8693a2658055886':
    {
        profile_id: '5d32f33ae8693a2658055886',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'pending',
        associate_status: 'accepted',
        created_at: '2019-07-20T10:55:54.450Z',
        field: 'attributes_place_association'
    }, '5d32f0b8b349ef21d45771d7':
    {
        profile_id: '5d32f0b8b349ef21d45771d7',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'not',
        associate_status: 'ok',
        created_at: '2019-07-20T10:45:12.114Z',
        field: 'attributes_place_association'
    },
    '5d32f06f4bf5a026f8baddc4':
    {
        profile_id: '5d32f06f4bf5a026f8baddc4',
        attributes_title: 'ggsd',
        attributes_user: '5d304e6253dfc81bd88253d5',
        host_status: 'next',
        associate_status: 'something',
        created_at: '2019-07-20T10:43:59.241Z',
        field: 'attributes_place_association'
    }
}

found_place_for_update = ObjectMatchMaker([array_1, array_2], 1, 0, 1, ['host_status', 'field']).then(item => {
    console.log(item)
})