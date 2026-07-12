import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://open-cod-135008.upstash.io',
  token: 'gQAAAAAAAg9gAAIgcDIxYjJjMTUwNDA0Y2Y0YzUxODk1Yzg5Yjg3YTZhOWU2Mg',
})


export default redis