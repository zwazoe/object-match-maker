
#  object-match-maker
>This is a very simple but powerful module that I found myself needing time and time again. 

## Install

```
npm install object-match-maker --save

const {ObjectMatchMaker} = require('object-match-maker');

or 

const {ObjectMatchMaker} = require('object-match-maker');


```

## File Structure

```
object-match-maker/
object-match-maker/index.js
object-match-maker/test.js
object-match-maker/package.json
object-match-maker/README.md
```
## Testing
Test from test_1 through test_8. And test_51 for kicks. Do not forget the underscore. If you don't add a test argument, it will default to test_51. 

```
node test test_1

```

## Full Test Script
```
const {ObjectMatchMaker} = require('./index');


let from_restaurants = {
    red_lobster: {
        item_1: 'apple', 
        item_2: 'green', 
        item_3: 'car', 
    },
    olive_garden: {
        item_1: 'red', 
        item_2: 'yellow', 
        item_3: 'truck', 
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
    }
}
let test_51 =[ [from_restaurants, from_parent], 1,0, 2, ['item_1', 'item_3']]
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


```


## Real Life Scenario: 
I wanted products to have a brand. I wanted to assign a few child companies detail to the parent. Olive Garden and Red Lobster are the restaurants and Darden Restaurants is the parent. 

If Darden Restaurants already have information for red lobster, I may not want to overide all of the information that Darden Restaurants have. But, I also want to update some the information that Darden Restaurants have. 

```
let from_restaurants = {
    red_lobster: {
        item_1: 'apple', 
        item_2: 'green', 
        item_3: 'car', 
    },
    olive_garden: {
        item_1: 'red', 
        item_2: 'yellow', 
        item_3: 'truck', 
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
    }
}
```

Notice that both set of arrays have data that the other has and data that the other do not have. 

### Argument 1: Array with a pair of object. 

no default, required.
syntax: an array with two object to compare.
```
[
    {object 1},
    { object 2}
]
```
```
node test test_1

let test_1 =[ [from_restaurants, from_parent]]

ObjectMatchMaker(...test_1).then(res => {
    console.log(res, 'test_1')
})

output: 
[
     [ { item_1: 'black', item_2: 'brick', item_3: 'juice' },
        { item_1: 'red', item_2: 'yellow', item_3: 'truck' } 
    ],
    { 
        red_lobster: { item_1: 'black', item_2: 'brick', item_3: 'juice' },
        olive_garden: { item_1: 'red', item_2: 'yellow', item_3: 'truck' } 
    } 
] 'test_1'
```
### Argument 2: output_type
default is 2:
syntax: numerical value of 0,1,2

 the output is returning the result as an array and as an object. If you only want array, you will have to include a numberical value of 0 or 1 for an object. Like so:
```
node test test_2

let test_2 =[ [from_restaurants, from_parent], 0]
ObjectMatchMaker(...test_2).then(res => {
    console.log(res, 'test_2')
})

output: 
[ { item_1: 'black', item_2: 'brick', item_3: 'juice' },
  { item_1: 'red', item_2: 'yellow', item_3: 'truck' } ] 'test_2'
```
and if you want an object instead of an array, you simply add a 1 instead of two. And if you want both, you simply add any other value but a one or two such as true, false, or simply 2.
```
let test_3 =[ [from_restaurants, from_parent], 1]

ObjectMatchMaker(...test_3).then(res => {
    console.log(res, 'test_3')

})

output: 
{ red_lobster: { item_1: 'black', item_2: 'brick', item_3: 'juice' },
  olive_garden: { item_1: 'red', item_2: 'yellow', item_3: 'truck' } } 'test_3'
```
### Argument 3: get_values_from 

default is 0

If you  want to get values from the second object instead of the first object. Make the third value 1. For example, if  you want to add the information that the parrent currently have to the restarant object. So, you can bulk save all of the restarant objects together, then you will leave it 0. If you want to send the information to the parent, so you can be able to save the parents data only, then you will make it a 1, instead of zero. 
```
Test:
let test_4 =[ [from_restaurants, from_parent], 0,1]

ObjectMatchMaker(...test_4).then(res => {
    console.log(res, 'test_4')

})

output:
[ { item_1: 'apple', item_2: 'green', item_3: 'car' },
  { item_1: 'read', item_2: 'next', item_3: 'blink' } ] 'test_4
```
Because, I am getting the data from 1, instead of 0, I am actually recieve red_lobsterd details and long_horn_detaal.

Now, let's try to make it 0 instead of 1.

```
let test_5 =[ [from_restaurants, from_parent], 0,0]
ObjectMatchMaker(...test_4).then(res => {
    console.log(res, 'test_4')

})

output: 
[ { item_1: 'black', item_2: 'brick', item_3: 'juice' },
  { item_1: 'red', item_2: 'yellow', item_3: 'truck' } ] 'test_5'
```
  Now, notice this is reverse. 

###  Argument 4: this_is_the_rest

this state rather to add the new item to the existing item. By default this is 0. Which means, the rest will be the first array. 

```
let test_6 =[ [from_restaurants, from_parent], 0,1, 0]

ObjectMatchMaker(...test_6).then(res => {
    console.log(res, 'test_6')

})
output:
[ { item_1: 'apple', item_2: 'green', item_3: 'car' } ] 'test_6'
```
Because the forth agument is 0, we are not adding existing items. We are only getting the item that is equal based on the keys. 

Let's run test_7. It will make the forth argument0 and then the fith argument 0. 

```
let test_7 =[ [from_restaurants, from_parent], 0,0, 0]

ObjectMatchMaker(...test_7).then(res => {
    console.log(res, 'test_7')

})

output: 
[ { item_1: 'black', item_2: 'brick', item_3: 'juice' } ] 'test_7'
```


as you can noticed, it is actually output item from parent company isntead of child company. 

The last argument is the updated argument. This will update the key from one object with the key of the others. 

In example, if you want to update the the status key. If the parent already excepted that product. And you do not want to overide the status key, you may want to take it from the parent. 

```
let test_8 =[ [from_restaurants, from_parent], 0,0, 0, ['item_1', 'item_3']]

ObjectMatchMaker(...test_8).then(res => {
    console.log(res, 'test_8')

})

output: 
[ { item_1: 'apple', item_2: 'brick', item_3: 'car' } ] 'test_8'
```
notice, because I say to update item_1 and item_3, the values for those items are comming from the other object.

Finally, I'm go run a full test. 

```
let test_51 =[ [from_restaurants, from_parent], 0, 1, true, ['item_1', 'item_3'] ]
ObjectMatchMaker(...test_51).then(res => {
    console.log(res, 'test_51')

})

output: 
[ { item_1: 'black', item_2: 'green', item_3: 'juice' },
  { item_1: 'read', item_2: 'next', item_3: 'blink' } ] 'test_51'

```




