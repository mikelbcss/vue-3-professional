<template>
  <div class="message-formatter" :class="containerClass" :style="containerStyle">
    <h2>{{ title }}</h2>

    <!-- Input with template ref -->
    <div class="input-section">
      <label>Escribe tu mensaje:</label>
      <input ref="messageInput" v-model="message" type="text" placeholder="Escribe algo..." class="input-field" />
      <button @click="focusInput">Enfocar Input</button>
    </div>

    <!-- Display formatted message using filters -->
    <div class="output-section">
      <h3>Mensaje formateado:</h3>
      <p class="formatted-message" :class="messageClass">
        <!-- eslint-disable-next-line vue/no-deprecated-filter -->
        {{ message | capitalize | addPrefix }}
      </p>
      <p class="char-count" :style="{ color: textColor }">Caracteres: {{ message.length }}</p>
    </div>

    <!-- Theme controls -->
    <div class="controls">
      <label>
        <input v-model="isDarkMode" type="checkbox" />
        Modo oscuro
      </label>

      <label>
        Tamaño del texto:
        <select v-model="fontSize">
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
      </label>
    </div>

    <!-- Action button -->
    <div class="actions">
      <button :disabled="!message.trim()" class="send-button" @click="sendMessage">Enviar Mensaje</button>
    </div>

    <!-- Status display -->
    <div v-if="lastSentMessage" class="status">
      <p>
        Último mensaje enviado: <strong>{{ lastSentMessage }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageFormatter',
  filters: {
    // Filter to capitalize first letter
    capitalize(value) {
      if (!value) return ''
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    // Filter to add prefix
    addPrefix(value) {
      if (!value) return ''
      return `📝 ${value}`
    },
  },
  props: {
    title: {
      type: String,
      default: 'Formateador de Mensajes - Vue 2',
    },
  },
  data() {
    return {
      message: '',
      isDarkMode: false,
      fontSize: 'medium',
      lastSentMessage: '',
      charCountColor: '#333',
    }
  },
  computed: {
    // Manual class binding
    containerClass() {
      return {
        'dark-mode': this.isDarkMode,
        'light-mode': !this.isDarkMode,
      }
    },
    // Manual style binding
    containerStyle() {
      return {
        fontSize: this.fontSizeValue,
        transition: 'all 0.3s ease',
      }
    },
    messageClass() {
      return {
        'has-content': this.message.length > 0,
        'long-message': this.message.length > 20,
      }
    },
    fontSizeValue() {
      const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px',
      }
      return sizes[this.fontSize]
    },
    textColor() {
      return this.isDarkMode ? '#fff' : this.charCountColor
    },
  },
  watch: {
    // Watcher for message changes
    message(newMessage) {
      console.log('💬 Message changed:', newMessage)

      // Update character count color based on length
      if (newMessage.length > 50) {
        this.charCountColor = '#e74c3c'
      } else if (newMessage.length > 20) {
        this.charCountColor = '#f39c12'
      } else {
        this.charCountColor = '#27ae60'
      }
    },
    // Watcher for theme changes
    isDarkMode(newValue) {
      console.log('🌓 Theme changed to:', newValue ? 'dark' : 'light')
    },
    // Watcher for font size
    fontSize(newSize) {
      console.log('📝 Font size changed to:', newSize)
    },
  },
  methods: {
    // Template ref usage
    focusInput() {
      this.$refs.messageInput.focus()
      console.log('🎯 Input focused using template ref')
    },
    // Method that emits event
    sendMessage() {
      if (this.message.trim()) {
        const formattedMessage = this.$options.filters.addPrefix(this.$options.filters.capitalize(this.message))

        // Update last sent message
        this.lastSentMessage = formattedMessage

        // Emit event to parent
        // eslint-disable-next-line vue/require-explicit-emits
        this.$emit('message-sent', {
          original: this.message,
          formatted: formattedMessage,
          timestamp: new Date().toISOString(),
        })

        console.log('📤 Message sent:', formattedMessage)

        // Clear message after sending
        this.message = ''
      }
    },
  },
}
</script>

<style scoped>
.message-formatter {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.light-mode {
  background-color: #ffffff;
  color: #333333;
}

.dark-mode {
  background-color: #2c3e50;
  color: #ecf0f1;
}

.input-section {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: inherit;
}

.dark-mode .input-field {
  background-color: #34495e;
  border-color: #7f8c8d;
  color: #ecf0f1;
}

.output-section {
  margin-bottom: 20px;
}

.formatted-message {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-weight: bold;
  min-height: 20px;
}

.dark-mode .formatted-message {
  background-color: #34495e;
}

.formatted-message.has-content {
  border-left: 4px solid #3498db;
}

.formatted-message.long-message {
  border-left-color: #e74c3c;
}

.char-count {
  font-size: 0.9em;
  margin-top: 5px;
}

.controls {
  margin-bottom: 20px;
}

.controls label {
  display: block;
  margin-bottom: 10px;
}

.controls select {
  margin-left: 8px;
  padding: 4px 8px;
}

.actions {
  margin-bottom: 20px;
}

.send-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: inherit;
}

.send-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.send-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.status {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
}

.dark-mode .status {
  background-color: #1e3a2e;
  border-color: #2d5a3d;
  color: #a3d9b1;
}
</style>
