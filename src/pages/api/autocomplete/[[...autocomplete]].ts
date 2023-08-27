import AnimeService from '@/services/AnimeService'
import { Get, Query, SetHeader, createHandler } from 'next-api-decorators'

class AutocompleteController {
  @Get('/search')
  @SetHeader('Access-Control-Allow-Origin', '*')
  async getAnimeAutocomplete(@Query() { query }: { query: string }) {
    if (!query) return []

    const data = await AnimeService.search({ query })

    return data.data
  }
}

export default createHandler(AutocompleteController)
