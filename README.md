# P2P-Wallet

Documentation pour l'Endpoint d'Initialisation de Safe
Endpoint : /init-safe
Méthode : POST
Description : Cet endpoint permet d'initialiser un nouveau Safe sur le testnet Goerli.
Données d'Entrée :
Aucune donnée d'entrée n'est requise car la clé privée est récupérée depuis le fichier .env sur le serveur.

Données de Sortie :
safeAddress (string) : L'adresse Ethereum du Safe nouvellement créé.
Exemple :
Requête :
http
Copy code
POST /init-safe HTTP/1.1
Host: localhost:3000
Réponse :
json
Copy code
{
    "safeAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
Codes de Réponse :
200 OK : La requête a réussi et un nouveau Safe a été créé.
500 Internal Server Error : Il y a eu une erreur lors de la création du Safe.
Utilisation :
Lancer le serveur :

Ouvrez votre terminal.
Naviguez vers le répertoire contenant votre fichier server.js.
Exécutez la commande : node server.js.
Vous devriez voir le message Server is running on http://localhost:3000 s'afficher dans le terminal.
Initialiser un Safe :

Utilisez un outil comme Postman ou curl dans votre terminal pour envoyer une requête POST à l'endpoint /init-safe.
Exemple avec curl :

bash
Copy code
curl -X POST http://localhost:3000/init-safe
Vous devriez recevoir une réponse JSON contenant l'adresse Ethereum du Safe nouvellement créé.

Notes :
Assurez-vous que le compte associé à la clé privée utilisée pour créer le Safe a suffisamment d'Ether sur le testnet Goerli pour couvrir les frais de gaz de déploiement du contrat Safe.

Pour des raisons de sécurité, il est recommandé de ne pas exposer votre clé privée et de gérer l'authentification et la gestion des clés de manière sécurisée.
Cela sera changé par la suite.
La clé privée utilisé est un compte de teste.

