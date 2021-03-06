

// export const uploadApi = '/fileUpload/images';
// export const uploadExcelApi = 'http://192.168.0.251/sys/qualiticationmodel/uplodeQualiticationModel';
export const uploadExcelApi = '/sys/qualiticationmodel/uplodeQualiticationModel';

export const excelBaseUrl = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com/';


// WebSocket链接
export let ws = '';
let uploadHost = '';
export let exportContract = ''
export let detailContract = ''
if (process.env.NODE_ENV == 'development') {
    ws = 'ws://192.168.0.251/websocket'
    uploadHost = 'http://192.168.0.251:8080'
    exportContract = 'http://192.168.0.251:8080/contract_download_sys.jsp'
    detailContract = 'http://192.168.0.251:8080/contract.jsp'
    // ws = 'ws://111.231.134.170:8080/websocket'
} else {
    // ws = 'ws://120.55.63.70:8080/websocket';
    // ws = 'ws://192.168.0.251/websocket'
    // ws = 'ws://111.231.134.170:8080/websocket'
    // ws = 'ws://192.168.0.251:8080/websocket'
    ws = `wss://${window.location.host}/websocket`;
    exportContract = `http://${window.location.host}:8080/contract_download_sys.jsp`
    detailContract = `http://${window.location.host}:8080/contract.jsp`
    uploadHost = ''
}

export const uploadApi = uploadHost + '/fileUpload/images';
/**
 * 登录
 * path: /login/userLogin
 * method: POST
 * params: {
 *      mobile: String
 *      password: String
 * }
 */
export const login = '/login/userLogin';

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';

/**
 * 地址选择省，市，区
 */
export const findAdress = ''

export const findProvince = '/api/query/findProvince'

export const findCity = '/api/query/findCity'

export const findArea = '/api/query/findArea'
export const findDistrict = '/api/query/findDistrict'

// *********************************用户管理*********************************
/**
 * 添加、编辑用户
 * path: /sys/auth/user/bindUserRole
 * method: POST
 * params: {
 *      jsonObject: {
 *          id: '',//编辑用
 *          name
 *          password
 *          mobile
 *          realName
 *          roleList: [{
 *              roleId
 *              flag
 *          }]
 *      }//json字符串
 * }
 */
export const createUser = '/sys/auth/user/bindUserRoles'

/**
 * 获取用户列表
 * path: /sys/auth/user/findRoleList
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize 
 * }
 */
export const userList = '/sys/auth/user/findRoleList'

/**
 * 查询用户信息
 * path: /sys/auth/user/findRole
 * method: POST
 * params: {
 *      id: 不传为所有角色
 * }
 */
export const getUserInfo = '/sys/auth/user/findRole'

/**
 * 获取角色列表
 * path: /sys/auth/user/findRole
 * method: POST
 * params: {
 *      id:  不传为所有角色
 * }
 */
export const getRoleList = '/sys/auth/user/findRole'


/*
 * 专员管理查询
 * path:/sys/saleman/findSalemanBind
 */
export const getSalemanBind = '/sys/saleman/findSalemanBind'

/*
 * 超管查询专员信息
 * path:/sys/saleman/findSalemanBind
 */
export const findSalemanInfos = '/sys/saleman/findSalemanInfo'

/*
 * 超管查询绑定管理
 * /sys/saleman/findCompangWithSaleman
 */
export const findCompangWithSaleman = '/sys/saleman/findCompangWithSaleman'

/*
 * 超管进行商户绑定
 * /sys/saleman/findCompangWithSaleman
 */
export const updateSalemanInfo = '/sys/saleman/updateSalemanInfo'

/**
 * 获取商家用户列表
 * path: /sys/buserInfo/findBuserInfoPage
 * method: POST
 * params:
 */
export const getBusiness = '/sys/buserInfo/findBuserInfoPage'

/**
 * 查询商家详情
 * path: /sys/buserInfo/findBuserInfoById
 * params: bUserId
 */
export const getBusinessInfo = '/sys/buserInfo/findBuserInfoById'

/**
 * 修改商家信息
 * path: /sys/buserInfo/updateBuserInfo
 */
export const eidtBusiness = '/sys/buserInfo/updateBuserInfo'

/**
 * 超管查询用户经营范围
 * path: /sys/ironBuy/queryBussinessScopeByUserId
 */
export const scopeByUserId = '/sys/ironBuy/queryBussinessScopeByUserId'

/**
 * 超管保存用户经营范围
 * path: /sys/ironBuy/saveBussinessScopeByUserId
 */
export const saveScopeByUserId = '/sys/ironBuy/saveBussinessScopeByUserId'

/**
 * 
 * 更新公司主账号手机号
 */
export const updateMainAccountMobile = '/sys/buserInfo/updateMainAccountMobile'


// *********************************权限管理*********************************
/**
 * 查询权限列表
 * path: /sys/auth/role/findAll
 * method: POST
 * params: 
 */
export const getAllRoles = '/sys/auth/role/findAll'

/**
 * 添加角色
 * path: /sys/auth/role/save
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const addRole = '/sys/auth/role/save'

/**
 * 编辑角色
 * path: /sys/auth/role/update
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const editRole = '/sys/auth/role/update'

/**
 * 按角色编号查询子角色
 * path: /sys/auth/role/findById
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getRolesById = '/sys/auth/role/findById'

/**
 * 角色接口查询
 * path: /sys/auth/interface/findRoleInterfaceByid
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getInterfaceById = '/sys/auth/interface/findRoleInterfaceByid'

/**
 * 角色绑定接口
 * path: /sys/auth/interface/saveRoleInterface
 * method: POST
 * params: {
 *      jsonObject: 包含roleId:角色编号，interfaceGroupList:分组接口列表
 * }
 */
export const roleBlindInterface = '/sys/auth/interface/saveRoleInterface'


// *********************************接口管理*********************************
/**
 * 添加单个接口
 * path: /sys/auth/interface/save
 * method: POST
 * params: {
 *      name:  名称
 *      url:    接口地址
 *      methodType: 接口类型 0,1,2,3,4
 * }
 */
export const addInterface = '/sys/auth/interface/save'

/**
 * 删除单个接口
 * path: /sys/auth/interface/delInterface
 * method: POST
 * params: {
 *      id:  接口id
 * }
 */
export const delInterface = '/sys/auth/interface/delInterface'

/**
 * 获取接口列表
 * path: /sys/auth/interface/findGroupAll
 * method: POST
 * params: null
 */
export const getInterfaceList = '/sys/auth/interface/findGroupAll'

/**
 * 添加、修改接口分组信息
 * path: /sys/auth/group/save
 * method: POST
 * parmas: {
 *      name: 分组名
 *      id:   修改时传入
 * }
 */
export const addInterfaceGroup = '/sys/auth/group/save'

/**
 * 删除接口分组
 * path: 
 * method: POST
 * params: {
 *      groupId : 分组ID
 * }
 */
export const delInterfaceGroup = '/sys/auth/group/delGroup'

/**
 * 接口绑定分组
 * path: /sys/auth/interface/saveGroup
 * method: POST
 * params: {
 *      jsonObject :  分组列表字符串
 * }
 */
export const interfaceBlindGroup = '/sys/auth/interface/saveGroup'

// *********************************广告位管理*********************************
/**
 * 查询所有广告
 * path: /sys/ad/findAll
 * method: POST
 * params: 
 */
export const allAd = '/sys/ad/findAll';

/**
 * 添加广告位分组
 * path: /sys/ad/saveAdGroup
 * method: POST
 * params: {
 *      groupName: String 分组名
 *      adNums: Number  初始广告位个数  
 *      width: Number   初始广告位宽度
 *      height: Number   初始广告位高度
 *      previewImg:  String   效果图
 *      defaultImg:  String   默认背景图    
 * }
 */
export const addAdGroup = '/sys/ad/saveAdGroup';

/**
 * 删除广告分组
 * path: /sys/ad/delAdGroup
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const delAdGroup = '/sys/ad/delAdGroup';

/**
 * 获取单个广告分组信息
 * path: /sys/ad/findAdByGroupId
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const getAdGroup = '/sys/ad/findAdByGroupId';


/**
 * 更新广告位分组
 * path: /sys/ad/updateAdGroup
 * method: POST
 * params: jsonObject String
 */
export const updateGroup = '/sys/ad/updateAdGroup';
/**
 * 编辑广告分组信息
 * method: POST
 * params: {
 *      id:  groupId     分组id
 *      groupName: String 分组名
 *      adNums: Number  初始广告位个数  
 *      width: Number   初始广告位宽度
 *      height: Number   初始广告位高度
 *      previewImg:  String   效果图
 *      defaultImg:  String   默认背景图    
 * }
 */
export const editGroup = '/sys/ad/editAdGroup';

/**
 * 单个广告位数据获取
 * path:/sys/ad/findAdByGroupId
 * method:POST
 * params:groupId
 */
export const adList = '/sys/ad/findAdByGroupId';

/**
 * 删除单个广告位
 * path: /sys/ad/delAdInfo
 * method: POST
 * params: {
 *      id: 广告位id
 *      groupId:  分组ID 
 * }
 */
export const removeAd = '/sys/ad/delAdInfo';

/**
 * 添加单个广告位
 * path: /sys/ad/saveAd
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const addAd = '/sys/ad/saveAd';


/**
 * 首页悬浮广告位
 * path: /sys/homeAdv/save
 * method: POST
 */
export const homeAdv = '/sys/homeAdv/save';

/**
 * 获取首页悬浮广告位
 * path: /api/homeAdv/get
 * method: POST
 * 
 */
export const getHomeAdv = '/api/homeAdv/get';


// *********************************应用管理*********************************
/**
 * 添加基础计量单位
 * path: /sys/unit/saveUnit
 * method: POST
 * params: {
 *      type:   
 *      cName: 
 *      eName:
 * }
 */
export const addUnit = '/sys/unit/saveUnit'

/**
 * 更新计量单位，用于修改，删除
 * path: /sys/unit/updateUnit
 * method: POST
 * params{
 *      id:
 *      type:   
 *      cName: 
 *      eName:
 *      status:  
 * }
 */
export const updateUnit = '/sys/unit/updateUnit'

/**
 * 查询基础计量单位列表
 * path: /sys/unit/queryUnitPage
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize
 * }
 */
export const getAllUnits = '/sys/unit/queryUnitPage'

export const G_getAllUnits = '/api/query/queryUnitList'

/**
 * 查询品类计量单位信息
 * path: /sys/ironAndUnit/fingIronAndUnitPage
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize   
 * }
 */
export const getAllIronUnit = '/sys/ironAndUnit/findIronAndUnitPage'

/**
 * 更新计量单位品类信息
 * path: /sys/ironAndUnit/updateIronAndUnit
 * method: POST
 * params: {
 *      id: 
 *      ironId: 
 *      ironName:  
 * }
 */
export const updateIronUnit = '/sys/ironAndUnit/updateIronAndUnit'

// -----------------------------------品类---------------------------------

/**
 * 添加品类信息
 * path: /sys/ironTypes/saveIronTypes
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addType = '/sys/ironTypes/saveIronTypes'

/**
 * 更新品类信息
 * path: /sys/ironTypes/updateIronTypes
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateType = '/sys/ironTypes/updateIronTypes'


/**
 * 查询品类信息
 * path: /sys/ironTypes/findIronTypesPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getTypes = '/sys/ironTypes/findIronTypesPage'

export const G_getTypes = '/api/query/findIronTypes'

// -----------------------------------表面---------------------------------
/**
 * 添加表面信息
 * path: /sys/surface/saveSurface
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addSurface = '/sys/surface/saveSurface'

/**
 * 更新表面信息
 * path: /sys/surface/updateSurFace
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateSurFace = '/sys/surface/updateSurFace'


/**
 * 查询表面信息
 * path: /sys/surface/findSurfacePage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getSurFaces = '/sys/surface/findSurfacePage'

export const G_getSurFaces = '/api/query/findSurFace'

// -----------------------------------材质---------------------------------
/**
 * 添加材质信息
 * path: /sys/materials/saveMaterials
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addMaterials = '/sys/materials/saveMaterials'

/**
 * 更新材质信息
 * path: /sys/materials/updateMaterials
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateMaterials = '/sys/materials/updateMaterials'


/**
 * 查询材质信息
 * path: /sys/materials//findMaterialsPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getMaterials = '/sys/materials//findMaterialsPage'

// -----------------------------------产地---------------------------------
/**
 * 添加产地信息
 * path: /sys/proPlaces/saveProPlaces
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addProPlaces = '/sys/proPlaces/saveProPlaces'

/**
 * 更新产地信息
 * path: /sys/proPlaces/updateProPlaces
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateProPlaces = '/sys/proPlaces/updateProPlaces'


/**
 * 查询产地信息
 * path: /sys/proPlaces/findProPlacesPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getProPlaces = '/sys/proPlaces/findProPlacesPage'


// -----------------------------------仓库---------------------------------
/**
 * 添加产地信息
 * path: /sys/storeHouse/saveStoreHouse
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const saveStoreHouse = '/sys/storeHouse/saveStoreHouse'

/**
 * 更新擦库信息
 * path: /sys/storeHouse/updateStoreHouse
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateStoreHouse = '/sys/storeHouse/updateStoreHouse'

/**
 * 删除仓库信息
 * path: /sys/storeHouse/updateStoreHouse
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */

export const deleteStoreHouse = '/sys/storeHouse/deleteStoreHouse'


/**
 * 查询仓库信息
 * path: /sys/storeHouse/findStoreHousePage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getHouse = '/sys/storeHouse/findStoreHousePage'

/**
 * 查询所有仓库信息
 * path: /api/query/findStoreHouse
 * method: POST
 */
export const getStroeHouse = '/api/query/findStoreHouse'



// -----------------------------------优惠信息---------------------------------
export const findProInfoPage = '/sys/proInfoModel/findProInfoPage'
export const saveProInfoModel = '/sys/proInfoModel/saveProInfoModel'
export const updateProInfoModel = '/sys/proInfoModel/updateProInfoModel'
export const deleteProInfoModel = '/sys/proInfoModel/deleteProInfoModel'


//-------------------------------开平时间---------------------------------------
// 查询
export const findKaipingModelPage = '/sys/kaipingModel/findKaipingModelPage'
//  新增、修改
export const saveAndUpdateKaipingModel = '/sys/kaipingModel/saveAndUpdateKaipingModel'
//  删除
export const deleteKaipingModel = '/sys/kaipingModel/deleteKaipingModel'

// 查询所有信息
export const findAllKaiping = '/api/query/findAllKaiping'


//  超管修改定开信息
export const updateDingKai = '/sys/ironBuy/updateDingKai'

// 
//  超管分页查询现货资源
export const findSpotGoodsByPage = '/sys/spotGoods/findSpotGoodsByPage'

//  超管管理现货资源
export const updateSpotGoodsInfo = '/sys/spotGoods/updateSpotGoodsInfo'


//  超管分页查询特价资源
export const findSpecialPriceByPage = '/sys/specialPrice/findSpecialPriceByPage'

//  超管管理特价资源
export const updateSpeciaPriceInfo = '/sys/specialPrice/updateSpeciaPriceInfo'

// -----------------------------------资源类型管理---------------------------------
//  新增
export const saveQualiticationType= '/sys/qualiticationtype/saveQualiticationType'

//  更新
export const updateQualiticationType = '/sys/qualiticationtype/updateQualiticationType'

//  查询
export const queryQualiticationtypePage = '/sys/qualiticationtype/queryQualiticationtypePage'

//  删除
export const deleteQualiticationType = '/sys/qualiticationtype/deleteQualiticationType'


// -----------------------------------资源上传EXCEL模板管理-------------------------------
//  查询
export const queryQualiticationmodelPage = '/sys/qualiticationmodel/queryQualiticationmodelPage'

//  上传资源模板excel文件
export const uplodeQualiticationModel = '/sys/qualiticationmodel/uplodeQualiticationModel'

//  更新资源模板信息
export const updateQualiticationModel = '/sys/qualiticationmodel/updateQualiticationModel'

//  新增资源模板信息

export const saveQualiticationModel = '/sys/qualiticationmodel/saveQualiticationModel'

//  删除
export const deleteQualificationModel = '/sys/qualiticationmodel/deleteQualificationModel'

//  下载时回写增加次数
export const updateDownLodeCount = '/sys/qualiticationmodel/updateDownLodeCount'

/**
 * 删除分组
 */
export const queryDingKaiList = '/sys/ironBuy/queryDingKaiList'


//   资源模版下载记录
export const findExcelDownHistory = '/sys/resourcedown/findExcelDownHistory'


//  --------------------------系统配置--------------------------


//  --------------------------等级--------------------------
// 删除资源刷新机制_等级
export const deleteStoreQualiticationLevel = '/sys/storequaliticationlevel/deleteStoreQualiticationLevel'
// 新增资源刷新机制_等级
export const saveStoreQualiticationLevel = '/sys/storequaliticationlevel/saveStoreQualiticationLevel'
// 更新资源刷新机制_等级
export const updateStoreQualiticationLevel = '/sys/storequaliticationlevel/updateStoreQualiticationLevel'
// 查询资源刷新机制_等级
export const storequaliticationlevelPage = '/sys/storequaliticationlevel/storequaliticationlevelPage'

//  --------------------------类型--------------------------
// 删除资源刷新机制_类型
export const deleteStoreQualiticationType = '/sys/storequaliticationtype/deleteStoreQualiticationType'

// 新增资源刷新机制_类型
export const saveStoreQualiticationType = '/sys/storequaliticationtype/saveStoreQualiticationType'

// 更新资源刷新机制_类型
export const updateStoreQualiticationType = '/sys/storequaliticationtype/updateStoreQualiticationType'

// 查询资源刷新机制_类型
export const storequaliticationtypePage = '/sys/storequaliticationtype/storequaliticationtypePage'

//  --------------------------规则--------------------------
// 删除资源刷新机制_规则
export const deleteStoreRuleType = '/sys/storeruletype/deleteStoreRuleType'

// 新增资源刷新机制_规则
export const saveStoreRuleType = '/sys/storeruletype/saveStoreRuleType'

// 更新资源刷新机制_规则
export const updateStoreRuleType = '/sys/storeruletype/updateStoreRuleType'

// 查询资源刷新机制_规则
export const storeruletypePage = '/sys/storeruletype/storeruletypePage'

//  查询配置规则中所有资源类型
export const selectStoreQualificationTypeName = '/sys/storeroles/selectStoreQualificationTypeName'

//  分页查询规则配置
export const selectStoreRolesConfigurationPage = '/sys/storeroles/selectStoreRolesConfigurationPage'

//  配置默认规则               
export const saveStoreRolesConfiguration = '/sys/storeroles/saveStoreRolesConfiguration'

//  编辑默认规则               
export const updateStoreRolesConfiguration = '/sys/storeroles/updateStoreRolesConfiguration'

//  获取默认规则名称           
export const selectFagRuleName = '/sys/storeroles/selectFagRuleName'

//  批量应用刷新规则           
export const updateStoreRules = '/sys/storeroles/updateStoreRules'

//  获取默认配置规则集合  
export const selectFagRuleNameList = '/sys/storeroles/selectFagRuleNameList'

//  删配置规则
export const deleteStoreRoles= '/sys/storeroles/deleteStoreRoles' 




// -----------------------------------基础数据排序配置---------------------------------
//  基础参数排序修改
export const updateBaseSort = '/sys/baseSort/updateBaseSort'

//  基础参数排序查询
export const findBaseSortList = '/sys/baseSort/findBaseSortList'

//  基础参数排序设为默认
export const setBaseSortZero = '/sys/baseSort/setBaseSortZero'

// -----------------------------------资源类型配置---------------------------------

//  查询资源类型信息            
export const selectStoreQualificationTypeInfo = '/sys/dynamicResource/selectStoreQualificationTypeInfo'

//  分页查询配置信息            
export const selectDynamicResourcelPage = '/sys/dynamicResource/selectDynamicResourcelPage'

//  保存配置信息                
export const saveDynamicResourcel = '/sys/dynamicResource/saveDynamicResourcel'

//  更新配置信息                
export const updateDynamicResourcel = '/sys/dynamicResource/updateDynamicResourcel'

//   删除配置信息                
export const deleteDynamicResourcel = '/sys/dynamicResource/deleteDynamicResourcel'

//-----------------时间开关----------------------------------
// 分页查询时间开关
export const selectStoreTimePage = '/sys/storetime/selectStoreTimePage'

export const updateStoreTime = '/sys/storetime/updateStoreTime'

//  设为无限制                  
export const updateStoreTimeParamById = '/sys/storetime/updateStoreTimeParamById'

/// 更改开关状态                
export const updateStoreTimeStatusById = '/sys/storetime/updateStoreTimeStatusById'

//-------------------------------订单有效确认时间选项----------------------------------
//  分页查询订单有效确认时间选项        
export const storerSubOrderPage = '/sys/storesuborder/storerSubOrderPage'

//  新增订单有效确认时间选项            
export const saveStorerSubOrder = '/sys/storesuborder/saveStorerSubOrder'

//  更新订单有效确认时间选项            
export const updateStorerSubOrder = '/sys/storesuborder/updateStorerSubOrder'

//  删除订单有效确认时间选项            
export const deleteStorerSubOrder = '/sys/storesuborder/deleteStorerSubOrder'


//-------------------------------订单管理----------------------------------
//  超管分页查询现货订单
export const findSpotOrdersByPage = '/sys/storeorder/findSpotOrdersByPage'
//   根据订单编号和状态来更新
export const updateOrderStatusById = '/sys/storeorder/updateOrderStatusById'

// 根据资源货物编号和类型查找详情
export const findGoodsInfoById = '/sys/storeorder/findGoodsInfoById'

//  超管分页查询特价订单
export const findSpecialOrdersByPage = '/sys/storeorder/findSpecialOrdersByPage'

//  超管分页查询定开订单
export const findOpenPlanOrdersByPage = '/sys/storeorder/findOpenPlanOrdersByPage'

//--------------------------------订单统计数据-------------------
//订单统计数据
export const totalOrderData = '/sys/orderData/totalOrderData'

//  订单买家前十(买家大客户分析)
export const orderBuyerTopTen = '/sys/orderData/orderBuyerTopTen'

//  订单卖家前十(卖家大客户分析)
export const orderSellerTopTen = '/sys/orderData/orderSellerTopTen'

//  订单四维分析(货品数据分析)
export const fourDAnalysis = '/sys/orderData/fourDAnalysis'

//  订单地区前五(地区分析)
export const orderAreaTopFive = '/sys/orderData/orderAreaTopFive'

//---------------------------合同管理-------------------------------
//  合同认证信息管理分页查询
export const queryCheckContractPage = '/sys/bg/queryContractAuthenticationList'

//  电子合同平台用户信息认证
export const saveCheckContract = '/common/checkcontract/saveCheckContract'

//  电子合同平台用户信息修改
export const updateCheckContract = '/common/checkcontract/updateCheckContract'

//  商户认证信息超管修改商户电话号码
export const changeContractMobile = '/sys/bg/changeContractMobile'

//  合同列表管理分页查询
export const queryBgContractInfoPage = '/sys/contractBgManger/queryBgContractInfoPage'

//   根据合同编号获取合同和订单信息
export const getContractInfoContractId =  '/common/checkcontract/getContractInfoContractId'

// 认证商户单个查询 
export const queryContractAuthenticationById = '/sys/bg/queryContractAuthenticationById'

//  商户认证信息超管审核
export const checkContractAuthentication = '/sys/bg/checkContractAuthentication'

//  超管起草合同选择买方分页查询
export const queryBgBuyContractMangerPage = '/sys/contractBgManger/queryBgBuyContractMangerPage'

//  超管起草合同选择卖方分页查询
export const queryBgSellContractMangerPage = '/sys/contractBgManger/queryBgSellContractMangerPage'

//  超管起草合同选择签约订单分页查询
export const queryBgContractOrderPage = '/sys/contractBgManger/queryBgContractOrderPage'

//  超管开始起草合同页面信息
export const selectBgStartContractInfo = '/sys/contractBgManger/selectBgStartContractInfo'

//  超管保存起草合同信息
export const saveBgContractInfo = '/sys/contractBgManger/saveBgContractInfo'

//  超管下载合同
export const downLoadContract = '/sys/contractBgManger/downLoadContract'

// 基础费用查询
export const queryBaseCostList = '/sys/baseCost/queryBaseCostList'

// 基础费用删除
export const deleteBaseCost = '/sys/baseCost/deleteBaseCost'

//  基础费用保存编辑
export const saveAndUpdateBaseCost = '/sys/baseCost/saveAndUpdateBaseCost'

// 查询基础费用
export const findBaseCost = '/api/query/findBaseCost'

// -----------------------------------关联数据---------------------------------
/**
 * 保存关联分组（品类、表面）
 * path: /sys/ironAndSurfaceAndSpecification/saveIronAndSurface
 * method: POST
 * params : {
 *          ironTypeId,ironTypeName,surfaceId,surfaceName
 * }
 */
export const saveIronAndSurface = '/sys/ironAndSurfaceAndSpecification/saveIronAndSurface'

/**
 * 删除分组
 */
export const delIronAndSurface = '/sys/ironAndSurfaceAndSpecification/deleteIronAndSurface'

/**
 * 关联数据分组查询
 */
export const getIronAndSurface = '/api/query/findIronAndSurface'


/**
 * 根据分组查询规格
 * path: /sys/ironAndSurfaceAndSpecification/findIronAndSurface
 * params : { surface,ironType }
 */
export const getGGlist = '/sys/ironAndSurfaceAndSpecification/findIronAndSurface'


/**
 * 保存表面品类规格信息
 * path:/sys/ironAndSurfaceAndSpecification/saveIronAndSurfaceAndSpecification
 * params{ironType,surface,height,width,length}
 */
export const addGG = '/sys/ironAndSurfaceAndSpecification/saveIronAndSurfaceAndSpecification'

/**
 * 删除0,修改1表面品类规格信息
 */
export const delGG = '/sys/ironAndSurfaceAndSpecification/updateIronAndSurfaceAndSpecification'

// -----------------------------------求购查询---------------------------------
/**
 * 求购筛选条件筛选
 * path: /sys/ironBuy/queryIronBuy           
 */
export const queryIrons = '/sys/ironBuy/queryIronBuy'

// 查询求购详情
export const findIronOffer = '/sys/ironBuy/queryIronSellByIronBuyId'

//删除求购
export const deleteIron = '/sys/ironBuy/deleteIronBuyInfo'

// -----------------------------------代客发布求购---------------------------------
/**
 * 验证是否有代发权限
 */
export const hasJV = '/api/ironBuySubstitute/checkbg'


// -----------------------------------品类，材质，表面，产地查询---------------------------------
export const queryPlaces = '/api/query/findProPlaces'

export const queryIronTypes = '/api/query/findIronTypes'

export const queryMaterials = '/api/query/findMaterials'

export const querySurFaces = '/api/query/findSurFace'


// -----------------------------------接单吧数据统计---------------------------------
export const jd_totalData = '/sys/ironDataStatistic/totalStatisticByTime'

export const jd_buyerRank = '/sys/ironDataStatistic/ironBuyTopTen'

export const jd_sellerRank = '/sys/ironDataStatistic/ironSellTopTen'

export const jd_ironsRank = '/sys/ironDataStatistic/ironBaseRank'

export const jd_regionalRank = '/sys/ironDataStatistic/ironAreaTopFive'

// -----------------------------------质检---------------------------------
export const get_quality = '/sys/ironBuy/queryQCInfo'

export const get_actQua = '/sys/ironBuy/updateQC'



// -----------------------------------新闻管理---------------------------------
/**
 * 查询所有文章类型
*/
export const findAllArticleType = '/api/query/findAllArticleType'

/**
 * 分页查询文章类型
*/
export const findArticleTypePage = '/sys/articleType/findArticleTypePage'

/**
 * 删除文章类型
*/
export const removeArticleType = '/sys/articleType/removeArticleType'

/**
 * 保存更新文章类型
*/
export const saveAndUpadteArticleType = '/sys/articleType/saveAndUpadteArticleType'




/**
 * 新闻保存修改
*/
export const saveAndUpdateIndustryNew = '/sys/indutryNew/saveAndUpdateIndustryNew'

/**
 * 新闻超管查询列表
*/
export const findArticleList = '/sys/indutryNew/findArticleList'

/**
 * 新闻超管删除
*/
export const articleRemove = '/sys/indutryNew/articleRemove'


/**
 * 新闻超管查询详细信息
*/
export const findArticleInfo = '/sys/indutryNew/findArticleInfo'

/**
 * 新闻超管取消置顶
*/
export const articleZero = '/sys/indutryNew/articleZero'

/**
 * 新闻超管置顶
*/
export const articleRise = '/sys/indutryNew/articleRise'



// -----------------------------------物流管理---------------------------------
/**
 * 分页查询额外物流需求
*/
export const fingLogisticsExtraDemandPage = '/sys/logisticsExtraDemand/fingLogisticsExtraDemandPage'


/**
 * 新增额外物流需求
*/
export const saveLogisticsExtraDemand = '/sys/logisticsExtraDemand/saveLogisticsExtraDemand'


/**
 * 更改额外物流需求
*/
export const updateLogisticsExtraDemand = '/sys/logisticsExtraDemand/updateLogisticsExtraDemand'

/**
 * 删除额外物流需求
*/
export const deleteLogisticsExtraDemand = '/sys/logisticsExtraDemand/deleteLogisticsExtraDemand'


/**
 * 货物信息超管查询
*/
export const findLogisticsGoodsList = '/sys/logisticsGoods/findLogisticsGoodsList'

/**
 * 货物信息超管保存修改
*/
export const saveAndUpdateLogisticsGoods = '/sys/logisticsGoods/saveAndUpdateLogisticsGoods'


/**
 * 货物信息超管删除
*/
export const deleteLogisticsGoods = '/sys/logisticsGoods/deleteLogisticsGoods'


/**
 * 超管物流需求管理查询
*/
export const findFreightLogisticOrderByPage = '/sys/freightLogisticOrder/findFreightLogisticOrderByPage'



/**
 * 根据业务主键编号更改状态
*/
export const updateStatusById = '/sys/freightLogisticOrder/updateStatusById'



// -----------------------------------商家审核管理---------------------------------
/** 
 * 超管审核未通过商户列表
*/
export const findNotBuserInfoPage = '/sys/buserInfo/findNotBuserInfoPage'

/** 
 * 超管更新商户审核状态
*/
export const updateBuserInfoById = '/sys/buserInfo/updateBuserInfoById'


/** 
 * 根据用户编号来查询商户信息
*/
export const getBuserInfoByUserId = '/sys/buserInfo/getBuserInfoByUserId'

/** 
 * 查询专员
*/
export const findSalemanInfo = '/api/bregist/findSalemanInfo'



// -----------------------------------拍卖---------------------------------
/** 
 *  拍卖场地列表
*/
export const findAuctionIndexList = '/sys/auctionIndex/findAuctionIndexList'

/** 
 *  拍卖场次保存
*/
export const saveAuctionIndex = '/sys/auctionIndex/saveAuctionIndex'


/** 
 *  拍卖场次更新
*/
export const updateAuctionIndex = '/sys/auctionIndex/updateAuctionIndex'


/** 
 *  拍卖场次删除
*/
export const deleteAuctionIndex = '/sys/auctionIndex/deleteAuctionIndex'


/** 
 *  货品类型列表查询
*/
export const findGoodsTypeList = '/sys/goodsType/findGoodsTypeList'


/** 
 *  货品类型更新
*/
export const updateGoodsType = '/sys/goodsType/updateGoodsType'


/** 
 *  货品类型保存
*/
export const saveGoodsType = '/sys/goodsType/saveGoodsType'


/** 
 *  货品类型删除
*/
export const deleteGoodsType = '/sys/goodsType/deleteGoodsType'


/** 
 *  拍卖品类列表
*/
export const findAuctionIronTypeList = '/sys/auctionIronType/findAuctionIronTypeList'

/** 
 *  拍卖品类保存
*/
export const saveAuctionIronType = '/sys/auctionIronType/saveAuctionIronType'

/** 
 *  拍卖品类更新
*/
export const updateAuctionIronType = '/sys/auctionIronType/updateAuctionIronType'


/** 
 *  拍卖品类删除
*/
export const deleteAuctionIronType = '/sys/auctionIronType/deleteAuctionIronType'

/** 
 *  材质类列表
*/
export const findAuctionMaterialList = '/sys/auctionMaterial/findAuctionMaterialList'

/** 
 *  材质保存
*/
export const saveAuctionMaterial = '/sys/auctionMaterial/saveAuctionMaterial'

/** 
 *  材质更新
*/
export const updateAuctionMaterial = '/sys/auctionMaterial/updateAuctionMaterial'


/** 
 *  材质删除
*/
export const deleteAuctionMaterial = '/sys/auctionMaterial/deleteAuctionMaterial'

/** 
 *  表面列表
*/
export const findAuctionSurfaceList = '/sys/auctionSurface/findAuctionSurfaceList'

/** 
 *  表面保存
*/
export const saveAuctionSurface = '/sys/auctionSurface/saveAuctionSurface'

/** 
 *  表面更新
*/
export const updateAuctionSurface = '/sys/auctionSurface/updateAuctionSurface'


/** 
 *  表面删除
*/
export const deleteAuctionSurface = '/sys/auctionSurface/deleteAuctionSurface'


/** 
 *  产地列表
*/
export const findAuctionProPlaceList = '/sys/auctionProPlace/findAuctionProPlaceList'

/** 
 *  产地保存
*/
export const saveAuctionProPlace = '/sys/auctionProPlace/saveAuctionProPlace'

/** 
 *  产地更新
*/
export const updateAuctionProPlace = '/sys/auctionProPlace/updateAuctionProPlace'


/** 
 *  产地删除
*/
export const deleteAuctionProPlace = '/sys/auctionProPlace/deleteAuctionProPlace'


/** 
 *  仓库列表
*/
export const findAuctionStoreHouseList = '/sys/auctionStoreHouse/findAuctionStoreHouseList'

/** 
 *  仓库保存
*/
export const saveAuctionStoreHouse = '/sys/auctionStoreHouse/saveAuctionStoreHouse'

/** 
 *  仓库更新
*/
export const updateAuctionStoreHouse = '/sys/auctionStoreHouse/updateAuctionStoreHouse'


/** 
 *  仓库删除
*/
export const deleteAuctionStoreHouse = '/sys/auctionStoreHouse/deleteAuctionStoreHouse'

/** 
 *  商家银行卡列表查询
*/
export const findBankCardList = '/sys/bankCard/findBankCardList'


/** 
 *  商家银行卡保存
*/
export const saveBankCard = '/sys/bankCard/saveBankCard'

/** 
 *  商家银行卡更新
*/
export const updateBankCard = '/sys/bankCard/updateBankCard'

/** 
 *  商家银行卡删除
*/
export const deleteBankCard = '/sys/bankCard/deleteBankCard'


/** 
 *  商家银行卡修改默认状态
*/
export const changDefault = '/sys/bankCard/changDefault'


/** 
 *  服务与支持列表
*/
export const findSerSupList = '/sys/serSup/findSerSupList'

/** 
 *  服务与支持保存
*/
export const saveSerSup = '/sys/serSup/saveSerSup'


/** 
 *  服务与支持删除
*/
export const deleteSerSup = '/sys/serSup/deleteSerSup'


/** 
 *  服务与支持更新
*/
export const updateSerSup = '/sys/serSup/updateSerSup'


/** 
 *  提现申请-分页列表
*/
export const widthDrawPage = '/sys/widthDraw/page'


/** 
 *  提现申请详情
*/
export const widthDrawDetail = '/sys/widthDraw/detail'


/** 
 *  拍卖场次全部
*/
export const getAllSuctionIndex = '/sys/auctionIndex/getAllSuctionIndex'


/** 
 *  货品类型全部
*/
export const getAllGoodsTypeList = '/sys/goodsType/getAllGoodsTypeList'


/** 
 *  服务与支持所有
*/
export const getAllSerSup = '/sys/serSup/getAllSerSup'


/** 
 *  拍卖信息保存
*/
export const saveAuction = '/sys/auction/saveAuction'


/** 
 *  拍卖信息列表
*/
export const findAuctionList = '/sys/auction/findAuctionList'


/** 
 *  拍卖信息详情
*/
export const findAuction = '/sys/auction/findAuction'

/** 
 *  拍卖信息删除
*/
export const deleteAuction = '/sys/auction/deleteAuction'


/** 
 *  拍卖信息编辑
*/
export const updateAuction = '/sys/auction/updateAuction'



/** 
 *  拍卖竞价历史
*/
export const findOfferAuction = '/sys/auction/findOfferAuction'


/** 
 *  服务与支持所有
*/
export const getOfferWay = '/api/auctionOfferWay/list'

export const A_storeHouse = '/sys/auctionStoreHouse/getAllAuctionStoreHouse'

export const A_proPlace = '/sys/auctionProPlace/getAllAuctionProPlace'

export const A_ironType = '/sys/auctionIronType/getAllAuctionIronType'

export const A_material = '/sys/auctionMaterial/getAllAuctionMaterial'

export const A_surface = '/sys/auctionSurface/getAllAuctionSurface'


/**
 * 分页查询数据字典
 * 
 */

export const findDataDictionaryPage = '/sys/dataDictionary/findDataDictionaryPage'

/**
 * 分页查询数据字典
 * 
 */

export const deleteDataDictionary = '/sys/dataDictionary/deleteDataDictionary'


/**
 * 新增更新数据字典
 * 
 */

export const saveUpdateDataDictionary = '/sys/dataDictionary/saveUpdateDataDictionary'



/**
 * 商户资金账户列表
 * 
 */

export const buserAccountPage = '/sys/buserAccount/page'


/**
 * 商户资金账户详情
 * 
 */

export const buserAccountHistory = '/sys/buserAccount/log'



/**
 * 超管充值
 * 
 */

export const buserAccountRecharge = '/sys/buserAccount/recharge'



/**
 * 提现退款记录
 * 
 */

export const widthDrawHistory = '/sys/widthDraw/history'


/**
 * 提现退款记录
 * 
 */

export const widthDrawPass = '/sys/widthDraw/pass'


/**
 * 提现退款记录
 * 
 */

export const widthDrawReject = '/sys/widthDraw/reject'


/**
 * 提现申请-更新驳回理由
 * 
 */

export const updateRejectRemark = '/sys/widthDraw/updateRejectRemark'

/**
 * 提现申请-更新附件
 * 
 */

export const updateFiles = '/sys/widthDraw/updateFiles'


/**
 * 会员充值记录
 * 
 */

export const rechargeHistory = '/sys/recharge/history'

/**
 * 充值账单记录
 * 
 */

export const rechargePage = '/sys/recharge/page'



