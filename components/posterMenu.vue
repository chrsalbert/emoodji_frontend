<template>
  <select v-model="currentPosterId" style="display: none">
    <option v-for="poster in posters" :key="poster._id" :value="poster._id">{{ poster.startDate }}-{{ poster.endDate }} {{ poster.title }}</option>
  </select>
</template>