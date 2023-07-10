import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/constants/server";
//user should have picked a event from a list of events in previous page
//Maybe separate into two pages, one for picking restaurants, one for timeslots
 async function handleVote(e) {
    try{
        const data = new FormData(e.target);
        let obj = {};
        obj.pid = data.getAll("pid");
        obj.timeslot = data.getAll("timeslot");
        obj.uid = "1234"; //user id
        obj.eid = "1234"; //event id
        await axios({
            method: 'post',
            url: server.url + "/vote",
            data: obj
        });   
        console.log(server.url + "/vote",);
    }   
    catch (e) {
        console.log(e);
    }
}

export default function Voting() {
    const [place_candidates, setPlaceCandidates] = useState([]);
    const [time_candidates, setTimeCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    //request list of restaurants from backend
    useEffect(() => {
        async function retrieveRestaurantInfo() {
        setLoading(true);
            try {
                await axios({
                    method: 'get',
                    url: server.url + "/vote/place_candidates"
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

    //request list of timeslots from backend
    useEffect(() => {
        async function retrieveTimeInfo() {
            try {
                setLoading(true);
                await axios({
                    method: 'get',
                    url: server.url + "/vote/time_candidates"
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
    //allow user to vote for a restaurant
    //allow user to vote for a time slot
    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <form onSubmit={handleVote}>
                {place_candidates.map((place) => (
                    <li key={crypto.randomUUID()}>
                        <label>{place.name}</label>
                        <input type="checkbox" value={place.pid} name="pid" ></input>
                        <br/>
                    </li>
                ))}
                {time_candidates.map((timeslot) => (
                    <li key={crypto.randomUUID()}>
                        <label>{timeslot}</label>
                        <input type="checkbox" value={timeslot} name="timeslot" ></input>
                        <br/>
                </li>
                ))}
                <button>Submit</button>
            </form>
        </div>


    );
}