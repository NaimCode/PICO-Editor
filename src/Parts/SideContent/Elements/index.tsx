import React from 'react'
import SideContent from '..'

import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Outlet } from 'react-router-dom'

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch('C8MOnqzxJ9mcZ0jUBAmY9TNSRNv5dv8e')

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 })
const textAnime=  (offset: number)=>gf.animate('some text to animate!', { limit: 5 })
// Render the React Component and pass it your fetchGifs as a prop

const Elements = () => {
  return (
    <SideContent>
        <Outlet/>
       {/* <Grid className='overflow-y-scroll' width={300} columns={2} fetchGifs={textAnime} /> */}

    </SideContent>
  )
}

export default Elements

