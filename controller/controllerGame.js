let motsTest = "test"
let motsTestArray = []


let motsAffiche = []
for (let key in motsTest)[
    motsTestArray.push(motsTest[key]),
    motsAffiche.push("_ ")
]

let nbimage = 1
let lettreUse = document.getElementById("lettreUse")
let submitBtn = document.getElementById("submit")
let image = document.getElementById("image")
let erreur = document.getElementById("erreur")
let regexAZ = /[a-z]/
let lettre = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"]
let lettreUseArray = []

image.src = "public/image/"+ nbimage + ".png"
submitBtn.addEventListener("click", proposLettre)
document.getElementById("motsATrouve").innerText = motsAffiche.join(" ")

function proposLettre(){
    let responce = document.getElementById("lettre").value
    document.getElementById("lettre").value = ""
    let goodLettre = false
    if(regexAZ.test(responce) == false || responce.length == 0){
        erreur.innerHTML = "erreur : Vous devez proposez une lettre de l\'alphabet"
        return null
    }else if (responce.length > 1 ){
        erreur.innerHTML = "erreur : Vous devez proposez UNE lettre de l\'alphabet"
        return null
    }
    erreur.innerHTML = ""
    lettreUse.append(" " + responce)
    for (let x in lettre) {
        if(lettre[x] == responce){
            lettreUseArray.push(responce)
            delete lettre[x]
            for (let k in motsTestArray){
                if (motsTestArray[k] == responce){
                    motsAffiche[k] = responce
                    document.getElementById("motsATrouve").innerText = motsAffiche.join(" ")
                    delete motsTestArray[k]
                    goodLettre = true
                }
            }
        }
        
    }
    if( goodLettre == false){
        plusImage()
    }
    let verifwin = true
    for (let f in motsAffiche) {
        if (motsAffiche[f] == "_ "){
            verifwin = false
        }
    }
    if (verifwin == true){
        victorie()
    }
    if (nbimage >= 8){
        lose()
    }

    return true
}
function plusImage(){

    if (nbimage < 8) {
        nbimage += 1 
        image.src = "public/image/"+ nbimage + ".png"
    }
}


function victorie(){
    submitBtn.removeEventListener('click', proposLettre)
    document.getElementById("statue").hidden = false
    document.getElementById("statue").innerHTML = "Victoire"
    document.getElementById("formulaire").hidden = true
    document.getElementById("erreur").hidden = true
}

function lose(){
    submitBtn.removeEventListener('click', proposLettre)
    document.getElementById("statue").hidden = false
    document.getElementById("statue").innerHTML = "Perdu"
    document.getElementById("formulaire").hidden = true
    document.getElementById("erreur").hidden = true
}