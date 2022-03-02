const distanceProperties = {
  min: 0,
  max: 400,
  default: 0,
}

const serviceTypes = [
  {id: 0, name: tr('Initial_visit')},
  {id: 1, name: tr('Pet_sitting')},
  {id: 2, name: tr('Pet_walk')},
  {id: 3, name: tr('Pet_transport')},
  {id: 4, name: tr('Pet_treatment')},
  {id: 5, name: tr('Training_dog')},
  {id: 99, name: tr('Bringing_key')},
]

const serviceHours = {
  start: 6,
  end: 22,
  hours: [
    {id: 6, name: '06 h'},
    {id: 7, name: '07 h'},
    {id: 8, name: '08 h'},
    {id: 9, name: '09 h'},
    {id: 10, name: '10 h'},
    {id: 11, name: '11 h'},
    {id: 12, name: '12 h'},
    {id: 13, name: '13 h'},
    {id: 14, name: '14 h'},
    {id: 15, name: '15 h'},
    {id: 16, name: '16 h'},
    {id: 17, name: '17 h'},
    {id: 18, name: '18 h'},
    {id: 19, name: '19 h'},
    {id: 20, name: '20 h'},
    {id: 21, name: '21 h'},
    {id: 22, name: '22 h'},
  ],
  minutes: [
    {id: 0, name: '00 m'},
    {id: 15, name: '15 m'},
    {id: 30, name: '30 m'},
    {id: 45, name: '45 m'},
  ],
}

const pricing = [
  {
    validPeriod: {
      firstDay: new Date('2022-01-01T00:00:00'),
       lastDay: new Date('2023-01-31T23:59:59'),
    },
    highSeason: [
      springBreak = {
        firstDay: new Date('2022-02-19T00:00:00'),
         lastDay: new Date('2022-03-13T23:59:59'),
      },
      summerTime = {
        firstDay: new Date('2022-06-20T00:00:00'),
         lastDay: new Date('2022-09-10T23:59:59'),
      },
      endNewYear = {
        firstDay: new Date('2022-12-20T00:00:00'),
         lastDay: new Date('2023-01-10T23:59:59'),
      },
    ],
    specialDates: {
      '2022': {
        '04': ['15', '16', '17', '18'],        // Pâques
        '05': ['21', '22', '23'],              // Fête des Patriotes
        '06': ['23', '24', '25', '26', '30'],  // St-Jean-Baptiste
        '07': ['01', '02', '03', '04'],        // Fête du Canada
        '09': ['02', '03', '04', '05'],        // Fête du travail
        '10': ['08', '09', '10'],              // Action de grâce
        '12': ['23', '24', '25', '26', '30', '31'],  // Noël
      },
      '2023': {
        '01': ['01', '02', '03'],  // Jour de l'an
      },
    },
    services: {
      0: {  // Initial_visit
        halfHour: {low: 20.00, high: 20.00}, fullHour: {low: 20.00, high: 20.00}, xtraHour:  0.00,
      },
      1: {  // Pet_sitting
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 20.00,
      },
      2: {  // Pet_walk
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 30.00,
      },
      3: {  // Pet_transport
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 20.00,
      },
      4: {  // Pet_treatment
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 30.00,
      },
      5: {  // Training_dog
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 35.00,
      },
      99: {  // Bringing_key
        halfHour: {low:  0.00, high:  0.00}, fullHour: {low:  0.00, high:  0.00}, xtraHour:  0.00,
      },
    },
    transportFee: {
      minimum: 3.20,
      perKm: 0.59,
    },
  },
]
