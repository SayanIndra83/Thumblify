import { Client } from "@upstash/qstash"

const client = new Client({
//   baseUrl: "https://qstash-eu-central-1.upstash.io",
//   token: "eyJVc2VySUQiOiJhOTRjZDQzMS0yOWFiLTRkMGUtYjdkNy05YzY4M2E3Njk0Y2MiLCJQYXNzd29yZCI6ImU1OGVhY2Q5ODkyZjQzY2NiMzY4NjNmNzYwODA0NTJhIn0=",


 baseUrl: "http://localhost:8080",
  token: "eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=",
})

export default client