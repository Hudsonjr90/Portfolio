const GOOGLE_NEWS_RSS_BASE = 'https://news.google.com/rss/search'

const decodeEntities = (value = '') => {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

const extractTag = (xmlChunk, tagName) => {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = xmlChunk.match(regex)
  if (!match) {
    return ''
  }

  return decodeEntities(match[1].replace('<![CDATA[', '').replace(']]>', '').trim())
}

const parseRssItems = (xmlContent) => {
  const itemMatches = xmlContent.match(/<item>[\s\S]*?<\/item>/gi) || []

  const extractImage = (html = '') => {
    const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i)
    return imgMatch ? decodeEntities(imgMatch[1]) : ''
  }

  return itemMatches.map((itemXml) => ({
    title: extractTag(itemXml, 'title'),
    link: extractTag(itemXml, 'link'),
    description: extractTag(itemXml, 'description'),
    pubDate: extractTag(itemXml, 'pubDate'),
    image: extractImage(extractTag(itemXml, 'description')),
  }))
}

export default async function handler(req, res) {
  const query = typeof req.query.q === 'string' && req.query.q.trim()
    ? req.query.q.trim()
    : 'tecnologia OR desenvolvimento OR software OR IA OR programacao'

  const requestedLimit = Number(req.query.limit)
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(30, Math.max(3, Math.floor(requestedLimit)))
    : 14

  try {
    const rssUrl = `${GOOGLE_NEWS_RSS_BASE}?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
    const response = await fetch(rssUrl)

    if (!response.ok) {
      return res.status(502).json({
        error: `Google News RSS unavailable (${response.status})`,
      })
    }

    const xmlPayload = await response.text()
    const parsedItems = parseRssItems(xmlPayload).slice(0, limit)

    return res.status(200).json({
      query,
      count: parsedItems.length,
      items: parsedItems,
    })
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown Google RSS error',
    })
  }
}