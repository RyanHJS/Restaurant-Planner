import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/constants/server";
import { auth } from "../../config/firebase";
import { v1 as uuidv1 } from 'uuid';
//user should have picked a event from a list of events in previous page
//Maybe separate into two pages, one for picking restaurants, one for timeslots
 async function handleVote(e) {
    try{
        const data = new FormData(e.target);
        let obj = {};
        obj.place_candidates_id = data.getAll("place_candidates_id")
        obj.time_candidates_id = data.getAll("time_candidates_id")
        obj.uid = data.get("uid") //user id
        obj.eid = data.get("eid") //event id
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

export default function Voting({uid, eid}) {
    const [place_candidates, setPlaceCandidates] = useState([]);
    const [time_candidates, setTimeCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log("uid: " + uid);
    //request list of restaurants from backend
    useEffect(() => {
        async function retrieveRestaurantInfo() {
        setLoading(true);
            try {
                await axios({
                    method: 'get',
                    url: 'https://restaurant-planner-app-image-atze4udsha-uc.a.run.app/api' + "/vote/place_candidates/"+ eid
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
        //Todo: refactor into a service
        async function retrieveTimeInfo() {
            try {
                setLoading(true);
                await axios({
                    method: 'get',
                    url: 'https://restaurant-planner-app-image-atze4udsha-uc.a.run.app/api' + "/vote/time_candidates/" + eid
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
            <h1 className="text-center">This is the voting page for User id {uid} for event id {eid}</h1>
            <form onSubmit={handleVote} className="text-center">
                <div className="d-flex justify-content-around" >
                    <input type="hidden" name="uid" value={uid} />
                    <input type="hidden" name="eid" value={eid} />
                    <div>
                        <h3>Restaurants</h3>
                        {place_candidates.map((place) => (
                            <li key={uuidv1()}>
                                <label>{place.name}</label>
                                <input type="checkbox" value={place.place_candidates_id} name="place_candidates_id" ></input>
                                <br/>
                            </li>
                        ))}
                    </div>
                    <div>
                        <h3>Timeslots</h3>
                        {time_candidates.map((timeslot) => (
                            <li key={uuidv1()}>
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