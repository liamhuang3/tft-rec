import axios from 'axios';
import rateLimit from 'axios-rate-limit';
//import { cp } from 'fs';

const http = rateLimit(axios.create(), { maxRequests: 100, perMilliseconds: 120000 })
const http2 = rateLimit(axios.create(), { maxRequests: 600, perMilliseconds: 10000 })
const apiKey = process.env.REACT_APP_RIOT_API_KEY;

async function getSummoners() {
    // RATE LIMIT FOR API IS 100 PER 2 MINUTES...
    // get the summoner names from challenger and grandmaster
    const challengerResponse = await http.get('https://na1.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=' + apiKey)
    const challengerSummoners = challengerResponse.data['entries'].map(obj => obj['summonerId']);

    // const gmResponse= await http.get('https://na1.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=' + apiKey)
    // const gmSummoners = gmResponse.data['entries'].map(obj => obj['summonerName']);
    return challengerSummoners   // .concat(gmSummoners)
}

async function getPuuids(summonerIds = []) {
    // limit 20
    let puuids = []

    // console.log(summonerIds)
    for (let i = 0; i < Math.min(20, summonerIds.length); i++){
        const summInfo = await http.get('https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/' + summonerIds[i] + '?api_key=' + apiKey)
        puuids.push(summInfo.data[0]['puuid'])
    }
    return puuids
}

async function getMatchIds(puuids = []){
    //limit 20... its GGs
    //u can get match ids from the summoners
    let startTime = (new Date("2023-11-21").valueOf()) / 1000
    let matchIds = []

    for (let i = 0; i < puuids.length; i++){
        const matchId = await http.get('https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/' + puuids[i] + '/ids?start=0&startTime=' + startTime + '&count=1&api_key=' + apiKey)
        matchIds = matchIds.concat(matchId.data)
    }

    return matchIds
}

async function getMatchData(matchIds = []){
    // only get the first place?
    // how do i get the comps?
    let matchDatas = []

    for (let i = 0; i < matchIds.length; i++){
        const matchData = await http.get('https://americas.api.riotgames.com/tft/match/v1/matches/' + matchIds[i] + '?api_key=' + apiKey)
        matchDatas = matchDatas.concat(matchData.data.info)
    }

    return matchDatas
}

export async function getStats(){
    // store units and items as a comp
    const summoners = await getSummoners()
    const puuids = await getPuuids(summoners)
    const matchIds = await getMatchIds(puuids)
    const matchDatas = await getMatchData(matchIds)

    console.log(matchDatas)
    let comps = []
    for (const match of matchDatas) {
        for (let player of match.participants){ //each participant is one comp
            let comp = {
                champions: [],
                items: [],
                augments: [],
                traits: []
            }
            for (const unit of player.units) {
                comp.champions.push(unit.character_id) // add champions to comp
                for (const item of unit.itemNames) {
                    comp.items.push(item) // add item to comp
                }
            }

            for (const augment of player.augments) {
                comp.augments.push(augment) // add augments to comp
            }
            if (player.traits != []) {
                player.traits.sort((a, b) => b.num_units - a.num_units)
                const traits = player.traits.slice(0,2)
                for (const trait of traits){
                    comp.traits.push(trait.name) //this pushes the name only, can change to push entire object if necessary
                }
            }
            comps.push(comp)
        }
    }
    
    return comps
    //bet it works
}

export async function getRecommendations(userInput = [], compArray = []){
    // recommendations = {
    //     items: [],
    //     champions: [],
    //     augments: []
    // }

    // no need to split up items, champs, augments, we just go for total matching
    let numMatching = []

    for (const comp of compArray) {
        let mergedComp = [
            ...comp.champions,
            ...comp.items,
            ...comp.augments,
        ]

        const userInputStrings = userInput.map(item => item.name);
        const matchingCount = userInputStrings.filter(value => mergedComp.includes(value)).length;

        numMatching.push({ index: compArray.indexOf(comp), count: matchingCount });
    }

    numMatching.sort((a, b) => b.count - a.count);

    const topComps = numMatching.slice(0, 3).map(item => compArray[item.index]);
    //can return % matching too
    console.log(topComps)
    return topComps
}