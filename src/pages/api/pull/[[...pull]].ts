import axios from 'axios'
import { Get, Param, Query, SetHeader, createHandler } from 'next-api-decorators'
import prisma from '../../../../prisma/prisma'
import fs from 'fs'

interface SearchResults {
  currentPage: number
  hasNextPage: boolean
  results: SearchResult[]
}

interface SearchResult {
  id: string
  anilistId: number
  malId: number
  title: string
  image: string
  cover: string
  releaseDate: number
  description: string
  genres: string[]
  rating: number
  status: string
  mappings: {
    mal: number
    anidb: number
    kitsu: number
    anilist: number
    thetvdb: number
    anisearch: number
    livechart: number
    'notify.moe': string
    'anime-planet': string
  }
  type: string
}

interface Episode {
  id: string
  number: 26
  title: string
}

interface Anime {
  id: string
  title: string
  anilistId: number
  malId: number
  image: string
  cover: string
  season: string
  releaseDate: number
  duration: number
  popularity: number
  description: string
  genres: string[]
  rating: number
  status: string
  synonyms: string[]
  mappings: {
    mal: number
    anidb: number
    kitsu: number
    anilist: number
    thetvdb: number
    anisearch: number
    livechart: number
    'notify.moe': string
    'anime-planet': string
  }
  type: string
  episodes: Episode[]
}

interface EpisodesResult {
  headers: {
    Referer: 'https://gotaku1.com/streaming.php?id=MTI5NTky&title=Kimetsu+no+Yaiba+Episode+25'
  }
  sources: [
    {
      url: 'https://www023.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.25.1677647864.360.m3u8'
      isM3U8: true
      quality: '360p'
    },
    {
      url: 'https://www023.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.25.1677647864.480.m3u8'
      isM3U8: true
      quality: '480p'
    },
    {
      url: 'https://www023.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.25.1677647864.720.m3u8'
      isM3U8: true
      quality: '720p'
    },
    {
      url: 'https://www023.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.25.1677647864.1080.m3u8'
      isM3U8: true
      quality: '1080p'
    },
    {
      url: 'https://www023.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.25.1677647864.m3u8'
      isM3U8: true
      quality: 'default'
    }
  ]
}

const fetchAnime = async (id: string) => (await axios.get<Anime>(`http://0.0.0.0:3500/anime/enime/info?id=${id}`)).data

const search = async (query: string, page: number) =>
  (await axios.get<SearchResults>(`http://0.0.0.0:3500/anime/enime/${query}?page=${page}`)).data

const fetchEpisode = async (id: string) =>
  (await axios.get<EpisodesResult>(`http://0.0.0.0:3500/anime/enime/watch?episodeId=${id}`)).data

@SetHeader('Keep-Alive', 'timeout=3600, max=36000')
class PullAnime {
  @Get('/search/:query')
  async pullBySearch(@Param('query') query: string) {
    //let hasNextPage = true

    //let i = 1

    //while (hasNextPage) {
    const data = await search(query, 1)

    for (let result of data.results) {
      try {
        const anime = await fetchAnime(result.id)

        for (let genre of anime.genres) {
          try {
            const data = await prisma.genre.upsert({
              where: { id: genre.toLowerCase() },
              create: { id: genre.toLowerCase(), title: genre },
              update: {},
            })
            console.log(`Genre ${genre} created or upserted`)
          } catch (e) {
            console.log(e)
            console.log(`Error during cretion of genre ${genre}`)
            fs.appendFile(
              './logs.txt',
              `Error during cretion of genre ${genre} ${new Date().toISOString()}\n`,
              function (err) {
                if (err) throw err
              }
            )
          }
        }

        try {
          const data = await prisma.anime.upsert({
            where: { id: anime.id },
            create: {
              id: anime.id,
              title: anime.title,
              anilistId: anime.anilistId,
              malId: anime.malId,
              image: anime.image,
              cover: anime.cover,
              season: anime.season,
              releaseDate: anime.releaseDate,
              duration: anime.duration,
              popularity: anime.popularity,
              description: anime.description,
              rating: anime.rating,
              status: anime.status,
              synonyms: anime.synonyms,
              mappings: anime.mappings,
              type: anime.type,
              totalEpisodes: anime.episodes.length,
              views: 0,
              genres: {
                connect: anime.genres.map((genre) => ({ id: genre.toLowerCase() })),
              },
            },
            update: {},
          })

          console.log(`Anime ${data.id} ${data.title} created or upserted`)

          let tries = 0

          for (let j = 0; j < anime.episodes.length; j++) {
            const episode = anime.episodes[j]

            try {
              const data = await fetchEpisode(episode.id)

              console.log(episode.id, episode.title, episode.number, j)

              const ep = await prisma.episode.upsert({
                where: { id: episode.id },
                create: {
                  sources: data.sources,
                  id: episode.id,
                  number: episode.number,
                  animeId: anime.id,
                  title: episode.title,
                },
                update: {},
              })

              //console.log(`Episode ${ep.id} ${ep.title} created or upserted`)
            } catch (e) {
              tries++

              if (tries > 3) {
                tries = 0
                console.log(e)
                console.log(`Error during creation of episode ${episode.id} ${episode.title}`)
                fs.appendFile(
                  './logs.txt',
                  `Error during creation of episode ${episode.id} ${episode.title} ${new Date().toISOString()}\n`,
                  function (err) {
                    if (err) throw err
                  }
                )
              } else {
                j = j - 1
              }
            }
          }
        } catch (e) {
          console.log(e)
          console.log(`Error during creation anime ${anime.id}`)
          fs.appendFile(
            './logs.txt',
            `Error during creation anime ${anime.id} ${new Date().toISOString()}\n`,
            function (err) {
              if (err) throw err
            }
          )
        }
      } catch (e) {
        console.log(e)
        console.log(`Error during fetching anime ${result.id}`)
        fs.appendFile(
          './logs.txt',
          `Error during fetching anime ${result.id} ${new Date().toISOString()}\n`,
          function (err) {
            if (err) throw err
          }
        )
      }
    }

    //hasNextPage = data.hasNextPage

    //i++
    //}

    console.log(`All ${data.results.length} anime have been inserted in the database`)

    return `All ${data.results.length} anime have been inserted in the database`
  }

  @Get('/:id')
  async pullById(@Param('id') id: string) {
    try {
      const anime = await fetchAnime(id)

      for (let genre of anime.genres) {
        try {
          const data = await prisma.genre.upsert({
            where: { id: genre.toLowerCase() },
            create: { id: genre.toLowerCase(), title: genre },
            update: {},
          })
          console.log(`Genre ${genre} created or upserted`)
        } catch (e) {
          console.log(e)
          console.log(`Error during cretion of genre ${genre}`)
          fs.appendFile(
            './logs.txt',
            `Error during cretion of genre ${genre} ${new Date().toISOString()}\n`,
            function (err) {
              if (err) throw err
            }
          )
        }
      }

      try {
        const data = await prisma.anime.upsert({
          where: { id: anime.id },
          create: {
            id: anime.id,
            title: anime.title,
            anilistId: anime.anilistId,
            malId: anime.malId,
            image: anime.image,
            cover: anime.cover,
            season: anime.season,
            releaseDate: anime.releaseDate,
            duration: anime.duration,
            popularity: anime.popularity,
            description: anime.description,
            rating: anime.rating,
            status: anime.status,
            synonyms: anime.synonyms,
            mappings: anime.mappings,
            type: anime.type,
            totalEpisodes: anime.episodes.length,
            views: 0,
            genres: {
              connect: anime.genres.map((genre) => ({ id: genre.toLowerCase() })),
            },
          },
          update: {},
        })

        console.log(`Anime ${data.id} ${data.title} created or upserted`)

        let tries = 0

        for (let j = 0; j < anime.episodes.length; j++) {
          const episode = anime.episodes[j]

          try {
            const data = await fetchEpisode(episode.id)

            console.log(episode.id, episode.title, episode.number, j)

            const ep = await prisma.episode.upsert({
              where: { id: episode.id },
              create: {
                sources: data.sources,
                id: episode.id,
                number: episode.number,
                animeId: anime.id,
                title: episode.title,
              },
              update: {},
            })

            //console.log(`Episode ${ep.id} ${ep.title} created or upserted`)
          } catch (e) {
            tries++

            if (tries > 3) {
              tries = 0
              console.log(e)
              console.log(`Error during creation of episode ${episode.id} ${episode.title}`)
              fs.appendFile(
                './logs.txt',
                `Error during creation of episode ${episode.id} ${episode.title} ${new Date().toISOString()}\n`,
                function (err) {
                  if (err) throw err
                }
              )
            } else {
              j = j - 1
            }
          }
        }
      } catch (e) {
        console.log(e)
        console.log(`Error during creation anime ${id}`)
        fs.appendFile('./logs.txt', `Error during creation anime ${id} ${new Date().toISOString()}\n`, function (err) {
          if (err) throw err
        })
      }

      console.log(`${anime.id} ${anime.title} has been inserted in the database`)

      return `${anime.id} ${anime.title} has been inserted in the database`
    } catch (e) {
      console.log(e)
      console.log(`Error during fetching anime ${id}`)
      fs.appendFile('./logs.txt', `Error during fetching anime ${id} ${new Date().toISOString()}\n`, function (err) {
        if (err) throw err
      })
    }
  }
}

export default createHandler(PullAnime)
