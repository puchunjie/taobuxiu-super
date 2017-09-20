<template>
    <div>
        <commonTpl title="品类" :getListApi="api.getTypes" :addApi="api.addType" :updateApi="api.updateType">
        </commonTpl>
    
        <commonTpl title="表面" :getListApi="api.getSurFaces" :addApi="api.addSurface" :updateApi="api.updateSurFace">
        </commonTpl>

        <!-- <commonTpl title="材质" :getListApi="api.getMaterials" :addApi="api.addMaterials" :updateApi="api.updateMaterials">
        </commonTpl> -->
    </div>
</template>

<script>
    import commonTpl from './commonTemplate.vue'
    export default {
        components: {
            commonTpl
        }
    }
</script>
