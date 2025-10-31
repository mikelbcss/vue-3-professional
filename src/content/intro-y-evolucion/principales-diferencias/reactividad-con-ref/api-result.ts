export interface ApiResult {
    answer: 'yes' | 'no' | 'maybe';
    force: boolean;
    image: string;
}

const apiResult: ApiResult = {
    answer: 'no',
    force: false,
    image: 'https://yesno.wtf/assets/yes/2.gif',
};

switch (apiResult.answer) {
    case 'yes':
        console.log('La respuesta es sí');
        break;
    case 'no':
        console.log('La respuesta es no');
        break;
    case 'maybe':
        console.log('La respuesta es tal vez');
        break;
}