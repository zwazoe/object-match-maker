Documentation


#  object-match-maker
>Create an object using data from two other objects. Get what  you want from either objects and update what you want from either object. Returns a promise. 

Node from developer: 


## Don’t Forget
Leave a star on github.
Fork if necessary.

## Install

```
npm install object-match-maker --save

const {ObjectMatchMaker} = require('object-match-maker');

```

## File Structure

```
object-match-maker/
./index
./test/
./package.json
./README.md

```
## Testing


```
node test test_1

```

Test from test_1 through test_8. 
And I added test_51 for kicks. 
Do not forget the underscore. 
If you don't add a test argument, it will default to test_51. 

## Syntax

```
ObjectMatchMaker(
obj = [{}, {}], 
output_type=2, 
get_values_from = 0, 
this_is_the_rest = 0, 
keys_to_update=[])
.then(res => {
   		 console.log(res, ' from ', arg)
})
```
- obj is an array of the two objects that you want to work with. 
- output_type - by default, OMM (object-match_maker) will output an array and an object. You can decide which one you want to work with by simply adding a second argument of 0 or 1 respectfully. 0 is to return an array, 1 is to return an object. 2 or any other values, including empty, is to return both. . Examples below.
- get_values_from - which element you want to get the value from. If you want to get the value from the first object or the second object. Examples below. 
- this_is_the_rest - OMM mostly focus on similarities. The differences are largely disregarded. If you want the difference, regardless if it matches both objects or not, then you will apply a 0 or 1 to state where the rest of the data are coming from. Examples below. 
- keys_to_update - just in case you may want to go deeper into the object to update specific keys instead of updating everything. This_is_the_rest and keys_to_update makes OMM very powerful and useful. 

## Uses Cases
Below, I will explain how to use each argument. 

Object a and an object b have different first level keys. 
Except for “ab”. There is a key “ab” on both objects. 
Very important. Because, most of the use cases are going to show you how to use Object Oriented to help create a new object that updates ab.

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


## Case 1: argument 1, obj
Imagine, object A was a newly created object. 
object B was coming from  the database. 
And you do not want to override what is already on the database. 
You simply wanted to add the new data (a) to the existing data (b).

Here's the solution:

>From test script, run: node test test_1

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
## case 2: argument 2, outputting an array only.

>Do not panic.
 
You just output the solution as an object and as an array. 
If you only want the object, you will simply add a second argument of 1 
and if you wanted only the array, you will add a second parameter of 0
. If you want both, you may leave it empty or add a second parameter of 2.

Let's run it again with a second argument of 0. This should output an array instead of array and object.

> From test script, run: node test test_2
```

let c = ObjectMatchMaker([a,b],0)

console.log(c) 

output: 
[ { aaa: 13, aab: 14, aac: 15 },
  { aaa: 1, aab: 2, aac: 3 },
  { aaa: 7, aab: 8, aac: 9 } ]

```


## case 3: output an object only.
>node test test_3
Let's say you wanted to output an object instead of  an array. 
You will simply add a second argument of 1. 




```

let c = ObjectMatchMaker([a,b],1)

console.log(c) 

output: 
{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 } } 

```

I implemented this feature because I found myself needing either an object or an array. Depending on the circumstances. Hopefully, this feature will also help you. 


### Understanding the result

The result, object c, should contain
,ab from object b.
,aa from object a
,ac from object a
This is because object a is the new object and you may:
Not want to override ab from object b.
Object b may have additional information that object cannot pocess yet. 
Such as created_at. 
Or current_status. 
Or view_count
Etc. 

However, overriding object b should be your choice. Not mine. Therefore, I have implemented ways to override values from an object. 

## Case 4: get_values_from object “b”
>From test script, run: node test test_4

Now, lets say, you only wanted to update object b. And you do not want to add new keys to it. 

This will mean that you will only take keys that match object a and object b. 
The rest of the keys  from object that does not match object b will be disregarded. 
Remember, before you have took from b and add to a. 
This time, you will only take from a to update b.
The rest of a, that does not match b,  should be set aside.

For this solution, you will have to add a third argument of 0 or 1. 



```

let c = ObjectMatchMaker([a,b],1,1)

console.log(c) 

{ ab: { aaa: 4, aab: 5, aac: 6 },
  ba: { aaa: 10, aab: 11, aac: 12 },
  bc: { aaa: 16, aab: 17, aac: 18 } }

```

As you can see, ab is coming from object a. And ba, and bc is coming from object b. 

This argument is called, get_values_from. 
This is because we are getting values from B and we are updating B with object A. 
and we are disregarding the keys that do not match B. 


## Case 5: get_values_from object a
>node test test_5

Instead of getting values from b, you may want to get value from a. Therefore, you will turn the third argument into a 0, instead of 1

Object-match-maker actually returned a promise. 
Therefore, you can use "then" statement. 
This will run, after your object has been resolved.

```
ObjectMatchMaker([a, b], 0,0).then(output => 
    console.log(output)
)

[ { aaa: 13, aab: 14, aac: 15 },
  { aaa: 1, aab: 2, aac: 3 },
  { aaa: 7, aab: 8, aac: 9 } ]

```




### 6 this_is_the_rest
From test script, run: node test test_6

argument 4 is called, "this_is_the_rest" because it gets the rest of the keys, regardless if they matches. 
But, you have to tell it, where to get the rest of the keys from. 
Object a or b.
 based on the position of the first argument. 
Therefore, you will enter a 0 or 1. 



```
ObjectMatchMaker([a, b], 1,0, 0).then(output => 
    console.log(output)
)

{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 } }

```

In this instance, case 6 does not have a significant difference. 
Because we are getting values from 0 and we want the rest of 0. 
We already have the rest of 0. Because we are getting values from 0. 
But, in case 7, you will see a big difference. 

### 7 this_is_the_rest
>node test test_7

If you wanted to get the key /value pair from object A, 
and get the rest of the values from B, 
You will add a fourth argument of 1

This make OMM very powerful. Here's why. 
Imagine, object C is meant to include all of object A and all of Object B.
 But, you want object A to be updated with keys that match object B. 
Hence., the existing data from the database will remain the same, but I want to add new data. 

You can simply make object C includes data from A and B and update the data. let's run this. 


```
ObjectMatchMaker([a, b], 1,0, 1).then(output => 
    console.log(output)
)

{ ab: { aaa: 13, aab: 14, aac: 15 },
  aa: { aaa: 1, aab: 2, aac: 3 },
  ac: { aaa: 7, aab: 8, aac: 9 },
  ba: { aaa: 10, aab: 11, aac: 12 },
  bc: { aaa: 16, aab: 17, aac: 18 } }

  ```

First, notice we have 5 keys and not 6. 
That is because AB was updated. And it was updated by AB from object B. 
And also notice that all of the keys are blend into 1. 
This is because we are getting already getting all the values from object and we said, we also want values from object b. 


  ### 8 keys_to_update
>node test test_8

This is my favorite feature because we can update particular second level keys. 
 Let's say, you do not want to update everything that matches a and b. 
You only wanted to update a few keys. 
For example, lets say, I want to update a key called updated_at, product_status. 
And every other 2nd level keys should not be updated. 
In this case, you will add a fifth argument that contains an array of the keys that must be updated. 


```
let test_8 =[ [a, b], 1,0, 1, ['aaa', 'aac']]

ObjectMatchMaker(...test_8).then(res => {
    console.log(res)

})

output:

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
const {ObjectMatchMaker, omm} = require('./index');

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
   console.log('you must include test detail from test_1 to test_8. Do not forget the underscores. Therefore, I am outputting a test file but it is not the exact one you are looking for')
}

ObjectMatchMaker(...object[arg]).then(res => {
   console.log(res, ' from ', arg)

})


```

# Change Log

### 2.1.2 
- include change log
- update README.md, fix some grammar. 