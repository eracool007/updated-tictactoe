var plateau;
var tour = "impair";

var joueur_depart = "";//

var modal = document.getElementById("fenetretempo");
var btn = document.getElementById("reglements");
var span = document.getElementsByClassName("close")[0];
var plateauInvisible = document.getElementById("plateau-invisible");
var btnNouvellepartie = document.getElementById("nouvellepartie");

var scoreHote = 0;
var scoreInvite = 0;

var hostName = "";
var hostColor = "#08bb34";
var guestName = "";
var guestColor = "#fa4fff"; 
var defaultColor = "#7bb5f6";

var dernierGagnant;
//var dernierPerdant;
var premierJoueur;

function getPlayers(host, guest){
     hostName=host;
     guestName=guest;
}

// position sur plateau = [0,1,2,3,4,5,6,7,8];
//                        tab1-1,tab2-1,tab3-1,tab1-2,tab2-2,tab3-2,tab1-3,tab2-3,tab3-3
// carreau                  1     2     3     4       5       6       7     8       9

function activer(carreau) {
    var position,
        nb = 0,
        gagnant = false;

    switch (carreau) {
        case "tab1-1":
            position = 1;
            break;
        case "tab2-1":
            position = 2;
            break;
        case "tab3-1":
            position = 3;
            break;
        case "tab1-2":
            position = 4;
            break;
        case "tab2-2":
            position = 5;
            break;
        case "tab3-2":
            position = 6;
            break;
        case "tab1-3":
            position = 7;
            break;
        case "tab2-3":
            position = 8;
            break;
        case "tab3-3":
            position = 9;
            break;
    }

    // vérifie si combinaison gagnante

    if (plateau[position - 1] === "-1") {
        if (tour === "impair") {
            document.getElementById(carreau).innerHTML =
                '<i class="fas fa-leaf icon-leaf-plateau"></i>';
            tour = "pair";
            plateau[position - 1] = "1";
            document.getElementById("joueur-actuel").innerHTML = guestName;
            document.getElementById("joueur-actuel").style.backgroundColor =
                guestColor;
            if (valider(plateau, "1")) {
                plateau = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];

                afficherResultat(hostName);
                return true;
            }
        } else {
            document.getElementById(carreau).innerHTML =
                '<i class="fas fa-paw icon-paw-plateau"></i>';
            tour = "impair";
            plateau[position - 1] = "0";
            document.getElementById("joueur-actuel").innerHTML = hostName;
            document.getElementById("joueur-actuel").style.backgroundColor =
                hostColor;
            if (valider(plateau, "0")) {
                plateau = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

                afficherResultat(guestName);
                return true;
            }
        }
    }

    for (let index = 0; index < plateau.length; index++) {
        if (plateau[index] === "0" || plateau[index] === "1") {
            nb++;
        }
        if (nb === 9 && !gagnant) {
            afficherResultat("nulle");
        }
    }
}

function valider(vecteur, joueur) {
    // teste les différentes combinaisons pour déterminer si gagnant
    if (
        (vecteur[0] == joueur) &
        (vecteur[1] == joueur) &
        (vecteur[2] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[3] == joueur) &
        (vecteur[4] == joueur) &
        (vecteur[5] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[6] == joueur) &
        (vecteur[7] == joueur) &
        (vecteur[8] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[0] == joueur) &
        (vecteur[3] == joueur) &
        (vecteur[6] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[1] == joueur) &
        (vecteur[4] == joueur) &
        (vecteur[7] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[2] == joueur) &
        (vecteur[5] == joueur) &
        (vecteur[8] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[0] == joueur) &
        (vecteur[4] == joueur) &
        (vecteur[8] == joueur)
    ) {
        return true;
    }
    if (
        (vecteur[2] == joueur) &
        (vecteur[4] == joueur) &
        (vecteur[6] == joueur)
    ) {
        return true;
    }
}

function initHost(playername) {
   tour = "impair";
   premierJoueur="host";
   document.getElementById("joueur-actuel").innerHTML = hostName;
   document.getElementById("joueur-actuel").classList.remove("opaque");
   document.getElementById("joueur-actuel").style.backgroundColor = hostColor;
   //document.getElementById("premier_joueur_0").innerHTML = playername;
}

function initGuest(playername) {
   tour = "pair";
   premierJoueur="guest";
   document.getElementById("joueur-actuel").innerHTML = guestName;
   document.getElementById("joueur-actuel").classList.remove("opaque");
   document.getElementById("joueur-actuel").style.backgroundColor = guestColor;
   //document.getElementById("premier_joueur_0").innerHTML = playername;
}

function init() {
    //let joueur_depart,jeton_premier;
    if (!document.getElementById("status-box").classList.contains("hidden")) {
        document.getElementById("status-box").classList.add("hidden");
        document.getElementById("nom-gagnant").innerHTML = "&nbsp";

        if (
            !document.getElementById("i-gagnant").classList.contains("hidden")
        ) {
            document.getElementById("i-gagnant").classList.add("hidden");
            document.getElementById("p-gagnant").classList.add("hidden");
        }

        if (!document.getElementById("i-nulle").classList.contains("hidden")) {
            document.getElementById("i-nulle").classList.add("hidden");
            document.getElementById("p-nulle").classList.add("hidden");
        }
    }
    if(joueur_depart == ""){
        joueur_depart = document.getElementById("setting-joueur").innerText;
        joueur_depart = joueur_depart.trim();  
    }


    hostName = document.getElementById("metadata-current-user").title;
   
  

    if (joueur_depart=="host") {
        initHost(hostName);
    }
    else if (joueur_depart=="guest") {
        initGuest(guestName);
    }
    
    /*else if (joueur_depart=="winner") {
             if (dernierGagnant=="host") {
                initHost("Dernier gagnant");
             }
             else if (dernierGagnant=="guest") {
                initGuest("Dernier gagnant");
             }
             else {
              
                jeton_premier = getRandomIntInclusive(1,2);
            
                if (parseInt(jeton_premier) == 1) {
                    initHost("Dernier gagnant");
                }
                else  {
                    initGuest("Dernier gagnant");
                }
            }    
        }
    else if (joueur_depart=="loser") {
            if (dernierPerdant=="host") {
                initHost("Dernier perdant");
            }
            else if (dernierPerdant=="guest") {
                initGuest("Dernier perdant");
            }
            else {
             
               jeton_premier = getRandomIntInclusive(1,2);
            
               if (parseInt(jeton_premier) == 1) {
                initHost("Dernier perdant");
               }
               else  {
                initGuest("Dernier perdant");
               }
           }    
    } */   
           
    if (!plateauInvisible.classList.contains("hidden")) {
        plateauInvisible.classList.add("hidden");
    }

    plateau = ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"];
  
    document.getElementById("tab1-1").innerHTML = "";
    document.getElementById("tab2-1").innerHTML = "";
    document.getElementById("tab3-1").innerHTML = "";
    document.getElementById("tab1-2").innerHTML = "";
    document.getElementById("tab2-2").innerHTML = "";
    document.getElementById("tab3-2").innerHTML = "";
    document.getElementById("tab1-3").innerHTML = "";
    document.getElementById("tab2-3").innerHTML = "";
    document.getElementById("tab3-3").innerHTML = "";

    document.getElementById("score-hote").innerHTML = scoreHote;
    document.getElementById("score-invite").innerHTML = scoreInvite;
}

function reinit() {
    scoreHote = 0;
    scoreInvite = 0;
    init();
}

function activerBtnNouvellePartie() {
    document
        .getElementById("nouvellepartie")
        .addEventListener("click", function () {
            location.href="index.php";
        });

    btnNouvellepartie.classList.remove("opaque");
    init();
}
/*function removeButton() {
    btnInvite.classList.add("opaque");
    inviteInvisible.classList.remove("hidden");
}*/

function afficherResultat(resultat) {
    let resultatPartie = resultat;
    let color;//,joueur_depart;

    plateauInvisible.classList.remove("hidden");

    if (resultatPartie === hostName) {
        // hote gagnant
        scoreHote++;
        color = hostColor;
        document.getElementById("nom-gagnant").innerHTML = hostName;
        document.getElementById("p-gagnant").innerHTML = "Bravo, tu as gagné!";
        document.getElementById("i-gagnant").classList.remove("hidden");
        document.getElementById("p-gagnant").classList.remove("hidden");
        dernierGagnant="host";
        joueur_depart="guest";//

        //dernierPerdant="guest";

    } else if (resultatPartie === guestName) {
        // invite gagnant
        scoreInvite++;
        document.getElementById("nom-gagnant").innerHTML = guestName;
        document.getElementById("p-gagnant").innerHTML = "Bravo, tu as gagné!";
        document.getElementById("i-gagnant").classList.remove("hidden");
        document.getElementById("p-gagnant").classList.remove("hidden");
        color = guestColor;
        dernierGagnant="guest";
        joueur_depart="host"//
        //dernierPerdant="host";

    } else if (resultatPartie === "nulle") {
        document.getElementById("nom-gagnant").innerHTML = "&nbsp";
        document.getElementById("p-nulle").innerHTML = "Partie nulle";
        document.getElementById("i-nulle").classList.remove("hidden");
        document.getElementById("p-nulle").classList.remove("hidden");
        color = defaultColor;
        
        //joueur_depart = document.getElementById("setting-joueur").innerText;
        //joueur_depart = joueur_depart.trim();
        /*
        if (joueur_depart=="loser" && dernierPerdant=="") {
           if (premierJoueur=="guest") {
              dernierGagnant="host";
              dernierPerdant="guest";
           }
        
        else {
           dernierGagnant="guest";
           dernierPerdant="host";
        }
    }
        else if (joueur_depart=="winner" && dernierGagnant=="") {
          if (premierJoueur=="host") {
             dernierGagnant="guest";
             dernierPerdant="host";
          }
        
        else {
          dernierGagnant="host";
          dernierPerdant="guest";
        }
    }*/
}
    document.getElementById("status-box").style.backgroundColor = color;
    document.getElementById("status-box").classList.remove("hidden");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

document.getElementById("tab1-1").addEventListener("click", function () {
    activer("tab1-1");
});
document.getElementById("tab2-1").addEventListener("click", function () {
    activer("tab2-1");
});
document.getElementById("tab3-1").addEventListener("click", function () {
    activer("tab3-1");
});
document.getElementById("tab1-2").addEventListener("click", function () {
    activer("tab1-2");
});
document.getElementById("tab2-2").addEventListener("click", function () {
    activer("tab2-2");
});
document.getElementById("tab3-2").addEventListener("click", function () {
    activer("tab3-2");
});
document.getElementById("tab1-3").addEventListener("click", function () {
    activer("tab1-3");
});
document.getElementById("tab2-3").addEventListener("click", function () {
    activer("tab2-3");
});
document.getElementById("tab3-3").addEventListener("click", function () {
    activer("tab3-3");
});


document.getElementById("reinitialisation").addEventListener("click", function () {
        init();
});

activerBtnNouvellePartie();

// Fenetre modal

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    init();
});

//background
function pickImage(img){
    
    document.body.style.backgroundImage = `url(${img})`;
    document.body.classList.add("bg-image");
    
}

