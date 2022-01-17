import { Component } from "react";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            bio: "",
            bioEditMode: false,
        };

        this.updateBio = this.updateBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.bioEditToggle = this.bioEditToggle.bind(this);
    }

    ComponentDidMount() {
        console.log("BioEditor Component mounted");
        console.log("props in BioEditor", this.props.bio);
    }

    bioEditToggle() {
        console.log("bio edit was clicked");
        this.setState({
            bioEditMode: !this.state.bioEditMode,
        });
    }

    handleChange({ target }) {
        console.log("input value changed");
        console.log("value typed:", target.value);
        console.log("name of target:", target.name);
        //to update state we use this.setState and pass to it an object with our state changes
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("handleChange update done:", this.state)
        );
    }
    //create function hanglechange(). this fun needs to change state login.js
    updateBio(e) {
        e.preventDefault();
        console.log("user wants to save bio", this.state);
        fetch("/bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("response data from /bio.json:", data);
                this.props.updateProfileBio(data.bio);
            });
        this.bioEditToggle();
    }

    render() {
        if (!this.state.bioEditMode) {
            return (
                <>
                    <h2 className="bio-text">{this.props.bio}</h2>
                    <h1 onClick={this.bioEditToggle}>
                        {this.props.bio ? "edit" : "add bio"}
                    </h1>
                </>
            );
        } else {
            return (
                <>
                    <div>
                        <textarea
                            onChange={this.handleChange}
                            id="bioText"
                            name="bio"
                            rows="6"
                            cols="50"
                            placeholder={this.props.bio}
                            defaultValue={this.props.bio}
                        ></textarea>
                        <div>
                            <button onClick={this.updateBio}>Save</button>
                        </div>
                    </div>
                </>
            );
        }
    }
}
