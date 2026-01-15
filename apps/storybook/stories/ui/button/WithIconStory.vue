<script setup lang="ts">
import { GitBranchIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline" size="sm">
    <GitBranchIcon data-part="icon" />
    New Branch
  </Button>
</template>
