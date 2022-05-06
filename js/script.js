(function($){
    /**
     * Automate placement of the main part of body because
     * the header is fixed and lay over the main by default
     */  
    let scrollMain = function(){
        let headerHeight = document.querySelector('header').getBoundingClientRect().height;

        $('main').animate({
            marginTop : headerHeight + 10
        }, 100);
    }
    
    scrollMain();

    // trigger resize on windows and call the scrollMain function
    jQuery(window).resize(scrollMain);

    $('.goto-top .btn').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop : '0px'}, 'slow');
    });

    /* 
    * Affichement du boutton aller en haut de page
    * lors du défilement de la barre verticale
    */

    // trigger scroll on windows
    jQuery(window).scroll(function(){
        if(jQuery(this).scrollTop() > 1){
            jQuery('.goto-top').css({
                bottom : '25px'
            });
            // // si on se trouve sur un écran  small, masquer le navbar
            // let largeurFen = document.querySelector('html').getBoundingClientRect().width;
            // if(largeurFen < 768){
            //     $('header ul.nav.navbar-nav').removeClass('show');
                
            // }
            
        }
        else{
            jQuery('.goto-top').css({
                bottom : '-100px'
            });
        }
    });
    
    /**
    * Descendre d'une bonne hauteur la barre de défilement
    * dans le cas où on clique sur un item du ménu déroulant dans la partie main
    */
    $('.menu a').click(function(e){
        e.preventDefault();
        let hashpos = this.href.search('#');
        if(hashpos !== -1){
            let targetID = this.href.slice(hashpos);
            let topDistance = document.querySelector(targetID).getBoundingClientRect().top;
            let headerHeight = document.querySelector('header').getBoundingClientRect().height;

            // compute the final distance
            let finalDistance = topDistance - headerHeight - 10;
            // animer l'effet
            $('html, body').animate({scrollTop : finalDistance }, 'slow');

        }
    });


    /**
     * Pour la galérie, au clic sur une des images, déclencher l'ouverture d'une fenêtre modale
     * mais avant l'ouverture de la fenêtre, y charger l'image qui devra être afficher
     */
    $('.card a').on('click', function(){
        let fenetre = $('#fenetreAffichage');
        // déclencher l'ouverture du modal en lui passant le déclencheur
        fenetre.modal('show', this);
    });

    $("#fenetreAffichage").on('show.bs.modal', function(e){
        // le card (container de l'image)
        let card = $(e.relatedTarget).parent();

        // récupérer la source de l'image
        let src = $(card).find('img').attr('src');

        // récuperer le titre de l'image
        let title = $(card).find('.card-text').text();

        // construire la fenetre
        $(this).find('.modal-title').text(title);
        let img = "<img src='" + src + "' width='95%'>";
        $(this).find('.modal-body').html(img);
    });


    /**
     * Page actualité
     * Au déballage, masquer les autres sujets
     */
    $('.btn-deployer').click(function(e){
        
    })

    $('.article-content').on('show.bs.collapse', function(){
        let parent = $(this).parent();
        $(parent).find('.btn-deployer i').removeClass('fa-angles-down').addClass('fa-angles-up');
        
        $(parent).addClass('current');
        console.log(parent);

        // sélectionner les articles qui sont marqués .current
        let siblings = $(parent).siblings();
        $(siblings).removeClass('current');
    });
    
    $('.article-content').on('hide.bs.collapse', function(){
        let parent = $(this).parent();
        $(parent).find('.btn-deployer i').removeClass('fa-angles-up').addClass('fa-angles-down');
        $(parent).removeClass('current');
    });

    /**
     * Page actualité
     * actualiser la date du jour
     * 
     */
    let actualiser = function(){
        let date = $('#dateActuelle .date');
        let heure = $('#dateActuelle .heure');

        let today = new Date();
        let day = today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate(),
            month = today.getMonth() < 10 ? ('0' + today.getMonth()) : today.getMonth(),
            hours = today.getHours() < 10 ? ('0' + today.getHours()) : today.getHours(),
            mins = today.getMinutes() < 10 ? ('0' + today.getMinutes()) : today.getMinutes(),
            secs = today.getSeconds() < 10 ? ('0' + today.getSeconds()) : today.getSeconds();
        date.text(day + '/' +
                  month + '/' +
                  today.getFullYear());
        heure.text(hours + ':' +
                   mins + ':' + 
                   secs);
    }
    actualiser();
    setInterval(actualiser, 1000);
})(jQuery)
