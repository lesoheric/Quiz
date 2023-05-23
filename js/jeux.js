
//b contient la ["categorie", "nombre de question", "numero etudiant"]
let b = JSON.parse(localStorage.getItem("dataChoix"));
function getDonneeUser(nbre = 5, cate = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php") {
    let cat = "";
    if (cate == "cf") {
        cat = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=cf&nb=" + nbre;
    }
    else if (cate == "ca") {
        cat = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=ca&nb=" + nbre;
    }
    else {
        cat = "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php";
    } 
    return cat;
}
const xhr = new XMLHttpRequest();
xhr.open("get", getDonneeUser(b[0], b[1])); 
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        const rep = reponse.resultats;
        let temp = 1;
        const t = setInterval(() => {
            document.querySelector(".timer").innerHTML = temp;
            temp++;
        }, 1000);

        integrerLesQuestions(rep);

        document.querySelector(".section").insertAdjacentHTML("beforeend", "<div class=\"wrapper-btn\"></div>");
        document.querySelector(".wrapper-btn").insertAdjacentHTML("beforeend", "<button class=\"buttonJeux\">valider</button>");

        //add classList ".article" to <article>
        const eltArt = document.querySelectorAll("article");
        eltArt.forEach(e => {
            e.classList.add("article");
        });

        //change when we click on item
        const eltList = document.querySelectorAll("article li");
        for (const li of eltList) {
            li.addEventListener("click", (e) => {
                let cible = e.currentTarget;
                const cib = "<strong>".concat(cible.innerHTML, "</strong>");
                if (cible.querySelector("strong") === null) {
                    cible.innerHTML = cib;
                } else {
                    cible.innerHTML = cible.textContent;
                }
            });
        }
        //**boutton validateur */
        document.querySelector(".buttonJeux").addEventListener("click", (e) => {
            let nbre = 0;
            let verif = false;
            //let varRedirect=false
            for (const j of document.querySelectorAll(".article")) {
                if (j.querySelectorAll("li strong").length === 1) {
                    verif = true; //on veut s'assuerer qu'il aura repondu à au moins une question
                    if (testReponse(j.id, j.querySelector("li strong").textContent, rep) == true) {
                        //console.log("tu as reçu");
                        nbre++;
                        //j.style.border = "4px solid green";
                        j.style.background = "rgb(126, 223, 126)";
                        //transfert donnee vers champs
                        //let coord = [nbre, b[2]];

                        //console.log(num);
                        //localStorage.setItem("dataJeux", JSON.stringify(coord));
                        e.stopPropagation();
                        e.preventDefault();
                    }
                } else {
                    console.log("uniquement un choix");
                }
            }//on va post champ (2222002200)
            if (verif) {

                document.querySelector(".buttonJeux").remove(); //on supprime le bouton pour permettre de laisser seul le btn soumettre champ
                document.querySelector(".wrapper-btn").insertAdjacentHTML("beforeend", "<p class=\"para-soumettre\">Cliquer pour soumettre le champion (poster dans la liste de champion)</p>");
                document.querySelector(".wrapper-btn").insertAdjacentHTML("beforeend", "<button class=\"buttonChamp\">soumettez champ</button>");

                clearInterval(t);
                console.log("timer : ", temp);

                //soummission du champ
                document.querySelector(".buttonChamp").addEventListener("click", () => {
                    const zhr = new XMLHttpRequest();
                    zhr.open("post", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/postChampion.php");
                    zhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    zhr.onreadystatechange = function () {
                        if (zhr.readyState === 4 && zhr.status === 200) {
                            const reponse = JSON.parse(zhr.responseText);
                            //console.log(zhr.responseText);
                            //get reponse after submit champ
                            document.querySelector(".p-footer-cacher").innerHTML = reponse.message;

                            let reponseChamp = document.querySelector(".p-footer-cacher").textContent;
                            //set and affiche reponse from server after submit champ
                            document.querySelector(".wrapper-btn").insertAdjacentHTML("beforeend", "<p class=\"pToChamp\"><span class=\"rep-champ\">"+reponseChamp+"</span><br> ATTENTION <br>Dans 5 secondes vous serez avant rediriger vers la page CHAMP.</p>");
                            //wait 3 second to redirection vers champ
                            setTimeout(() => {
                                window.location.href = "champ.html";
                                // ok deja fait redirection vers la page champ apres s'etre sùr qu'il repondu à au moins une question (verif)
                            }, 10000);
                        }
                    };
                    const timer = temp;
                    const score = nbre;
                    const noEtud = b[2];
                    donnees = "noPart=" + noEtud + "&score=" + score + "&temps=" + timer;
                    console.log(donnees);
                    zhr.send(donnees);
                    //console.log("donnnee envoyer en premier puis vient....");
                });
            }
            console.log(nbre);
        });
    } else {
        console.log("attention ! reponder a au moin une question");
        //alert("Repondez à au moin une question")
    }
};

xhr.send();
//teste bonne reponse
function testReponse(id, reponse, lesQuestions) {
    let juste = false;
    for (const arr of lesQuestions) {
        if (id == (lesQuestions.indexOf(arr) + 1) && reponse == arr["nom"]) {
            juste = true;
        }
    }
    return juste;
}

//integre une question
function integrerQuestion(questionComplete, position) {
    let codeHtml = "<article ".concat("id=\"", position, "\">");
    codeHtml = codeHtml.concat("<h2>Question : ", position, "<h3>Parole du célèbre</h3><blockquote>", questionComplete["parole"], "</blockquote><h3>Qui l'a dit</h3><ul class=\"ul-quest\"><li>", questionComplete.nom, "</li>");
    for (const arr of questionComplete["lesAutres"]) {
        codeHtml = codeHtml.concat("<li >", arr, "</li>");
    };
    codeHtml = codeHtml.concat("</ul></article>");
    return codeHtml;
}

//integre l'ensemble des question
function integrerLesQuestions(lesQuestions) {
    //let pos;
    for (const arr of lesQuestions) {
        //pos=arr.indexOf()
        document.querySelector(".section").innerHTML += integrerQuestion(arr, (lesQuestions.indexOf(arr) + 1));
    }
}
