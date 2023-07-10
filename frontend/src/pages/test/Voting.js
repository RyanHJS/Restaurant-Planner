import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/constants/server";
//user should have picked a event from a list of events in previous page

//psedodata
const restaurants = [{name: "restaurant1", pid:1}, {name: "restaurant2", pid:2}, {name: "restaurant3", pid:3}];
const timeslots = ["timeslot1", "timeslot2", "timeslot3"];

 async function handleVote(e) {
      //send vote to backend
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
      
}   


export default function Voting() {
    //allow user to vote for a restaurant
    //allow user to vote for a time slot
    return (
        <form onSubmit={handleVote}>
            {restaurants.map((restaurant) => (
                <li key={crypto.randomUUID()}>
                    <label>{restaurant.name}</label>
                    <input type="checkbox" value={restaurant.pid} name="pid" ></input>
                    <br/>
                </li>
            ))}
            {timeslots.map((timeslot) => (
                <li key={crypto.randomUUID()}>
                    <label>{timeslot}</label>
                    <input type="checkbox" value={timeslot} name="timeslot" ></input>
                    <br/>
                </li>
                ))}
        <button>Submit</button>
        </form>

    );
}