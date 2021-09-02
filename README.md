# AMPA SERVER

## Propósito

Es el backend de la aplicación de MiAmpa. Se trata de un api rest definido por Swagger. 

El patron que rige la aplicacion es un MVC. Donde la vista son las aplicaciones que conforman el front (web, mobile, desktop ...), y el controllador sería nuestro capa de controllers, ubicadas en la carpeta controller. El model está en la carpeta modelo y para comunicar el controllador con el modelo usamos los servicios.

## Estructura del proyecto
        ├── config
        │   └── config.js
        ├── constants
        │   ├── ***.js
        ├── controllers
        │   ├── ***.js
        ├── core
        │   └── service
        │       └── main.service.js
        ├── devTools
        │   ├── service.js
        ├── devUtils.js
        ├── index.js
        ├── logger.js
        ├── mappings
        │   ├── ***.js
        ├── middlewares
        │   ├── auth.js
        │   ├── extract-ampa-middleware.js
        │   ├── extract-user-middleware.js
        │   ├── jwt-middleware.js
        │   └── logger-middleware.js
        ├── models
        │   ├── ***.js
        ├── redsys
        │   ├── api-redsys.js
        │   └── utils.js
        ├── service
        │   ├── ***Service.js
        ├── stripe
        │   └── stripe.js
        └── utils
            ├── constants.js
            ├── libs.js
            ├── redsys.js
            ├── utils.js
            ├── writer.back
            └── writer.js