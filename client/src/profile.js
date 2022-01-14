import BioEditor from "./bioEditor";
import ProfilePic from "./profilePic";

export default function Profile({
    first,
    last,
    imageUrl,
    toggleUploader,
    loggerFunc,
    bio,
    updateBio,
    updateProfileBio,
}) {
    console.log("props in Profile:", first, last, bio);

    return (
        <>
            <form className="bio_editor">
                <ProfilePic
                    imageUrl={imageUrl}
                    toggleUploader={toggleUploader}
                    loggerFunc={loggerFunc}
                />

                <BioEditor
                    bio={bio}
                    updateBio={updateBio}
                    first={first}
                    last={last}
                    toggleUploader={toggleUploader}
                    loggerFunc={loggerFunc}
                    updateProfileBio={updateProfileBio}
                />
            </form>
        </>
    );
}
