import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 100, perMilliseconds: 120000 })
const http2 = rateLimit(axios.create(), { maxRequests: 600, perMilliseconds: 10000 })
const apiKey = process.env.REACT_APP_RIOT_API_KEY;

async function getSummoners() {
    // RATE LIMIT FOR API IS 100 PER 2 MINUTES...
    // get the summoner names from challenger and grandmaster
    const challengerResponse = await http.get('https://na1.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=' + apiKey)
    const challengerSummoners = challengerResponse.data['entries'].map(obj => obj['summonerName']);

    // const gmResponse= await http.get('https://na1.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=' + apiKey)
    // const gmSummoners = gmResponse.data['entries'].map(obj => obj['summonerName']);

    return challengerSummoners   // .concat(gmSummoners)
}

async function getPuuids(summonerNames = []) {
    // limit 20
    let puuids = []

    console.log(summonerNames)
    for (let i = 0; i < Math.min(20, summonerNames.length); i++){
        const summInfo = await http.get('https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/' + summonerNames[i] + '?api_key=' + apiKey)
        console.log(summInfo.data)
        puuids.push(summInfo.data['puuid'])
    }
    console.log(puuids)
    return puuids
}

async function getMatchIds(puuids = []){
    //limit 20... its GGs
    //u can get match ids from the summoners
    let startTime = (new Date("2023-11-21").valueOf()) / 1000
    let matchIds = []

    for (let i = 0; i < puuids.length; i++){
        const matchId = await http2.get('https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/' + puuids[i] + '/ids?start=0&startTime=' + startTime + '&count=1&api_key=' + apiKey)
        matchIds = matchIds.concat(matchId.data)
    }

    console.log(matchIds)
    return matchIds
}

async function getMatchData(matchIds = []){
    // only get the first place?
    // how do i get the comps?
    let matchDatas = []

    for (let i = 0; i < matchIds.length; i++){
        const matchData = await http2.get('https://americas.api.riotgames.com/tft/match/v1/matches/' + matchIds[i] + '?api_key=' + apiKey)
        matchDatas = matchDatas.concat(matchData.info)
    }

    return matchDatas
}

export async function getStats(){
    // store units and items as a comp
    const summoners = await getSummoners()
    const puuids = await getPuuids(summoners)
    const matchIds = await getMatchIds(puuids)
    const matchDatas = await getMatchData(matchIds)

    
}