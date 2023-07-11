import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/constants/server";
//user should have picked a event from a list of events in previous page
//Maybe separate into two pages, one for picking restaurants, one for timeslots
const uid = "uid2"; //user id for testing
const eid = "1"; //event id for testing
 async function handleVote(e) {
    try{
        const data = new FormData(e.target);
        let obj = {};
        obj.place_candidates_id = data.getAll("place_candidates_id");
        obj.time_candidates_id = data.getAll("time_candidates_id");
        obj.uid = uid; //user id
        obj.eid = eid; //event id
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

    //request list of timeslots from backend
    useEffect(() => {
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
    //allow user to vote for a restaurant
    //allow user to vote for a time slot
    if (loading) {
        return <div>loading...</div>
    }

    return (
        <>
            <form onSubmit={handleVote} className="text-center">
                <div className="d-flex justify-content-around" >
                    <div>
                        <h2>Restaurants</h2>
                        {place_candidates.map((place) => (
                            <li key={crypto.randomUUID()}>
                                <label>{place.name}</label>
                                <input type="checkbox" value={place.place_candidates_id} name="place_candidates_id" ></input>
                                <br/>
                            </li>
                        ))}
                    </div>
                    <div>
                        <h2>Timeslots</h2>
                        {time_candidates.map((timeslot) => (
                            <li key={crypto.randomUUID()}>
                                <label>{timeslot.timeslot}</label>
                                <input type="checkbox" value={timeslot.time_candidates_id} name="time_candidates_id" ></input>
                                <br/>
                        </li>
                        ))}
                    </div>

                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </>


    );
}