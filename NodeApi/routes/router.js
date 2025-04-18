const express=require('express')
const router=express.Router()

const {checkAdmin,checkUser,checkAdminOrUser,checkApiKey,checkAuth}=require('../helpers/auth.middleware')

const {login,userRegistration,getDateWiseLogin,getMonthWiseLogin,getYearWiseLogin,getBrowserWiseLogin,getRoleWiseLogin,
    getUserInfo,createNewUser,updateUser,allUser,findUser,findUserByHash,deleteUser,
    createNewRole,updateRole,allRole,findRole,deleteRole,createHistory,updateHistory,updateProfile,
    passwordChange,getUserStatus,getBrowseList,getNotifications,uploadFile}=require('../controllers/user.controller')

const {sidebarMenu,sidebarAllMenu,assignNewMenu,allMenu,findMenu,deleteMenu,parentMenu,createMenu,updateMenu,
    allMenuGroup,findMenuGroup,deleteMenuGroup,createNewMenuGroup,updateMenuGroup,allMenuMapping}=require('../controllers/menu.controller')

const{welcomeEmail,forgetPasswordEmail,getAllSettings,updateGeneralSetting,updateEmailSetting,updateColorSetting,updateLandingText,updateEmailText,uploadLogo,uploadFavicon,
    allFaq,findFaq,deleteFaq,createNewFaq,updateFaq,allContact,createNewContact,allErrorLog,createNewErrorLog
}=require('../controllers/settings.controller')

//user.controller
/**
 * @swagger
 * /api/Users/GetLoginInfo:
 *   post:
 *     summary: Get verified login information
 *     description: This endpoint accepts a JSON object.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *               email:
 *                 type: string
 *                 example: "shuvoapeeru08@gmail.com"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetLoginInfo').post(login)
/**
 * @swagger
 * /api/Users/GetUserInfoForForgetPassword/{email}:
 *   get:
 *     summary: Get user details by email
 *     description: Retrieve details of a specific user using its email. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email of the item to retrieve
 *         schema:
 *           type: string
 *           example: "shuvoapeeru08@gmail.com"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetUserInfoForForgetPassword/:email').get(getUserInfo)
/**
 * @swagger
 * /api/Users/StudentRegistration:
 *   get:
 *     summary: Register a new user
 *     description: This endpoint accepts a JSON object. Requires no authorization.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *               email:
 *                 type: string
 *                 example: "john@email.com"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/StudentRegistration').post(userRegistration)
/**
 * @swagger
 * /api/Users/CreateLoginHistory:
 *   post:
 *     summary: Save login details
 *     description: This endpoint accepts a JSON object. Requires no authorization.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               ip:
 *                 type: string
 *                 example: "125.25.26.58"
 *               browser:
 *                 type: string
 *                 example: "Mozila"
 *               browserVersion:
 *                 type: string
 *                 example: "131.0.0"
 *               platform:
 *                 type: string
 *                 example: "Windows"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/CreateLoginHistory').post(createHistory)
/**
 * @swagger
 * /api/Users/UpdateLoginHistory/{logCode}:
 *   patch:
 *     summary: update logout time
 *     description: update logout time by logcode. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: logCode
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "4d40c10d-b688-402f-bc67-746e3b4c2be5"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/UpdateLoginHistory/:logCode').patch(updateHistory)
/**
 * @swagger
 * /api/Users/GetLogInSummaryByDate/{id}:
 *   get:
 *     summary: get login summary by date
 *     description: Retrive login date summary graph list by user id. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetLogInSummaryByDate/:id').get(getDateWiseLogin)
/**
 * @swagger
 * /api/Users/GetLogInSummaryByMonth/{id}:
 *   get:
 *     summary: get login summary by month
 *     description: Retrive login month summary graph list by user id. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetLogInSummaryByMonth/:id').get(getMonthWiseLogin)
/**
 * @swagger
 * /api/Users/GetLogInSummaryByYear/{id}:
 *   get:
 *     summary: get login summary by year
 *     description: Retrive login year summary graph list by user id. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetLogInSummaryByYear/:id').get(getYearWiseLogin)
/**
 * @swagger
 * /api/Users/GetBrowserCount/{id}:
 *   get:
 *     summary: get browser login data
 *     description: Browser wise login data count by user id. Requires no authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetBrowserCount/:id').get(getBrowserWiseLogin)
/**
 * @swagger
 * /api/Users/GetRoleWiseUser:
 *   get:
 *     summary: get role wise user
 *     description: user wise role count to display in pie chart. Requires no authorization.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetRoleWiseUser').get(getRoleWiseLogin)
/**
 * @swagger
 * /api/Users/UpdateUserProfile:
 *   patch:
 *     summary: update user profile
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@email.com"
 *               mobile:
 *                 type: string
 *                 example: "+8801723083877"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/UpdateUserProfile').patch(checkAuth,checkAdminOrUser,updateProfile)
/**
 * @swagger
 * /api/Users/ChangeUserPassword:
 *   patch:
 *     summary: change user password
 *     description: This endpoint accepts a JSON object. No Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *               passwordChangedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/ChangeUserPassword').patch(passwordChange)
/**
 * @swagger
 * /api/Users/UserStatus:
 *   get:
 *     summary: Get all status of users
 *     description: This endpoint require no input data. Authorization required.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/UserStatus').get(checkAuth,checkAdminOrUser,getUserStatus)
/**
 * @swagger
 * /api/Users/GetBrowseList/{id}:
 *   get:
 *     summary: Get login history data
 *     description: This endpoint require no input data. Authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/GetBrowseList/:id').get(checkAuth,checkAdminOrUser,getBrowseList)
/**
 * @swagger
 * /api/Users/GetNotificationList/{id}:
 *   get:
 *     summary: Get notification list data
 *     description: This endpoint require no input data. No authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetNotificationList/:id').get(getNotifications)
/**
 * @swagger
 * /api/Users/Upload:
 *   post:
 *     summary: Upload profile picture and landing page images
 *     description: This endpoint require image file to upload. No authorization required.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/Upload').post(uploadFile)
/**
 * @swagger
 * /api/Users/CreateUser:
 *   post:
 *     summary: create a new user
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userRoleId:
 *                 type: integer
 *                 example: 1
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@email.com"
 *               mobile:
 *                 type: string
 *                 example: "+8801723083877"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/CreateUser').post(checkAuth,checkAdminOrUser,createNewUser)
/**
 * @swagger
 * /api/Users/GetUserList:
 *   get:
 *     summary: Get all user
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/GetUserList').get(checkAuth,checkAdminOrUser,allUser)
/**
 * @swagger
 * /api/Users/GetSingleUser/{id}:
 *   get:
 *     summary: Get Single user detail
 *     description: This endpoint require input user id parameter. Authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/GetSingleUser/:id').get(checkAuth,checkAdminOrUser,findUser)
/**
 * @swagger
 * /api/Users/GetSingleUserByHash/{hash}:
 *   get:
 *     summary: User detail to reset password
 *     description: This endpoint require input hash parameter. No authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: hash
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "$2a$10$HbcghasghasMHlaRSJ.RaigbeJ2O1esONTRe.TiIK/ZVJPwLpmCDjkkis"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Users/GetSingleUserByHash/:hash').get(findUserByHash)
/**
 * @swagger
 * /api/Users/DeleteSingleUser/{id}:
 *   delete:
 *     summary: Delete an user info
 *     description: This endpoint require input user id parameter. Authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/DeleteSingleUser/:id').delete(checkAuth,checkAdminOrUser,deleteUser)
/**
 * @swagger
 * /api/Users/UpdateUser:
 *   patch:
 *     summary: update user info
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               userRoleId:
 *                 type: integer
 *                 example: 1
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@email.com"
 *               mobile:
 *                 type: string
 *                 example: "+8801723083877"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/UpdateUser').patch(checkAuth,checkAdminOrUser,updateUser)
/**
 * @swagger
 * /api/Users/CreateUserRole:
 *   post:
 *     summary: create new role
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: "Audit"
 *               roleDesc:
 *                 type: string
 *                 example: "Description of audit role"
 *               menuGroupId:
 *                 type: integer
 *                 example: 1
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/CreateUserRole').post(checkAuth,checkAdmin,createNewRole)
/**
 * @swagger
 * /api/Users/GetUserRoleList:
 *   get:
 *     summary: Get all role
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/GetUserRoleList').get(checkAuth,checkAdmin,allRole)
/**
 * @swagger
 * /api/Users/GetSingleRole/{id}:
 *   get:
 *     summary: Get Single role detail
 *     description: This endpoint require input user id parameter. Authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/GetSingleRole/:id').get(checkAuth,checkAdmin,findRole)
/**
 * @swagger
 * /api/Users/DeleteSingleRole/{id}:
 *   delete:
 *     summary: Delete an role
 *     description: This endpoint require input user id parameter. Authorization required.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/DeleteSingleRole/:id').delete(checkAuth,checkAdmin,deleteRole)
/**
 * @swagger
 * /api/Users/UpdateUserRole:
 *   patch:
 *     summary: update an existing role info
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userRoleId:
 *                 type: integer
 *                 example: 1
 *               roleName:
 *                 type: string
 *                 example: "Audit"
 *               roleDesc:
 *                 type: string
 *                 example: "Description of audit role"
 *               menuGroupId:
 *                 type: integer
 *                 example: 1
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Users/UpdateUserRole').patch(checkAuth,checkAdmin,updateRole)


//menu.controller
/**
 * @swagger
 * /api/Menu/GetSidebarMenu/{id}:
 *   get:
 *     summary: Get App sidebar menu data by role
 *     description: This endpoint require input role id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetSidebarMenu/:id').get(checkAuth,checkAdminOrUser,sidebarMenu)
/**
 * @swagger
 * /api/Menu/GetAllMenu/{id}:
 *   get:
 *     summary: Get App sidebar menu data by menu group
 *     description: This endpoint require input menu group id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetAllMenu/:id').get(checkAuth,checkAdminOrUser,sidebarAllMenu)
/**
 * @swagger
 * /api/Menu/MenuAssign:
 *   post:
 *     summary: Assign a new menu to a menu group
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuGroupId:
 *                 type: integer
 *                 example: 1
 *               menuId:
 *                 type: integer
 *                 example: 12
 *               isSelected:
 *                 type: bool
 *                 example: true
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/MenuAssign').post(checkAuth,checkAdminOrUser,assignNewMenu)
/**
 * @swagger
 * /api/Menu/GetMenuList:
 *   get:
 *     summary: Get all menu
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetMenuList').get(checkAuth,checkAdmin,allMenu)
/**
 * @swagger
 * /api/Menu/GetSingleMenu/{id}:
 *   get:
 *     summary: Get Single menu detail
 *     description: This endpoint require input menu id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetSingleMenu/:id').get(checkAuth,checkAdminOrUser,findMenu)
/**
 * @swagger
 * /api/Menu/DeleteSingleMenu/{id}:
 *   delete:
 *     summary: Delete a menu
 *     description: This endpoint require input menu id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/DeleteSingleMenu/:id').delete(checkAuth,checkAdminOrUser,deleteMenu)
/**
 * @swagger
 * /api/Menu/GetParentMenuList:
 *   get:
 *     summary: Get parent menu list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetParentMenuList').get(checkAuth,checkAdminOrUser,parentMenu)
/**
 * @swagger
 * /api/Menu/CreateMenu:
 *   post:
 *     summary: create a new menu
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parentID:
 *                 type: integer
 *                 example: 1
 *               menuTitle:
 *                 type: string
 *                 example: "Settings"
 *               url:
 *                 type: string
 *                 example: "/settings"
 *               isSubMenu:
 *                 type: bool
 *                 example: true
 *               sortOrder:
 *                 type: integer
 *                 example: 12
 *               iconClass:
 *                 type: string
 *                 example: "ri-settings-2-line"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/CreateMenu').post(checkAuth,checkAdminOrUser,createMenu)
/**
 * @swagger
 * /api/Menu/UpdateMenu:
 *   patch:
 *     summary: update an existing menu
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuID:
 *                 type: integer
 *                 example: 14
 *               parentID:
 *                 type: integer
 *                 example: 1
 *               menuTitle:
 *                 type: string
 *                 example: "Settings"
 *               url:
 *                 type: string
 *                 example: "/settings"
 *               isSubMenu:
 *                 type: bool
 *                 example: true
 *               sortOrder:
 *                 type: integer
 *                 example: 12
 *               iconClass:
 *                 type: string
 *                 example: "ri-settings-2-line"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/UpdateMenu').patch(checkAuth,checkAdminOrUser,updateMenu)
/**
 * @swagger
 * /api/Menu/GetMenuGroupList:
 *   get:
 *     summary: Get menu group list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetMenuGroupList').get(checkAuth,checkAdminOrUser,allMenuGroup)
/**
 * @swagger
 * /api/Menu/GetSingleMenuGroup/{id}:
 *   get:
 *     summary: Get Single menu group detail
 *     description: This endpoint require input menu group id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetSingleMenuGroup/:id').get(checkAuth,checkAdminOrUser,findMenuGroup)
/**
 * @swagger
 * /api/Menu/DeleteSingleMenuGroup/{id}:
 *   delete:
 *     summary: Delete a menu group
 *     description: This endpoint require input menu group id parameter. Authorization required.
 *     tags:
 *       - Menu
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/DeleteSingleMenuGroup/:id').delete(checkAuth,checkAdminOrUser,deleteMenuGroup)
/**
 * @swagger
 * /api/Menu/CreateMenuGroup:
 *   post:
 *     summary: create a new menu group
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuGroupName:
 *                 type: string
 *                 example: "Settings"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/CreateMenuGroup').post(checkAuth,checkAdminOrUser,createNewMenuGroup)
/**
 * @swagger
 * /api/Menu/UpdateMenuGroup:
 *   patch:
 *     summary: update an existing menu group
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuGroupName:
 *                 type: string
 *                 example: "Settings"
 *               menuGroupID:
 *                 type: integer
 *                 example: 1
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/UpdateMenuGroup').patch(checkAuth,checkAdminOrUser,updateMenuGroup)
/**
 * @swagger
 * /api/Menu/GetMenuGroupWiseMenuMappingList:
 *   get:
 *     summary: Get menu Mapping list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Menu
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Menu/GetMenuGroupWiseMenuMappingList').get(checkAuth,checkAdminOrUser,allMenuMapping)


//settings.controller
/**
 * @swagger
 * /api/Settings/SendWelcomeMail:
 *   post:
 *     summary: Sent welcome email to newly registered user
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toEmail:
 *                 type: string
 *                 example: "john@email.com"
 *               name:
 *                 type: string
 *                 example: "john doe"
 *               logoPath:
 *                 type: string
 *                 example: "/path"
 *               siteUrl:
 *                 type: string
 *                 example: "https://sangibproject.com"
 *               siteTitle:
 *                 type: string
 *                 example: "React Admin"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/SendWelcomeMail').post(welcomeEmail)
/**
 * @swagger
 * /api/Settings/SendPasswordMail:
 *   post:
 *     summary: Sent forget password email
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toEmail:
 *                 type: string
 *                 example: "john@email.com"
 *               name:
 *                 type: string
 *                 example: "john doe"
 *               logoPath:
 *                 type: string
 *                 example: "/path"
 *               siteUrl:
 *                 type: string
 *                 example: "https://sangibproject.com"
 *               siteTitle:
 *                 type: string
 *                 example: "React Admin"
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/SendPasswordMail').post(forgetPasswordEmail)
/**
 * @swagger
 * /api/Settings/GetSiteSettings:
 *   get:
 *     summary: Get all settings
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/GetSiteSettings').get(getAllSettings)
/**
 * @swagger
 * /api/Settings/UpdateGeneralSetting:
 *   patch:
 *     summary: update app general settings
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteSettingsId:
 *                 type: integer
 *                 example: 1
 *               siteTitle:
 *                 type: string
 *                 example: "Node Admin"
 *               welComeMessage:
 *                 type: string
 *                 example: "Hello there,Sign in to start your task!"
 *               copyRightText:
 *                 type: string
 *                 example: "© 2024 Copyright Node Admin"
 *               version:
 *                 type: integer
 *                 example: 1
 *               logoPath:
 *                 type: string
 *                 example: "/logo/path"
 *               faviconPath:
 *                 type: string
 *                 example: "/favicon/path"
 *               allowWelcomeEmail:
 *                 type: bool
 *                 example: true
 *               allowFaq:
 *                 type: bool
 *                 example: true
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateGeneralSetting').patch(checkAuth,checkAdmin,updateGeneralSetting)
/**
 * @swagger
 * /api/Settings/UpdateEmailSetting:
 *   patch:
 *     summary: update app email settings
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteSettingsId:
 *                 type: integer
 *                 example: 1
 *               defaultEmail:
 *                 type: string
 *                 example: "info@email.com"
 *               password:
 *                 type: string
 *                 example: "wuetyuqwetuyqwe"
 *               host:
 *                 type: string
 *                 example: "host.gmail.com"
 *               port:
 *                 type: integer
 *                 example: 537
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateEmailSetting').patch(checkAuth,checkAdmin,updateEmailSetting)
/**
 * @swagger
 * /api/Settings/UpdateColorSetting:
 *   patch:
 *     summary: update app color settings
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteSettingsId:
 *                 type: integer
 *                 example: 1
 *               appBarColor:
 *                 type: string
 *                 example: "#363636"
 *               headerColor:
 *                 type: string
 *                 example: "#363636"
 *               footerColor:
 *                 type: string
 *                 example: "#363636"
 *               bodyColor:
 *                 type: string
 *                 example: "#363636"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateColorSetting').patch(checkAuth,checkAdmin,updateColorSetting)
/**
 * @swagger
 * /api/Settings/UpdateLandingSetting:
 *   patch:
 *     summary: update app landing page text
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteSettingsId:
 *                 type: integer
 *                 example: 1
 *               homeHeader1:
 *                 type: string
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *               homeDetail1:
 *                 type: string
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *               homeHeader2:
 *                 type: string
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *               homeDetail2:
 *                 type: string
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateLandingSetting').patch(checkAuth,checkAdmin,updateLandingText)
/**
 * @swagger
 * /api/Settings/UpdateEmailTextSetting:
 *   patch:
 *     summary: update app email body text settings
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteSettingsId:
 *                 type: integer
 *                 example: 1
 *               forgetPasswordEmailSubject:
 *                 type: string
 *                 example: "Forget Password"
 *               forgetPasswordEmailHeader:
 *                 type: string
 *                 example: "Forget Password Header"
 *               forgetPasswordEmailBody:
 *                 type: string
 *                 example: "Forget Password Body"
 *               welcomeEmailSubject:
 *                 type: string
 *                 example: "Welcome Subject"
 *               welcomeEmailHeader:
 *                 type: string
 *                 example: "Welcome Header"
 *               welcomeEmailBody:
 *                 type: string
 *                 example: "Welcome Body"
 *               lastUpdatedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateEmailTextSetting').patch(checkAuth,checkAdmin,updateEmailText)
/**
 * @swagger
 * /api/Settings/UploadLogo:
 *   post:
 *     summary: Upload logo
 *     description: This endpoint require image file to upload. No authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/UploadLogo').post(checkAuth,checkAdmin,uploadLogo)
/**
 * @swagger
 * /api/Settings/UploadFavicon:
 *   post:
 *     summary: Upload favicon
 *     description: This endpoint require image file to upload. No authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/UploadFavicon').post(checkAuth,checkAdmin,uploadFavicon)
/**
 * @swagger
 * /api/Settings/GetFaqList:
 *   get:
 *     summary: Get faq list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/GetFaqList').get(checkAuth,checkAdminOrUser,allFaq)
/**
 * @swagger
 * /api/Settings/GetSingleFaq/{id}:
 *   get:
 *     summary: Get Single faq detail
 *     description: This endpoint require input faq id parameter. Authorization required.
 *     tags:
 *       - Settings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/GetSingleFaq/:id').get(checkAuth,checkAdmin,findFaq)
/**
 * @swagger
 * /api/Settings/DeleteFaq/{id}:
 *   delete:
 *     summary: Delete a faq
 *     description: This endpoint require input faq id parameter. Authorization required.
 *     tags:
 *       - Settings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/DeleteFaq/:id').delete(checkAuth,checkAdmin,deleteFaq)
/**
 * @swagger
 * /api/Settings/CreateFaq:
 *   post:
 *     summary: create new faq
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Faq title"
 *               description:
 *                 type: string
 *                 example: "Detail of faq"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/CreateFaq').post(checkAuth,checkAdmin,createNewFaq)
/**
 * @swagger
 * /api/Settings/UpdateFaq:
 *   patch:
 *     summary: update a faq
 *     description: This endpoint a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Faq title"
 *               description:
 *                 type: string
 *                 example: "Detail of faq"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *               faqId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/UpdateFaq').patch(checkAuth,checkAdmin,updateFaq)
/**
 * @swagger
 * /api/Settings/GetContacts:
 *   get:
 *     summary: Get contacts list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/GetContacts').get(checkAuth,checkAdmin,allContact)
/**
 * @swagger
 * /api/Settings/CreateContacts:
 *   post:
 *     summary: create new contact
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@email.com"
 *               message:
 *                 type: string
 *                 example: "message to sent"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/CreateContacts').post(createNewContact)
/**
 * @swagger
 * /api/Settings/GetErrorLogList:
 *   get:
 *     summary: Get all error list
 *     description: This endpoint require no input. Authorization required.
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Resource created successfully
 *     security:
 *       - BearerAuth: []
 */
router.route('/Settings/GetErrorLogList').get(checkAuth,checkAdmin,allErrorLog)
/**
 * @swagger
 * /api/Settings/CreateErrorLog:
 *   post:
 *     summary: create new error log
 *     description: This endpoint accepts a JSON object. Authorization required.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "401"
 *               statusText:
 *                 type: string
 *                 example: "Unauthorized"
 *               url:
 *                 type: string
 *                 example: "/api/Users/GetUserList"
 *               message:
 *                 type: string
 *                 example: "Request failed with status code 401"
 *               addedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 */
router.route('/Settings/CreateErrorLog').post(createNewErrorLog)


module.exports=router