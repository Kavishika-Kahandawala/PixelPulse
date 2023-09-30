# PixelPulse

A Dribble clone application I made to learn Next.js and some other

To run Next.js project locally,
`npm run dev`

To run Grafbase locally,
`npx grafbase dev`

To view created projects in Grafbase ,

```query ProjectCollection {
  projectCollection(last: 10) {
    edges {
      node {
        title
        description
      }
    }
  }
}
```
