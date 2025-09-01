import React from 'react'

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-12 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-12">
        {/* Left: Headline and description */}
        <div className="flex flex-col items-center md:items-start md:text-left max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight md:text-right">
            DevDreamer. <br className="md:hidden" />
            Matcha Lover.<br />
            Capy Enerygy.
          </h1>
          <p className="text-gray-500 mb-6 text-base md:text-xl md:text-right">
            Documentation of my career journey, hobbies <br />and interests.
          </p>
        </div>

        {/* Center: Author image */}
        <div className="flex-shrink-0">
          <img
            src="food.jpeg"
            alt="food"
            className="rounded-xl object-cover w-64 h-80 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2"
          />
        </div>

        {/* Right: Author info */}
        <div className="max-w-sm text-left">
          <p className="text-xs text-gray-400 mb-1">–Author</p>
          <h2 className="font-semibold text-lg mb-2">Orathai S.</h2>
          <p className="text-gray-600 mb-4 text-sm">
            I am a to-be-fullstack developer with a creative background in graphic design and marketing. <br /> Diving deep into self-learning andnow exploring backend development with Node.js and MongoDB.
          </p>
          <p className="text-gray-600 text-sm">
             When I’m not coding, I enjoy drawing, playing video games, and sipping matcha or milk tea while dreaming up cool UI ideas.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection