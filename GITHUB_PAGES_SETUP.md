# 📚 Guía: Subir tu página de ejercicios de inglés a GitHub Pages

## Opción 1: Rápida (Solo archivo HTML)

### Paso 1: Crear un repositorio en GitHub
1. Entra en [GitHub.com](https://github.com)
2. Haz clic en **"New"** para crear un nuevo repositorio
3. Nombre del repositorio: `english-practice` (o el nombre que prefieras)
4. Marca **"Public"**
5. Haz clic en **"Create repository"**

### Paso 2: Sube el archivo index.html
1. En la página del repositorio, haz clic en **"Add file"** → **"Upload files"**
2. Arrastra y suelta el archivo `index.html` que te proporcioné
3. Haz clic en **"Commit changes"**

### Paso 3: Activa GitHub Pages
1. Ve a **Settings** (Configuración) del repositorio
2. En el menú izquierdo, selecciona **"Pages"**
3. En "Source", selecciona **"main"** (o **"master"**)
4. Haz clic en **"Save"**
5. ¡Listo! Tu página estará en: `https://tuusuario.github.io/english-practice`

---

## Opción 2: Con Git (Si tienes Git instalado)

### Paso 1: Crear repositorio
```bash
git init english-practice
cd english-practice
```

### Paso 2: Agregar el archivo
```bash
cp index.html .
git add index.html
git commit -m "Initial commit: English practice exercises"
```

### Paso 3: Conectar con GitHub
```bash
git remote add origin https://github.com/tuusuario/english-practice.git
git branch -M main
git push -u origin main
```

### Paso 4: Activar GitHub Pages
1. Ve a **Settings** → **Pages**
2. Selecciona **main** como source
3. ¡Listo!

---

## 🔄 Cómo actualizar con nuevos ejercicios

### Desde el navegador:
1. Ve a tu repositorio en GitHub
2. Haz clic en `index.html`
3. Haz clic en el icono de editar (lápiz)
4. Edita el archivo
5. Haz clic en **"Commit changes"**

### Desde Git (línea de comandos):
```bash
# Realiza tus cambios en index.html
git add index.html
git commit -m "Agregados nuevos ejercicios de Cambridge"
git push
```

---

## 📝 Cómo agregar más ejercicios

Abre el archivo `index.html` y busca la sección `const exercises = [...]`

Cada ejercicio tiene esta estructura:

### Para Multiple Choice:
```javascript
{
    id: 'mc5',
    type: 'multipleChoice',
    text: 'Texto con _____ aquí.',
    options: ['opción1', 'opción2', 'opción3', 'opción4'],
    correct: 0,  // Índice de la respuesta correcta (0, 1, 2, 3)
    explanation: 'Explicación de por qué es correcta.'
}
```

### Para Fill Blanks (rellenar huecos):
```javascript
{
    id: 'fb4',
    type: 'fillBlanks',
    text: 'The _____ was _____ because of the situation.',
    blanks: [
        { position: 1, answer: 'situation', hints: ['sustantivo', '9 letras'] },
        { position: 2, answer: 'complicated', hints: ['adjetivo', 'complejo'] }
    ],
    explanation: 'Explicación de las respuestas.'
}
```

### Para Reorder Blanks (modular palabras):
```javascript
{
    id: 'rb4',
    type: 'reorderBlanks',
    text: 'She _____ (ARRIVE) late because _____ (TRAFFIC).',
    blanks: [
        { position: 1, baseWord: 'ARRIVE', correctForm: 'arrived', hints: ['pasado simple'] },
        { position: 2, baseWord: 'TRAFFIC', correctForm: 'of traffic', hints: ['preposición'] }
    ],
    explanation: 'Explicación.'
}
```

### Para Rewrite (reescribir):
```javascript
{
    id: 'rw3',
    type: 'rewrite',
    original: 'He is too tired to continue working.',
    instruction: 'Reescribe usando "so... that"',
    correctAnswers: [
        'He is so tired that he cannot continue working.',
        'He is so tired that he can\'t continue working.'
    ],
    hints: ['Usa so + adjective + that', 'Piensa en la consecuencia'],
    explanation: 'Explicación del cambio.'
}
```

---

## 💡 Consejos para encontrar ejercicios de Cambridge

1. **Sitios útiles:**
   - Cambridge English Official Practice Tests
   - [Cambridge Assessment English](https://www.cambridgeenglish.org/)
   - [AIESEC Cambridge Practice](https://www.cambridgeenglish.org/test-your-english/)
   - Reddit: r/CambridgeEnglish
   - YouTube: Canales especializados en Cambridge exams

2. **Qué buscar en Google:**
   - "Cambridge PET exercises PDF"
   - "Cambridge FCE reading comprehension"
   - "Cambridge CAE word formation"
   - "Cambridge exam practice tasks"

3. **Formato para extraer ejercicios:**
   - Identifica el tipo de ejercicio en los PDFs
   - Copia el texto exacto
   - Identifica las opciones correctas
   - Anota pistas útiles para los estudiantes

---

## ✨ Características de tu página:

✅ 4 tipos de ejercicios diferentes
✅ Feedback inmediato (correcto/incorrecto)
✅ Explicaciones detalladas
✅ Navegación fluida entre ejercicios
✅ Barra de progreso
✅ Botones para reintentar
✅ Diseño responsivo (funciona en móvil)
✅ Totalmente gratuito alojado en GitHub Pages

---

## 🎯 Próximas mejoras que puedes hacer:

- Agregar más ejercicios (los proporcionados son ejemplos)
- Implementar un sistema de puntuación
- Agregar sonido para pronunciación
- Crear diferentes niveles (A1, A2, B1, B2, C1, C2)
- Agregar un modo "test" con tiempo límite
- Exportar resultados en PDF

---

## 📞 Ayuda:

Si tienes dudas sobre GitHub:
- [Documentación oficial GitHub Pages](https://docs.github.com/en/pages)
- [Guía rápida de GitHub](https://guides.github.com/)

¡Buena suerte con tu proyecto! 🚀
