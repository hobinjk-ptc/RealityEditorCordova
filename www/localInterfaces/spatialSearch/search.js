// var obj = new HybridObject();
var positiveIcon = document.getElementById('positiveIcon');
var negativeIcon = document.getElementById('negativeIcon');
var unknownIcon = document.getElementById('unknownIcon');
var isDecided = false;
var k_FILTER_CALORIES = 'k_FILTER_CALORIES';

// communication to this iFrame from the main reality editor interface
window.addEventListener('message', function (e) {
  var msg = JSON.parse(e.data);
  if (typeof msg.interfaceName !== 'undefined') {
    if (!isDecided) {
      var UPC = msg.interfaceName.replace(/-v[0-9]+/, "")
      setProduct(UPC);
      isDecided = true;
    }
  }
}.bind(this), false);

// set the UPC, fetch the JSON file with product info, and display the result
function setProduct(UPC) {
  console.log(UPC);
  fetch('upc_data/'+ UPC +'.json').then( function (response) { 
    return response.json(); // convert to JSON
  }).then( function (productInfo) {
    console.log(productInfo);
    document.getElementById('nutrientsText').innerHTML = 'Item Name: ' + productInfo['item_name'] + ' , calories: ' + productInfo['nf_calories'];
    displaySearchResult(true);
    // displaySearchResult(decideResult(productInfo));

  }).catch( function (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
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
