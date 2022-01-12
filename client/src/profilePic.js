export default function ProfilePic({ first, last, imageUrl, loggerFunc }) {
    imageUrl = imageUrl || "default.png";
    //const nameSymbols = "%&$*";
    return (
        <>
            <img
                onClick={loggerFunc}
                src={imageUrl}
                alt={`${first} ${last}`}
                id="navbar-avatar"
            />
        </>
    );
}
