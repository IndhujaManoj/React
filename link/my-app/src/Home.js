import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <main>
            <h2>Welcome to the homePage</h2>
            <p>You can do this,I belive in you. </p>
        </main>
        <nav>
            <Link to="/about">About</Link>
            <p>welcome to about page</p>
        </nav>
        </>
    )
}

