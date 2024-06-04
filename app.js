const express = require('express');
const sqlite3 = require('sqlite3');
const app = express()
const db = new sqlite3.Database('recettes.db')

app.use(express.json());

// app.get('/recettes', (req, res) => {
//     db.all('SELECT * FROM Recipes', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/sansGluten', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE DietaryInformation_id = 1', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/sansPL', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE DietaryInformation_id = 2', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/vegetarien', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE DietaryInformation_id = 3', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/vegetalien', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE DietaryInformation_id = 4', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/asiatique', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE cuisine_id = 1', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/italienne', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE cuisine_id = 2', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/chinoise', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE cuisine_id = 3', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });
// app.get('/francaise', (req, res) => {
//     db.all('SELECT * FROM Recipes WHERE cuisine_id = 4', (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message});
//             return;
//         }
//         res.json({ recipes: rows });
//     });
// });

// Création de la page d'accueil
app.get('/', (req, res) => {
    res.send()
})

// Création de la page d'aide
app.get('/aide', (req, res) => {
    res.send()
})

// Création de la page contact
app.get('/contact', (req, res) => {
    res.send()
})

// Création de la page des recettes 
// à partir de laquelle il est possible de filtrer 
// via des query : cuisine, objectif, allergie ou diet
app.get('/recettes', (req, res) => {
    const cuisine = req.query.cuisine;
    const objectif = req.query.objectif;
    const allergie = req.query.allergie;
    const diet = req.query.diet;
    if (cuisine) {
        db.all(`SELECT * FROM Recipes WHERE cuisine_id = ${cuisine}`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recipes: rows });
        });
    // } else if (cuisine === 'italienne') {
    //     db.all('SELECT * FROM Recipes WHERE cuisine_id = 2', (err, rows) => {
    //         if (err) {
    //             res.status(500).json({ error: err.message});
    //             return;
    //         }
    //         res.json({ recipes: rows });
    //     });
    // } else if (cuisine === 'chinoise') {
    //     db.all('SELECT * FROM Recipes WHERE cuisine_id = 3', (err, rows) => {
    //         if (err) {
    //             res.status(500).json({ error: err.message});
    //             return;
    //         }
    //         res.json({ recipes: rows });
    //     });
    // } else if (cuisine === 'francaise') {
    //     db.all('SELECT * FROM Recipes WHERE cuisine_id = 4', (err, rows) => {
    //         if (err) {
    //             res.status(500).json({ error: err.message});
    //             return;
    //         }
    //         res.json({ recipes: rows });
    //     });
    } else if (objectif) { 
        db.all(`SELECT * FROM Recipes WHERE goal_id = ${objectif}`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recipes: rows });
        });
    } else if (allergie) {
        db.all(`SELECT * FROM Recipes WHERE AllergiesInformation_id != ${allergie}`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recipes: rows });
        });
     } else if (diet) {
        db.all(`SELECT * FROM Recipes WHERE DietaryInformation_id != ${diet}`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recipes: rows });
        });
     } else {
        db.all('SELECT * FROM Recipes', (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recipes: rows });
        });
    }
    
});

// Création de la page de recette 
// sélectionnée par id avec query
app.get('/recette', (req, res) => {
    const recette = req.query.recette;
    if (recette) {
        db.get(`SELECT * FROM Recipes WHERE recipe_id = ${recette}`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message});
                return;
            }
            res.json({ recette: rows });
        });
    } else ;
})

// Création de la page de recette 
// sélectionnée par nom avec paramètre
app.get('/recettes/nom/:nom', (req, res) => {
    const recetteNom = req.params.nom;
    db.get('SELECT * FROM Recipes WHERE title =?', [recetteNom], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration de la cuisine' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Cuisine non trouvÃ©e' });
      }
      res.json({recipes: row});
    });
  });

  // Récupération des recettes
  // N'ayant pas d'informations allergiques
  // http://localhost:3000/recettes/sansAllergie/
  app.get('/recettes/sansAllergie/', (req, res) => {
    const recetteNom = req.params.nom;
    db.all('SELECT * FROM Recipes WHERE AllergiesInformation_id IS NULL', (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration des recettes' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Recettes non trouvÃ©e' });
      }
      res.json({recipes: row});
    });
  });


  // Récupération des recettes selon le nom d'une cuisine
  // Requête SQL imbriquée / Sous-requête SQL
  app.get('/recettes/cuisine/:nom', (req, res) => {
    const nom = req.params.nom;
    db.all('SELECT * FROM Recipes WHERE cuisine_id = (SELECT cuisine_id FROM Cuisines WHERE name =?)', [nom], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({error: 'Erreur lors de la récupération de la recette'})
        } 
        if (!row) {
            return res.status(404).json({error: 'Recettes non trouvée'})
        }
        res.json({Recipes: row})
    })
  })

  // Créer une recette
  // utilisation des ID pour les clés étrangères
app.get('/recettes/ajouter/:nom/description/:desc/image/:image/cuisine/:cuisine/goal/:goal/diet/:diet/allergie/:allergie', (req,res) => {
    const nom = req.params.nom;
    const desc = req.params.desc;
    const image = req.params.image;
    const cuisine = req.params.cuisine;
    const goal = req.params.goal;
    const diet = req.params.diet;
    const allergie = req.params.allergie;
    db.run('INSERT INTO Recipes (title, description, image_url, cuisine_id, goal_id, DietaryInformation_id, AllergiesInformation_id) VALUES (?, ? , ?, ?, ?, ?, ?)', [nom, desc, image, cuisine, goal, diet, allergie], (err) => {
        if (err){
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de la création de la cuisine' });
        }
        res.status(200).json({ message: `Recette '${nom}' créée avec succès` });
    })
})

// Modifier le nom d'une recette
app.get('/recettes/nom/:oldTitle/updateTo/:newTitle', (req, res) => { 
    const oldTitle = req.params.oldTitle; 
    const newTitle = req.params.newTitle;
    db.run(`UPDATE Recipes SET title = ? WHERE title = ?`, [newTitle, oldTitle], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de la modification du nom de la recette' });
        }
        res.status(200).json({ message: `Nom de recette '${oldTitle}' mis à jour à '${newTitle}' avec succès` });
    });
});

// Modifier l'information allergique d'une recette
app.put('/recettes/nom/:nom/allergieUpdateTo/:newAllergie', (req, res) => { 
    const nom = req.params.nom;
    const newAllergie = req.params.newAllergie;
    var newAllergieID;
    // db.get(`SELECT * FROM AllergiesInformation WHERE name = ?`, [oldAllergie], (err, row) => {
    //     if (err) {
    //         console.error(err)
    //         return res.status(500).json({error: `Erreur lors de la récupération de l'allergie à modifier`})
    //     } if (!row) {
    //         return res.status(404).json({error: `Aucune allergie de ce nom ${oldAllergie}`})
    //     } 
    //     oldAllergieID = row.allergy_id;
        db.get(`SELECT * FROM AllergiesInformation WHERE name = ?`, [newAllergie], (err, row) => {
            if (err) {
                console.error(err)
                return res.status(500).json({error: `Erreur lors de la récupération de l'allergie à remplacer`})
            } if (!row) {
                return res.status(404).json({error: `Aucune allergie de ce nom ${newAllergie}`})
            } 
            newAllergieID = row.allergy_id;
            db.get(`SELECT * FROM Recipes WHERE title =?`, [nom], (err, row) => {
                if (err) {
                    console.error(err)
                    return res.status(500).json({error: `Erreur lors de la récupération de la recette`})
                } if (!row) {
                    return res.status(404).json({error: `Aucune recette du nom de '${nom}'`})
                }
            
            db.run(`UPDATE Recipes SET AllergiesInformation_id = ? WHERE title = ?`, [newAllergieID, nom], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: `Erreur lors de la mise à jour de l'information allergique des recettes` });
                }
                return res.status(200).json({message : `Allergie mise à jour à ${newAllergie} dans la recette ${nom}`})
        });
    });
})
})

// Supprimer une recette    
app.get('/recettes/supprimer/:nom', (req,res) => {
    const nom = req.params.nom;
    db.run('DELETE FROM Recipes WHERE title =?', [nom], (err) => {
        if (err){
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de la suppression de la recette' });
        }
        res.status(200).json({ message: `Recette '${nom}' supprimée avec succès` });
    })
})

// Création de la page des cuisines
app.get('/cuisines', (req, res) => {
    db.all('SELECT * FROM Cuisines', (err, row) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration des cuisines' });
        } else if (!row) {
            return res.status(404).json({error: 'Aucune cuisine'})
        } else {
            res.json({Cuisines: row})
        }
    });
})

// Ajouter une cuisine
app.get('/cuisines/ajouter/:nom', (req,res) => {
    const nom = req.params.nom;
    db.run('INSERT INTO Cuisines (name) VALUES (?)', [nom], (err) => {
        if (err){
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de la création de la cuisine' });
        }
        res.status(200).json({ message: `Cuisine ${nom} créée avec succès` });
    })
})


// Création de la page d'une cuisine d'après le nom
app.get('/cuisines/nom/:nom', (req, res) => {
    const cuisineNom = req.params.nom;
    db.get('SELECT * FROM Cuisines WHERE name =?', [cuisineNom], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erreur lors de la rÃ©cupÃ©ration de la cuisine' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Cuisine non trouvÃ©e' });
      }
      res.json({Cuisine: row});
    });
  });


// Supprime une cuisine et remplacer l'ID de cuisine
// des recettes possédant l'ID de cuisines à supprimer
// par l'ID de cuisine des recettes internationales   
app.get('/cuisines/supprimer/:nom', (req,res) => {
    const nom = req.params.nom;
    var cuisineToDeleteId;
    var internationalCuisineId;
    db.get(`SELECT cuisine_id FROM Cuisines WHERE name = ?`, ['Internationale'], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: `Erreur lors de la récupération de l'ID de la cuisine International` });
        }
        if (!row) {
            return res.status(404).json({ message: 'Cuisine "Internationale" non trouvée' });
        }
        internationalCuisineId = row.cuisine_id;
        db.get(`SELECT cuisine_id FROM Cuisines WHERE name = ?`, [nom], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: `Erreur lors de la récupération de l'ID de la cuisine à supprimer` });
            }
            if (!row) {
                return res.status(404).json({ message: `Cuisine ${nom} non trouvée` });
            }
            cuisineToDeleteId = row.cuisine_id;
            db.run(`UPDATE Recipes SET cuisine_id = ? WHERE cuisine_id = ?`, [internationalCuisineId, cuisineToDeleteId], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Erreur lors de la mise à jour de la cuisine des recettes' });
                }

                // Étape 4: Supprimez la cuisine
                db.run(`DELETE FROM Cuisines WHERE name = ?`, [nom], function (err) {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).json({ error: `Erreur lors de la suppression de la cuisine ${nom}` });
                    }
                    res.status(200).json({ message: `Cuisine ${nom} supprimée et cuisine des recettes mises à jour avec succès` });
                });
            });
        });
    });
})

app.get('/instructionRecette/:id', (req, res) => {
    const id = req.params.id
    db.all('SELECT * FROM RecipeInstructions WHERE recipe_id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: `Erreur lors de la récupération de l'ID de la cuisine à supprimer` });
        }
        if (!row) {
            return res.status(404).json({ message: `Instruction de la recette non trouvée` });
        }
        res.status(200).json({RecipeInstructions: row})
    })
})

app.get('/instructionRecette/:id/updateTo/:desc', (req, res) => {
    const id = req.params.id
    const desc = req.params.desc;
    db.get(`UPDATE RecipeInstructions SET description = ? WHERE instruction_id = ?`, [desc, id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({error: `Erreur lors de la modification de la description de l'instruction`})
        }
        res.status(200).json({message: `Description de l'instruction mise à jour`})
    })
})

app.get("/addrecipe/:idRecipe/ingredient/:idIngredient", (req, res) => {
    const idRecipe = req.params.idRecipe;
    const idIngredient = req.params.idIngredient;
  
    db.run(
      `INSERT INTO RecipeIngredients (recipe_id, ingredient_id) VALUES (?, ?)`, [idRecipe, idIngredient], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: `Erreur lors de la suppresion de l'ingrédient` });
        }
        res.status(200).json({ message: "Ingrédient de recette ajouté avec succès" });
      }
    );
  });

  app.get("/suprecipe/:idRecipe/ingredient/:idIngredient", (req, res) => {
    const idRecipe = req.params.idRecipe;
    const idIngredient = req.params.idIngredient;
  
    db.run(
      `DELETE FROM RecipeIngredients WHERE recipe_id = ? AND ingredient_id =?`, [idRecipe, idIngredient], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: `Erreur lors de la suppresion de l'ingrédient` });
        }
        res.status(200).json({ message: "Ingrédient de recette supprimé avec succès" });
      }
    );
  });

// addRecette?title=test&?desc=test&?image=test&?goal=2&?diet=2&?allergie=2
// app.post('/addRecette', (req, res) => {    
//     const titre = req.body.title;
//     const description = req.body.desc;
//     const image = req.body.image;
//     // const goal = req.body.goal;
//     // const diet = req.body.diet;
//     // const allergie = req.body.allergie;
//     db.prepare(`INSERT INTO Recipes (title, description, image_url) VALUES (${titre}, ${description}, ${image}),`, (err, rows) =>{
//         if (err) {
//             res.status(500).json({error : err.message});
//             return;
//         }
//         res.json({recipes: rows})
//     })
// })

  

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// À FAIRE
// Ajouter un ingrédient à une recette
// Supprimer un ingredient d’une recette