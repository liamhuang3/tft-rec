import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 1600, perMilliseconds: 60000 })
const apiKey = process.env.REACT_APP_RIOT_API_KEY;

export function getSummoners() {
    // get the summoner names from challenger and grandmaster
    (async () => {
        const challengerResponse = await http.get('https://na1.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=' + apiKey)
        console.log(challengerResponse.data)
        const challengerSummoners = challengerResponse.data['entries'].map(obj => obj['summonerName']);
        console.log(challengerSummoners)

        const gmResponse= await http.get('https://na1.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=' + apiKey)
        const gmSummoners = gmResponse.data['entries'].map(obj => obj['summonerName']);

        return challengerSummoners.concat(gmSummoners)
    })()
}

function getPuuids(summonerNames = []) {
    let puuids = []

    for (let i = 0; i < summonerNames.length; i++){
        (async () => {
            const summInfo = await http.get('https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + summonerNames[i] + '?api_key=' + apiKey)
            puuids.push(summInfo['puuid'])
        })()
    }

    return puuids
}

export function getMatchIDs(puuids = []){
    //u can get match ids from the summoners
    let startTime = new Date("2023-11-21").valueOf()
    for (let i = 0; i < puuids.length; i++){
        (async () => {
            const summInfo = await http.get('https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + '?api_key=' + apiKey)
            puuids.push(summInfo['puuid'])
        })()
    }
}

function getMatchData(){

}

function getStats(){
    // store units and items as a comp
}