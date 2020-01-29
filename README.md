<h1>INFLUENCER MARKETING GENERATOR</h1>

![Human Resources Management](influencer.jpg)

<h2>Proyecto fullstack para la creación de campañas de marketing de influencers</h2>

<h3>La plataforma esta operativa en <a href="www.primeroinfluyo.es" target="_blank">www.primeroinfluyo.es</a></h3>

La propuesta de este proyecto se basa en la creación de una web **API FullStack**. En la **Carpeta frontend** está contenido el desarrollo en Angular 2, con UI/UX en SASS y Bootstrap y en la **Carpeta backend** está toda la estructura backend creada en NodeJS y Express. La base de datos está montada en MongoDB y los servidores son de Heroku.

Las tecnologías utilizadas en Frontend son:
<ul>
<li> HTML 5</li>
<li> SASS</li>
<li> Bootstrap</li>
<li> TypeScript</li>
<li> Angular 2</li>
</ul>

Las tecnologías utilizadas en Backend son:
<ul>
<li> NodeJS</li>
<li> Express</li>
<li> MongoDB</li>
<li> Heroku</li>
</ul>

Para visualizar (a modo ejemplo) la estructura de datos obtenida por la API, las peticiones son:

**GET datos de Influencer registrado**
https://primeroinfluyo-backend.herokuapp.com/influencer/5e31db13a55159001773b428

A modo seguridad, en el local storage se genera un id de sesión que debe estar incluido via postman como Header Authorization.

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5zdGFncmFtIjoiYWRtaXJhIiwiaWF0IjoxNTgwMzI1OTI2fQ.TYN_t4sbo2WyP1fbcUnJXahdQKJx72LTAZ1GHMYDeHw

**GET información de campañas de marketing registradas**
https://primeroinfluyo-backend.herokuapp.com/allcampaigns

A modo seguridad, en el local storage se genera un id de sesión que debe estar incluido via postman como Header Authorization.

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5zdGFncmFtIjoiYWRtaXJhIiwiaWF0IjoxNTgwMzI1OTI2fQ.TYN_t4sbo2WyP1fbcUnJXahdQKJx72LTAZ1GHMYDeHw

El modelo de la api incluye peticiones POST, PUT y DELETE, las cuales se pueden probar directamente desde la plataforma

Para activar la API se necesita el siguiente comando:
> npm start
<!--  -->