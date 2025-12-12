import React from 'react'

const Home = () => {
    return (
        <div
            className="flex h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url("https://images.alphacoders.com/139/1398863.jpg")` }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/80"></div>
        </div>
    )
}

export default Home