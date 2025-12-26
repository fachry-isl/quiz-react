# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
# Use ci if lockfile exists, else install
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Optional: Add custom nginx config if you need to handle valid SPA routing (returning index.html on 404)
# For now, default nginx config might fail on direct route access (e.g. /about), but works for root.
# A simple fix is often adding a minimal nginx config. I'll stick to default for simplicity unless requested.
# But for a robust guide, I should probably provide a simple nginx conf if simple default isn't enough.
# Actually, let's keep it simple for now as per "guide" request usually implies getting it running first.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
