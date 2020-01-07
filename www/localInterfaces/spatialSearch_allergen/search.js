console.log("started loading search.js for new interface");
var obj = new HybridObject();
var positiveIcon = document.getElementById('positiveIcon');
var negativeIcon = document.getElementById('negativeIcon');
var unknownIcon = document.getElementById('unknownIcon');
var isDecided = false;
var k_FILTER_CALORIES = 'k_FILTER_CALORIES';
var allergens = null;
var userList = null;

// communication to this iFrame from the main reality editor interface
window.addEventListener('message', function (e) {
  var msg = JSON.parse(e.data);
  if (typeof msg.productUPC !== 'undefined') {
    if (!isDecided) {
      var UPC = msg.productUPC.replace(/-v[0-9]+/, "")
      setProduct(UPC);
      isDecided = true;
    }
  }

  if (typeof msg.search !== 'undefined') {
    console.log("msg.search !== 'undefined'");
    userList = msg.search;
    recalculateResult(allergens, userList);
  }

}.bind(this), false);

obj.addInterfaceListener(function(e, userList) {
  console.log("addInterfaceListener triggered");
  console.log(e, userList);
  if (e === 'realitySearch') {
      userList = userList;
      recalculateResult(allergens, userList);
  }
      // var searchResult = obj.search(ingredients, userList);
      // displaySearchResult(searchResult);
      // document.getElementById("searchResultContainer").style.display = 'inline';
  // } else {
      // document.getElementById("searchResultContainer").style.display = 'none';
  // }
});

function recalculateResult(allergens, userList) {
  // if (allergens && userList) {

    var searchResult = obj.search(allergens, userList);

    // document.getElementById('nutrientsText').style.display = 'none';
    document.getElementById('nutrientsText').innerHTML = 'allergens: ' + !!allergens + ', userList: ' + !!userList;
    displaySearchResult(searchResult);

  // } else {
  //   displaySearchResult(false, true);
  // }
}

// set the UPC, fetch the JSON file with product info, and display the result
function setProduct(UPC) {
  console.log(UPC);
  fetch('labelapi_data/'+ UPC +'.json').then( function (response) { 
    return response.json(); // convert to JSON
  }).then( function (productInfo) {
    console.log(productInfo);
    // document.getElementById('nutrientsText').innerHTML = 'Item Name: ' + productInfo['item_name'] + ' , calories: ' + productInfo['nf_calories'];
    
    allergens = generateAllergenDictionary(productInfo);
    console.log(allergens);
    recalculateResult(allergens, userList);

    // displaySearchResult(true);
    // displaySearchResult(search(allergens, userList));
    // displaySearchResult(decideResult(productInfo));

  }).catch( function (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    // document.getElementById('nutrientsText').style.display = 'inline';
    document.getElementById('nutrientsText').innerHTML = 'not in database';
    displaySearchResult(false, true);
  });
}

// decide result based on product info and preset search filter
function decideResult(productInfo) {
  isPositive = applySearchFilter(productInfo, k_FILTER_CALORIES, 350);
  return isPositive;
}

// applies the logic of the selected search filter 
function applySearchFilter(productInfo, filter, threshold) {
  if (filter === k_FILTER_CALORIES) {
    return parseInt(productInfo['nf_calories']) < threshold;
  }
  return false;
}

function getIngredientsList(productInfo) {
  return productInfo.nf_ingredient_statement.split(/[\,,\.]+/).map( function (elt) {
    return elt.trim();
  }).filter( function (elt) {
    return elt.length > 0;
  }); 
}

function generateAllergenDictionary(productInfo) {
  var ingredients = {
   milk: {text: "Milk", state: false},
   egg: {text: "Egg", state: false},
   fish: {text: "Fish", state: false},

   shellfish: {text: "Shellfish", state: false},
   treenuts: {text: "Tree Nuts", state: false},
   peanuts: {text: "Peanuts", state: false},

   wheat: {text: "Wheat", state: false},
   soybean: {text: "Soybean", state: false},   
   gluten: {text: "Gluten", state: false}

   // corn: {text: "Corn", state: false},
   // pork: {text: "Pork", state: false},
   // beef: {text: "Beef", state: false},

   // vegetarian: {text: "Vegetarian", state: false},
   // cornSyrup: {text: "Corn Syrup", state: false},
   // organic: {text: "Organic", state: false}
  };

  // get index of each ingredient key in the product info allergen array
  var allergenIndices = Object.keys(ingredients).map( function (key) {
    return productInfo.allergens.map( function (elt) {
      return elt.allergen_name;
    }).indexOf(ingredients[key].text);
  });

  // lookup the name and status of each allergen using its index
  var allergenMap = allergenIndices.map( function (i) {
    return {
      name: productInfo.allergens[i].allergen_name,
      value: productInfo.allergens[i].allergen_value
    };
  });

  return {
    milk: {text: "Milk", state: allergenMap[0].value !== 0},
    egg: {text: "Egg", state: allergenMap[1].value !== 0},
    fish: {text: "Fish", state: allergenMap[2].value !== 0},

    shellfish: {text: "Shellfish", state: allergenMap[3].value !== 0},
    treenuts: {text: "Tree Nuts", state: allergenMap[4].value !== 0},
    peanuts: {text: "Peanuts", state: allergenMap[5].value !== 0},

    wheat: {text: "Wheat", state: allergenMap[6].value !== 0},
    soybean: {text: "Soybean", state: allergenMap[7].value !== 0},   
    gluten: {text: "Gluten", state: allergenMap[8].value !== 0}
  };
}

// search filter determines whether product contains a given ingredient
function containsIngredient(productInfo, ingredient) {

  var ingredients = getIngredientsList(productInfo);

  var strictMatch = false;
  ingredients.forEach( function (elt) {
    if (elt.toLowerCase() === ingredient.toLowerCase()) {
      strictMatch = true;
    }
  });

  var partialMatch = false;
  ingredients.forEach( function (elt) {
    if (elt.toLowerCase().includes(ingredient.toLowerCase())) {
      partialMatch = true;
    }
  });
  return strictMatch || partialMatch;
}

// updates the graphics to visualize the results
function displaySearchResult(searchResult, isUnknown) {
  if (isUnknown) {
      positiveIcon.className = 'hiddenCertification';
      negativeIcon.className = 'hiddenCertification';
      unknownIcon.className = 'visibleCertification';
  } else {
    if (searchResult) {
        positiveIcon.className = 'visibleCertification';
        negativeIcon.className = 'hiddenCertification';
        unknownIcon.className = 'hiddenCertification';
    } else {
        positiveIcon.className = 'hiddenCertification';
        negativeIcon.className = 'visibleCertification';
        unknownIcon.className = 'hiddenCertification';
    }    
  }

  document.getElementById('scanner').style.display = 'none';
  document.getElementById('searchResultContainer').style.display = 'inline';
}
console.log("done loading search.js for new interface");