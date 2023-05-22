# telechargerUnAbonnement

## Diagramme d'état

```mermaid
stateDiagram-v2  
%% telechargerUnAbonnement  
	[*] --> En_cours_de_téléchargement  
	En_cours_de_téléchargement: En cours de téléchargement  
	Téléchargement_réussi: Téléchargement réussi  
	Téléchargement_échoué: Téléchargement échoué  
	En_cours_de_téléchargement --> Téléchargement_réussi: OK  
	En_cours_de_téléchargement --> Téléchargement_échoué: Erreur  

```

Aller à l'état initial : [En cours de téléchargement](#En_cours_de_téléchargement)  
## <a id="En_cours_de_téléchargement"></a>En cours de téléchargement

### Actions

- OK [Téléchargement réussi](#Téléchargement_réussi)  
- Erreur [Téléchargement échoué](#Téléchargement_échoué)  
## <a id="Téléchargement_réussi"></a>Téléchargement réussi

### Actions

## <a id="Téléchargement_échoué"></a>Téléchargement échoué

### Actions

