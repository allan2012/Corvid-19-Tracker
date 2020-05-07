import React from "react";

export default function PeopleFilter() {
    return <form className="col s12">
        <div className="row">
            <div className="input-field col l2">
                <i className="material-icons prefix">search</i>
                <input id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="input-field col l2">
                <select>
                    <option value="" disabled selected>Health state</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
            <div className="input-field col l2">
                <select>
                    <option value="" disabled selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
            </div>
            <div className="input-field col l2">
                <button className='waves-effect waves-light btn'>Search</button>
            </div>
        </div>
    </form>
}