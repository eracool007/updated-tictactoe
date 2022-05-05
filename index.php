<?php
$errors=[];
?>
<?php
//credit photos
$credits = array(
    array("id" => 1, "credit" => "Photo par Sebastian Unrau sur Unsplash", "url" => "https://unsplash.com/photos/sp-p7uuT0tw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink", "img"=> "images/foret1.jpg"),
    array("id" => 2, "credit" => "Photo par kazuend sur Unsplash", "url" => "https://unsplash.com/@kazuend?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", "img"=> "images/foret2.jpg"),
    array("id" => 3, "credit" => "Photo par Luca Bravo sur Unsplash", "url" => "https://unsplash.com/@lucabravo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", "img"=> "images/foret3.jpg"),
    array("id" => 4, "credit" => "Photo par Lukasz Szmigiel sur Unsplash", "url" => "https://unsplash.com/@szmigieldesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", "img"=> "images/foret4.jpg"),
    array("id" => 5, "credit" => "Photo par Sergei A sur Unsplash", "url" => "https://unsplash.com/@sakulich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", "img"=> "images/foret5.jpg")
);
$numberOfPictures = count($credits);
$choosenPic = rand(0, $numberOfPictures-1);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600&display=swap"
      rel="stylesheet" />
    <script src="https://kit.fontawesome.com/4592bcc5fd.js" crossorigin="anonymous"></script>
    <link href="css/style.css" rel="stylesheet" />
</head>
<body>

<?php 
    if(isset($_POST)){
        $post=filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
    }
    if (isset($_POST['hostbox']) && $_POST['hostbox'] ==""){
        $errors[]="Le nom du joueur hôte est requis";
    }
    if (isset($_POST['invitebox']) && $_POST['invitebox'] ==""){
        $errors[]="Le nom du joueur invité est requis";
    }
?>
    <?php if(!isset($_POST['hostbox']) || !isset($_POST['invitebox']) || (!empty($errors))) : ?>
        
        <div class="main-content shadow m-top small-main">
            <div class="row">
            <div class="title p-top">Tic Tac Toe!</div>
            

            <form class="m-top" action="?" method="post">
                <p class="p-form">Veuillez enter le nom des joueurs. </p>
                <?php if(!empty($errors)) : ?>
                    <?php foreach($errors as $error) : ?>
                        <p class="error">*<?= $error ?></p>
                    <?php endforeach; ?>
                 <?php endif; ?>
                <label class="label" for="hostbox">Joueur hôte : </label><br>
               
                <input class="inputbox" type="text" id="hostbox" name="hostbox" value="<?php echo (isset($post['hostbox'])) ? $post['hostbox'] : ''; ?>"><br>

                <label class="label" for="invitebox">Joueur invité : </label><br>
                <input class="inputbox" type="text" id="invitebox" name="invitebox" value="<?php echo (isset($post['invitebox'])) ? $post['invitebox'] : ''; ?>"><br>

                <input class="btn-dark btn-md shadow mt-40 pointer btn-form" type="submit" value="Envoyer">
            </form>
            </div>
        </div>

    <?php else : ?>
        <?php
         $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
         $host = $_POST['hostbox'];
         $invite = $_POST['invitebox'];
         ?>
        <!--conteneur principal-->
        <div class="main-content shadow m-top">
                <div class="row">
                    <!--col gauche-->
                    <div class="col-50">
                        <div class="title">Tic Tac Toe!</div>
                            <div class="hidden" id="setting-joueur">host
                            </div>
                        <div class="joueurs m-topx">
                            <div class="joueur joueur-vert">
                                <div class="cercle-icone"> 
                                <i class="fas fa-leaf icon-leaf"></i>
                                
                                </div>
                                    <p class="p-header"> Hôte </p>
                                    <div id="hote">
                                        <p><?= $host ?></p><span id="metadata-current-user" title="<?=$host?>"></span>
                                        </div>  
                                    <div id="score-hote">                              
                                        <p> </p>
                                        </div>
                                </div>
                            <div class="joueur joueur-rose">
                            <div class="cercle-icone"> 
                            <i class="fas fa-paw icon-paw"></i>
                            </div>
                                    <p class="p-header"> Invité(e) </p>
                                    <div id="invite">
                                        <p><?= $invite; ?>  </p>
                                        </div>  
                                    <div id="score-invite">                              
                                        <p> </p>
                                        </div>
                                </div>
                            </div>
                            
                            <div class="shadow" id="status-box">
                                    <span id="nom-gagnant">&nbsp</span><br />
                                    <p id="p-debut" class="debut"></p>
                                    
                                    <i id="i-gagnant" class="fas fa-grin-stars fa-3x emoji hidden"></i><p id="p-gagnant" class="hidden">Bravo! <br>Tu gagnes </p>
                                    <i id="i-nulle" class="fas fa-meh fa-3x emoji hidden"></i><p id="p-nulle" class="hidden"> &nbsp&nbsp&nbspPartie nulle&nbsp&nbsp&nbsp  </p>   </span> 
                                    
                                    </div>
                    </div>

                    <!--col droite-->
                    <div class="col-50">
                        <div class="row">
                            <div class="col-parent">
                                <div class="btn-dark btn-xl shadow m-tops" 
                                        id="joueur-actuel"><?=$host?>
                                </div>
                                    <div class="circle-time shadow opaque hidden">15</div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- Plateau de jeu -->
                            <div class="plateau" id="plateau">
                                <div class="row">
                                    <div id="plateau-invisible" class="">
                                    <span>&nbsp test</span><br /> 
                                    </div>
                                </div>
                                <div class="plateau-inner">
                                <div class="row">
                                    <div class="col-33 cell" id="tab1-1">
                                    </div>
                                    <div
                                        class="col-33 cell cell-v-middle"
                                        id="tab2-1">
                                    </div>
                                    <div class="col-33 cell" id="tab3-1"></div>
                                </div>

                                <div class="row">
                                    <div
                                        class="col-33 cell cell-h-middle"
                                        id="tab1-2">
                                    </div>
                                    <div
                                        class="col-33 cell cell-v-middle cell-h-middle"
                                        id="tab2-2">
                                    </div>
                                    <div
                                        class="col-33 cell cell-h-middle"
                                        id="tab3-2">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-33 cell" id="tab1-3"></div>
                                    <div
                                        class="col-33 cell cell-v-middle"
                                        id="tab2-3">
                                    </div>
                                    <div class="col-33 cell" id="tab3-3"></div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <!-- Boutons -->
                        <div class="row d-flex btn-list">
                            <div
                                class="btn-dark btn-md shadow m-top pointer"
                                id="reglements">
                                Règlements
                            </div>
                            <div
                                class="btn-dark btn-md shadow m-top opaque pointer"
                                id="nouvellepartie">
                                Changer joueurs
                            </div>
                            <div class="btn-dark circle-quit m-top shadow pointer" id="reinitialisation">
                                <i class="fas fa-redo-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        
        <!-- Modal reglements -->
        <div id="fenetretempo" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header"> 
                <h4>Réglements du jeu</h4>
                <h4>TIC-TAC-TOE</h4>
            </div>
            <div class="modal-body">
            <p>Le but du jeu est de réussir a placer 3 jetons consécutifs en ligne verticale, horizontale ou diagonale avant son adversaire.</p>
            
            <p>Chaque joueur place a tour de rôle son jeton tout en essayant de contrer le jeu de l'adversaire.</p>

            <p>Exemple de plateau avec un gagnant</p> 
            <img src="images/regle-gagnant.PNG" alt="Exemple de partie avec un gagnant" class="regle-image">
            <p>Si aucun joueur ne parvient a avoir 3 jetons consécutifs, la partie sera nulle.</p>
            
            <p>Exemple d'une partie nulle</p>
            <img src="images/regle-nulle.PNG" alt="Exemple de partie nulle" class="regle-image">
            <p>Bonne partie!</p>
            </div>
        </div>
        </div>
 
        <script src="js/tic-tac-toe.js"></script>
        <script>
            getPlayers("<?= $host ?>", "<?=$invite?>"); 
            pickImage("<?= $credits[$choosenPic]["img"]; ?>");
    
        </script>
    <!--credit photo-->
    <div class="credits">
        <p class="p-credits">
        <span>Crédits photo</span><br>
        <a target="_blank" href="<?= $credits[$choosenPic]["url"]; ?>"><?= $credits[$choosenPic]["credit"]; ?></a>
    </p>
    </div>
    <?php endif; ?>
</body>
</html>

    