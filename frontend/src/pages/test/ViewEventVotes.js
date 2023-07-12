import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/constants/server";

export default function ViewEventVotes({eid}) {
    const [place_candidates, setPlaceCandidates] = useState([]);
    const [time_candidates, setTimeCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    //Copied from Voting.js, need to refactor
    useEffect(() => {
        async function retrieveRestaurantInfo() {
        setLoading(true);
            try {
                await axios({
                    method: 'get',
                    url: server.url + "/vote/place_candidates/"+ eid
                }).then((response) => {
                    setPlaceCandidates(response.data);
                })
            } 
            catch (e) {
                console.log(e);
            }
        }
        retrieveRestaurantInfo();
        setLoading(false);
    }, [])
    useEffect(() => {
        //Todo: refactor into a service
        async function retrieveTimeInfo() {
            try {
                setLoading(true);
                await axios({
                    method: 'get',
                    url: server.url + "/vote/time_candidates/" + eid
                }).then((response) => {
                    setTimeCandidates(response.data);
                });
            } 
            catch (e) {
                console.log(e);
            }
        }
        retrieveTimeInfo();
        setLoading(false);
    }, [])
    return (
        <>
            <h2>Event {eid} Votes</h2>
            <div>
                <table>
                    <tr>
                        <th>Restaurants</th>
                        <th>Votes</th>
                    </tr>
                    {place_candidates.map((place_candidate) => (
                        <tr>
                            <td>{place_candidate.name}</td>
                            <td>{retrievePlaceVote(place_candidate.place_candidates_id)}</td>
                        </tr>
                    ))}
                </table>
                <table>
                    <tr>
                        <th>time_candidates</th>
                        <th>Votes</th>
                    </tr>
                    {time_candidates.map((time_candidate) => (
                        <tr>
                            <td>{time_candidate.timeslot}</td>
                            <td></td>
                        </tr>
                    ))}
                </table>
            </div>

        </>
    )

     function retrievePlaceVote(id) {
        try {
             axios({
                method: 'get',
                url: server.url + "/vote/count_place_votes/" + id
            }).then((response) => {
                console.log(response.data);
                return <>{response.data.numVotes}</>
            });
        } 
        catch (e) {
            console.log(e);
        }
    }

    async function retrieveTimeInfo() {
        try {
            await axios({
                method: 'get',
                url: server.url + "/vote/time_candidates/" + eid
            }).then((response) => {
                setTimeCandidates(response.data);
            });
        } 
        catch (e) {
            console.log(e);
        }
    }
}