export const uploadApi = 'http://192.168.0.251:8080/fileUpload/images';

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

export const G_getAllUnits = '/sys/unit/queryUnitList'

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

export const G_getTypes = '/sys/ironTypes/findIronTypes'

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

// -----------------------------------材质---------------------------------
/**
 * 添加表面信息
 * path: /bussiness/surface/saveMaterials
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addMaterials = '/bussiness/surface/saveMaterials'

/**
 * 更新表面信息
 * path: /bussiness/surface/updateSurFace
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateMaterials = '/bussiness/surface/updateMaterials'


/**
 * 查询表面信息
 * path: /bussiness/surface/findMaterialsPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getMaterials = '/bussiness/surface/findMaterialsPage'