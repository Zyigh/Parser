## Parser

### Les nœuds

On peut découper un nœud en plusieurs éléments :

* Un type, le nom du tag
* Des spécificités (des attributs)
* Un contenu textuel
* Des nœuds enfants

Représenté sous format JSON, on peut définir un nœud :
```javascript
{
    "tag": "nom du tag",
    "attributs": {
        "class": "ma_classe1 ma_classe2",
        "id": "mon_id"
    },
    "bindings": "Mon texte",
    "children":[]
}
```
OU
```javascript
{
    "tag": "nom du tag",
    "attributs": {
        "class": "ma_classe1 ma_classe2",
        "id": "mon_id"
    },
    "bindings": "",
    "children":[
        {...}
    ]
}
```

### Traitement des nœuds

On distingue donc une structure qui se répète :

Dans un tableau, chaque nœud est un objet, dont les enfants sont des objets dans un tableau...

```javascript
[ // Body
    {
        nœud1
        children: [
            {
                sous-nœud1
                children: []
            }, {
                sous-noeud2
                children: []
            }
        ]
    }, {
        nœud2
        ...
    }
]
```

On peut donc appeler récursivement la fonction qui parse tant que l'élément en cours de traitement a une clé "children" itérable.

Pour décrire la récursivité, on pourrait dire :

* À partir du body (qui doit être déjà présent)
* Plus on descend dans la récursivité, plus on crée d'éléments
* Quand on remonte, on attache chaque élément créé à son parent

### Évolutions possibles 

#### Scopes

On pourrait imaginer un système qui isole chaque récursion dans un scope. Cela permettrait au niveau des controllers une approche plus facile et une meilleure visibilité du DOM.  
On pourrait aussi isoler les possibilités d'action de chaque nœud à ses enfants uniquement. Cela implique de designer la représentation du DOM selon le pattern Object Composite, chaque nœud ne connaît que son enfant.

#### Ajouter des nœuds

L'ajout d'un nœud peut se faire de manière simple puisqu'il se base sur le template :

```javascript
{
    "tag": "nom du tag",
    "attributs": {},
    "bindings": "",
    "children":[]
}
```

Puisque le parser est systématiquement généré à partir d'un nœud (body lors du premier tour), on peut le faire partir de n'importe quel nœud du DOM.  
En cas d'implémentation du scope, il est **nécessaire** de pouvoir connaître le niveau du scope à partir duquel on commence la génération.





