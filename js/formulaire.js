
//console.log(document.querySelector(".a").value);



const xhr = new XMLHttpRequest();
xhr.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getCatParoles.php");
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        const rep = reponse.resultats;
        //placer les li
        let codeHtml = "<ul class=\"ul-cat\">";
        for (const arr of rep) {
            codeHtml = codeHtml.concat("<li>", arr.intitule, "</li>");
 
        }
        codeHtml = codeHtml.concat("</ul>");
        document.querySelector(".section").innerHTML += codeHtml;
        //console.log(codeHtml);

        //select ou deselect les li
        const eltList = document.querySelectorAll(".section li");
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
        //ajput du boutton valider
        document.querySelector(".section").insertAdjacentHTML("beforeend", "<label for=\"nombre\">nombre de questions :</label><br>");
        document.querySelector(".section").insertAdjacentHTML("beforeend", "<input type=\"number name=\"nbre id=\"nombre\"><br><br>");
        document.querySelector(".section").insertAdjacentHTML("beforeend", "<label for=\"numEtud\">numéro étudiant :</label><br>");
        document.querySelector(".section").insertAdjacentHTML("beforeend", "<input type=\"number name=\"nbre id=\"numEtud\"><br><br>");
        document.querySelector(".section").insertAdjacentHTML("beforeend", "<button class=\"valide-choix\">valider</button>");
        //soummission des nouvelles paroles
        document.querySelector(".section").insertAdjacentHTML("afterend", "<div class=\"new-question\"></div>");
        document.querySelector(".new-question").insertAdjacentHTML("afterbegin", "<p class=\"p-parole\">Cliquer ici pour soumettre une nouvelle parole</p>");
        document.querySelector(".new-question").insertAdjacentHTML("beforeend", "<button class=\"bouton-new-parole\">soumettre</button>");
        document.querySelector(".bouton-new-parole").addEventListener("click",()=>{
            window.location.href = "postParole.html";
        })
        //valider pour aller au jeu

        document.querySelector(".valide-choix").addEventListener("click", () => {
            let categorie = "";
            let nb;
            let valeur;
            for (const j of document.querySelectorAll(".section ul")) {
                if (j.querySelectorAll("li strong").length === 1) {
                    if (testReponse(j.querySelector("li strong").textContent, rep)[0] == true) {
                        console.log("tu as reçu");
                        //return le deuxierme valeur retourner par la function
                        categorie = testReponse(j.querySelector("li strong").textContent, rep)[1];
                        console.log(categorie);
                        //transfert "categorie vers page jeux"
                        //input[type='number'
                        nb = document.querySelector("#nombre").value;
                        numEt = document.querySelector("#numEtud").value;
                        valeur = [nb, categorie, numEt];
                        localStorage.setItem("dataChoix", JSON.stringify(valeur));  //save sur local
                        window.location.href = "jeux.html"; //redirectioin ver pages jeux
                    }
                }

                else {
                    //alert("seulement un choix");
                    //categorie=0
                    nb =""// document.querySelector("#nombre").value;
                    numEt = document.querySelector("#numEtud").value;
                    valeur = [nb, categorie, numEt];
                    localStorage.setItem("dataChoix", JSON.stringify(valeur));
                    window.location.href = "jeux.html";
                }
            }
        });

        function testReponse(reponse, rep) {
            let juste = true;
            let categ = null;
            for (const arr of rep) {
                if (reponse == arr["intitule"]) {
                    juste = true;
                    if (arr["cat"]) {
                        categ = arr["cat"];
                    } else {
                        categ = null;
                    }
                }
            }
            return [juste, categ];
        }
    }
};
xhr.send()







































/*
document.querySelector(".btn").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/postChampion.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const rep = JSON.parse(xhr.responseText);
            const lesQuestions = rep.resultats;
        }
    };

    //const cat = "cf";
    //const parole = "puisque l'amour etait seul";
    //const celebrite = "youss";
    //const noEtud = "125";
    //donnees = "cat=" + cat + "&parole=" + parole + "&chanteur=" + celebrite + "&noPart=" + noEtud;

    //https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/postChampion.php
    const timer = 14
    const score = 4
    const noEtud = 23601
    donnees = "noPart=" + noEtud + "&score=" + score+"&temps=" + timer;
    
    console.log(donnees);
    xhr.send(donnees);
 
});




const xhr2 = new XMLHttpRequest();
document.querySelector(".btn2").addEventListener("click", () => {
    //xhr2.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php");
    //xhr2.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getParoles.php?cat=cf&nb=150");
    xhr2.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getChampions.php");
    xhr2.onreadystatechange = () => {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            const rep = JSON.parse(xhr2.responseText);
            console.log(rep);
        }
    };
    xhr2.send()
    //a.stopPropagation()
})


*/