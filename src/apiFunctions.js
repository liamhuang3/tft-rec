import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 1600, perMilliseconds: 60000 })
const apiKey = process.env.REACT_APP_RIOT_API_KEY;

async function getSummoners() {
    // get the summoner names from challenger and grandmaster
    const challengerResponse = await http.get('https://na1.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=' + apiKey)
    console.log(challengerResponse.data)
    const challengerSummoners = challengerResponse.data['entries'].map(obj => obj['summonerName']);
    console.log(challengerSummoners)

    const gmResponse= await http.get('https://na1.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=' + apiKey)
    const gmSummoners = gmResponse.data['entries'].map(obj => obj['summonerName']);

    return challengerSummoners.concat(gmSummoners)
}

async function getPuuids(summonerNames = []) {
    let puuids = []

    console.log(summonerNames)
    for (let i = 0; i < summonerNames.length; i++){
        const summInfo = await http.get('https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + summonerNames[i] + '?api_key=' + apiKey)
        puuids.push(summInfo.data['puuid'])
    }
    console.log(puuids)
    return puuids
}

async function getMatchIds(puuids = []){
    //u can get match ids from the summoners
    let startTime = (new Date("2023-11-21").valueOf()) / 1000
    let matchIds = []

    for (let i = 0; i < puuids.length; i++){
        const matchId = await http.get('https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/' + puuids[i] + '/ids?start=0&startTime=' + startTime + '&count=20&api_key=' + apiKey)
        matchIds = matchIds.concat(matchId.data)
    }

    console.log(matchIds)
    return matchIds
}

function getMatchData(){
    // only get the first place?
    // how do i get the comps?
}

export async function getStats(){
    // store units and items as a comp
    const summoners = await getSummoners()
    const puuids = await getPuuids(summoners)
    const matchIds = await getMatchIds(puuids)
}