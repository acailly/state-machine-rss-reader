# navigation

## Diagramme d'état

```mermaid
stateDiagram-v2  
%% navigation  
	[*] --> Initialisation  
	Nouveautés: Nouveautés  
	Abonnements: Abonnements  
	Sauvegarde: Sauvegarde  
	Télecharger_les_nouveautés: Télecharger les nouveautés  
	Initialisation: Initialisation  
	Initialisation --> Télecharger_les_nouveautés:   
	Initialisation --> Sauvegarde:   
	Initialisation --> Abonnements:   
	Initialisation --> Nouveautés:   
	Initialisation --> Nouveautés:   

```

Aller à l'état initial : [Initialisation](#Initialisation)  
## <a id="Nouveautés"></a>Nouveautés

### Actions

## <a id="Abonnements"></a>Abonnements

### Actions

## <a id="Sauvegarde"></a>Sauvegarde

### Actions

## <a id="Télecharger_les_nouveautés"></a>Télecharger les nouveautés

### Actions

## <a id="Initialisation"></a>Initialisation

### Actions

-  [Télecharger les nouveautés](#Télecharger_les_nouveautés)  
-  [Sauvegarde](#Sauvegarde)  
-  [Abonnements](#Abonnements)  
-  [Nouveautés](#Nouveautés)  
-  [Nouveautés](#Nouveautés)  
