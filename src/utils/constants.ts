const ergastURL = 'https://ergast.com/api/f1/';
// example URL for raceresults (first places in the year 2017):
// http://ergast.com/api/f1/2017/results/1.json
const raceResultsURL  = '/results/';
// example URL for raceresults (first places in QUALY in 2017):
// http://ergast.com/api/f1/2017/qualifying/1.json
const polePositionURL = '/qualifying/';
// example ULR for WC standings in the year 2017
// http://ergast.com/api/f1/2017/driverStandings.json
const worldChampionURL = '/driverStandings';

// routes
const WQRoute  = 'winnerQuiz';
const PPQRoute = 'polePositionQuiz';
const WCQRoute = 'worldChampionQuiz';

const WQRRoute  = 'winnerQuizResults';
const PPQRRoute = 'polePositionQuizResults';
const WCQRRoute = 'worldChampionQuizResults';

const welcomeRoute = '';
const statisticsRoute = 'statistics';

const winQuestion = 'Which driver won the';
const ppQuestion  = 'Which driver took pole position for the';
const wdcQuestion = 'Which driver won the driver\'s world championship in';

const numberOfQuestions = 5;
const quizYearRange = [1950, 2017];

export { ergastURL, raceResultsURL, polePositionURL, worldChampionURL,
WQRoute, PPQRoute, WCQRoute, WQRRoute, PPQRRoute, WCQRRoute,
welcomeRoute, statisticsRoute,
winQuestion, ppQuestion, wdcQuestion,
numberOfQuestions, quizYearRange };
