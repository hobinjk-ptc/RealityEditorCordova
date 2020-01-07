// var obj = new HybridObject();
var positiveIcon = document.getElementById("positiveIcon");
var negativeIcon = document.getElementById("negativeIcon");
var unknownIcon = document.getElementById("unknownIcon");
var isDecided = false;

// obj.addInterfaceListener(function(e, userList) {
//   if (e === 'realitySearch') {
//       var searchResult = obj.search(ingredients, userList);
//       displaySearchResult(searchResult);
//   } else {
//       document.getElementById("searchResultContainer").style.display = 'none';
//   }
// });

function setProduct(interfaceName) {

  console.log(interfaceName);

  fetch('ndbno_map.json').then(function(response) {

    return response.json(); // convert to JSON

  }).then(function(productDatabase) {

    console.log(productDatabase[interfaceName]);
    var ndbno = productDatabase[interfaceName].ndbno;
    if (typeof ndbno === 'string' && ndbno.length > 0) {
      fetch('product_data/'+ ndbno +'.json').then(function(response) { 

        return response.json(); // convert to JSON

      }).then(function(productInfo) {

        console.log(productInfo);
        // console.log(Object.keys(productInfo.nutrients));
        // console.log(productInfo.ingredients);

        document.getElementById('nutrientsText').innerHTML = "Calories: " + productInfo.nutrients["Energy"].value + " kcal";
        displaySearchResult(decideResult(productInfo));

      });
    } else {
      document.getElementById('nutrientsText').innerHTML = "not in database";
      displaySearchResult(false, true);
    }

  });

}

var k_FILTER_CALORIES = "k_FILTER_CALORIES";

function decideResult(productInfo) {
  isPositive = applySearchFilter(productInfo, k_FILTER_CALORIES, 350);
  return isPositive;
}

function applySearchFilter(productInfo, filter, threshold) {
  if (filter === k_FILTER_CALORIES) {
    return parseInt(productInfo.nutrients["Energy"].value) < threshold;
  }

  return false;
}

function containsIngredient(productInfo, ingredient) {
  var strictMatch = false;
  productInfo.ingredients.forEach( function(elt) {
    if (elt.toLowerCase() === ingredient.toLowerCase()) {
      strictMatch = true;
    }
  });

  var partialMatch = false;
  productInfo.ingredients.forEach( function(elt) {
    if (elt.toLowerCase().includes(ingredient.toLowerCase())) {
      partialMatch = true;
    }
  });
  return strictMatch || partialMatch;
}

function displaySearchResult(searchResult, isUnknown) {
  if (isUnknown) {
      positiveIcon.className = "hiddenCertification";
      negativeIcon.className = "hiddenCertification";
      unknownIcon.className = "visibleCertification";
  } else {
    if (searchResult) {
        positiveIcon.className = "visibleCertification";
        negativeIcon.className = "hiddenCertification";
        unknownIcon.className = "hiddenCertification";
    } else {
        positiveIcon.className = "hiddenCertification";
        negativeIcon.className = "visibleCertification";
        unknownIcon.className = "hiddenCertification";
    }    
  }

  document.getElementById("scanner").style.display = 'none';
  document.getElementById("searchResultContainer").style.display = 'inline';
  isDecided = true;
}


window.addEventListener("message", function (e) {

  // console.log('frame received post message', e);

  var msg = JSON.parse(e.data);

  if (typeof msg.interfaceName !== "undefined") {

    if (!isDecided) {

      // loadJSON('ndbno_map.json',
      //   function(data) { console.log(data); },
      //   function(xhr) { console.error(xhr); }
      // );

      setProduct(msg.interfaceName);
      // displaySearchResult(msg.searchResult); // todo: comment out


    }

  }
    
}.bind(this), false);


// function loadJSON(path, success, error)
// {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function()
//     {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 if (success)
//                     success(JSON.parse(xhr.responseText));
//             } else {
//                 if (error)
//                     error(xhr);
//             }
//         }
//     };
//     xhr.open("GET", path, true);
//     xhr.send();
// }








