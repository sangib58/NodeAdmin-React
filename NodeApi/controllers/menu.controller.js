const {Confirmation}=require('../helpers/confirmation')
const Menu=require('../models/menu/menu.model')
const MenuGroup=require('../models/menu/menuGroup.model')
const MenuMapping=require('../models/menu/menuMapping.model')

//get sidebar assigned menu
const sidebarMenu=async(req,res)=>{
    try {
        const {id}=req.params
        const menus=await Menu.sidebar(id)
        res.status(200).send(menus)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//get sidebar all menu
const sidebarAllMenu=async(req,res)=>{
    try {
        const {id}=req.params
        const menus=await Menu.allMenu(id)
        res.status(200).send(menus)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//assign new menu
const assignNewMenu=async(req,res)=>{
    try {
        const newMenu=new MenuMapping({
            menuGroupId:req.body.menuGroupId,
            menuId:req.body.menuId,
            isSelected:req.body.isSelected,
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date()
        })
        const checkLength=await MenuMapping.assign(newMenu)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully assigned'))
        }else if(checkLength>0){
            res.status(200).send(new Confirmation('delete','Successfully un-assigned'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//fetch all menu
const allMenu=async(req,res)=>{
    try {
        const menus=await Menu.list()
        res.status(200).send({data:menus,recordsTotal:menus.length})
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//fetch single menu
const findMenu=async(req,res)=>{
    try {
        const {id}=req.params
        const menu=await Menu.findBy(id)
        if(menu){
            res.status(200).send(menu)
        }else{
            res.status(202).send(new Confirmation('error','Menu not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//delete single menu
const deleteMenu=async(req,res)=>{
    try {
        const {id}=req.params
        await Menu.deleteBy(id)
        res.status(200).send(new Confirmation('success','Deleted successfully!'))
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//parent menus
const parentMenu=async(req,res)=>{
    try {
        const initialObject={id:0,text:'Root'}
        const menus=await Menu.parent()
        menus.push(initialObject)
        res.status(200).send(menus.sort((a,b)=>a.id-b.id))
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//create menu
const createMenu=async(req,res)=>{
    try {
        const menu=new Menu({
            parentID:req.body.parentID,
            menuTitle:req.body.menuTitle,
            url:req.body.url,
            isSubMenu:req.body.isSubMenu,
            sortOrder:req.body.sortOrder,
            iconClass:req.body.iconClass,
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date(),
            lastUpdatedDate:null,
            lastUpdatedBy:null
        })
        const msg=await Menu.create(menu)
        if(msg=='success'){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(msg=='titleDuplicate'){
            res.status(202).send(new Confirmation('duplicate','Duplicate menu title ! try another.'))
        }else if(msg=='orderDuplicate'){
            res.status(202).send(new Confirmation('duplicate','Duplicate order no. ! try another.'))
        }else if(msg=='lowerOrder'){
            res.status(202).send(new Confirmation('duplicate','Order must be greater than 0 ! try another.'))
        }else{
            res.status(202).send(new Confirmation('error','Something un-expected ! try again.'))
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//update menu
const updateMenu=async(req,res)=>{
    try {
        const menu=new Menu({
            menuID:req.body.menuID,
            parentID:req.body.parentID,
            menuTitle:req.body.menuTitle,
            url:req.body.url,
            isSubMenu:req.body.isSubMenu,
            sortOrder:req.body.sortOrder,
            iconClass:req.body.iconClass,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
        const msg=await Menu.update(menu)
        if(msg=='success'){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(msg=='titleDuplicate'){
            res.status(202).send(new Confirmation('duplicate','Duplicate menu title ! try another.'))
        }else if(msg=='orderDuplicate'){
            res.status(202).send(new Confirmation('duplicate','Duplicate order no. ! try another.'))
        }else if(msg=='lowerOrder'){
            res.status(202).send(new Confirmation('duplicate','Order must be greater than 0 ! try another.'))
        }else{
            res.status(202).send(new Confirmation('error','Something un-expected ! try again.'))
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//fetch all menu group
const allMenuGroup=async(req,res)=>{
    try {
        const list=await MenuGroup.list()
        res.status(200).send({data:list,recordsTotal:list.length})
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

//fetch single menu group
const findMenuGroup=async(req,res)=>{
    try {
        const {id}=req.params
        const menuGroup=await MenuGroup.findBy(id)
        if(menuGroup){
            res.status(200).send(menuGroup)
        }else{
            res.status(202).send(new Confirmation('error','Menu Group not found')) 
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//delete single menu group
const deleteMenuGroup=async(req,res)=>{
    try {
        const {id}=req.params
        const checkLength=await MenuGroup.deleteBy(id)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Deleted successfully!'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This menu group has assigned user role. Not allowed to delete.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }       
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))
    }
}

//create new menu group
const createNewMenuGroup=async(req,res)=>{
    try {
        const menuGroup=new MenuGroup({
            menuGroupName:req.body.menuGroupName,
            isActive: req.body.isActive || 1,
            isMigrationData:req.body.isMigrationData || 0,
            addedBy:req.body.addedBy,
            dateAdded:new Date(),
            lastUpdatedDate:req.body.lastUpdatedDate,
            lastUpdatedBy:req.body.lastUpdatedBy
        })        
        const checkLength=await MenuGroup.create(menuGroup)
        if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This name already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//update menu group
const updateMenuGroup=async(req,res)=>{
    try {       
        const menuGroup=new MenuGroup({
            menuGroupID:req.body.menuGroupID,
            menuGroupName:req.body.menuGroupName,
            lastUpdatedDate:new Date(),
            lastUpdatedBy:req.body.lastUpdatedBy
        })
       const checkLength=await MenuGroup.update(menuGroup)
       if(checkLength==0){
            res.status(200).send(new Confirmation('success','Successfully saved'))
        }else if(checkLength>0){
            res.status(202).send(new Confirmation('duplicate','This name already exists! Please try another name.'))
        }else{
            res.status(400).send(new Confirmation('error','Something un-expected! please try again later'))
        }          
    } catch (error) {
        console.log(error)     
        res.status(500).send(new Confirmation('error',error))  
    }
}

//fetch all menu mapping
const allMenuMapping=async(req,res)=>{
    try {
        const menus=await MenuMapping.list()
        res.status(200).send(menus)
    } catch (error) {
        console.error(error)
        res.status(500).send(new Confirmation('error',error))    
    }
}

module.exports={sidebarMenu,sidebarAllMenu,assignNewMenu,allMenu,findMenu,deleteMenu,parentMenu,createMenu,updateMenu,
allMenuGroup,findMenuGroup,deleteMenuGroup,createNewMenuGroup,updateMenuGroup,allMenuMapping}