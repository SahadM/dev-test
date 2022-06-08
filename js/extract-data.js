class ExtractData{

    constructor () {
        // url ressource
        this.url = 'https://covid19.mathdro.id/api';
        
        // format numbers
        this.intl = new Intl.NumberFormat();

        // methods
        this.getNumberOfConfirmedCase();
        this.getPicturesResensedCases();

        // event update data on click
        $('.maj').on('click', (e) => {
            e.preventDefault();
            
            let type_maj = $(e.currentTarget).data('type');
            switch (type_maj) {
                case 'monde':
                    this.getNumberOfConfirmedCase();
                break;
                case 'france':
                    this.getNumberOfConfirmedCase('FR');
                    break;
                default:
                    this.getPicturesResensedCases();
                    break;
            }   
            
        });
    }

    getNumberOfConfirmedCase (country = 'FR') {
        let _self = this;
        
        $.get(_self.url + '/confirmed', (response) => {
            // get data
            let data = response || []; 
            let number_case = 0, number_case_fr = 0;
            data.forEach((field) => {
                if (field.iso2 === 'FR') {
                    number_case_fr = parseInt(field.confirmed);
                    if (country === 'FR')
                        return false;
                } else {
                    number_case += parseInt(field.confirmed);
                }                
            });
            // display
            $('#france').html(`Il y a <strong>${_self.intl.format(number_case_fr)}</strong> cas`);
            $('#monde').html(`Il y a <strong>${_self.intl.format(number_case)}</strong> cas`);

        }).fail((err) => {
            console.error('Attention : Pas de données disponible, e :', err);
        });

    }

    getPicturesResensedCases () {
        let _self = this;

        $.get(_self.url + '/og', (response) => {
            let picture = response || '';          
            $('#resenses').html(picture);
            // NOTE : Récupérer l'image via ajax et ré-injecter dans une balise <img>

        }, 'blob').fail((err) => {
            console.error('Attention : Pas de données disponible !, e :', err);
        });
    }

}

