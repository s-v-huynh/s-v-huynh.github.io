var w; // La variable pour le worker

function startWorker() // La function qui demarre quand on appuie sur compter
{
    if(typeof(Worker) !== "undefined") // Verifie sur notre fureteur supporte les web workers
    {
        if(typeof(w) == "undefined") // Verifie si le web worker existe deja
        {
            w = new Worker("worker.js"); // Creer le worker s'il n'existe pas
        }

        w.postMessage(document.getElementById("textArea").value); // Envoie les donnees du textarea au worker

        w.onmessage = function(event) // Recoit les donnees du worker
        {
            document.getElementById("result").innerHTML = Math.round(event.data[0]); // Affiche le nom de jetons comptes. On fait un round parce qu'on envoie des chiffres a virgule a cause de la racine carre.
            document.getElementById("bar").innerHTML = event.data[1] + "%"; // Affiche le progres de la barre
            $("#bar").css("width",event.data[1] + "%");
        };
    } 
    else 
    {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers..."; // Message si le fureteur ne supporte pas les web workers
    }
}

function stopWorker() // La function qui demarre quand on appuie sur annuler
{ 
    w.terminate();
    w = undefined;

    document.getElementById("result").innerHTML = "Annuler"; // Affiche annuler quand on appuie sur annule
}    

