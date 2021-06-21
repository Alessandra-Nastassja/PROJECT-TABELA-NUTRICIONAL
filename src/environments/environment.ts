// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  tacoFoods: 'https://taco-food-api.herokuapp.com/api/v1',

  firebase: {
    apiKey: 'AIzaSyASrySt_1JyoXo12bAg7HLCVQFxKPybKao',
    authDomain: 'natuveggie-99cae.firebaseapp.com',
    databaseURL: 'https://natuveggie-99cae.firebaseio.com',
    projectId: 'natuveggie-99cae',
    storageBucket: 'natuveggie-99cae.appspot.com',
    messagingSenderId: '590146066318',
    appId: '1:590146066318:web:6aa85546a39731aed836df',
    measurementId: 'G-2CXK2H4PMT'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
