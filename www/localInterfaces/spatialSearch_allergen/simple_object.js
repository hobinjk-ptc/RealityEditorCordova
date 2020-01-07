function search(ingredients, userList) {
    for (var key in userList) {

        if (userList[key].state === false) {
            if(typeof ingredients[key] !== "undefined"){
                if(ingredients[key].state === true){
                    return false;
                }
            }
        }

        if (userList[key].state === true) {
            if(typeof ingredients[key] !== "undefined"){
                if(ingredients[key].state === false){
                    return false;
                }
            } else return false;
        }
    }
    return true;
}