
document.querySelector("#bouton").addEventListener('click', function () {
    const xhr = new XMLHttpRequest();
    xhr.open("post", "https://mi-phpmut.univ-tlse2.fr/~21_L2_PROJET/postParole.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const reponse = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            document.querySelector("#resultat").innerHTML = reponse.message;
            document.querySelector("#message").innerHTML = reponse.resultats;
        }
    };
    const cat = document.querySelector("#cat").value;
    const parole = document.querySelector("#parole").value;
    const celebrite = document.querySelector("#celebrite").value;
    const noEtud = document.querySelector("#num").value;
    donnees = "cat=" + cat + "&parole=" + parole + "&chanteur=" + celebrite+"&noPart=" + noEtud;
    console.log(donnees);
    xhr.send(donnees);
});




    
