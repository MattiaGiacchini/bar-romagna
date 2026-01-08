<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const selectedCity = ref(null)
const date = ref(null)
const checked = ref(false)
const selectedOption = ref('Option 1')
const sliderValue = ref(50)

const cities = ref([
  { name: 'Madrid', code: 'MAD' },
  { name: 'Barcelona', code: 'BCN' },
  { name: 'Valencia', code: 'VLC' },
  { name: 'Sevilla', code: 'SEV' }
])

const options = ref(['Option 1', 'Option 2', 'Option 3'])

const products = ref([
  { id: 1, name: 'Producto 1', price: 99, category: 'Electrónica' },
  { id: 2, name: 'Producto 2', price: 149, category: 'Ropa' },
  { id: 3, name: 'Producto 3', price: 79, category: 'Deportes' }
])

const visible = ref(false)

const showToast = () => {
  // Aquí iría el toast si lo configuras
  alert('¡Botón clickeado!')
}
</script>

<template>
  <div class="demo-container">
    <h1>Demo de Componentes PrimeVue</h1>

    <!-- Sección Botones -->
    <section class="demo-section">
      <h2>Botones</h2>
      <div class="button-group">
        <Button label="Primary" @click="showToast" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warn" />
        <Button label="Danger" severity="danger" />
      </div>

      <div class="button-group">
        <Button icon="pi pi-home" aria-label="Home" />
        <Button label="Profile" icon="pi pi-user" />
        <Button label="Save" icon="pi pi-check" iconPos="right" />
        <Button icon="pi pi-search" rounded aria-label="Search" />
        <Button icon="pi pi-trash" rounded severity="danger" aria-label="Delete" />
      </div>

      <div class="icons-group">
        <h3>Iconos standalone:</h3>
        <i class="pi pi-check" style="font-size: 2rem; color: green"></i>
        <i class="pi pi-times" style="font-size: 2rem; color: red"></i>
        <i class="pi pi-search" style="font-size: 2rem"></i>
        <i class="pi pi-user" style="font-size: 2rem"></i>
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
    </section>

    <!-- Sección Inputs -->
    <section class="demo-section">
      <h2>Inputs y Formularios</h2>
      <div class="form-grid">
        <div class="form-field">
          <label for="name">Nombre</label>
          <InputText id="name" v-model="name" placeholder="Escribe tu nombre" />
        </div>

        <div class="form-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" placeholder="tu@email.com" />
        </div>

        <div class="form-field">
          <label for="city">Ciudad</label>
          <Select
              id="city"
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Selecciona una ciudad"
              class="w-full"
          />
        </div>

        <div class="form-field">
          <label for="date">Fecha</label>
          <DatePicker id="date" v-model="date" placeholder="Selecciona una fecha" />
        </div>

        <div class="form-field full-width">
          <label for="message">Mensaje</label>
          <Textarea
              id="message"
              v-model="message"
              rows="4"
              placeholder="Escribe tu mensaje aquí..."
          />
        </div>
      </div>
    </section>

    <!-- Sección Checkbox y Radio -->
    <section class="demo-section">
      <h2>Selección</h2>
      <div class="selection-group">
        <div class="flex align-items-center">
          <Checkbox v-model="checked" inputId="terms" binary />
          <label for="terms" class="ml-2">Acepto los términos y condiciones</label>
        </div>

        <div class="radio-group">
          <div v-for="option in options" :key="option" class="flex align-items-center">
            <RadioButton v-model="selectedOption" :inputId="option" :value="option" />
            <label :for="option" class="ml-2">{{ option }}</label>
          </div>
        </div>

        <div class="slider-container">
          <label>Slider: {{ sliderValue }}</label>
          <Slider v-model="sliderValue" class="w-full" />
        </div>
      </div>
    </section>

    <!-- Sección Tabla -->
    <section class="demo-section">
      <h2>Tabla de Datos</h2>
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="price" header="Precio">
          <template #body="slotProps">
            {{ slotProps.data.price }}€
          </template>
        </Column>
        <Column field="category" header="Categoría"></Column>
        <Column header="Acciones">
          <template #body>
            <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" />
            <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Delete" />
          </template>
        </Column>
      </DataTable>
    </section>

    <!-- Sección Cards y Panel -->
    <section class="demo-section">
      <h2>Cards y Paneles</h2>
      <div class="card-grid">
        <Card>
          <template #title>Card Simple</template>
          <template #content>
            <p>Este es el contenido de una card básica de PrimeVue.</p>
          </template>
          <template #footer>
            <Button label="Ver más" icon="pi pi-arrow-right" iconPos="right" />
          </template>
        </Card>

        <Panel header="Panel con Toggle" toggleable>
          <p>Este panel se puede colapsar y expandir.</p>
        </Panel>
      </div>
    </section>

    <!-- Sección Dialog -->
    <section class="demo-section">
      <h2>Diálogo</h2>
      <Button label="Abrir Diálogo" @click="visible = true" />

      <Dialog v-model:visible="visible" modal header="Título del Diálogo" :style="{ width: '30rem' }">
        <p>Este es el contenido del diálogo modal.</p>
        <p>Puedes poner cualquier contenido aquí.</p>
        <template #footer>
          <Button label="Cancelar" text @click="visible = false" />
          <Button label="Guardar" @click="visible = false" />
        </template>
      </Dialog>
    </section>

    <!-- Sección Mensajes -->
    <section class="demo-section">
      <h2>Mensajes</h2>
      <Message severity="success">Operación completada con éxito</Message>
      <Message severity="info">Información importante</Message>
      <Message severity="warn">Advertencia: revisa los datos</Message>
      <Message severity="error">Error: algo salió mal</Message>
    </section>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    color: #333;
  }
}

.demo-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;

  h2 {
    margin-bottom: 1.5rem;
    color: #495057;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  align-items: center;
}

.icons-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  // Fijar tamaño de iconos con animación para evitar desplazamiento
  .pi-spin {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    font-weight: 600;
    color: #495057;
  }
}

.selection-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.w-full {
  width: 100%;
}

.ml-2 {
  margin-left: 0.5rem;
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}
</style>

