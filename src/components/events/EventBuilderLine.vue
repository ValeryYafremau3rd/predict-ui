<template>
  <form v-on:change="updated" class="event-form">
    <div v-if="index != 0" class="operator">
      <select v-model="selectedOperator">
        <option v-bind:key="x" v-for="x in operators" :value="x">{{ x }}</option>
      </select>
    </div>
    <div class="event-builder-line">
      <div>
        Type:
        <select v-model="selectedType">
          <option v-bind:key="x" v-for="x in types" :value="x">{{ x }}</option>
        </select>
        <Button
          v-if="index != 0 && index != 1"
          size="small"
          iconPos="right"
          label="Delete"
          class="remove-line"
          icon="pi pi-times"
          severity="danger"
          @click="removeMethod()"
        >
        </Button>
      </div>
      <div v-if="selectedType == 'value'">
        Value:<input v-model="selectedValue" type="number" />
      </div>
      <div v-if="selectedType == 'stat'">
        Team:
        <select v-model="selectedPreffix">
          <option v-bind:key="x" v-for="x in preffixes" :value="x">{{ x }}</option>
        </select>
        Stat:
        <select v-model="selectedStat">
          <option v-bind:key="x" v-for="x in stats" :value="x">{{ x }}</option>
        </select>
      </div>
    </div>
  </form>
</template>

<style scoped>
.event-form {
  display: block;
  text-align: center;
  margin: auto;
  width: 80%;
}

input {
  background: var(--text-color-contrast);
  color: var(--text-color);
}

.operator {
  margin: 10px;
  padding: 20px;
  text-align: left;
  background-color: var(--card-background-color);
  border-radius: 10px;
}

.event-builder-line {
  font-size: 18px;
  text-align: left;
  color: var(--text-color);
  background-color: var(--card-background-color);
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
}

select {
  margin: 0 20px 0 5px;
  background: var(--text-color-contrast);
  color: var(--text-color);
}

.remove-line {
  float: right;
}
</style>

<script>
export default {
  props: [
    'stats',
    'types',
    'operators',
    'preffixes',
    'index',
    'removeMethod',
    'updateLine',
    'line'
  ],
  data() {
    return {
      selectedType: this.line.type,
      selectedValue: this.line.value,
      selectedPreffix: this.line.preffix,
      selectedOperator: this.line.operator,
      selectedStat: this.line.stat,
      index: this.line.index,
      name: this.line.name
    }
  },
  methods: {
    lineChanged() {
      this.$emit('changed', {
        type: this.selectedType,
        value: this.selectedValue,
        preffix: this.selectedPreffix,
        operator: this.selectedOperator,
        stat: this.selectedStat
      })
    },
    updated() {
      this.$emit('line-changed', {
        index: this.index,
        type: this.selectedType,
        value: this.selectedValue,
        preffix: this.selectedPreffix,
        operator: this.selectedOperator,
        stat: this.selectedStat
      })
    }
  }
}
</script>
