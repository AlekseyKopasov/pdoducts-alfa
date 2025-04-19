import { useEffect } from 'react'

export const useInfiniteScroll = (loadMore: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])
}