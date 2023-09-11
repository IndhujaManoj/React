import { global_permissions } from "variables/UserGlobalPermission"
export const UIPermission = (role, instance_permission, instance_id) => {
   return  ['ACCOUNT_ADMIN'].includes(role) ?  global_permissions[role]: instance_permission[instance_id]
}