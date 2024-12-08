import React, { useEffect } from "react";

const Home = ()=>{

    useEffect(()=>{
        console.log();
    }, []);
    return(
        <>
            <h1>This is home page</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3761015.0123155075!2d80.29351184999997!3d22.
            991946303161395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1707119741458!5m2!1sen!2sin" width="600"
             height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="unique"></iframe>
        </>
    )
}

export default Home;