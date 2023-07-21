"use client"

import { useRef } from "react"

const mockData = [
  { title: 'Product Project', image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' },
  { title: 'Engenering', image: "https://images.unsplash.com/photo-1643199319409-84b7066f45b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80" },
  { title: 'Coding', image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80" },
  { title: 'Robotics', image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { title: 'Network', image: "https://plus.unsplash.com/premium_photo-1682145181120-73cfdfc8a36d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { title: 'Hacking', image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
]

export default function Home() {
  const carouselRef = useRef()

  function mouseMove(e) {
    if (carouselRef.current.dataset.mouseDownAt == '0') return;

    const mouseDelta = parseFloat(carouselRef.current.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    let nextPercentage = parseFloat(carouselRef.current.dataset.prevPercentage) + percentage;

    nextPercentage = Math.min(nextPercentage, 0)
    nextPercentage = Math.max(nextPercentage, -75)



    carouselRef.current.dataset.percentage = nextPercentage
    carouselRef.current.animate({
      transform: `translateX(${nextPercentage}%)`

    }, { duration: 800, fill: 'forwards' })

    for (const image of carouselRef.current.getElementsByClassName('image')) {
      image.animate({
        objectPosition: `${nextPercentage + 100}% 50%`
      }, { duration: 800, fill: 'forwards' })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 overflow-hidden " >
      <main className="min-w-max min-h-screen overflow-hidden m-auto grid grid-rows-2 max-h-fit grid-cols-[100vw] place-content-stretch">
        <div className="px-24">

          <aside className=' flex justify-between py-10 m-auto  '>
            <div className='font-sans flex items-end text-4xl text-blue-500'>
              <span>
                Search-er
              </span>
            </div>
            <nav className='flex gap-10 items-end'>
              <a className='hover:underline decoration-blue-500 decoration-2 duration-200' href="/">About</a>
              <a className='hover:underline decoration-blue-500 decoration-2 duration-200' href="/">Pricing</a>
              <a className='hover:underline decoration-blue-500 decoration-2 duration-200' href="/">Contact</a>
            </nav>
          </aside>
          <div >
            <h1 className='text-8xl'>Create and<br />Search</h1>
            <p className='text-zinc-500 ml-2 mt-2'>Create, search and read articles, blogs and research about your categories.</p>
          </div>
        </div>

        <div className='select-none	cursor-grab active:cursor-grabbing relative w-max	pl-24 mt-2'
          id="image-track"
          data-mouse-down-at="0"
          data-prev-percentage="0"
          ref={carouselRef}
          onMouseUp={(e) => {
            carouselRef.current.dataset.mouseDownAt = 0;
            carouselRef.current.dataset.prevPercentage = carouselRef.current.dataset.percentage
          }}
          onMouseDown={(e) =>
            carouselRef.current.dataset.mouseDownAt = e.clientX
          }
          onMouseMove={mouseMove}
          onScroll={() => console.log("scrl")}


        >

          <div className='flex flex-col gap-2 duration-500 hover:underline decoration-blue-500 decoration-2 '>
            <img className="rounded-xl duration-200 image add bg-zinc-300" src="https://cdn3.iconfinder.com/data/icons/zeir-minimalism-1/25/add_new_category_item-1024.png" alt="" draggable="false" />
            <span className='text-zinc-400 text-center'>New Categorie</span>
          </div>
          {mockData.map(data =>

            <div key={data.title} className='flex flex-col gap-2 duration-500 hover:underline decoration-blue-500 decoration-2 '>
              <img className="rounded-xl duration-200 image" src={data.image} alt="" draggable="false" />
              <span className='text-zinc-400 text-center'>{data.title}</span>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
