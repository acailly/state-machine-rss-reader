# telecharger

## Diagramme d'état

```mermaid
stateDiagram-v2  
%% telecharger  
	[*] --> Récupération_des_abonnements  
	Récupération_des_abonnements: Récupération des abonnements  
	En_cours_de_téléchargement: En cours de téléchargement  
	Récupération_des_abonnements --> En_cours_de_téléchargement: OK  

```

Aller à l'état initial : [Récupération des abonnements](#Récupération_des_abonnements)  
## <a id="Récupération_des_abonnements"></a>Récupération des abonnements

### Actions

- OK [En cours de téléchargement](#En_cours_de_téléchargement)  
## <a id="En_cours_de_téléchargement"></a>En cours de téléchargement

### Actions

