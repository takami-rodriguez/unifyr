import { useState, useCallback, useEffect } from "react"
import { EmblaCarouselType } from 'embla-carousel'


type UseTabButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onTabsButtonClick: (index: number) => void
  }
  
export const useTabButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
  ): UseTabButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  
    const onTabsButtonClick = useCallback(
      (index: number) => {
        console.log(emblaApi, index)
        if (!emblaApi) return
        emblaApi.scrollTo(index)
        if (onButtonClick) onButtonClick(emblaApi)
      },
      [emblaApi, onButtonClick]
    )
  
    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
    }, [])
  
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])
  
    useEffect(() => {
      if (!emblaApi) return
  
      onInit(emblaApi)
      onSelect(emblaApi)
      emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])
  
    return {
      selectedIndex,
      scrollSnaps,
      onTabsButtonClick
    }
  }