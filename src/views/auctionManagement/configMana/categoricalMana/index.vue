<template>
  <div>
    <commTemp title="品类" :getListApi="this.api.findAuctionIronTypeList" :getOptionData="this.api.queryIronTypes" :addApi="this.api.saveAuctionIronType" :updateApi="this.api.updateAuctionIronType" :delApi="this.api.deleteAuctionIronType"></commTemp>
    <commTemp title="材质" :getListApi="this.api.findAuctionMaterialList" :getOptionData="this.api.queryMaterials" :addApi="this.api.saveAuctionMaterial" :updateApi="this.api.updateAuctionMaterial" :delApi="this.api.deleteAuctionMaterial"></commTemp>
    <commTemp title="表面" :getListApi="this.api.findAuctionSurfaceList" :getOptionData="this.api.querySurFaces" :addApi="this.api.saveAuctionSurface" :updateApi="this.api.updateAuctionSurface" :delApi="this.api.deleteAuctionSurface"></commTemp>
    <commTemp title="产地" :getListApi="this.api.findAuctionProPlaceList" :getOptionData="this.api.queryPlaces" :addApi="this.api.saveAuctionProPlace" :updateApi="this.api.updateAuctionProPlace" :delApi="this.api.deleteAuctionProPlace"></commTemp>
    <commTemp title="仓库" :getListApi="this.api.findAuctionStoreHouseList" :getOptionData="this.api.getStroeHouse" :addApi="this.api.saveAuctionStoreHouse" :updateApi="this.api.updateAuctionStoreHouse" :delApi="this.api.deleteAuctionStoreHouse"></commTemp>
  </div>
</template>

<script>
  import commTemp from './commTemp'
  export default {
    components: {
      commTemp
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  
</style>