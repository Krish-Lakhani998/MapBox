# Address Map Viewer

A Next.js application that allows users to enter an address and view it on an interactive Mapbox map.

## Features

- Clean, modern UI with Tailwind CSS
- Interactive address form
- Mapbox GL JS integration for map display
- Responsive design for desktop and mobile
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Mapbox API access token (sign up at [mapbox.com](https://www.mapbox.com/))

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd mapbox-address-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up your Mapbox API token

Create a `.env.local` file in the root of the project and add your Mapbox access token:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
```

Then, update the MapComponent.tsx file to use this environment variable:

```typescript
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/app/page.tsx` - Home page with address form
- `src/app/map/page.tsx` - Map page displaying the location
- `src/components/AddressForm.tsx` - Form component for address input
- `src/components/MapComponent.tsx` - Mapbox map component

## How It Works

1. Users enter their address in the form on the home page
2. Upon submission, they are redirected to the map page with the address as a query parameter
3. The map page displays the address on an interactive Mapbox map

## Future Enhancements

- Add geocoding to convert addresses to coordinates
- Save recent addresses
- Add route planning functionality
- Implement location sharing

## License

MIT

---

This project uses [Next.js](https://nextjs.org/) and [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/overview/).
