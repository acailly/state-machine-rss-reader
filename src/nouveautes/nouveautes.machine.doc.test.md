# nouveautes

## Diagramme d'état

```mermaid
stateDiagram-v2  
%% nouveautes  
	[*] --> Liste_des_nouveautés  
	Liste_des_nouveautés: Liste des nouveautés  
	Archivage_d'une_nouveauté: Archivage d'une nouveauté  
	Archivage_de_toutes_les_nouveautés_d'un_abonnement: Archivage de toutes les nouveautés d'un abonnement  
	Liste_des_nouveautés --> Archivage_d'une_nouveauté: Marquer une nouveauté comme lue  
	Liste_des_nouveautés --> Archivage_de_toutes_les_nouveautés_d'un_abonnement: Marquer un abonnement comme lu  
	Archivage_d'une_nouveauté --> Liste_des_nouveautés: OK  
	Archivage_d'une_nouveauté --> Liste_des_nouveautés: Erreur  
	Archivage_de_toutes_les_nouveautés_d'un_abonnement --> Liste_des_nouveautés: OK  
	Archivage_de_toutes_les_nouveautés_d'un_abonnement --> Liste_des_nouveautés: Erreur  

```

Aller à l'état initial : [Liste des nouveautés](#Liste_des_nouveautés)  
## <a id="Liste_des_nouveautés"></a>Liste des nouveautés

### Actions

- Marquer une nouveauté comme lue [Archivage d'une nouveauté](#Archivage_d'une_nouveauté)  
- Marquer un abonnement comme lu [Archivage de toutes les nouveautés d'un abonnement](#Archivage_de_toutes_les_nouveautés_d'un_abonnement)  
## <a id="Archivage_d'une_nouveauté"></a>Archivage d'une nouveauté

### Actions

- OK [Liste des nouveautés](#Liste_des_nouveautés)  
- Erreur [Liste des nouveautés](#Liste_des_nouveautés)  
## <a id="Archivage_de_toutes_les_nouveautés_d'un_abonnement"></a>Archivage de toutes les nouveautés d'un abonnement

### Actions

- OK [Liste des nouveautés](#Liste_des_nouveautés)  
- Erreur [Liste des nouveautés](#Liste_des_nouveautés)  
