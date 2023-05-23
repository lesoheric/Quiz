//let x= JSON.parse(localStorage.getItem("dataJeux"));
//document.querySelector(".section").innerHTML=x[0]+"     et nbre =    "+x[1]

const xhr = new XMLHttpRequest();
xhr.open("get", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/getChampions.php");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        //console.log(xhr.responseText);
        const reponse = JSON.parse(xhr.responseText);
        const rep = reponse.resultats;
        console.log(rep);
        document.querySelector(".section").innerHTML +=addChamp(rep)


       
    }
};
xhr.send();

function addChamp(champ) {
    let codeHtml = "";
    codeHtml = codeHtml.concat("<table><caption>Liste de Champions</caption><tr><th scope=\"col\">Prenom</th><th scope=\"col\">Nom</th><th scope=\"col\">Score</th><th scope=\"col\">temps</th></tr>");
    for (const i of champ) {
        codeHtml = codeHtml.concat("<tr><td>", i.prenom, "</td><td>", i.nom, "</td><td>", i.score, "</td><td>", i.temps, "</td></tr>");
    }
    codeHtml += "</table>"
    return codeHtml
}


/*
 let codeH = "";
        let codeHtml = "<ul>";
        for (const arr of rep) {
            codeH = codeH.concat("<li>", arr.prenom, "  ", arr.nom, " &emsp;", " score : ", arr.score, "&emsp;", "temps : ", arr.temps, "</li>");
        }
        codeHtml = codeHtml.concat(codeH, "</ul>");
        document.querySelector(".section").innerHTML += codeHtml;

*/