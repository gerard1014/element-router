# element-router

This is a simple router based on Polymer 1.0:
  - It only handles hash urls.
  - It doesn't handle nested routes.
  - Each route loads an element.
  - The url parameters bind to the element's properties.
  - The elements used must be preloaded with html imports.
  - Any element works, even native dom like a textarea.

## Usage:

```html
<element-router default="/" on-route-change="onRouteChange">
  <element-route path="/" element="home-page"></element-route>
  <element-route path="/login" element="login-page"></element-route>
  <element-route path="/users" element="users-page"></element-route>
  <element-route path="/text/:textContent" element="textarea"></element-route>
</element-router>
```
