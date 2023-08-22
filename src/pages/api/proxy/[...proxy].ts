import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { NextFunction, Request, Response } from 'express'

const proxy = (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
  try {
    const url = req.url?.replaceAll(/https:\/\/|http:\/\//gi, '').split(/\/|\\/)

    if (!url) {
      return res.status(400).json({ msg: 'No url' })
    }

    createProxyMiddleware({
      target: `https://${url[4]}`,
      changeOrigin: true,
      pathRewrite: (path, req) => url.slice(5, url.length).join('/'),
      onProxyRes: (res) => (res.headers['access-control-allow-origin'] = '*'),
    })(req as unknown as Request, res as unknown as Response, next)
  } catch (e) {
    return res.status(500).json({ msg: 'Server Error' })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default proxy
