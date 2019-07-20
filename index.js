exports.ObjectMatchMaker = (obj = [{}, {}], output_type=2, get_values_from = 0, this_is_the_rest = 0, keys_to_add=[]) => {
	// error handling to make sure the obj includes two objects.
	if (Array.isArray(obj)) {
		if (!obj[0]) {
			obj = [{}, {}]
		} else if (!obj[1]) {
			obj[1] = {}
		}
	} else {
		obj = [{}, {}]
	}

	// output will either be object or array or both. It will come from the the type position

	let output = [[], {}]
	// will will test object 0 in order to see if it has keys that are available in object 1. 
	// then, if it does, we will return object 0. 
	// but you can turn this around by setting get_values_from to 1 instead of 0
	let order = [1, 0]
	if (get_values_from == 1) {
		order = [0, 1]
	}

	// turn object ones into an entry. Which will hold [key_name, [key_values]]
	let objOneEntries = Object.entries(obj[order[0]])
	// assignign object 2 based on the order and obj 
	//
	let objTwokeys = obj[order[1]]
	// map object one to find if the entry key is available in object two. 
	// if it is, assign the value to the output as an array and as an object. 

	objOneEntries.map(entry => {
		let check_for_entry_in_objTwokeys = objTwokeys[entry[0]]
		if (check_for_entry_in_objTwokeys){
			// remove the new from objTwoKeys
			// add the new
			let entry_to_push = entry[1]
			keys_to_add.map(key => {
				entry_to_push[key] = objTwokeys[entry[0]][key]
			})
			output[0].push(entry_to_push)
			output[1][entry[0]] = entry_to_push
			delete objTwokeys[entry[0]]

		}
	})
	// add the rest of objectTwo to output;
	if(this_is_the_rest == 0){
		let objTwoKeysEntry = Object.entries(objTwokeys)
		objTwoKeysEntry.map(entry => {
			output[0].push(entry[1])
			output[1][entry[0]] = entry[1]
		})
	} else if (this_is_the_rest == 2){
		let objTwoKeysEntry = Object.entries(obj[order[0]])
		objTwoKeysEntry.map(entry => {
			output[0].push(entry[1])
			output[1][entry[0]] = entry[1]
		})
	} else {
		let objTwoKeysEntry = Object.entries(obj[order[1]])
		objTwoKeysEntry.map(entry => {
			output[0].push(entry[1])
			output[1][entry[0]] = entry[1]
		})
		objTwoKeysEntry = Object.entries(obj[order[0]])
		objTwoKeysEntry.map(entry => {
			output[0].push(entry[1])
			output[1][entry[0]] = entry[1]
		})
	}
	// determine if we should simply return the array or the object based on position. 
	// 0 is array, 1 is object, anything else is both. 
    let got_output = output[output_type] ? output[output_type] : output

    return new Promise(resolve => {
        resolve(got_output)
    })

}
