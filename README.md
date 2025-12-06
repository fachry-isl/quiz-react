# Quiz React App

# Initial Setup

## Init React + Vite project

```
create vite@latest my-app -- --template react
```

## Install Tailwind CSS

```
npm install tailwindcss @tailwindcss/vite
```

### Configure vite plugin

```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
plugins: [
tailwindcss(),
],
})
```
