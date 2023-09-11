const hasPermission = (permissionList, permission) => {
    return permissionList?.includes(permission)
}

export {hasPermission}