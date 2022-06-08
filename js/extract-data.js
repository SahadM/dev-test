class ExtractData{

    constructor () {
        this.url = 'https://covid19.mathdro.id/api';

        this.intl = new Intl.NumberFormat();

        this.getNumberOfConfirmedCase();
        this.getPicturesResensedCases();

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
        $.get(this.url + '/confirmed', (response) => {
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
            $('#france').html(`Il y a <strong>${this.intl.format(number_case_fr)}</strong> cas`);
            $('#monde').html(`Il y a <strong>${this.intl.format(number_case)}</strong> cas`);

        }).fail((err) => {
            console.error('Attention : Pas de données disponible !')
        });

    }

    getPicturesResensedCases () {
        $.ajax(this.url + '/og', (response) => {
            let pictures = response || '';
            $('#resenses').text(pictures);
        }, 'html').fail((err) => {
            console.error('Attention : Pas de données disponible !')
        });


    }

}

