export default function ProfilePic({
    first,
    last,
    imageUrl,
    loggerFunc,
    navbar,
}) {
    imageUrl = imageUrl || "default.png";

    return (
        <>
            <img
                onClick={() => loggerFunc()}
                src={imageUrl}
                alt={`${first} ${last}`}
                id={`${navbar ? "navbar-avatar" : "pic_image"}`}
            />
        </>
    );
}
