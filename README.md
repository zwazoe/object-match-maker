
#  object-match-maker
>Create an object using data from two other objects. Get and update what you want. synchrounous and Async. Return a promise. 

##
Don't forget to leave a star on github. And fork this if you want. I build it with love.

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

## Syntax

```
ObjectMatchMaker(obj = [{}, {}], output_type=2, get_values_from = 0, this_is_the_rest = 0, keys_to_update=[]).then(res => {
    console.log(res, ' from ', arg)

})
```
- obj is an array of the two objects that you want to work with. 
- output_type - by default, OMM (object-match_maker) will output an array and an object. You can decide which one you want to work with by simply stating 0 or 1 respectuflly. 0 for array, 1 for object. 
- get_values_from - which element you want to get the value from. If you want to get the value from the first object or the second object. 
- this_is_the_rest - OMM mostly focus on differentiations. And if you wnat the restof the keys, regardless if they match both obj or not. They you will state, where the rest is coming from. 
- keys_to_update - just incase you may want to go deeper into the object to update specific keys instead of updating everything. 

## Uses Cases
Below, I wille xplain how to use each arguments. 

```

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

```

Noticed, that object A and B have different first level keys. 

Except for ab. Ab Exists on both object A and B. 

## Case 1:
Imagine, object A was a newly created object. And object B was coming from  the database. And you do not want to overide what is already on the database. 

you simply wanted to add the new data (a) to the existing data (b).

Here's the solutions:
From test script, run: node test test_1

```
let c = ObjectMatchMaker([a,b])

console.log(c) 

output: 
[ [ { aaa: 13, aab: 14, aac: 15 },
    { aaa: 1, aab: 2, aac: 3 },
    { aaa: 7, aab: 8, aac: 9 } ],
  { ab: { aaa: 13, aab: 14, aac: 15 },
    aa: { aaa: 1, aab: 2, aac: 3 },
    ac: { aaa: 7, aab: 8, aac: 9 } } 
]

```
## case 2
do not panic. This output the solution as an object and as an array. If you only want the object, you will will simply add a second parameter of 1 and if you wanted only the array, you will add a second parameter of 0. If you want both, you may leave it empty or add a second parameter of 2.

Let's run it again with a second parameter.
From test script, run: node test test_2
```

let c = ObjectMatchMaker([a,b],0)

console.log(c) 

output: 
[ { aaa: 13, aab: 14, aac: 15 },
  { aaa: 1, aab: 2, aac: 3 },
  { aaa: 7, aab: 8, aac: 9 } ]

```

Notice, we are outputing only an array this time. 

## case 3

Lets say, you want to output an object. 

From test script, run: node test test_3

```

let c = ObjectMatchMaker([a,b],1)

console.log(c) 

output: 
{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 } } 

```

Now, we are outputing an object. 

This is greate because it is all abotu what you want to output. 

Now, lets disect the result. 

Notice, object c contains ab from object b and aa from object a and ab from object a. 

This is because Object a is the new object. And object b is the existing object. And you do not want to overide existing elements. 

### Case: 4

Now, lets say, you wanted to update object b. And you do not want to add new keys to it. 

This will mean, that you will only take keys that match object a and object b. The rest of the keys on object a will be disregarded. 

For this solution, you will have to add third paramter of 0 or 1. 

From test script, run: node test test_4

```

let c = ObjectMatchMaker([a,b],1,1)

console.log(c) 

{ ab: { aaa: 4, aab: 5, aac: 6 },
  ba: { aaa: 10, aab: 11, aac: 12 },
  bc: { aaa: 16, aab: 17, aac: 18 } }

```

As you can see, ab is coming from object a. And ba, and bc is coming from object b. 

Object c is actualled get_values_from. This is because, we are getting values from B and we are updating B with object A. and we are disregarding the keys that do not match B. 

### 5
If you wanted to make this vice versa, you simply had to turn the third argument into a 0;


From test script, run: node test test_5

```
ObjectMatchMaker([a, b], 0,0).then(output => 
    console.log(output)
)

[ { aaa: 13, aab: 14, aac: 15 },
  { aaa: 1, aab: 2, aac: 3 },
  { aaa: 7, aab: 8, aac: 9 } ]

```

To showcase, the power of this package, I changed a little course here. 

Object-match-maker actually returned a promise. Therefore, you can use "then" to work with the output data. 

Never the less, the output is the same as case 4, except that it is getting values from A and updating A with values from B. 

From now on, I am going to output only objects. Because, they are easier to explains, since I can see the key. 

However, in production, I usually output an array. 


### 6 this_is_the_rest

argument 4 is called, "this_is_the_rest" because it gets the rest of the keys, regardless if they match. But, you have to tell it, where to get the rest of the keys from. Object a or b based on position of the first argument which is an array. Therefore, you will enter 0 or 1. 

From test script, run: node test test_6

```
ObjectMatchMaker([a, b], 1,0, 0).then(output => 
    console.log(output)
)

{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 } }

```

In this instance, case 6 does not have a significant difference. Because we are getting values from 0 and we want the rest of 0. We already have the rest of 0. Because we are getting values from 0. 

### 7 this_is_the_rest
If you want to get values from object A, and get the rest of the values from B, you will make this is the rest equals to 1. 

This make OMM very powerful. Here's why. Imagine, object C is meant to include all of object A and all of Object B. But, you want object A to be updated with keys that match object B. The existing data from the database will remain the same, but I want to add new data. 

You can simply make object C includes data from A and B and update the data. let's run this. 


From test script, run: node test test_7

```
ObjectMatchMaker([a, b], 1,0, 0).then(output => 
    console.log(output)
)

{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 },
  ba: { aaa: 10, aab: 11, aac: 12 },
  bc: { aaa: 16, aab: 17, aac: 18 } }

  ```

  First, notice we have 5 keys and not 6. That is because AB was updated. And it was updated by AB from object B. 
  And also notice that all of the keys are blend into 1. 


  ### 8 keys_to_update

  This is my favorite. Let's say, you do not want to update everything that matches a and b. You only wanted to udpate a few keys. For example, lets say, I want to updated a key called updated_at, product_status. that is all I want to update. Everything else should remain the same. 


```
let test_8 =[ [a, b], 1,0, 1, ['aaa', 'aac']]

ObjectMatchMaker(...test_8).then(res => {
    console.log(res)

})

otuput

{ ab: { aaa: 4, aab: 14, aac: 6 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 },
  ba: { aaa: 10, aab: 11, aac: 12 },
  bc: { aaa: 16, aab: 17, aac: 18 } } 
```

##

Play with it. Have fun with it. I am pretty sure, you will find what you want from it. Good luck. 

## Full Test Script
```
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



```

# If you want more...

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




