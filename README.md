app-distribution
================

Distribución de versiones beta de aplicaciones para el grupo de pruebas de Ingeneo


### Como subir aplicaciones

* Edite el archivo apps.json; por cada aplicación que quiera subir, se debe ingresar un objeto codificado en json, en el array apps que se encuentra en este archivo. Un ejemplo de archivo apps.json es: 

```
  window.apps = {
    "base_url" : "https://dl.dropboxusercontent.com/u/10355187/",
	  "apps" : [
      {
        "name": "dms-android",
        "description": "DMS",
        "version": "QA",
        "platform": "android"
      },
    ]
  }
```

Cada aplicación tiene una plataforma.

Si por ejemplo un usuario ingresa al sitio (http://ingeneoarmenia.github.com/app-distribution) desde un dispositivo ios, podrá acceder a las aplicaciones de plataforma web y las de ios. 
De igual forma los usuarios que accedan desde android, podrán acceder a las aplicaciones de android y las aplicaciones web.
