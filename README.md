# 💼 Bitácora Jobs · Seguimiento de Postulaciones y Entrevistas

<p align="center">
  <img width="1851" height="886" alt="image" src="https://github.com/user-attachments/assets/d36d2d3e-a3d1-4a32-bdde-46d193af8144" />
</p>

> **Bitácora Jobs** es una aplicación web (PWA) diseñada para registrar, organizar y hacer un seguimiento exhaustivo de tus búsquedas laborales, gestionar el estado de tus postulaciones, agendar entrevistas y tomar notas de voz o dictado en tiempo real.

<p align="center">
  <a href="https://bitacora-jobs.vercel.app/">
    <img src="https://img.shields.io/badge/Ver_Demo-Abrir_Herramienta-ff69b4?style=for-the-badge&logo=vercel&logoColor=white" alt="Ver Demo" />
  </a>
</p>

---

## ✨ Características Principales

* 📊 **Gestión de Postulaciones:** Registro detallado de cada oportunidad (empresa, puesto, plataforma de origen, expectativa salarial, modalidad, contacto y si el CV fue visto o descargado).
* 🚦 **Control de Estados (Pipeline):** Seguimiento visual de progreso: *Postulado, Entrevista, Oferta, Sin respuesta* y *Rechazado* (Pasa a "Sin respuesta" automáticamente a los 14 días).
* 🎙️ **Dictado y Audios Nativos:** Transcripción de voz a texto (Web Speech API) y grabador de notas de audio incorporado que guarda los archivos localmente para documentar las entrevistas.
* 📅 **Recordatorios de Entrevistas:** Avisos programados en el navegador, envío por correo, notificaciones Push con la app cerrada y exportación a calendario (`.ics`).
* 🎨 **Sistema Multi-Tema:** Selección fluida con persistencia local (`localStorage`) entre:
  - 🌸 **Modo Claro (Rosa)**
  - 💚 **Modo Verde**
  - 🖤 **Modo Negro**
* 📈 **Métricas de Búsqueda:** Dashboard generado dinámicamente (gráficos SVG) con tasas de respuesta, embudo de efectividad, plataformas más usadas y seguimiento por semana.
* 📄 **Exportación de Informes:** Generador propio para descargar tus estadísticas en imagen (**PNG**) o un reporte completo de todo tu historial en **PDF**.
* 🔒 **Sincronización Cifrada E2E:** Podés enlazar tu celu y la compu mediante un código. Tus datos se cifran en tu dispositivo (`AES-GCM`) antes de enviarse a la nube para garantizar tu privacidad.
* 📱 **PWA & Offline:** Instalable en dispositivos móviles (iOS/Android) y escritorio. Funciona sin fricciones gracias a los Service Workers.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, Grid), JavaScript (Vanilla ES6+).
* **Almacenamiento Local:** `localStorage` (preferencias/sesión) e `IndexedDB` (almacenamiento de blobs de audio).
* **APIs del Navegador:** `Web Crypto API` (cifrado E2E), `Web Speech API` (dictado), `MediaRecorder` (audio), `Notification API` y `Canvas API`.
* **Backend y Sync:** API REST (`restful-api.dev`) como puente de sincronización cifrada.
* **Entorno & Deploy:** Git, GitHub, Vercel.

---

### 🎯 Objetivo del proyecto

El objetivo principal es resolver una necesidad real (la organización durante la búsqueda activa de empleo) consolidando conceptos fundamentales de **desarrollo frontend sin frameworks**, **persistencia de datos local/offline** y **criptografía en el cliente**. Al mismo tiempo, aplica habilidades operativas y de gestión que resultan clave en roles como:

* **Technical Support Specialist**
* **Technical Support Analyst**
* **Customer Support / Customer Experience**
* **Product Operations / Operations Support**

El proyecto demuestra capacidad para crear herramientas internas eficaces, manejar el estado en el cliente con **JavaScript puro** y gestionar flujos asíncronos complejos (archivos de audio, cifrado, service workers), garantizando una experiencia de usuario rápida, privada y altamente organizada.

---

## 🗄️ Estructura de Datos y Privacidad

La aplicación utiliza una arquitectura **Privacy-First**:

1. **Local-First:** Toda tu información (postulaciones, notas, audios) vive en el almacenamiento interno de tu navegador (`localStorage` e `IndexedDB`).
2. **Cifrado E2E (Extremo a Extremo):** Si activás la sincronización multidispositivo, la app genera una clave criptográfica que nunca sale de tus dispositivos. Tus datos viajan a la nube como un bloque de texto indescifrable.
3. **Control Total:** Podés generar backups manuales en formato de texto plano para migrar o hacer copias de seguridad físicas.

---

## 📝 Historial de Actualizaciones (Changelog)

### 🚀 Lanzamiento Oficial y Mejoras Core

**✨ Nuevas Funcionalidades**
* Módulo avanzado de **Entrevistas**: Seguimiento por etapas (RRHH, Técnica, Equipo, Final), registro de resultados y de entrevistadores.
* Integración de **Dictado y Audio**: Permite grabar el feedback de la entrevista directamente en la app o dictarlo para que se transcriba solo.
* Generador de **PDF y PNG**: Exportación inteligente que se adapta al tema visual seleccionado.
* Sincronización en la nube con cifrado `AES-GCM` y códigos temporales de emparejamiento.

**🎨 Interfaz y Usabilidad**
* Implementación de los 3 temas visuales (Claro/Rosa, Verde, Negro) con persistencia de sesión.
* Gráficos interactivos SVG (donas y barras) construidos 100% con Vanilla JS sin librerías externas.
* Diseño responsive mejorado: interfaz compacta en celulares con animaciones fluidas y botones de acción rápida.
* Accesos rápidos para marcar si la empresa "descargó" o "vio" el CV.

---

¿Te sirvió o te pareció interesante? Dejale una ⭐ al repo para apoyar.

---

## 📄 Licencia

Distribuido bajo licencia MIT. Ver el archivo `LICENSE`.

## 👩‍💻 Autora

**Florencia Bagnis**

* 💼 [LinkedIn](https://www.linkedin.com/in/florencia-bagnis)
* 💻 [Portfolio](https://florbagnis.github.io/)
* 📧 [florenciasoledadbagnis@gmail.com](mailto:florenciasoledadbagnis@gmail.com)

<br>

> 🌸 Proyecto personal desarrollado para organizar y optimizar los procesos de búsqueda laboral, enfocado en **JavaScript Vanilla moderno**, persistencia de datos (IndexedDB), APIs nativas, diseño de interfaces limpias con **HTML5/CSS3** y una experiencia de usuario totalmente **responsive** y cifrada.
