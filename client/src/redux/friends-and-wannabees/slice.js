export function friendsReducer(friendsAndWannabees = null, action) {
    //
    if (action.type === "friends-and-wannabees/recieved") {
        friendsAndWannabees = action.payload.friendsAndWannabees;
        //
    } else if (action.type === "friends-and-wannabees/accept") {
        const newFriendsAndWannabees = friendsAndWannabees.map((friends) => {
            if (friends.id === action.payload.id) {
                return {
                    ...friends,
                    accepted: true,
                };
            }
            return friends;
        });
        return newFriendsAndWannabees;

        //
    } else if (action.type === "friends-and-wannabees/end") {
        const newFriendsAndWannabees = friendsAndWannabees.filter((friends) => {
            return friends.id !== action.payload.id;
        });
        return newFriendsAndWannabees;
    }
    return friendsAndWannabees;
}

export function recieveFriendsAndWannabees(friendsAndWannabees) {
    return {
        type: "friends-and-wannabees/recieved",
        payload: { friendsAndWannabees },
    };
}

export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function DeleteFriend(id) {
    return {
        type: "friends-and-wannabees/end",
        payload: { id },
    };
}
