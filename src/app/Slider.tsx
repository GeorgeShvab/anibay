import { Anime } from '@/types'
import { FC } from 'react'
import SlickSlider from 'react-slick'
import Card from './Card'

interface Props {
  data: Anime[]
}

const Slider: FC<Props> = ({ data }) => {
  return (
    <SlickSlider>
      <Slider {...settings}>
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </Slider>
    </SlickSlider>
  )
}

export default Slider
