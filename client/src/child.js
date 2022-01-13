import GrandChildComponent from "./grandChild";

export default function ChildComponnet(props) {
    console.log("props in Childcomponent:", props);
    return (
        <>
            <h1>I am child Component</h1>
            <GrandChildComponent />
        </>
    );
}
