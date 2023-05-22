# abonnements

## Diagramme d'état

```mermaid
stateDiagram-v2  
%% abonnements  
	[*] --> Liste_des_abonnements  
	Liste_des_abonnements: Liste des abonnements  
	Choix_du_nouvel_abonnement: Choix du nouvel abonnement  
	Nouvel_abonnement_RSS: Nouvel abonnement RSS  
	Nouvel_abonnement_Twitter: Nouvel abonnement Twitter  
	Suppression_d'un_abonnement: Suppression d'un abonnement  
	Création_d'un_abonnement_RSS: Création d'un abonnement RSS  
	Création_d'un_abonnement_Twitter: Création d'un abonnement Twitter  
	Liste_des_abonnements --> Suppression_d'un_abonnement: Supprimer un abonnement  
	Liste_des_abonnements --> Choix_du_nouvel_abonnement: Ajouter un abonnement  
	Choix_du_nouvel_abonnement --> Nouvel_abonnement_RSS: Abonnement RSS  
	Choix_du_nouvel_abonnement --> Nouvel_abonnement_Twitter: Abonnement Twitter  
	Nouvel_abonnement_RSS --> Création_d'un_abonnement_RSS: Validation flux RSS  
	Nouvel_abonnement_RSS --> Liste_des_abonnements: Retour à la liste des abonnements  
	Nouvel_abonnement_Twitter --> Création_d'un_abonnement_Twitter: Validation flux Twitter  
	Nouvel_abonnement_Twitter --> Liste_des_abonnements: Retour à la liste des abonnements  
	Suppression_d'un_abonnement --> Liste_des_abonnements: OK  
	Suppression_d'un_abonnement --> Liste_des_abonnements: Erreur  
	Création_d'un_abonnement_RSS --> Nouvel_abonnement_RSS: OK  
	Création_d'un_abonnement_RSS --> Nouvel_abonnement_RSS: Erreur  
	Création_d'un_abonnement_Twitter --> Nouvel_abonnement_Twitter: OK  
	Création_d'un_abonnement_Twitter --> Nouvel_abonnement_Twitter: Erreur  

```

Aller à l'état initial : [Liste des abonnements](#Liste_des_abonnements)  
## <a id="Liste_des_abonnements"></a>Liste des abonnements

Test description

### Actions

- Supprimer un abonnement [Suppression d'un abonnement](#Suppression_d'un_abonnement)  
- Ajouter un abonnement [Choix du nouvel abonnement](#Choix_du_nouvel_abonnement)  
## <a id="Choix_du_nouvel_abonnement"></a>Choix du nouvel abonnement

### Actions

- Abonnement RSS [Nouvel abonnement RSS](#Nouvel_abonnement_RSS)  
- Abonnement Twitter [Nouvel abonnement Twitter](#Nouvel_abonnement_Twitter)  
## <a id="Nouvel_abonnement_RSS"></a>Nouvel abonnement RSS

### Actions

- Validation flux RSS [Création d'un abonnement RSS](#Création_d'un_abonnement_RSS)  
- Retour à la liste des abonnements [Liste des abonnements](#Liste_des_abonnements)  
## <a id="Nouvel_abonnement_Twitter"></a>Nouvel abonnement Twitter

### Actions

- Validation flux Twitter [Création d'un abonnement Twitter](#Création_d'un_abonnement_Twitter)  
- Retour à la liste des abonnements [Liste des abonnements](#Liste_des_abonnements)  
## <a id="Suppression_d'un_abonnement"></a>Suppression d'un abonnement

### Actions

- OK [Liste des abonnements](#Liste_des_abonnements)  
- Erreur [Liste des abonnements](#Liste_des_abonnements)  
## <a id="Création_d'un_abonnement_RSS"></a>Création d'un abonnement RSS

### Actions

- OK [Nouvel abonnement RSS](#Nouvel_abonnement_RSS)  
- Erreur [Nouvel abonnement RSS](#Nouvel_abonnement_RSS)  
## <a id="Création_d'un_abonnement_Twitter"></a>Création d'un abonnement Twitter

### Actions

- OK [Nouvel abonnement Twitter](#Nouvel_abonnement_Twitter)  
- Erreur [Nouvel abonnement Twitter](#Nouvel_abonnement_Twitter)  
